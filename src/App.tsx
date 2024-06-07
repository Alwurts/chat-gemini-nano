import { Message } from "@/components/chat/Message";
import { useChatManager } from "./components/store/useEditorManager";
import { Button } from "./components/ui/button";
import { SaveDialog } from "./components/chat/SaveDialog";
import { Separator } from "./components/ui/separator";
import { SelectSavedChats } from "./components/chat/SelectSavedChats";

export function App() {
  const { conversation, runConversation } = useChatManager();

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="sticky top-0 z-10 flex py-3 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Gemini Nano Chat Playground</h1>
        <div className="ml-auto space-x-2 flex h-full">
          <Button
            size="sm"
            onClick={() => {
              runConversation();
            }}
          >
            Run
          </Button>
          <Separator orientation="vertical" />

          <SelectSavedChats />
          <SaveDialog />
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              runConversation();
            }}
          >
            New chat
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-3 overflow-auto p-4">
        {conversation.messages.map((message, index) => {
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
