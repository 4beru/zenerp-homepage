"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * Copia texto al portapapeles con feedback. Clipboard API primero y
 * fallback síncrono (execCommand) para navegadores/permisos viejos.
 * Devuelve `copied` (para swap de ícono) y resetea solo si nadie vuelve
 * a copiar dentro del lapso.
 */
export function useCopyText(resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(
    async (text: string, labels: { success: string; fail: string }) => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          ok = document.execCommand("copy");
          document.body.removeChild(ta);
        } catch {
          ok = false;
        }
      }

      if (ok) {
        setCopied(true);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(
          () => setCopied(false),
          resetAfterMs
        );
        toast({ title: labels.success });
      } else {
        toast({ title: labels.fail });
      }
    },
    [resetAfterMs, toast]
  );

  return { copied, copy };
}
