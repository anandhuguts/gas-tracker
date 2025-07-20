// lib/gas.js
import { ethers, formatUnits } from "ethers";
import { getArbUsdPrice, getEthUsdPrice, getPolyUsdPrice } from "./uniswap";

export async function getEthereumGas() {
  const provider = new ethers.WebSocketProvider(
    "wss://ethereum.publicnode.com"
  );

  const [feeData, block] = await Promise.all([
    provider.getFeeData(),
    provider.getBlock("pending"),
  ]);

  const ethUsd = await getEthUsdPrice();

  const baseFee = Number(formatUnits(block.baseFeePerGas || 0, "gwei"));
  const priorityFee = Number(
    formatUnits(feeData.maxPriorityFeePerGas || 0, "gwei")
  );
  const totalGas = baseFee + priorityFee;

  const gasPriceInEth = (totalGas * 21000) / 1e9;
  const gasCostUsd = gasPriceInEth * ethUsd;

  return {
    chain: "Ethereum",
    baseFee: baseFee.toFixed(2),
    priorityFee: priorityFee.toFixed(2),
    totalGas: totalGas.toFixed(2),
    usd: gasCostUsd.toFixed(6),
  };
}
export async function getPolyGasTest() {
  const provider = new ethers.WebSocketProvider(
    "wss://polygon-mainnet.g.alchemy.com/v2/xhut2tWPNVIiRCLslcYMYH1VZ0sWP2nb"
  );

  const [feeData, block] = await Promise.all([
    provider.getFeeData(),
    provider.getBlock("pending"),
  ]);

  const ethUsd = await getPolyUsdPrice();
  const baseFee = Number(formatUnits(block.baseFeePerGas || 0, "gwei"));
  const priorityFee = Number(
    formatUnits(feeData.maxPriorityFeePerGas || 0, "gwei")
  );
  const totalGas = baseFee + priorityFee;
  const gasPriceInEth = (totalGas * 21000) / 1e9;
  const gasCostUsd = (gasPriceInEth * ethUsd).toFixed(6);

  return {
    chain: "Polygon",
    baseFee: baseFee.toFixed(2),
    priorityFee: priorityFee.toFixed(2),
    totalGas: totalGas.toFixed(2),
    usd: gasCostUsd,
  };
}

export async function getArbiterumGas() {
  const provider = new ethers.WebSocketProvider(
    "wss://arb-mainnet.g.alchemy.com/v2/xhut2tWPNVIiRCLslcYMYH1VZ0sWP2nb"
  );
  const [feeData, block] = await Promise.all([
    provider.getFeeData(),
    provider.getBlock("pending"),
  ]);
  const ethUsd = await getArbUsdPrice();
  const baseFee = Number(formatUnits(block.baseFeePerGas || 0, "gwei"));
  const priorityFee = Number(
    formatUnits(feeData.maxPriorityFeePerGas || 0, "gwei")
  );
  const totalGas = baseFee + priorityFee;
  const gasPriceInEth = (totalGas * 21000) / 1e9;
  const gasCostUsd = (gasPriceInEth * ethUsd).toFixed(6);

  return {
    chain: "arbiterum",
    baseFee: baseFee.toFixed(2),
    priorityFee: priorityFee.toFixed(2),
    totalGas: totalGas.toFixed(2),
    usd: gasCostUsd,
  };
}
