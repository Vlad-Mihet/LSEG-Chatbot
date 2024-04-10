export type PanelItem = {
  title: string;
  actionType: PanelAction;
  action: () => void;
  disabled?: boolean;
};

export type Message = {
  content: string;
  timestamp: number;
  isMe: boolean;
  action?: "exchange" | "stock";
  actionContext?: {
    exchange?: string;
    stock?: string;
  };
  panel?: PanelItem[];
};

export type StockData = {
  code: string;
  stockName: string;
  price: number;
};

export type Context = {
  exchange?: string;
  stock?: string;
};

export type PanelAction = "pick_exchange" | "pick_stock" | "reset" | "go_back";
