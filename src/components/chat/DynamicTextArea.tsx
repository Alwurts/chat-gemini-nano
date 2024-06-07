import React, { useState, useEffect } from "react";
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
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const lineCount = value.split("\n").length;
    setRows(Math.max(1, lineCount));
  }, [value]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const lineCount = value.split("\n").length;
    setRows(Math.max(1, lineCount));
    onChange(e);
  };

  return (
    <Textarea
      rows={rows}
      value={value}
      onChange={handleTextareaChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className={cn("resize-none", className)}
    />
  );
};
