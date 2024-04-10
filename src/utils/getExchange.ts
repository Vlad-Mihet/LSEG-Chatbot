import data from "@/data.json";

export const getExchange = (exchangeCode: string) => {
  try {
    const exchange = data.find((exchange) => exchange.code === exchangeCode);
    return exchange;
  } catch (error) {
    console.error("getExchange -> error", error);
    return null;
  }
};
