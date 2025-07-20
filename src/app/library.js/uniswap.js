export async function getEthUsdPrice() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const data = await res.json();

  return data.ethereum.usd;
}

export async function getPolyUsdPrice() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
  );
  const data = await res.json();
  return data["matic-network"].usd; // Notice the key
}

export async function getArbUsdPrice() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=arbitrum&vs_currencies=usd"
    );
    const data = await res.json();

    if (!data.arbitrum || data.arbitrum.usd === undefined) {
      throw new Error("CoinGecko API response format changed");
    }

    return data.arbitrum.usd;
  } catch (error) {
    console.error("Failed to fetch ARB price from CoinGecko:", error);
    return 0; // Fallback value (or fetch from another API)
  }
}
