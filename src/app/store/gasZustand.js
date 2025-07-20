import { create } from "zustand";

import { devtools } from "zustand/middleware";

const useGasStore = create(
  devtools(
    (set) => ({
      gasData: {
        ethereum: null,
        polygon: null,
        arbitrum: null,
      },
      setGasData: (chain, data) =>
        set((state) => ({
          gasData: {
            ...state.gasData,
            [chain]: data,
          },
        })),
    }),
    { name: "GasStore" }
  )
);

export default useGasStore;
