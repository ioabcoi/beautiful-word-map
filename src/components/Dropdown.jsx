import { useState, useEffect, useRef } from "react";
import { Ico } from "./Icons";

const Dropdown = ({ label, options, value, onChange, onExtra }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const cur    = options.find(o => o.value === value);
  const active = !!value;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 15px", background: active ? "var(--bark)" : "transparent", border: `1px solid ${active ? "var(--bark)" : "var(--sand)"}`, borderRadius: "2px", color: active ? "var(--cream)" : "var(--umber)", fontSize: "13px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
      >
        {cur ? `${cur.emoji || ""} ${cur.label}` : label}
        <Ico.Chevron open={open} />
      </button>

      {open && (
        <div className="fade-in" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: "var(--parchment)", border: "1px solid var(--sand)", borderRadius: "2px", minWidth: "200px", zIndex: 200, boxShadow: "4px 8px 24px rgba(61,43,31,0.12)" }}>
          <div
            onClick={() => { onChange(""); setOpen(false); }}
            style={{ padding: "10px 16px", fontSize: "12.5px", color: "var(--caramel)", cursor: "pointer", borderBottom: "1px solid var(--sand)", fontStyle: "italic" }}
          >
            전체 보기
          </div>
          {options.map(o => (
            <div
              key={o.value}
              onClick={() => { onChange(o.value); setOpen(false); }}
              style={{ padding: "10px 16px", fontSize: "13px", color: o.value === value ? "var(--bark)" : "var(--umber)", background: o.value === value ? "rgba(184,155,114,0.15)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.15s" }}
              onMouseEnter={e => { if (o.value !== value) e.currentTarget.style.background = "rgba(184,155,114,0.08)"; }}
              onMouseLeave={e => { if (o.value !== value) e.currentTarget.style.background = "transparent"; }}
            >
              {o.emoji && <span>{o.emoji}</span>} {o.label}
            </div>
          ))}
          {onExtra && (
            <div
              onClick={() => { onExtra(); setOpen(false); }}
              style={{ padding: "9px 16px", fontSize: "11.5px", color: "var(--caramel)", cursor: "pointer", borderTop: "1px solid var(--sand)", fontStyle: "italic" }}
            >
              + 테마 관리
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;