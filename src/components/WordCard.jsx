import { themeColor } from "../constants/flagMap";

const WordCard = ({ word, theme, onClick, index }) => {
  const color = themeColor(word.themeId);

  return (
    <div
      className="fade-up"
      style={{ animationDelay: `${Math.min(index * 0.055, 0.5)}s`, background: "rgba(237,229,208,0.5)", border: "1px solid var(--sand)", borderRadius: "2px", padding: "26px 26px 20px", cursor: "pointer", transition: "box-shadow 0.25s, transform 0.22s, background 0.22s", position: "relative", backdropFilter: "blur(4px)" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "3px 5px 22px rgba(61,43,31,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(237,229,208,0.82)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(237,229,208,0.5)"; }}
      onClick={onClick}
    >
      {/* top accent */}
      <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: "1px", background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

      {/* language */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
        <span style={{ fontSize: "17px" }}>{word.flag}</span>
        <span style={{ fontSize: "10.5px", letterSpacing: "0.16em", color: "var(--caramel)", fontFamily: "'Lora', serif", textTransform: "uppercase" }}>{word.language}</span>
      </div>

      {/* word */}
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4.5vw, 36px)", fontWeight: 300, color: "var(--bark)", lineHeight: 1.1, marginBottom: "5px", letterSpacing: "-0.01em" }}>
        {word.word}
      </div>

      {/* pronunciation */}
      <div style={{ fontSize: "12.5px", color: "var(--caramel)", fontStyle: "italic", letterSpacing: "0.05em", marginBottom: "14px" }}>
        {word.pronunciation}
      </div>

      {/* meaning */}
      <div style={{ fontSize: "13.5px", lineHeight: 1.75, color: "var(--umber)" }}>
        {word.meaning}
      </div>

      {/* theme tag */}
      {theme && (
        <div style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 10px", borderRadius: "99px", border: `1px solid ${color}50`, background: `${color}16`, fontSize: "10.5px", color, letterSpacing: "0.05em" }}>
          {theme.emoji} {theme.name}
        </div>
      )}
    </div>
  );
};

export default WordCard;