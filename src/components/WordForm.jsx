import { useState } from "react";
import { Ico } from "./Icons";
import { FLAG_MAP } from "../constants/flagMap";

const EMPTY = { language: "", flag: "", word: "", pronunciation: "", meaning: "", example: "", themeId: "" };

const WordForm = ({ initial, themes, onSave, onClose }) => {
  const [form, setForm] = useState(initial || EMPTY);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleLang = (l) => { set("language", l); set("flag", FLAG_MAP[l] || "🌐"); };

  const iStyle  = { width: "100%", padding: "9px 13px", fontSize: "13.5px", background: "rgba(245,240,232,0.85)", border: "1px solid var(--sand)", borderRadius: "2px", color: "var(--bark)", outline: "none", transition: "border-color 0.2s" };
  const lStyle  = { fontSize: "10.5px", letterSpacing: "0.14em", color: "var(--caramel)", textTransform: "uppercase", marginBottom: "6px", display: "block", fontFamily: "'Lora', serif" };
  const focus   = (e) => e.target.style.borderColor = "var(--caramel)";
  const blur    = (e) => e.target.style.borderColor = "var(--sand)";
  const arrowBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B89B72' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 13px center`;

  const handleSubmit = () => {
    if (!form.word.trim() || !form.language || !form.meaning.trim()) return;
    onSave({ ...form, id: form.id || Date.now() });
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(30,18,8,0.48)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ width: "100%", maxWidth: "580px", background: "var(--parchment)", borderRadius: "4px 4px 0 0", padding: "34px 24px 42px", animation: "slideUp 0.35s cubic-bezier(0.22,1,0.36,1) both", maxHeight: "92vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "26px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "var(--bark)" }}>
            {initial?.id ? "단어 수정" : "새 단어 추가"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--caramel)", padding: "4px" }}>
            <Ico.Close />
          </button>
        </div>

        <div style={{ display: "grid", gap: "18px" }}>
          {/* 언어 */}
          <div>
            <label style={lStyle}>언어</label>
            <select value={form.language} onChange={e => handleLang(e.target.value)} style={{ ...iStyle, appearance: "none", background: `rgba(245,240,232,0.85) ${arrowBg}`, paddingRight: "34px" }} onFocus={focus} onBlur={blur}>
              <option value="">언어 선택</option>
              {Object.keys(FLAG_MAP).map(l => <option key={l} value={l}>{FLAG_MAP[l]} {l}</option>)}
            </select>
          </div>

          {/* 단어 + 발음 — 모바일에서 1열로 */}
          <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={lStyle}>단어</label>
              <input value={form.word} onChange={e => set("word", e.target.value)} placeholder="木漏れ日" style={iStyle} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={lStyle}>발음</label>
              <input value={form.pronunciation} onChange={e => set("pronunciation", e.target.value)} placeholder="코모레비" style={iStyle} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          {/* 의미 */}
          <div>
            <label style={lStyle}>의미</label>
            <input value={form.meaning} onChange={e => set("meaning", e.target.value)} placeholder="나뭇잎 사이로 새어드는 빛의 반짝임" style={iStyle} onFocus={focus} onBlur={blur} />
          </div>

          {/* 예시 */}
          <div>
            <label style={lStyle}>예시 문장</label>
            <textarea value={form.example} onChange={e => set("example", e.target.value)} placeholder="숲길을 걷다 코모레비에 잠시 멈춰 서다." rows={2} style={{ ...iStyle, resize: "vertical", lineHeight: 1.7 }} onFocus={focus} onBlur={blur} />
          </div>

          {/* 테마 */}
          <div>
            <label style={lStyle}>테마</label>
            <select value={form.themeId} onChange={e => set("themeId", e.target.value)} style={{ ...iStyle, appearance: "none", background: `rgba(245,240,232,0.85) ${arrowBg}`, paddingRight: "34px" }} onFocus={focus} onBlur={blur}>
              <option value="">테마 없음</option>
              {themes.map(t => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
            </select>
          </div>

          {/* 제출 */}
          <button
            onClick={handleSubmit}
            style={{ marginTop: "4px", padding: "12px", background: "var(--bark)", color: "var(--cream)", border: "none", borderRadius: "2px", fontSize: "14px", letterSpacing: "0.08em", cursor: "pointer", fontFamily: "'Lora', serif", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--umber)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--bark)"}
          >
            {initial?.id ? "수정 완료" : "단어 추가"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordForm;