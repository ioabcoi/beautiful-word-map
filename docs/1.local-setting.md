# 🛠️ Beautiful-Word-Map 로컬 세팅 가이드

---

## 1. 프로젝트 생성

터미널 열고 원하는 폴더 경로에서 아래 명령어 실행:

```bash
npm create vite@latest beautiful-word-map -- --template react
cd beautiful-word-map
npm install
```

---

## 2. 파일 정리

기본 생성된 파일 중 불필요한 것을 삭제하고 아래 구조로 정리:

```
beautiful-word-map/
├── server/
│   ├── index.js        ← Express 서버
│   └── data.json       ← 단어/테마 데이터 저장소
├── src/
│   ├── App.jsx        ← 여기에 만든 코드 붙여넣기
│   ├── main.jsx       ← 그대로 유지
│   └── index.css      ← 내용 전부 비워도 됨 (스타일이 App.jsx 안에 있음)
├── index.html
├── package.json
└── vite.config.js
```

> `src/App.css` 는 삭제해도 되고,  
> `main.jsx` 에서 `import './index.css'` 한 줄만 남기면 됩니다.

---

## 3. App.jsx 교체

다운받은 `beautiful-word-map.jsx` 파일의 내용을 전체 복사해서  
`src/App.jsx` 에 붙여넣기.

---

## 4. 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속해서 확인.

---

## 5. GitHub 레포 연결 (선택)

GitHub에서 새 레포지토리를 먼저 만든 후, 터미널에서 아래 순서대로 실행:

```bash
git init
git add .
git commit -m "init: beautiful word map"

git remote add origin https://github.com/[유저명]/beautiful-word-map.git
git push -u origin main
```

> `[유저명]` 부분은 본인 GitHub 아이디로 교체하세요.