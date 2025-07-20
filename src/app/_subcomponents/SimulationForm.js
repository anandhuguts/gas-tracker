import useGasStore from "../store/gasZustand";

function SimulationForm({ amount, setAmount, setCostusd }) {
  const gasData = useGasStore((state) => state.gasData);
  const ethereum = gasData.ethereum;
  const polygon = gasData.polygon;
  const arbitrum = gasData.arbitrum;

  function handleSubmit(e) {
    e.preventDefault();

    const txAmount = parseFloat(amount);

    const chains = { ethereum, polygon, arbitrum };
    const gasLimit = 21000;
    const result = {};

    Object.entries(chains).forEach(([chainName, data]) => {
      const baseFee = parseFloat(data.baseFee);
      const priorityFee = parseFloat(data.priorityFee);
      const priceUSD = parseFloat(data.price);
      const gasCostUSD = parseFloat(data.usd);

      const totalGasGwei = baseFee + priorityFee;
      const gasCostNative = (totalGasGwei * gasLimit) / 1e9;

      const totalNativeCost = txAmount + gasCostNative;

      const totalUSD = totalNativeCost * priceUSD;

      result[chainName] = {
        gas: gasCostNative.toFixed(6),
        gasUSD: gasCostUSD.toFixed(6),
        totalUSD: totalUSD.toFixed(4),
      };
    });

    console.log(result);
    setCostusd(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="font-medium text-[#75767F] mb-1 block text-[20px]">
        Transaction amount
      </label>
      <div className="relative mb-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="amount"
          className="w-full bg-[#0e1018] text-white border border-[#1f2230] rounded-lg py-3.5 px-3 pr-20 placeholder-[#75767F] focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white bg-[#1b1f30] px-2 py-1 rounded-md">
          ETH/MATIC
        </span>
      </div>

      <button className="bg-[#2a34d4] text-white w-full py-2 rounded-lg hover:bg-[#3b45f2] transition mb-6 text-[20px]">
        Simulate
      </button>
    </form>
  );
}

export default SimulationForm;
