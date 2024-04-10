import data from "@/data.json";
import { stockExchangeMessage, stockMessage } from "@/constants";

import type { Context, Message, PanelAction } from "@/types";

export const getMessage = (
  step: number,
  context: Context,
  handlePanelAction: (action: PanelAction, context?: Context) => void
): Message => {
  if (step === 0) {
    const exchanges = data.map((exchange) => exchange);

    return {
      content: stockExchangeMessage,
      timestamp: Date.now(),
      isMe: false,
      action: "exchange",
      panel: [
        ...exchanges.map((exchange) => {
          const localContext = {
            exchange: exchange.code,
          };

          return {
            title: exchange.stockExchange,
            action: () => {
              handlePanelAction("pick_exchange", localContext);
            },
            actionType: "pick_exchange",
          };
        }),
        {
          title: "Main Menu",
          action: () => {
            handlePanelAction("reset");
          },
          actionType: "reset" as any,
        },
      ],
    };
  }

  if (step === 1) {
    const exchange = data.find(
      (exchange) => exchange.code === context.exchange
    );

    if (!exchange) {
      return {
        content: "Invalid Stock Exchange",
        timestamp: Date.now(),
        isMe: false,
      };
    }

    return {
      content: stockMessage,
      timestamp: Date.now(),
      isMe: false,
      action: "stock",
      panel: [
        ...exchange.topStocks.map((stock) => {
          const localContext = {
            exchange: context.exchange,
            stock: stock.code,
          };

          return {
            title: stock.stockName,
            action: () => {
              handlePanelAction("pick_stock", localContext);
            },
            actionType: "pick_stock",
          };
        }),
        {
          title: "Main Menu",
          action: () => {
            handlePanelAction("reset");
          },
          actionType: "reset" as any,
        },
      ],
    };
  }

  const exchange = data.find((exchange) => exchange.code === context.exchange);

  if (!exchange) {
    return {
      content: "Invalid Stock Exchange",
      timestamp: Date.now(),
      isMe: false,
    };
  }

  const stock = exchange.topStocks.find(
    (stock) => stock.code === context.stock
  );

  if (!stock) {
    return {
      content: "Invalid Stock",
      timestamp: Date.now(),
      isMe: false,
    };
  }

  const localContext = {
    exchange: context.exchange,
  };

  return {
    content: `The price of ${stock.stockName} is $${stock.price}`,
    timestamp: Date.now(),
    isMe: false,
    panel: [
      {
        title: "Back",
        action: () => {
          handlePanelAction("go_back", localContext);
        },
        actionType: "go_back",
      },
      ...exchange.topStocks.map((stock) => {
        const localContext = {
          exchange: context.exchange,
          stock: stock.code,
        };

        return {
          title: stock.stockName,
          action: () => {
            handlePanelAction("pick_stock", localContext);
          },
          actionType: "pick_stock" as any,
        };
      }),
      {
        title: "Main Menu",
        action: () => {
          handlePanelAction("reset");
        },
        actionType: "reset",
      },
    ],
  };
};
