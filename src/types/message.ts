export type TFrom = "system" | "user" | "assistant";

export type TMessage = {
  id: string;
  from: TFrom;
  content: string;
};
