import { Message } from "@/components/chat/Message";
import { useEditorManager } from "./components/store/useEditorManager";
import { Button } from "./components/ui/button";

export function App() {
  const { messages, runConversation } = useEditorManager();

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="sticky top-0 z-10 flex h-[57px] items-center border-b px-6">
        <h1 className="text-xl font-semibold">Chat Playground</h1>
        <Button
          size="sm"
          className="ml-auto"
          onClick={() => {
            runConversation();
          }}
        >
          Run
        </Button>
      </header>
      <main className="flex-1 space-y-3 overflow-auto p-4">
        {messages.map((message, index) => {
          return (
            <Message
              key={message.id}
              conversationIndex={index}
              message={message}
            />
          );
        })}
      </main>
    </div>
  );
}
