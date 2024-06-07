import { useEffect, useState } from "react";

export function useCheckAi() {
  const [valid, setValid] = useState(false);
  useEffect(() => {
    // @ts-expect-error - AI is not defined
    if (!window.ai) return;
    // @ts-expect-error - AI is not defined
    const canCreate = window.ai.canCreateTextSession();
    if (canCreate !== "no") {
      setValid(true);
    }
  }, []);

  return valid;
}
