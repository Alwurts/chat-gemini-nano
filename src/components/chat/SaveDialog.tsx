import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { addConversation } from "@/database/chat";
import { useChatManager } from "../store/useEditorManager";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const saveSchema = z.object({
  title: z.string().min(2).max(200),
});

export function SaveDialog() {
  const { conversation } = useChatManager();

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const saveChat = useMutation({
    mutationFn: addConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-conversations"] });
    },
  });

  const form = useForm<z.infer<typeof saveSchema>>({
    resolver: zodResolver(saveSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof saveSchema>) {
    console.log(values);
    await saveChat.mutateAsync({
      ...conversation,
      title: values.title,
    });
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">Save as new</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save conversation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Conversation X" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-2">
              <Button type="submit" variant="default">
                Save
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
