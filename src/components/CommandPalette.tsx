import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { smoother, NAV_SECTIONS } from "./Navbar";
import { certificates } from "./Certificates";
import "./styles/CommandPalette.css";

interface PaletteItem {
  key: string;
  label: string;
  meta: string;
  kind: "section" | "record" | "link";
  run: () => void;
}

// GitHub taken from the repo's own git remote; LinkedIn/Instagram from the
// owner's previous portfolio. Verified reachable.
const LINKS: { label: string; meta: string; href: string; external: boolean }[] = [
  {
    label: "GitHub",
    meta: "github.com/radityabhardana",
    href: "https://github.com/radityabhardana",
    external: true,
  },
  {
    label: "LinkedIn",
    meta: "linkedin.com/in/raditya-hardana-962373382",
    href: "https://www.linkedin.com/in/raditya-hardana-962373382/",
    external: true,
  },
  {
    label: "Email",
    meta: "raditya.hardana@gmail.com",
    href: "mailto:raditya.hardana@gmail.com",
    external: false,
  },
  { label: "Resume", meta: "Document", href: "#", external: false },
];

const scrollTo = (selector: string) => {
  if (smoother) {
    smoother.scrollTo(selector, true, "top top");
  } else {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  }
};

// Recreated only when the dialog opens/closes; the `run` closures are stable
// for the lifetime of the palette.
const buildItems = (): PaletteItem[] => [
  ...NAV_SECTIONS.map((section) => ({
    key: `section:${section.id}`,
    label: section.label,
    meta: "",
    kind: "section" as const,
    run: () => scrollTo(section.id),
  })),
  ...certificates.map((cert) => ({
    key: `record:${cert.id}`,
    label: cert.title,
    meta: `${cert.issuer} · ${cert.date}`,
    kind: "record" as const,
    run: () => scrollTo("#certificates"),
  })),
  ...LINKS.map((link) => ({
    key: `link:${link.label}`,
    label: link.label,
    meta: link.meta,
    kind: "link" as const,
    run: () => {
      if (link.href === "#") return; // repo placeholder value — nothing to open
      if (link.external) {
        window.open(link.href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = link.href;
      }
    },
  })),
];

const GROUP_ORDER: PaletteItem["kind"][] = ["section", "record", "link"];
const GROUP_LABEL: Record<PaletteItem["kind"], string> = {
  section: "Sections",
  record: "Records",
  link: "Links",
};

const CommandPalette = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const items = useMemo(buildItems, []);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (item: PaletteItem) =>
      `${item.label} ${item.meta}`.toLowerCase().includes(q);
    return GROUP_ORDER.map((kind) => ({
      kind,
      name: GROUP_LABEL[kind],
      items: items.filter((item) => item.kind === kind && matches(item)),
    })).filter((group) => group.items.length > 0);
  }, [items, query]);

  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  // On open: remember the trigger, pause smooth scroll, focus the input.
  // On close/unmount: resume scroll and restore focus to the trigger.
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    smoother?.paused(true);
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      smoother?.paused(false);
      restoreRef.current?.focus?.();
    };
  }, [open]);

  // Fresh query + selection each time the palette opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  // Clamp the selection whenever the filtered set changes.
  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(0, flat.length - 1)));
  }, [flat.length]);

  // Any new query starts the selection at the top.
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Keep the highlighted row in view.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const activate = (item: PaletteItem | undefined) => {
    if (!item) return;
    // Scroll must run while the smoother is live, so resume before activating.
    smoother?.paused(false);
    item.run();
    onClose();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (flat.length) setActive((current) => Math.min(current + 1, flat.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (flat.length) setActive((current) => Math.max(current - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(Math.max(0, flat.length - 1));
        break;
      case "Enter":
        event.preventDefault();
        activate(flat[active]);
        break;
      case "Escape":
        event.preventDefault();
        onClose();
        break;
      case "Tab":
        // only the input is focusable inside the dialog — keep focus on it
        event.preventDefault();
        inputRef.current?.focus();
        break;
      default:
        break;
    }
  };

  let flatIndex = -1;

  return createPortal(
    <div
      className="cmdk"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="cmdk-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="cmdk-input-row">
          <input
            ref={inputRef}
            className="cmdk-input"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-haspopup="listbox"
            aria-activedescendant={
              flat[active] ? `cmdk-item-${active}` : undefined
            }
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div
          className="cmdk-list"
          id="cmdk-list"
          role="listbox"
          aria-label="Command results"
          ref={listRef}
        >
          {flat.length === 0 ? (
            <p className="cmdk-empty">No matches for “{query}”</p>
          ) : (
            groups.map((group) => (
              <div
                className="cmdk-group"
                key={group.kind}
                role="group"
                aria-label={group.name}
              >
                <div className="cmdk-group-head" aria-hidden="true">
                  {group.name}
                </div>
                {group.items.map((item) => {
                  flatIndex += 1;
                  const index = flatIndex;
                  const selected = index === active;
                  return (
                    <div
                      key={item.key}
                      id={`cmdk-item-${index}`}
                      data-index={index}
                      data-active={selected}
                      className={`cmdk-option${selected ? " is-active" : ""}`}
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setActive(index)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        activate(item);
                      }}
                    >
                      <span className="cmdk-option-label">{item.label}</span>
                      {item.meta && (
                        <span className="cmdk-option-meta">{item.meta}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="cmdk-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CommandPalette;
