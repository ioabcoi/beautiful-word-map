import { useState, useEffect } from "react";
import { FontLoader, GlobalStyle } from "./styles/GlobalStyle";
import { api } from "./api";
import { Ico } from "./components/Icons";
import WordCard from "./components/WordCard";
import WordDetailModal from "./components/WordDetailModal";
import WordForm from "./components/WordForm";
import ThemeManager from "./components/ThemeManager";
import Dropdown from "./components/Dropdown";

export default function App() {
  const [words,        setWords]      = useState([]);
  const [themes,       setThemes]     = useState([]);
  const [langFilter,   setLang]       = useState("");
  const [themeFilter,  setTheme]      = useState("");
  const [showForm,     setForm]       = useState(false);
  const [editWord,     setEditWord]   = useState(null);
  const [detailWord,   setDetailWord] = useState(null); // 상세 모달
  const [showThemeMgr, setTMgr]      = useState(false);
  const [loading,      setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([api.getWords(), api.getThemes()])
      .then(([w, t]) => { setWords(w); setThemes(t); })
      .finally(() => setLoading(false));
  }, []);

  const langs     = [...new Set(words.map(w => w.language))].map(l => ({ value: l, label: l, emoji: words.find(w => w.language === l)?.flag || "" }));
  const themeOpts = themes.map(t => ({ value: t.id, label: t.name, emoji: t.emoji }));
  const filtered  = words.filter(w => (!langFilter || w.language === langFilter) && (!themeFilter || w.themeId === themeFilter));

  const handleSave = async (word) => {
    if (words.find(w => w.id === word.id)) {
      await api.updateWord(word.id, word);
      setWords(ws => ws.map(w => w.id === word.id ? word : w));
    } else {
      const saved = await api.addWord(word);
      setWords(ws => [saved, ...ws]);
    }
    setForm(false);
    setEditWord(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("이 단어를 삭제할까요?")) {
      await api.deleteWord(id);
      setWords(ws => ws.filter(w => w.id !== id));
    }
  };

  const handleEdit = (word) => { setEditWord(word); setForm(true); };

  const handleSaveThemes = async (newList) => {
    for (const t of newList) {
      if (!themes.find(o => o.id === t.id)) await api.addTheme(t);
    }
    for (const t of themes) {
      if (!newList.find(n => n.id === t.id)) await api.deleteTheme(t.id);
    }
    setThemes(newList);
  };

  const activeTheme = themes.find(t => t.id === themeFilter);
  const stats = [
    { label: "수집된 단어", val: words.length },
    { label: "언어",        val: new Set(words.map(w => w.language)).size },
    { label: "테마",        val: themes.length },
  ];

  if (loading) return (
    <>
      <GlobalStyle />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lora', serif", fontSize: "14px", color: "var(--caramel)", fontStyle: "italic" }}>
        단어들을 불러오는 중…
      </div>
    </>
  );

  return (
    <>
      <FontLoader />
      <GlobalStyle />
      <div style={{ minHeight: "100vh", paddingBottom: "100px" }}>

        {/* ── HEADER ── */}
        <header className="header-inner" style={{ padding: "50px 44px 32px", maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, var(--sand))" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.3em", color: "var(--sand)", fontFamily: "'Lora', serif", textTransform: "uppercase" }}>Beautiful Word Map</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, var(--sand), transparent)" }} />
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 7vw, 66px)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--bark)", lineHeight: 1.05, marginBottom: "10px" }}>
            나만의 <em style={{ fontStyle: "italic" }}>Serendipity</em> 단어:<br />숨겨진 아름다운 단어들
          </h1>
          <p style={{ fontSize: "clamp(12px, 2vw, 13.5px)", color: "var(--caramel)", fontFamily: "'Lora', serif", fontStyle: "italic", letterSpacing: "0.03em" }}>
            전 세계 언어 속에 숨겨진 보물 같은 단어들
          </p>

          {/* 통계 */}
          <div className="stats-row" style={{ display: "flex", gap: "28px", margin: "26px 0 30px" }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 300, color: "var(--bark)", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "10px", color: "var(--caramel)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Lora', serif", marginTop: "3px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* 필터 */}
          <div className="filter-row" style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <Dropdown label="언어별" options={langs}     value={langFilter}  onChange={setLang} />
            <Dropdown label="테마별" options={themeOpts} value={themeFilter} onChange={setTheme} onExtra={() => setTMgr(true)} />
            {(langFilter || themeFilter) && (
              <button onClick={() => { setLang(""); setTheme(""); }} style={{ background: "none", border: "none", fontSize: "12px", color: "var(--caramel)", cursor: "pointer", fontStyle: "italic", textDecoration: "underline" }}>
                초기화
              </button>
            )}
            <div className="theme-btn" style={{ marginLeft: "auto" }}>
              <button
                onClick={() => setTMgr(true)}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 15px", background: "transparent", border: "1px solid var(--sand)", borderRadius: "2px", color: "var(--umber)", fontSize: "13px", cursor: "pointer", fontFamily: "'Lora', serif", fontStyle: "italic", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--parchment)"; e.currentTarget.style.borderColor = "var(--caramel)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--sand)"; }}
              >
                ✦ 테마 추가하기
              </button>
            </div>
          </div>

          {/* 선택된 테마 배너 */}
          {activeTheme && (
            <div className="fade-in" style={{ marginTop: "14px", padding: "12px 16px", background: "rgba(184,155,114,0.1)", border: "1px solid rgba(184,155,114,0.3)", borderRadius: "2px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "20px" }}>{activeTheme.emoji}</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--bark)" }}>{activeTheme.name}</div>
                <div style={{ fontSize: "11.5px", color: "var(--caramel)", fontStyle: "italic", marginTop: "2px" }}>{activeTheme.description}</div>
              </div>
            </div>
          )}
        </header>

        {/* ── GRID ── */}
        <main className="main-inner" style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 44px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--sand)" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "52px", fontWeight: 300, marginBottom: "14px" }}>∅</div>
              <p style={{ fontSize: "14px", fontStyle: "italic", fontFamily: "'Lora', serif" }}>아직 단어가 없어요. 새 단어를 추가해보세요.</p>
            </div>
          ) : (
            <div className="word-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(268px, 1fr))", gap: "15px" }}>
              {filtered.map((w, i) => (
                <WordCard
                  key={w.id}
                  word={w}
                  theme={themes.find(t => t.id === w.themeId)}
                  onClick={() => setDetailWord(w)}
                  index={i}
                />
              ))}
            </div>
          )}
        </main>

        {/* ── FAB ── */}
        <button
          className="fab"
          onClick={() => { setEditWord(null); setForm(true); }}
          style={{ position: "fixed", bottom: "32px", right: "32px", width: "52px", height: "52px", borderRadius: "50%", background: "var(--bark)", color: "var(--cream)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(61,43,31,0.28)", transition: "all 0.25s", zIndex: 100 }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1) rotate(90deg)"; e.currentTarget.style.background = "var(--umber)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; e.currentTarget.style.background = "var(--bark)"; }}
          title="새 단어 추가"
        >
          <Ico.Plus />
        </button>
      </div>

      {/* ── MODALS ── */}
      {detailWord && (
        <WordDetailModal
          word={detailWord}
          theme={themes.find(t => t.id === detailWord.themeId)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={() => setDetailWord(null)}
        />
      )}
      {showForm     && <WordForm     initial={editWord} themes={themes} onSave={handleSave}      onClose={() => { setForm(false); setEditWord(null); }} />}
      {showThemeMgr && <ThemeManager themes={themes}                   onSave={handleSaveThemes} onClose={() => setTMgr(false)} />}
    </>
  );
}