import { Message } from "@/components/chat/Message";

export function App() {
  return (
    <div className="h-screen w-full flex flex-col">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4">
        <h1 className="text-xl font-semibold">Chat Gemini Nano</h1>
      </header>
      <main className="flex-1 gap-4 overflow-auto p-4">
        <Message readonly speaker="user">
          Lorem ipsum
        </Message>
      </main>
    </div>
  );
}
