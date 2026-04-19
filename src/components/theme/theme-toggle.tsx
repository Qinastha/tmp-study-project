"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const Icon = theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function chooseTheme(nextTheme: "light" | "dark" | "system") {
    setTheme(nextTheme);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <Button
        variant="outline"
        size="icon"
        aria-label="Переключить тему"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Тема"
        onClick={() => setOpen((value) => !value)}
      >
        <Icon className="size-4" />
      </Button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-10 z-50 w-36 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10"
        >
          <ThemeItem active={theme === "light"} icon={Sun} label="Светлая" onClick={() => chooseTheme("light")} />
          <ThemeItem active={theme === "dark"} icon={Moon} label="Темная" onClick={() => chooseTheme("dark")} />
          <ThemeItem
            active={theme === "system" || !theme}
            icon={Monitor}
            label="Системная"
            onClick={() => chooseTheme("system")}
          />
        </div>
      ) : null}
    </div>
  );
}

function ThemeItem({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof Sun;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
      )}
      onClick={onClick}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}
