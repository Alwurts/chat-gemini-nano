import { TMessage } from "@/types/message";
import { create } from "zustand";
import { nanoid } from "nanoid";

type EditorManagerState = {
  messages: TMessage[];
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

export const useEditorManager = create<EditorManagerState>((set, get) => ({
  messages: [
    {
      id: nanoid(),
      from: "user",
      content: "Make a poem about clouds",
    },
  ],
  runConversation: async () => {
    const prompt =
      get().messages.reduce((acc, message) => {
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
        topK: 1,
        temperature: 0.1,
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
        return { messages: [...state.messages, newMessage] };
      }

      return {
        messages: [
          ...state.messages.slice(0, afterIndex + 1),
          newMessage,
          ...state.messages.slice(afterIndex + 1),
        ],
      };
    });
    return newMessage;
  },
  updateMessageByIndex: (index, message) =>
    set((state) => {
      const newMessages = [...state.messages];
      newMessages[index] = {
        ...newMessages[index],
        ...message,
      };
      return { messages: newMessages };
    }),
  updateMessageById: (id, message) => {
    const messageIndex = get().messages.findIndex((m) => m.id === id);
    if (messageIndex === -1) return {};
    get().updateMessageByIndex(messageIndex, message);
  },
  removeMessage: (index) =>
    set((state) => ({
      messages: state.messages.filter((_, i) => i !== index),
    })),
  moveMessageUp: (index) =>
    set((state) => {
      if (index <= 0) return state;
      const newMessages = [...state.messages];
      [newMessages[index - 1], newMessages[index]] = [
        newMessages[index],
        newMessages[index - 1],
      ];
      return { messages: newMessages };
    }),
  moveMessageDown: (index) =>
    set((state) => {
      if (index >= state.messages.length - 1) return state;
      const newMessages = [...state.messages];
      [newMessages[index + 1], newMessages[index]] = [
        newMessages[index],
        newMessages[index + 1],
      ];
      return { messages: newMessages };
    }),
}));
