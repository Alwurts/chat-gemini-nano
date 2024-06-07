import { Textarea } from "../ui/textarea";

interface MessageProps {
  speaker: "system" | "user" | "assistant";
  children: string;
  readonly: boolean;
}

export function Message({ children, speaker, readonly }: MessageProps) {
  return (
    <div className="flex flex-col rounded-lg p-4 border border-stone-200 bg-white">
      <h4>{speaker}</h4>
      <Textarea readOnly={readonly}>{children}</Textarea>
    </div>
  );
}
