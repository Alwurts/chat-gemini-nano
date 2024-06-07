import { useChatManager } from "./components/store/useEditorManager";
import { Button, buttonVariants } from "./components/ui/button";
import { useCheckAi } from "./hooks/useCheckAi";
import { Conversation } from "./components/chat/Conversation";
import { TemperatureSelector } from "./components/settings/TemperatureSelector";
import { TopKSelector } from "./components/settings/TopKSelector";

export function App() {
  const validAiDevice = useCheckAi();

  const { runConversation } = useChatManager();

  if (!validAiDevice) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <h2 className="text-2xl">
          Your browser does not seem to support using Gemini Nano API
        </h2>
        <a
          href="https://github.com/Alwurts/chat-gemini-nano"
          className={buttonVariants()}
        >
          Go to project repository
        </a>
      </div>
    );
  }

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
        </div>
      </header>
      <main className="grid flex-1 overflow-auto md:grid-cols-2 lg:grid-cols-3">
        <div className="relative hidden flex-col items-start gap-8 p-4 md:flex border-r">
          <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <TemperatureSelector />
              <TopKSelector />
            </fieldset>
          </form>
        </div>
        <Conversation />
      </main>
    </div>
  );
}
