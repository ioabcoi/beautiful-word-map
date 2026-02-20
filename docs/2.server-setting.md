# 🗄️ Beautiful-Word-Map Express 서버 세팅 가이드

---

## 1. Express 패키지 설치

프로젝트 루트에서:

```bash
npm install express cors concurrently
```

---

## 2. 파일 배치

아래 구조로 파일을 추가:

```
beautiful-word-map/
├── server/
│   ├── index.js    ← 새 파일
│   └── data.json   ← 새 파일
└── src/
    └── App.jsx     ← 교체
```

---

## 3. `package.json` 수정

아래 두 가지를 추가/수정:

**① 최상단에 `"type": "module"` 추가**

```json
{
  "type": "module",
  ...
}
```

**② `scripts` 수정**

```json
"scripts": {
  "dev": "vite",
  "server": "node server/index.js",
  "start": "concurrently \"npm run dev\" \"npm run server\""
}
```

---

## 4. 실행

```bash
npm run start
```

- 프론트엔드 → `http://localhost:5173`
- 백엔드 서버 → `http://localhost:3001`

이제 단어/테마를 추가하면 `server/data.json` 파일에 바로 저장돼요.  
서버를 껐다 켜도 데이터가 그대로 유지돼요. 🎉