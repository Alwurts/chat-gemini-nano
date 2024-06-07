export type TFrom = "system" | "user" | "assistant";

export type TMessage = {
  id: string;
  from: TFrom;
  content: string;
};

export type TConversation = {
  id: string;
  title: string;
  messages: TMessage[];
}
