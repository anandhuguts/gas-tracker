"use client";

import { useState } from "react";
import SimulationForm from "../_subcomponents/SimulationForm";

function TransactionSimulator() {
  const [amount, setAmount] = useState(0);
  const [costUsd, setCostusd] = useState({});
  return (
    <div className="w-full max-w-[441px] h-[662px] bg-[#030715] border border-[#141B2A] flex justify-center rounded-2xl font-dsans ">
      <div className="w-full max-w-[372px] pt-6">
        <h2 className="text-white text-[24px] font-bold mb-4">
          Transaction Simulator
        </h2>
        <SimulationForm
          amount={amount}
          setAmount={setAmount}
          setCostusd={setCostusd}
        />
        <div className="text-[18px] font-medium text-[#75767F] mb-2 grid grid-cols-3">
          <span>Chain</span>
          <span>Gas fee (usd)</span>
          <span>Totalcost</span>
        </div>

        <div className="text-white space-y-2 text-[18px] font-medium">
          {Object.entries(costUsd).map(([chain, { gasUSD, totalUSD }]) => (
            <div key={chain} className="grid grid-cols-3 capitalize">
              <span>{chain}</span>
              <span>${parseFloat(gasUSD * 1).toFixed(5)}</span>
              <span>${parseFloat(totalUSD).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionSimulator;
