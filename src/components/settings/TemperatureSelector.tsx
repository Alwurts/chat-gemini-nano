import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useChatManager } from "../store/useEditorManager";

export function TemperatureSelector() {
  const { setConversationTemperature, conversationTemperature } =
    useChatManager();
  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">
                Temperature (Creativity Control)
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {conversationTemperature}
              </span>
            </div>
            <Slider
              id="temperature"
              max={1}
              value={[conversationTemperature]}
              step={0.1}
              onValueChange={(value) => setConversationTemperature(value[0])}
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
          Temperature is a hyperparameter that adjusts the randomness or
          creativity of the model's output. It influences how the model selects
          the next word in a sentence.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
