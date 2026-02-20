import { useState } from "react";
import { Ico } from "./Icons";

const ThemeManager = ({ themes, onSave, onClose }) => {
  const [list, setList] = useState(themes);
  const [n, setN] = useState({ emoji: "", name: "", description: "" });

  const iStyle = { width: "100%", padding: "8px 12px", fontSize: "13px", background: "rgba(245,240,232,0.85)", border: "1px solid var(--sand)", borderRadius: "2px", color: "var(--bark)", outline: "none" };

  const handleAdd = () => {
    if (!n.name.trim()) return;
    setList(l => [...l, { id: `t_${Date.now()}`, ...n }]);
    setN({ emoji: "", name: "", description: "" });
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(30,18,8,0.48)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={onClose}
    >
      <div
        style={{ width: "100%", maxWidth: "460px", background: "var(--parchment)", borderRadius: "4px", padding: "30px", animation: "fadeUp 0.3s ease both", maxHeight: "80vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "var(--bark)" }}>테마 관리</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--caramel)" }}><Ico.Close /></button>
        </div>

        {/* 기존 테마 목록 */}
        <div style={{ display: "grid", gap: "8px", marginBottom: "22px" }}>
          {list.map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 13px", background: "rgba(245,240,232,0.6)", border: "1px solid var(--sand)", borderRadius: "2px" }}>
              <span style={{ fontSize: "17px" }}>{t.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", color: "var(--bark)", fontWeight: 500 }}>{t.name}</div>
                {t.description && <div style={{ fontSize: "11px", color: "var(--caramel)", marginTop: "2px" }}>{t.description}</div>}
              </div>
              <button
                onClick={() => setList(l => l.filter(x => x.id !== t.id))}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sand)", padding: "3px", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--rose)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--sand)"}
              >
                <Ico.Trash />
              </button>
            </div>
          ))}
        </div>

        {/* 새 테마 추가 */}
        <div style={{ paddingTop: "18px", borderTop: "1px dashed var(--sand)" }}>
          <p style={{ fontSize: "10.5px", letterSpacing: "0.14em", color: "var(--caramel)", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Lora', serif" }}>새 테마 추가</p>
          <div style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "8px", marginBottom: "8px" }}>
            <input value={n.emoji} onChange={e => setN(f => ({ ...f, emoji: e.target.value }))} placeholder="✨" style={{ ...iStyle, textAlign: "center", fontSize: "18px" }} />
            <input value={n.name}  onChange={e => setN(f => ({ ...f, name: e.target.value }))}  placeholder="테마 이름" style={iStyle} />
          </div>
          <input value={n.description} onChange={e => setN(f => ({ ...f, description: e.target.value }))} placeholder="테마 설명 (선택)" style={{ ...iStyle, marginBottom: "10px" }} />
          <button
            onClick={handleAdd}
            style={{ width: "100%", padding: "9px", background: "var(--caramel)", color: "var(--cream)", border: "none", borderRadius: "2px", fontSize: "13px", cursor: "pointer", fontFamily: "'Lora', serif", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--umber)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--caramel)"}
          >
            추가
          </button>
        </div>

        {/* 저장 */}
        <button
          onClick={() => { onSave(list); onClose(); }}
          style={{ marginTop: "14px", width: "100%", padding: "11px", background: "var(--bark)", color: "var(--cream)", border: "none", borderRadius: "2px", fontSize: "14px", cursor: "pointer", fontFamily: "'Lora', serif", transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--umber)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--bark)"}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ThemeManager;