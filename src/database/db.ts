import { TConversation } from "@/types/message";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("ChatDatabase") as Dexie & {
  conversations: EntityTable<
    TConversation,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  conversations: "id, messages", // primary key "id" (for the runtime!)
});

export { db };
