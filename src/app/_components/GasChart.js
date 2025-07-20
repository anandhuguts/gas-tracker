"use client";

import { useEffect } from "react";
import PriceBox from "../_subcomponents/PriceBox";

import { subscribeArbitrumGas } from "../library.js/arbiterum";

import { subscribePolygonGas } from "../library.js/polygon";
import { subscribeEtheriumgonGas } from "../library.js/etherium";

function GasChart() {
  useEffect(() => {
    async function fetchGas() {
      await subscribeEtheriumgonGas();
      await subscribePolygonGas();
      await subscribeArbitrumGas();
    }

    fetchGas();
  }, []);

  return (
    <div>
      <PriceBox />
    </div>
  );
}

export default GasChart;
