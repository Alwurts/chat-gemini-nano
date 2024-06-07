import { TConversation, TMessage } from "@/types/message";
import { create } from "zustand";
import { nanoid } from "nanoid";

type ChatManagerState = {
  conversation: TConversation;
  setConversation: (conversation: TConversation) => void;
  addMessage: (message: Omit<TMessage, "id">, afterIndex?: number) => TMessage;
  updateMessageByIndex: (
    index: number,
    message: Partial<Omit<TMessage, "id">>
  ) => void;
  updateMessageById: (
    id: string,
    message: Partial<Omit<TMessage, "id">>
  ) => void;
  removeMessage: (index: number) => void;
  moveMessageUp: (index: number) => void;
  moveMessageDown: (index: number) => void;
  runConversation: () => Promise<void>;
};

export const useChatManager = create<ChatManagerState>((set, get) => ({
  conversation: {
    id: nanoid(),
    title: "",
    messages: [
      {
        id: nanoid(),
        from: "user",
        content: "Make a poem about clouds",
      },
    ],
  },
  setConversation: (conversation) => set({ conversation }),
  runConversation: async () => {
    const prompt =
      get().conversation.messages.reduce((acc, message) => {
        return acc + `${message.from}: ${message.content}` + "\n";
      }, "") + "assistant: ";

    console.log(prompt);
    // @ts-expect-error - AI is not defined
    if (!window.ai) return;
    // @ts-expect-error - AI is not defined
    const canCreate = await window.ai.canCreateTextSession();

    if (canCreate !== "no") {
      // @ts-expect-error - AI is not defined
      const session = await window.ai.createTextSession({
        topK: 20,
        temperature: 0.7,
      });

      const newMessage = get().addMessage({ from: "assistant", content: "" });

      const stream = session.promptStreaming(prompt);
      for await (const chunk of stream) {
        get().updateMessageById(newMessage.id, {
          content: chunk,
        });
      }

      session.destroy();
    }
  },
  addMessage: (message, afterIndex) => {
    const newMessage: TMessage = { ...message, id: nanoid() };
    set((state) => {
      if (afterIndex === undefined) {
        return {
          conversation: {
            ...state.conversation,
            messages: [...state.conversation.messages, newMessage],
          },
        };
      }

      return {
        conversation: {
          ...state.conversation,
          messages: [
            ...state.conversation.messages.slice(0, afterIndex + 1),
            newMessage,
            ...state.conversation.messages.slice(afterIndex + 1),
          ],
        },
      };
    });
    return newMessage;
  },
  updateMessageByIndex: (index, message) =>
    set((state) => {
      const newMessages = [...state.conversation.messages];
      newMessages[index] = {
        ...newMessages[index],
        ...message,
      };
      return { conversation: { ...state.conversation, messages: newMessages } };
    }),
  updateMessageById: (id, message) => {
    const messageIndex = get().conversation.messages.findIndex(
      (m) => m.id === id
    );
    if (messageIndex === -1) return {};
    get().updateMessageByIndex(messageIndex, message);
  },
  removeMessage: (index) =>
    set((state) => ({
      conversation: {
        ...state.conversation,
        messages: state.conversation.messages.filter((_, i) => i !== index),
      },
    })),
  moveMessageUp: (index) =>
    set((state) => {
      if (index <= 0) return state;
      const newMessages = [...state.conversation.messages];
      [newMessages[index - 1], newMessages[index]] = [
        newMessages[index],
        newMessages[index - 1],
      ];
      return { conversation: { ...state.conversation, messages: newMessages } };
    }),
  moveMessageDown: (index) =>
    set((state) => {
      if (index >= state.conversation.messages.length - 1) return state;
      const newMessages = [...state.conversation.messages];
      [newMessages[index + 1], newMessages[index]] = [
        newMessages[index],
        newMessages[index + 1],
      ];
      return { conversation: { ...state.conversation, messages: newMessages } };
    }),
}));
