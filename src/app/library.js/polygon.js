import { ethers } from "ethers";
import useGasStore from "../store/gasZustand";

const MATIC_USDC_POOL = "0xA374094527e1673A86dE625aa59517c5dE346d32";
const POOL_ABI = [
  "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
];
const provider = new ethers.WebSocketProvider(process.env.NEXT_PUBLIC_POLY_API);

let lastUpdate = 0;
export async function subscribePolygonGas() {
  const setGasData = useGasStore.getState().setGasData;

  provider.on("block", async () => {
    const now = Date.now();
    if (now - lastUpdate < 6000) return;
    lastUpdate = now;

    try {
      const [feeData, block, ethPrice] = await Promise.all([
        provider.getFeeData(),
        provider.getBlock("pending"),
        getMaticUsdPrice(),
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

      setGasData("polygon", {
        chain: "polygon",
        baseFee: baseFee.toFixed(2),
        priorityFee: priorityFee.toFixed(2),
        totalGas: totalGas.toFixed(2),
        usd: gasCostUsd,
        price: ethPrice,
      });
    } catch (err) {
      console.error("polygon gas fetch error:", err);
    }
  });
}

async function getMaticUsdPrice() {
  const pool = new ethers.Contract(MATIC_USDC_POOL, POOL_ABI, provider);
  const { sqrtPriceX96 } = await pool.slot0();

  // Price calculation (USDC has 6 decimals, MATIC has 18 decimals)
  const sqrtPrice = Number(sqrtPriceX96);
  const price = (sqrtPrice ** 2 * 10 ** 12) / 2 ** 192;
  return price;
}
