import data from "@/data.json";
import { StockData } from "@/types";

export const getStock = (
  exchangeCode: string,
  code: string
): StockData | null => {
  try {
    const exchange = data.find((exchange) => exchange.code === exchangeCode);

    if (!exchange) {
      return null;
    }

    const stock = exchange.topStocks.find((stock) => stock.code === code);

    if (!stock) {
      return null;
    }

    return stock;
  } catch (error) {
    console.error("getStockData -> error", error);
    return null;
  }
};
