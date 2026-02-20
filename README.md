# 🗺️ Beautiful-Word-Map

> 전 세계 언어 속에 숨겨진 보물 같은 단어들을 찾아 나만의 지도를 그려가는 기록

**🌐 [페이지 보기](https://ioabcoi.github.io/Beautiful-Word-Map/)**

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | Beautiful-Word-Map (뷰티풀 워드 맵) |
| 유형 | 단일 페이지 SPA (React + Vite) |
| 분위기 | 따뜻하고 아날로그 감성 (크림, 베이지) |
| 목적 | 전 세계 언어 속 특별한 단어들을 수집하고 언어별·테마별로 탐색하는 개인 사전 |

---

## 메뉴 구조

```
헤더
 ├── 타이틀: 나만의 Serendipity 단어: 숨겨진 아름다운 단어들
 ├── 통계: 수집된 단어 · 언어 · 테마 수
 └── 필터: [언어별 ▾] [테마별 ▾] [✦ 테마 추가하기]

메인 콘텐츠
 └── 단어 카드 그리드

플로팅 버튼 (우측 하단)
 └── [+ 단어 추가]
```

---

## 화면 흐름

```
① 기본 화면
   전체 단어 카드 그리드 (최신순)

② 언어 필터 선택
   일본어 / 한국어 / 포르투갈어 / 독일어 ...
   → 해당 언어 카드만 표시

③ 테마 필터 선택
   테마 목록 드롭다운
   → 해당 테마 카드만 표시

④ 단어 카드 클릭
   → 상세 모달 (가운데 팝업)
      발음 · 의미 · 예시 · 테마 태그 · 수정/삭제 버튼

⑤ + 버튼 클릭
   → 슬라이드업 폼 (바닥에서 올라오는 바텀시트)
      (언어 / 단어 / 발음 / 의미 / 예시 / 테마 선택)

⑥ 테마 추가하기 버튼 클릭
   → 테마 관리 모달 (가운데 팝업)
      테마 추가 / 삭제
```

---

## 단어 카드 구성

```
┌─────────────────────────┐
│  🇯🇵  일본어              │  ← 언어 플래그 + 이름
│                         │
│  木漏れ日               │  ← 단어 (크게)
│  코모레비               │  ← 발음
│                         │
│  나뭇잎 사이로 쏟아지는  │  ← 의미
│  부드러운 햇살           │
│                         │
│  💡 빛이 머무는 찰나    │  ← 테마 태그
└─────────────────────────┘
```

**클릭 시 → 상세 모달**
- 예시 문장 표시 (여러 개 지원)
- 수정 / 삭제 버튼

---

## 기능 정의

### 단어 관리
- 추가 — 플로팅 + 버튼 → 슬라이드업 바텀시트 폼
- 수정 — 상세 모달 → 수정 버튼
- 삭제 — 상세 모달 → 삭제 버튼

### 필터
- 언어별 필터 (드롭다운)
- 테마별 필터 (드롭다운)
- 중첩 필터 / 초기화 지원

### 테마
| 테마명 | 설명 |
|--------|------|
| 💡 빛이 머무는 찰나 | 자연이 우연히 선물해준 반짝임과 시각적인 아름다움 |
| 🍀 뜻밖의 행운과 발견 | 기대하지 않았던 순간에 찾아온 보물 같은 깨달음 |
| 🍵 마음을 보듬는 안식 | 나를 채우고, 쉬게 하고, 단단하게 만드는 힘 |
| 🌿 자연의 숨결을 닮은 단어 | 자연의 요소에서 길어올린 시적인 단어들 |
| ☕ 삶의 태도와 평온 | 균형 잡힌 삶과 내면의 고요에 관하여 |
| 🎨 타인과 나를 잇는 시선 | 나와 세계, 타인을 바라보는 아름다운 시각들 |
| ✨ 한국어의 결 | 오직 한국어만이 담을 수 있는 고운 감각들 |

---

## 데이터 구조

```js
// 단어
{
  id,
  language,      // "일본어"
  flag,          // "🇯🇵"
  word,          // "木漏れ日"
  pronunciation, // "코모레비"
  meaning,       // "나뭇잎 사이로 쏟아지는 부드러운 햇살."
  example,       // 문자열 or 배열 (여러 예시 지원)
  themeId        // 테마 id 참조
}

// 테마
{
  id,
  emoji,
  name,
  description
}
```

---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | React + Vite |
| 상태관리 | useState |
| 스타일링 | Inline CSS + CSS Variables |
| 데이터 저장 | localStorage / Express + JSON (전환 가능) |
| 배포 | GitHub Pages |
| 추후 확장 | Supabase 연동 가능 |

---

## 스토리지 모드 전환

`src/api/index.js` 의 `USE_SERVER` 값 하나로 전환:

```js
const USE_SERVER = false;  // localStorage — GitHub Pages 기본값
const USE_SERVER = true;   // Express 서버 — 로컬 개발용
```

---

## 로컬 실행

### localStorage 모드
```bash
npm install
npm run dev
```

### 서버 모드
```bash
npm install express cors concurrently
# src/api/index.js → USE_SERVER = true 로 변경
npm run start  # 프론트 + 서버 동시 실행
```

---

## 배포

```bash
npm run build
git add .
git commit -m "build: update dist"
git push origin main
```

---

## 파일 구조

```
beautiful-word-map/
├── server/
│   ├── index.js          ← Express 서버
│   └── data.json         ← 단어/테마 데이터
├── src/
│   ├── api/
│   │   └── index.js      ← 스토리지 모드 분기 (USE_SERVER)
│   ├── constants/
│   │   └── flagMap.js    ← 언어별 국기, 테마 색상
│   ├── styles/
│   │   └── GlobalStyle.jsx
│   ├── components/
│   │   ├── Icons.jsx
│   │   ├── Dropdown.jsx
│   │   ├── WordCard.jsx
│   │   ├── WordDetailModal.jsx  ← 단어 상세 모달
│   │   ├── WordForm.jsx         ← 단어 추가/수정 폼
│   │   └── ThemeManager.jsx     ← 테마 관리 모달
│   └── App.jsx           ← 상태관리 + 레이아웃
└── README.md
```

---

## 결정 사항

- [x] 카드 상세보기 → **상세 모달** (가운데 팝업)
- [x] 단어 추가 폼 → **바텀시트** (바닥에서 슬라이드업)
- [x] 단어 관리 → **추가 + 수정 + 삭제** 모두
- [x] 테마 → **직접 생성 / 삭제** 가능
- [x] 분위기 → **따뜻하고 아날로그 감성** (크림, 베이지)
- [x] 반응형 → **모바일 / 태블릿 / PC** 지원
- [x] 스토리지 → **localStorage / Express 서버** 전환 가능
- [x] 배포 → **GitHub Pages**