import { ethers } from "ethers";
import useGasStore from "../store/gasZustand";

const provider = new ethers.WebSocketProvider(
  "wss://arb-mainnet.g.alchemy.com/v2/xhut2tWPNVIiRCLslcYMYH1VZ0sWP2nb"
);

const ETH_USDC_POOL = "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443";
const POOL_ABI = [
  "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
];

let lastUpdate = 0;

export async function subscribeArbitrumGas() {
  const setGasData = useGasStore.getState().setGasData;

  provider.on("block", async () => {
    const now = Date.now();
    if (now - lastUpdate < 6000) return; // throttle updates to every 6s
    lastUpdate = now;

    try {
      const [feeData, block, ethPrice] = await Promise.all([
        provider.getFeeData(),
        provider.getBlock("pending"),
        getEthUsdPrice(),
      ]);

      const baseFee = Number(
        ethers.formatUnits(block.baseFeePerGas || 0, "gwei")
      );
      const priorityFee = Number(
        ethers.formatUnits(feeData.maxPriorityFeePerGas || 0, "gwei")
      );
      const totalGas = baseFee + priorityFee;
      const gasCostEth = (totalGas * 21000) / 1e9;
      const gasCostUsd = (gasCostEth * ethPrice).toFixed(6);

      setGasData("arbitrum", {
        chain: "arbitrum",
        baseFee: baseFee.toFixed(2),
        priorityFee: priorityFee.toFixed(2),
        totalGas: totalGas.toFixed(2),
        usd: gasCostUsd,
        price: ethPrice,
      });
    } catch (err) {
      console.error("Arbitrum gas fetch error:", err);
    }
  });
}

async function getEthUsdPrice() {
  const pool = new ethers.Contract(ETH_USDC_POOL, POOL_ABI, provider);
  const { sqrtPriceX96 } = await pool.slot0();
  const sqrtPrice = Number(sqrtPriceX96);
  const price = (sqrtPrice ** 2 * 1e12) / 2 ** 192;
  return price;
}
