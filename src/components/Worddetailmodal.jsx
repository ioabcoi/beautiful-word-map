import { Ico } from "./Icons";
import { themeColor } from "../constants/flagMap";

const WordDetailModal = ({ word, theme, onEdit, onDelete, onClose }) => {
  const color = themeColor(word.themeId);

  // example이 문자열이든 배열이든 배열로 통일
  const examples = word.example
    ? Array.isArray(word.example) ? word.example : [word.example]
    : [];

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(30,18,8,0.48)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={onClose}
    >
      <div
        className="fade-up"
        style={{ width: "100%", maxWidth: "480px", background: "var(--parchment)", borderRadius: "4px", padding: "36px 32px 32px", position: "relative", boxShadow: "0 12px 48px rgba(30,18,8,0.2)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* top accent */}
        <div style={{ position: "absolute", top: 0, left: 32, right: 32, height: "1px", background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />

        {/* 닫기 */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "var(--sand)", padding: "4px", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--umber)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--sand)"}
        >
          <Ico.Close />
        </button>

        {/* language */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "20px" }}>
          <span style={{ fontSize: "20px" }}>{word.flag}</span>
          <span style={{ fontSize: "10.5px", letterSpacing: "0.18em", color: "var(--caramel)", fontFamily: "'Lora', serif", textTransform: "uppercase" }}>{word.language}</span>
        </div>

        {/* word */}
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 52px)", fontWeight: 300, color: "var(--bark)", lineHeight: 1.05, marginBottom: "6px", letterSpacing: "-0.01em" }}>
          {word.word}
        </div>

        {/* pronunciation */}
        <div style={{ fontSize: "14px", color: "var(--caramel)", fontStyle: "italic", letterSpacing: "0.06em", marginBottom: "24px" }}>
          {word.pronunciation}
        </div>

        {/* divider */}
        <div style={{ height: "1px", background: `linear-gradient(90deg, ${color}50, transparent)`, marginBottom: "20px" }} />

        {/* meaning */}
        <div style={{ fontSize: "14.5px", lineHeight: 1.85, color: "var(--umber)", marginBottom: "20px" }}>
          {word.meaning}
        </div>

        {/* examples */}
        {examples.length > 0 && (
          <div style={{ marginBottom: "24px", paddingLeft: "14px", borderLeft: `2px solid ${color}60`, display: "flex", flexDirection: "column", gap: "8px" }}>
            {examples.map((ex, i) => (
              <p key={i} style={{ fontSize: "13px", fontStyle: "italic", color: "var(--umber)", lineHeight: 1.85 }}>
                '{ex}'
              </p>
            ))}
          </div>
        )}

        {/* theme tag */}
        {theme && (
          <div style={{ marginBottom: "28px", display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "99px", border: `1px solid ${color}50`, background: `${color}16`, fontSize: "11px", color, letterSpacing: "0.05em" }}>
            {theme.emoji} {theme.name}
          </div>
        )}

        {/* actions */}
        <div style={{ display: "flex", gap: "8px", paddingTop: "20px", borderTop: "1px dashed var(--sand)" }}>
          <button
            onClick={() => { onEdit(word); onClose(); }}
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 16px", fontSize: "12.5px", background: "transparent", border: "1px solid var(--sand)", borderRadius: "2px", color: "var(--umber)", cursor: "pointer", transition: "all 0.18s", fontFamily: "'Noto Serif KR', serif" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--sand)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Ico.Edit /> 수정
          </button>
          <button
            onClick={() => { onDelete(word.id); onClose(); }}
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 16px", fontSize: "12.5px", background: "transparent", border: "1px solid #C4856A44", borderRadius: "2px", color: "var(--rose)", cursor: "pointer", transition: "all 0.18s", fontFamily: "'Noto Serif KR', serif" }}
            onMouseEnter={e => e.currentTarget.style.background = "#C4856A18"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Ico.Trash /> 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordDetailModal;