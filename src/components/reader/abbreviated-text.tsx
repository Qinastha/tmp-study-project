"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

import {
  type AbbreviationDefinition,
  splitTextByAbbreviations,
} from "../../lib/content/abbreviations";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const HOVER_CLOSE_DELAY_MS = 650;

export function AbbreviatedText({
  text,
  abbreviations,
}: {
  text: string;
  abbreviations: AbbreviationDefinition[];
}) {
  return (
    <>
      {splitTextByAbbreviations(text, abbreviations).map((part, index) => {
        if (part.type === "text") {
          return part.text;
        }

        return (
          <AbbreviationPopover
            key={`${part.text}-${index}`}
            term={part.text}
            definition={part.definition.definition}
          />
        );
      })}
    </>
  );
}

function AbbreviationPopover({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickOpenedRef = useRef(false);
  const pointerInsideRef = useRef(false);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openPopover() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      if (pointerInsideRef.current) {
        return;
      }
      clickOpenedRef.current = false;
      setOpen(false);
    }, HOVER_CLOSE_DELAY_MS);
  }

  function handlePointerEnter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" || event.pointerType === "pen") {
      pointerInsideRef.current = true;
      openPopover();
    }
  }

  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" || event.pointerType === "pen") {
      pointerInsideRef.current = false;
      scheduleClose();
    }
  }

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        clearCloseTimer();
        if (!nextOpen) {
          clickOpenedRef.current = false;
        }
        setOpen(nextOpen);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          data-abbreviation-term={term}
          data-abbreviation-popover-trigger
          aria-label={term}
          className="mx-0.5 rounded-sm border-b border-dotted border-primary/70 bg-primary/5 px-0.5 font-medium text-primary underline-offset-2 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onFocus={openPopover}
          onBlur={() => {
            if (!clickOpenedRef.current) {
              scheduleClose();
            }
          }}
          onClick={(event) => {
            event.preventDefault();
            clickOpenedRef.current = true;
            openPopover();
          }}
        >
          {term}
        </button>
      </PopoverTrigger>
      <PopoverContent
        data-abbreviation-popover-content
        side="top"
        align="center"
        className="space-y-1.5"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{term}</div>
        <p className="text-sm leading-5 text-popover-foreground">{definition}</p>
      </PopoverContent>
    </Popover>
  );
}
