import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TFrom, TMessage } from "@/types/message";
import { useChatManager } from "../store/useEditorManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicTextarea } from "@/components/chat/DynamicTextArea";
import { Skeleton } from "../ui/skeleton";

interface MessageProps {
  conversationIndex: number;
  message: TMessage;
  readonly?: boolean;
}

export function Message({
  message,
  readonly,
  conversationIndex,
}: MessageProps) {
  const {
    conversation: { messages },
    moveMessageUp,
    moveMessageDown,
    addMessage,
    updateMessageByIndex,
    removeMessage,
    loadingUUID: loadingUuid,
  } = useChatManager();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border pt-2 bg-primary-light focus-within:ring-1 focus-within:ring-accent-primary"
      )}
    >
      <div className="flex items-center justify-between h-6 px-3">
        <Select
          value={message.from}
          onValueChange={(value) => {
            updateMessageByIndex(conversationIndex, { from: value as TFrom });
          }}
        >
          <SelectTrigger disabled={!!loadingUuid} className="w-fit h-full py-1 px-1 border-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="assistant">Assistant</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>

        {!loadingUuid && (
          <div className="flex items-center h-auto peer-focus-visible:bg-red-100">
            {conversationIndex < messages.length - 1 && (
              <Button
                title="Move message down"
                variant="ghost"
                className="h-full w-auto px-1 py-auto"
                onClick={() => moveMessageDown(conversationIndex)}
              >
                <ArrowDownCircleIcon className="size-4" />
              </Button>
            )}
            {conversationIndex > 0 && (
              <Button
                title="Move message up"
                variant="ghost"
                className="h-full w-auto px-1 py-auto"
                onClick={() => moveMessageUp(conversationIndex)}
              >
                <ArrowUpCircleIcon className="size-4" />
              </Button>
            )}

            <Button
              title="Remove message"
              variant="ghost"
              className="h-full w-auto px-1 py-auto"
              onClick={() => removeMessage(conversationIndex)}
            >
              <MinusCircleIcon className="size-4" />
            </Button>

            <Button
              title="Add message below"
              variant="ghost"
              className="h-full w-auto px-1 py-auto"
              onClick={() =>
                addMessage({ from: "user", content: "Test" }, conversationIndex)
              }
            >
              <PlusCircleIcon className="size-4" />
            </Button>
          </div>
        )}
      </div>
      {loadingUuid === message.id && message.content.length === 0 ? (
        <div className="p-3">
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <DynamicTextarea
          value={message.content}
          onChange={(e) => {
            updateMessageByIndex(conversationIndex, {
              content: e.target.value,
            });
          }}
          readOnly={loadingUuid ? true : readonly}
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
      )}
    </div>
  );
}
