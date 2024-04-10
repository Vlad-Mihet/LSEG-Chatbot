import { useEffect, useState } from "react";
import { welcomeMessage } from "@/constants";
import { getExchange, getMessage, getStock } from "@/utils";

import type { Context, Message, PanelAction } from "@/types";

const initialMessages = [
  {
    content: welcomeMessage,
    timestamp: Date.now(),
    isMe: false,
  },
];

const handleError = (error: Error) => {
  // Could push to pipeline or log to error tracking service
  console.error("useConversation -> error", error);
  window.alert("An error occurred. Please try again.");
};

const useConversation = () => {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState(true);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [context, setContext] = useState<Context>({});

  const handlePanelAction = (action: PanelAction, localContext?: Context) => {
    setContext(localContext);

    if (action === "reset") {
      setStep(0);
      setMessages(initialMessages);
    }

    if (action === "go_back") {
      setStep(0);
      setMessages((prev) => prev.slice(0, -3));
    }

    if (action === "pick_exchange") {
      setStep((prev) => prev + 1);

      const exchange = getExchange(localContext.exchange);

      if (!exchange) {
        handleError(new Error("Invalid Exchange. Please try again."));
      }

      setMessages((prev) => [
        ...prev.map((message) => {
          // Invalidate the actions for the exchange choice message
          if (message.action === "exchange") {
            return {
              ...message,
              panel: message.panel?.map((item) => ({
                ...item,
                disabled: true,
              })),
            };
          }

          return message;
        }),
        {
          content: exchange.stockExchange,
          timestamp: Date.now(),
          isMe: true,
        },
      ]);
    }

    if (action === "pick_stock") {
      setStep((prev) => prev + 1);

      const stock = getStock(localContext.exchange, localContext.stock);

      if (!stock) {
        handleError(new Error("Invalid Stock. Please try again."));
      }

      setMessages((prev) => [
        ...prev.map((message) => {
          // Invalidate the actions for the exchange choice message
          if (message.action === "stock") {
            return {
              ...message,
              panel: message.panel?.map((item) => ({
                ...item,
                disabled: true,
              })),
            };
          }

          return message;
        }),
        {
          content: stock.stockName,
          timestamp: Date.now(),
          isMe: true,
        },
      ]);
    }
  };

  useEffect(() => {
    if (!userInput) return;

    const message = getMessage(step, context, handlePanelAction);

    if (message) {
      setMessages((prev) => [...prev, message]);
    }

    setUserInput(false);
  }, [context?.exchange, context?.stock, messages, step, userInput]);

  return { messages, setUserInput };
};

export default useConversation;
