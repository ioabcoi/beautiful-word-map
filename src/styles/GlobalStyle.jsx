import { useEffect } from "react";

export const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Noto+Serif+KR:wght@300;400;500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

export const GlobalStyle = () => (
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

    /* ── 반응형 ── */

    /* 모바일 (~ 639px) */
    @media (max-width: 639px) {
      .header-inner { padding: 36px 20px 24px !important; }
      .main-inner   { padding: 0 20px !important; }
      .word-grid    { grid-template-columns: 1fr !important; }
      .filter-row   { flex-wrap: wrap !important; gap: 8px !important; }
      .theme-btn    { display: none !important; }
      .stats-row    { gap: 20px !important; }
      .fab          { bottom: 20px !important; right: 20px !important; width: 46px !important; height: 46px !important; }
      .form-grid-2  { grid-template-columns: 1fr !important; }
    }

    /* 태블릿 (640px ~ 1023px) */
    @media (min-width: 640px) and (max-width: 1023px) {
      .header-inner { padding: 44px 32px 28px !important; }
      .main-inner   { padding: 0 32px !important; }
      .word-grid    { grid-template-columns: repeat(2, 1fr) !important; }
    }

    /* PC (1024px ~) */
    @media (min-width: 1024px) {
      .word-grid    { grid-template-columns: repeat(auto-fill, minmax(268px, 1fr)) !important; }
    }
  `}</style>
);