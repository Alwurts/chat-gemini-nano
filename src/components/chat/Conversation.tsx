import { useChatManager } from "@/components/store/useEditorManager";
import { Message } from "@/components/chat/Message";

export function Conversation() {
  const { conversation } = useChatManager();

  return (
    <div className="flex-1 space-y-3 overflow-auto px-4 py-3 lg:col-span-2">
      <h2 className="font-semibold ml-2">Conversation</h2>
      {conversation.messages.map((message, index) => {
        return (
          <Message
            key={message.id}
            conversationIndex={index}
            message={message}
          />
        );
      })}
    </div>
  );
}
