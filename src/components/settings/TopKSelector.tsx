import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useChatManager } from "../store/useEditorManager";

export function TopKSelector() {
  const { setTopK, topK } = useChatManager();
  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Top-k (Sampling Control)</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {topK}
              </span>
            </div>
            <Slider
              id="temperature"
              max={50}
              value={[topK]}
              step={1}
              onValueChange={(value) => setTopK(value[0])}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Top-k is a sampling technique that limits the model's choices when
          generating text. It specifies the number of most likely words to
          consider for each step in the generation process.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
