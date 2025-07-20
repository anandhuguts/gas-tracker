import { ethers } from "ethers";
import useGasStore from "../store/gasZustand";
import { getEthUsdPrice } from "./uniswap";

const provider = new ethers.WebSocketProvider("wss://ethereum.publicnode.com");
// Ethereum Uniswap V3 ETH/USDC Pool (0.05% fee tier)
// const ETH_USDC_POOL = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";
// const POOL_ABI = [
//   "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
// ];

let lastUpdate = 0;
export async function subscribeEtheriumgonGas() {
  const setGasData = useGasStore.getState().setGasData;

  provider.on("block", async () => {
    const now = Date.now();
    if (now - lastUpdate < 6000) return;
    lastUpdate = now;

    try {
      const [feeData, block] = await Promise.all([
        provider.getFeeData(),
        provider.getBlock("pending"),
      ]);

      const baseFee = Number(
        ethers.formatUnits(block.baseFeePerGas || 0, "gwei")
      );
      const priorityFee = Number(
        ethers.formatUnits(feeData.maxPriorityFeePerGas || 0, "gwei")
      );
      const ethPrice = await getEthUsdPrice();
      const totalGas = baseFee + priorityFee;
      const gasCostEth = (totalGas * 21000) / 1e9;
      const gasCostUsd = (gasCostEth * ethPrice).toFixed(6);

      setGasData("ethereum", {
        chain: "ethereum",
        baseFee: baseFee.toFixed(2),
        priorityFee: priorityFee.toFixed(2),
        totalGas: totalGas.toFixed(2),
        usd: gasCostUsd,
        price: ethPrice,
      });
    } catch (err) {
      console.error("ethereum gas fetch error:", err);
    }
  });
}
