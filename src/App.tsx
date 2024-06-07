import { Message } from "@/components/chat/Message";
import { useChatManager } from "./components/store/useEditorManager";
import { Button } from "./components/ui/button";
import { SaveDialog } from "./components/chat/SaveDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Separator } from "./components/ui/separator";

export function App() {
  const { conversation, runConversation } = useChatManager();

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="sticky top-0 z-10 flex py-3 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Chat Playground</h1>
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

          <Select>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="See saved chats" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectContent>
          </Select>
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
