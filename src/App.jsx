import { useState, useEffect, useRef } from "react";
import './index.css'

/* ─────────────────────────────────────────
   GOOGLE FONTS
───────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Noto+Serif+KR:wght@300;400;500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --cream:     #F5F0E8;
      --parchment: #EDE5D0;
      --sand:      #D4C5A9;
      --caramel:   #B89B72;
      --umber:     #6B5744;
      --bark:      #3D2B1F;
      --ink:       #1E1208;
      --rose:      #C4856A;
      --sage:      #8A9E7A;
      --dusty:     #9BA5B4;
    }
    body {
      background: var(--cream);
      font-family: 'Noto Serif KR', 'Lora', serif;
      color: var(--ink);
      min-height: 100vh;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(48px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.5s ease both; }
    .fade-in { animation: fadeIn 0.3s ease both; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--parchment); }
    ::-webkit-scrollbar-thumb { background: var(--sand); border-radius: 3px; }
    select, input, textarea { font-family: 'Noto Serif KR', serif; }
  `}</style>
);

/* ─────────────────────────────────────────
   SEED DATA
───────────────────────────────────────── */
const SEED_THEMES = [
  { id: "light",      emoji: "✨", name: "빛이 머무는 찰나",  description: "자연이 우연히 선물해준 반짝임과 시각적인 아름다움" },
  { id: "emotion",    emoji: "🌊", name: "말로 못한 감정",    description: "딱 맞는 단어가 없어 담아두었던 복잡한 감정들" },
  { id: "time",       emoji: "🕰️", name: "시간의 결",         description: "흘러가는 시간과 기억, 그리고 덧없음에 대하여" },
  { id: "connection", emoji: "🤝", name: "사람 사이의 온도",  description: "관계와 유대, 함께함의 순간들" },
];

const SEED_WORDS = [
  { id: 1, language: "일본어",     flag: "🇯🇵", word: "木漏れ日",       pronunciation: "코모레비",          meaning: "나뭇잎 사이로 새어드는 빛의 반짝임",             example: "숲길을 걷다 코모레비에 잠시 멈춰 서다.",         themeId: "light"      },
  { id: 2, language: "한국어",     flag: "🇰🇷", word: "윤슬",           pronunciation: "윤슬",              meaning: "햇빛이나 달빛에 반짝이는 잔물결",                example: "강 위에 윤슬이 눈부시게 부서졌다.",              themeId: "light"      },
  { id: 3, language: "포르투갈어", flag: "🇵🇹", word: "Saudade",        pronunciation: "사우다지",          meaning: "돌아오지 않을 것에 대한 그리움과 멜랑꼴리",      example: "고향을 떠난 뒤 늘 사우다지를 느꼈다.",           themeId: "emotion"    },
  { id: 4, language: "덴마크어",   flag: "🇩🇰", word: "Hygge",          pronunciation: "휘게",              meaning: "따뜻하고 아늑한 분위기, 소소한 행복감",          example: "촛불을 켜고 책을 읽는 저녁은 완전한 휘게다.",    themeId: "connection" },
  { id: 5, language: "일본어",     flag: "🇯🇵", word: "物の哀れ",       pronunciation: "모노노아와레",      meaning: "사물의 덧없음을 바라보며 드는 애잔한 감동",      example: "벚꽃이 지는 걸 보며 모노노아와레를 느꼈다.",     themeId: "time"       },
  { id: 6, language: "핀란드어",   flag: "🇫🇮", word: "Sisu",           pronunciation: "시수",              meaning: "극한의 역경에서도 포기하지 않는 불굴의 의지",    example: "그녀는 시수로 긴 겨울을 버텨냈다.",             themeId: "emotion"    },
  { id: 7, language: "독일어",     flag: "🇩🇪", word: "Waldeinsamkeit", pronunciation: "발트아인자암카이트", meaning: "숲 속에서 느끼는 평화로운 홀로됨",              example: "산속 오두막에서 발트아인자암카이트에 잠겼다.",   themeId: "light"      },
  { id: 8, language: "한국어",     flag: "🇰🇷", word: "그리다",         pronunciation: "그리다",            meaning: "보고 싶어 마음이 당기다 — 그립다의 어원적 아름다움", example: "오래된 편지를 읽으며 그 시절을 그렸다.",      themeId: "emotion"    },
];

/* ─────────────────────────────────────────
   STORAGE
───────────────────────────────────────── */
const LS_W = "bwm_words_v1", LS_T = "bwm_themes_v1";
const loadWords  = () => { try { return JSON.parse(localStorage.getItem(LS_W))  || SEED_WORDS;  } catch { return SEED_WORDS;  } };
const loadThemes = () => { try { return JSON.parse(localStorage.getItem(LS_T)) || SEED_THEMES; } catch { return SEED_THEMES; } };

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const Ico = {
  Plus:    () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>,
  Close:   () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Chevron: ({ open }) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s" }}><polyline points="6 9 12 15 18 9"/></svg>,
};

/* ─────────────────────────────────────────
   THEME ACCENT COLORS
───────────────────────────────────────── */
const THEME_COLORS = { light: "#8A9E7A", emotion: "#9BA5B4", time: "#B89B72", connection: "#C4856A" };
const themeColor = (id) => THEME_COLORS[id] || "#B89B72";

/* ─────────────────────────────────────────
   WORD CARD
───────────────────────────────────────── */
const WordCard = ({ word, theme, onEdit, onDelete, index }) => {
  const [expanded, setExpanded] = useState(false);
  const color = themeColor(word.themeId);

  return (
    <div
      className="fade-up"
      style={{ animationDelay: `${Math.min(index * 0.055, 0.5)}s`, background: "rgba(237,229,208,0.5)", border: "1px solid var(--sand)", borderRadius: "2px", padding: "26px 26px 20px", cursor: "pointer", transition: "box-shadow 0.25s, transform 0.22s, background 0.22s", position: "relative", backdropFilter: "blur(4px)" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "3px 5px 22px rgba(61,43,31,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(237,229,208,0.82)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(237,229,208,0.5)"; }}
      onClick={() => setExpanded(v => !v)}
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

      {/* chevron */}
      <div style={{ position: "absolute", bottom: "13px", right: "16px", color: "var(--sand)" }}>
        <Ico.Chevron open={expanded} />
      </div>

      {/* expanded detail */}
      {expanded && (
        <div className="fade-in" onClick={e => e.stopPropagation()} style={{ marginTop: "18px", paddingTop: "16px", borderTop: "1px dashed var(--sand)" }}>
          {word.example && (
            <p style={{ fontSize: "13px", fontStyle: "italic", color: "var(--umber)", lineHeight: 1.8, marginBottom: "14px", paddingLeft: "12px", borderLeft: `2px solid ${color}60` }}>
              "{word.example}"
            </p>
          )}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { label: "수정", icon: <Ico.Edit />, onClick: () => onEdit(word), hoverBg: "var(--sand)", base: "transparent", borderColor: "var(--sand)", color: "var(--umber)" },
              { label: "삭제", icon: <Ico.Trash />, onClick: () => onDelete(word.id), hoverBg: "#C4856A18", base: "transparent", borderColor: "#C4856A44", color: "var(--rose)" },
            ].map(btn => (
              <button key={btn.label} onClick={btn.onClick}
                style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", fontSize: "12px", background: btn.base, border: `1px solid ${btn.borderColor}`, borderRadius: "2px", color: btn.color, cursor: "pointer", transition: "all 0.18s" }}
                onMouseEnter={e => e.currentTarget.style.background = btn.hoverBg}
                onMouseLeave={e => e.currentTarget.style.background = btn.base}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   DROPDOWN
───────────────────────────────────────── */
const Dropdown = ({ label, options, value, onChange, onExtra }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const cur = options.find(o => o.value === value);
  const active = !!value;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(v => !v)}
        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 15px", background: active ? "var(--bark)" : "transparent", border: `1px solid ${active ? "var(--bark)" : "var(--sand)"}`, borderRadius: "2px", color: active ? "var(--cream)" : "var(--umber)", fontSize: "13px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
      >
        {cur ? `${cur.emoji || ""} ${cur.label}` : label}
        <Ico.Chevron open={open} />
      </button>
      {open && (
        <div className="fade-in" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: "var(--parchment)", border: "1px solid var(--sand)", borderRadius: "2px", minWidth: "200px", zIndex: 200, boxShadow: "4px 8px 24px rgba(61,43,31,0.12)" }}>
          <div onClick={() => { onChange(""); setOpen(false); }} style={{ padding: "10px 16px", fontSize: "12.5px", color: "var(--caramel)", cursor: "pointer", borderBottom: "1px solid var(--sand)", fontStyle: "italic" }}>전체 보기</div>
          {options.map(o => (
            <div key={o.value} onClick={() => { onChange(o.value); setOpen(false); }}
              style={{ padding: "10px 16px", fontSize: "13px", color: o.value === value ? "var(--bark)" : "var(--umber)", background: o.value === value ? "rgba(184,155,114,0.15)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.15s" }}
              onMouseEnter={e => { if (o.value !== value) e.currentTarget.style.background = "rgba(184,155,114,0.08)"; }}
              onMouseLeave={e => { if (o.value !== value) e.currentTarget.style.background = "transparent"; }}
            >
              {o.emoji && <span>{o.emoji}</span>} {o.label}
            </div>
          ))}
          {onExtra && (
            <div onClick={() => { onExtra(); setOpen(false); }} style={{ padding: "9px 16px", fontSize: "11.5px", color: "var(--caramel)", cursor: "pointer", borderTop: "1px solid var(--sand)", fontStyle: "italic" }}>
              + 테마 관리
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   WORD FORM
───────────────────────────────────────── */
const FLAG_MAP = {
  "한국어":"🇰🇷","일본어":"🇯🇵","중국어":"🇨🇳","영어":"🇬🇧","프랑스어":"🇫🇷",
  "독일어":"🇩🇪","이탈리아어":"🇮🇹","스페인어":"🇪🇸","포르투갈어":"🇵🇹","러시아어":"🇷🇺",
  "아랍어":"🇸🇦","핀란드어":"🇫🇮","덴마크어":"🇩🇰","노르웨이어":"🇳🇴","스웨덴어":"🇸🇪",
  "네덜란드어":"🇳🇱","힌디어":"🇮🇳","터키어":"🇹🇷","그리스어":"🇬🇷","기타":"🌐",
};

const EMPTY = { language:"", flag:"", word:"", pronunciation:"", meaning:"", example:"", themeId:"" };

const WordForm = ({ initial, themes, onSave, onClose }) => {
  const [form, setForm] = useState(initial || EMPTY);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleLang = (l) => { set("language", l); set("flag", FLAG_MAP[l] || "🌐"); };

  const iStyle = { width:"100%", padding:"9px 13px", fontSize:"13.5px", background:"rgba(245,240,232,0.85)", border:"1px solid var(--sand)", borderRadius:"2px", color:"var(--bark)", outline:"none", transition:"border-color 0.2s" };
  const lStyle = { fontSize:"10.5px", letterSpacing:"0.14em", color:"var(--caramel)", textTransform:"uppercase", marginBottom:"6px", display:"block", fontFamily:"'Lora', serif" };
  const focus  = (e) => e.target.style.borderColor = "var(--caramel)";
  const blur   = (e) => e.target.style.borderColor = "var(--sand)";
  const arrowBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B89B72' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 13px center`;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(30,18,8,0.48)", backdropFilter:"blur(4px)", zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div style={{ width:"100%", maxWidth:"580px", background:"var(--parchment)", borderRadius:"4px 4px 0 0", padding:"34px 34px 42px", animation:"slideUp 0.35s cubic-bezier(0.22,1,0.36,1) both", maxHeight:"92vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"26px" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"22px", fontWeight:400, color:"var(--bark)" }}>
            {initial?.id ? "단어 수정" : "새 단어 추가"}
          </h2>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--caramel)", padding:"4px" }}><Ico.Close /></button>
        </div>

        <div style={{ display:"grid", gap:"18px" }}>
          <div>
            <label style={lStyle}>언어</label>
            <select value={form.language} onChange={e => handleLang(e.target.value)} style={{ ...iStyle, appearance:"none", background:`${iStyle.background} ${arrowBg}`, paddingRight:"34px" }} onFocus={focus} onBlur={blur}>
              <option value="">언어 선택</option>
              {Object.keys(FLAG_MAP).map(l => <option key={l} value={l}>{FLAG_MAP[l]} {l}</option>)}
            </select>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            <div>
              <label style={lStyle}>단어</label>
              <input value={form.word} onChange={e => set("word", e.target.value)} placeholder="木漏れ日" style={iStyle} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={lStyle}>발음</label>
              <input value={form.pronunciation} onChange={e => set("pronunciation", e.target.value)} placeholder="코모레비" style={iStyle} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div>
            <label style={lStyle}>의미</label>
            <input value={form.meaning} onChange={e => set("meaning", e.target.value)} placeholder="나뭇잎 사이로 새어드는 빛의 반짝임" style={iStyle} onFocus={focus} onBlur={blur} />
          </div>

          <div>
            <label style={lStyle}>예시 문장</label>
            <textarea value={form.example} onChange={e => set("example", e.target.value)} placeholder="숲길을 걷다 코모레비에 잠시 멈춰 서다." rows={2} style={{ ...iStyle, resize:"vertical", lineHeight:1.7 }} onFocus={focus} onBlur={blur} />
          </div>

          <div>
            <label style={lStyle}>테마</label>
            <select value={form.themeId} onChange={e => set("themeId", e.target.value)} style={{ ...iStyle, appearance:"none", background:`${iStyle.background} ${arrowBg}`, paddingRight:"34px" }} onFocus={focus} onBlur={blur}>
              <option value="">테마 없음</option>
              {themes.map(t => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
            </select>
          </div>

          <button onClick={() => { if (!form.word.trim() || !form.language || !form.meaning.trim()) return; onSave({ ...form, id: form.id || Date.now() }); }}
            style={{ marginTop:"4px", padding:"12px", background:"var(--bark)", color:"var(--cream)", border:"none", borderRadius:"2px", fontSize:"14px", letterSpacing:"0.08em", cursor:"pointer", fontFamily:"'Lora', serif", transition:"background 0.2s" }}
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

/* ─────────────────────────────────────────
   THEME MANAGER
───────────────────────────────────────── */
const ThemeManager = ({ themes, onSave, onClose }) => {
  const [list, setList] = useState(themes);
  const [n, setN] = useState({ emoji:"", name:"", description:"" });
  const iStyle = { width:"100%", padding:"8px 12px", fontSize:"13px", background:"rgba(245,240,232,0.85)", border:"1px solid var(--sand)", borderRadius:"2px", color:"var(--bark)", outline:"none" };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(30,18,8,0.48)", backdropFilter:"blur(4px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }} onClick={onClose}>
      <div style={{ width:"100%", maxWidth:"460px", background:"var(--parchment)", borderRadius:"4px", padding:"30px", animation:"fadeUp 0.3s ease both", maxHeight:"80vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"22px" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"22px", fontWeight:400, color:"var(--bark)" }}>테마 관리</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--caramel)" }}><Ico.Close /></button>
        </div>

        <div style={{ display:"grid", gap:"8px", marginBottom:"22px" }}>
          {list.map(t => (
            <div key={t.id} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 13px", background:"rgba(245,240,232,0.6)", border:"1px solid var(--sand)", borderRadius:"2px" }}>
              <span style={{ fontSize:"17px" }}>{t.emoji}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"13px", color:"var(--bark)", fontWeight:500 }}>{t.name}</div>
                {t.description && <div style={{ fontSize:"11px", color:"var(--caramel)", marginTop:"2px" }}>{t.description}</div>}
              </div>
              <button onClick={() => setList(l => l.filter(x => x.id !== t.id))} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--sand)", padding:"3px", transition:"color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color="var(--rose)"} onMouseLeave={e => e.currentTarget.style.color="var(--sand)"}><Ico.Trash /></button>
            </div>
          ))}
        </div>

        <div style={{ paddingTop:"18px", borderTop:"1px dashed var(--sand)" }}>
          <p style={{ fontSize:"10.5px", letterSpacing:"0.14em", color:"var(--caramel)", textTransform:"uppercase", marginBottom:"10px", fontFamily:"'Lora', serif" }}>새 테마 추가</p>
          <div style={{ display:"grid", gridTemplateColumns:"52px 1fr", gap:"8px", marginBottom:"8px" }}>
            <input value={n.emoji} onChange={e => setN(f=>({...f,emoji:e.target.value}))} placeholder="✨" style={{ ...iStyle, textAlign:"center", fontSize:"18px" }} />
            <input value={n.name}  onChange={e => setN(f=>({...f,name:e.target.value}))}  placeholder="테마 이름" style={iStyle} />
          </div>
          <input value={n.description} onChange={e => setN(f=>({...f,description:e.target.value}))} placeholder="테마 설명 (선택)" style={{ ...iStyle, marginBottom:"10px" }} />
          <button onClick={() => { if (!n.name.trim()) return; setList(l => [...l, { id:`t_${Date.now()}`, ...n }]); setN({ emoji:"", name:"", description:"" }); }}
            style={{ width:"100%", padding:"9px", background:"var(--caramel)", color:"var(--cream)", border:"none", borderRadius:"2px", fontSize:"13px", cursor:"pointer", fontFamily:"'Lora', serif", transition:"background 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background="var(--umber)"}
            onMouseLeave={e=>e.currentTarget.style.background="var(--caramel)"}
          >추가</button>
        </div>

        <button onClick={() => { onSave(list); onClose(); }}
          style={{ marginTop:"14px", width:"100%", padding:"11px", background:"var(--bark)", color:"var(--cream)", border:"none", borderRadius:"2px", fontSize:"14px", cursor:"pointer", fontFamily:"'Lora', serif", transition:"background 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.background="var(--umber)"}
          onMouseLeave={e=>e.currentTarget.style.background="var(--bark)"}
        >저장</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */
export default function App() {
  const [words,  setWords]        = useState(loadWords);
  const [themes, setThemes]       = useState(loadThemes);
  const [langFilter,  setLang]    = useState("");
  const [themeFilter, setTheme]   = useState("");
  const [showForm,    setForm]     = useState(false);
  const [editWord,    setEditWord] = useState(null);
  const [showThemeMgr, setTMgr]   = useState(false);

  useEffect(() => localStorage.setItem(LS_W, JSON.stringify(words)),  [words]);
  useEffect(() => localStorage.setItem(LS_T, JSON.stringify(themes)), [themes]);

  const langs = [...new Set(words.map(w => w.language))].map(l => ({ value: l, label: l, emoji: words.find(w => w.language === l)?.flag || "" }));
  const themeOpts = themes.map(t => ({ value: t.id, label: t.name, emoji: t.emoji }));

  const filtered = words.filter(w =>
    (!langFilter  || w.language === langFilter) &&
    (!themeFilter || w.themeId  === themeFilter)
  );

  const handleSave = (word) => {
    setWords(ws => words.find(w => w.id === word.id) ? ws.map(w => w.id === word.id ? word : w) : [word, ...ws]);
    setForm(false); setEditWord(null);
  };
  const handleDelete = (id) => { if (window.confirm("이 단어를 삭제할까요?")) setWords(ws => ws.filter(w => w.id !== id)); };
  const handleEdit   = (word) => { setEditWord(word); setForm(true); };

  const activeTheme = themes.find(t => t.id === themeFilter);
  const stats = [
    { label: "수집된 단어", val: words.length },
    { label: "언어",        val: new Set(words.map(w => w.language)).size },
    { label: "테마",        val: themes.length },
  ];

  return (
    <>
      <FontLoader />
      <GlobalStyle />
      <div style={{ minHeight:"100vh", paddingBottom:"100px" }}>

        {/* HEADER */}
        <header style={{ padding:"50px 44px 32px", maxWidth:"1080px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"30px" }}>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg, transparent, var(--sand))" }} />
            <span style={{ fontSize:"10px", letterSpacing:"0.3em", color:"var(--sand)", fontFamily:"'Lora', serif", textTransform:"uppercase" }}>Beautiful Word Map</span>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg, var(--sand), transparent)" }} />
          </div>

          <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(38px, 7vw, 66px)", fontWeight:300, letterSpacing:"-0.02em", color:"var(--bark)", lineHeight:1.05, marginBottom:"10px" }}>
            나만의<br /><em style={{ fontStyle:"italic" }}>단어 사전</em>
          </h1>
          <p style={{ fontSize:"13.5px", color:"var(--caramel)", fontFamily:"'Lora', serif", fontStyle:"italic", letterSpacing:"0.03em" }}>
            전 세계 언어 속에 숨겨진 보물 같은 단어들
          </p>

          {/* stats */}
          <div style={{ display:"flex", gap:"28px", margin:"26px 0 30px" }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"28px", fontWeight:300, color:"var(--bark)", lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:"10px", color:"var(--caramel)", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"'Lora', serif", marginTop:"3px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* filters */}
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", alignItems:"center" }}>
            <Dropdown label="언어별" options={langs}      value={langFilter}  onChange={setLang}  />
            <Dropdown label="테마별" options={themeOpts}  value={themeFilter} onChange={setTheme} onExtra={() => setTMgr(true)} />
            {(langFilter || themeFilter) && (
              <button onClick={() => { setLang(""); setTheme(""); }} style={{ background:"none", border:"none", fontSize:"12px", color:"var(--caramel)", cursor:"pointer", fontStyle:"italic", textDecoration:"underline" }}>초기화</button>
            )}
          </div>

          {/* active theme banner */}
          {activeTheme && (
            <div className="fade-in" style={{ marginTop:"14px", padding:"12px 16px", background:"rgba(184,155,114,0.1)", border:"1px solid rgba(184,155,114,0.3)", borderRadius:"2px", display:"flex", gap:"10px", alignItems:"flex-start" }}>
              <span style={{ fontSize:"20px" }}>{activeTheme.emoji}</span>
              <div>
                <div style={{ fontSize:"13px", fontWeight:500, color:"var(--bark)" }}>{activeTheme.name}</div>
                <div style={{ fontSize:"11.5px", color:"var(--caramel)", fontStyle:"italic", marginTop:"2px" }}>{activeTheme.description}</div>
              </div>
            </div>
          )}
        </header>

        {/* GRID */}
        <main style={{ maxWidth:"1080px", margin:"0 auto", padding:"0 44px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 0", color:"var(--sand)" }}>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"52px", fontWeight:300, marginBottom:"14px" }}>∅</div>
              <p style={{ fontSize:"14px", fontStyle:"italic", fontFamily:"'Lora', serif" }}>아직 단어가 없어요. 새 단어를 추가해보세요.</p>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(268px, 1fr))", gap:"15px" }}>
              {filtered.map((w, i) => (
                <WordCard key={w.id} word={w} theme={themes.find(t => t.id === w.themeId)} onEdit={handleEdit} onDelete={handleDelete} index={i} />
              ))}
            </div>
          )}
        </main>

        {/* FAB */}
        <button onClick={() => { setEditWord(null); setForm(true); }}
          style={{ position:"fixed", bottom:"32px", right:"32px", width:"52px", height:"52px", borderRadius:"50%", background:"var(--bark)", color:"var(--cream)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(61,43,31,0.28)", transition:"all 0.25s", zIndex:100 }}
          onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1) rotate(90deg)"; e.currentTarget.style.background="var(--umber)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="scale(1) rotate(0deg)";  e.currentTarget.style.background="var(--bark)"; }}
          title="새 단어 추가"
        >
          <Ico.Plus />
        </button>
      </div>

      {showForm     && <WordForm    initial={editWord} themes={themes} onSave={handleSave} onClose={() => { setForm(false); setEditWord(null); }} />}
      {showThemeMgr && <ThemeManager themes={themes} onSave={setThemes} onClose={() => setTMgr(false)} />}
    </>
  );
}