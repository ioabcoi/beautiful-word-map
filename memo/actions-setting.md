# ⚙️ GitHub Actions 자동 배포 세팅 가이드

---

## 구조

```
main 브랜치      →  소스코드 (src, server 등)
gh-pages 브랜치  →  빌드된 파일 (자동 생성)
```

`main` 에 push 하면 Actions 가 자동으로 빌드 후 `gh-pages` 브랜치에 배포해요.

---

## 세팅 순서

**① `.github/workflows/deploy.yml` 추가**

```
beautiful-word-map/
└── .github/
    └── workflows/
        └── deploy.yml
```

**② `vite.config.js` 확인**

`outDir: "docs"` 줄 없어야 해요.

```js
export default defineConfig({
  base: "/Beautiful-Word-Map/",
  plugins: [react()],
})
```

**③ `.gitignore` 에 추가**

```
dist
docs
```

**④ `dist/`, `docs/` 폴더 삭제 후 push**

```bash
git add .
git commit -m "ci: add GitHub Actions auto deploy"
git push origin main
```

**⑤ GitHub Settings → Pages 설정**

- Branch: `gh-pages`
- Folder: `/ (root)`
- Save!

---

## 배포 흐름

```
git push origin main
       ↓
GitHub Actions 자동 실행
       ↓
npm install → npm run build
       ↓
gh-pages 브랜치에 dist 내용 업로드
       ↓
GitHub Pages 자동 반영
```

---

## 확인 방법

레포 → **Actions 탭** 에서 진행 상황 확인 가능

---

## 앞으로 배포 방법

```bash
git add .
git commit -m "커밋 메시지"
git push origin main
```

`npm run build` 없이 push 만 하면 자동 배포 완료! 🎉