import { useChatManager } from "@/components/store/useEditorManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getConversations } from "../../database/chat";
import { useQuery } from "@tanstack/react-query";

export function SelectSavedChats() {
  const { setConversation } = useChatManager();

  const savedConversations = useQuery({
    queryKey: ["saved-conversations"],
    queryFn: getConversations,
  });

  return (
    <Select
      onValueChange={(value) => {
        const conversation = savedConversations.data?.find(
          (conversation) => conversation.id === value
        );
        if (!conversation) return;
        setConversation(conversation);
      }}
    >
      <SelectTrigger className="w-[180px] h-9">
        <SelectValue placeholder="See saved chats" />
      </SelectTrigger>
      <SelectContent>
        {savedConversations.data?.length ? (
          savedConversations.data.map((conversation) => (
            <SelectItem key={conversation.id} value={conversation.id}>
              {conversation.title}
            </SelectItem>
          ))
        ) : (
          <span className="p-1">No saved chats</span>
        )}
      </SelectContent>
    </Select>
  );
}
