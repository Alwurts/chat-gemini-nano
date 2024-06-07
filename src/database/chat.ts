import { TConversation } from "@/types/message";
import { db } from "@/database/db";

export async function addConversation(conversation: TConversation) {
  console.log("Adding conversation", conversation);
  await db.conversations.add(conversation);
}

export async function getConversations() {
  return await db.conversations.toArray();
}
