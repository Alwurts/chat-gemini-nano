import React, { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface DynamicTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
}

export const DynamicTextarea: React.FC<DynamicTextareaProps> = ({
  value,
  onChange,
  readOnly = false,
  placeholder,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scroll height
    }
  }, [value]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scroll height
    }
    onChange(e);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleTextareaChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className={cn("resize-none", className)}
      style={{ overflow: "hidden" }} // Ensure no scrollbars
    />
  );
};
