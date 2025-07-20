import useGasStore from "../store/gasZustand";
import Imagecomp from "./Imagecomp";
import Spinner from "./Spinner";
import Timer from "./Timer";

function PriceBox() {
  const gasData = useGasStore((state) => state.gasData);

  const gasArray = Object.entries(gasData).map(([chain, data]) => ({
    chain,
    ...data,
  }));

  if (!gasData.ethereum || !gasData.polygon || !gasData.arbitrum) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Timer />
      <div className="flex gap-[20px]  ">
        {gasArray.map((gas, index) => (
          <div
            className="w-[289px] h-[316px] bg-[#020815] border border-[#839AE7] rounded-2xl font-bold font-dsans"
            key={index}
          >
            <div className="w-full mt-6 px-6">
              <div className="flex items-center gap-1.5">
                <Imagecomp image={"ethereum.png"} />
                <span className="font-bold text-[20px]">{gas.chain}</span>
              </div>
              <div className="mt-[28px]">
                <span className="text-[#75767F] text-[16px] ">Gas (USD)</span>
                <h3 className="text-[40px]">{"$" + gas.usd}</h3>
              </div>
              <div className="mt-[28px]">
                <p className="text-[20px] font-medium ">
                  <span className="  text-[#75767F]">Base Fee : </span>
                  {gas.baseFee} gwei
                </p>
                <p className="text-[20px] font-medium">
                  <span className="  text-[#75767F]">Priority Fee : </span>
                  {gas.priorityFee} gwei
                </p>
                <p className="text-[20px] font-medium">
                  <span className="  text-[#75767F]">Total Gas : </span>
                  {gas.totalGas} gwei
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PriceBox;
