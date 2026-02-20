// ─────────────────────────────────────────
//  USE_SERVER 설정
//  true  → Express 서버 사용 (로컬 개발)
//  false → localStorage 사용 (GitHub Pages)
// ─────────────────────────────────────────
const USE_SERVER = false;

/* ══════════════════════════════════════════
   SEED DATA (localStorage 최초 실행 시 사용)
══════════════════════════════════════════ */
const SEED_THEMES = [
  { id: "nature_light", emoji: "💡", name: "빛이 머무는 찰나",       description: "자연이 우연히 선물해준 반짝임과 시각적인 아름다움" },
  { id: "fortune",      emoji: "🍀", name: "뜻밖의 행운과 발견",     description: "기대하지 않았던 순간에 찾아온 보물 같은 깨달음" },
  { id: "peace",        emoji: "🍵", name: "마음을 보듬는 안식",     description: "나를 채우고, 쉬게 하고, 단단하게 만드는 힘" },
  { id: "nature_elem",  emoji: "🌿", name: "자연의 숨결을 닮은 단어", description: "자연의 요소에서 길어올린 시적인 단어들" },
  { id: "attitude",     emoji: "☕", name: "삶의 태도와 평온",       description: "균형 잡힌 삶과 내면의 고요에 관하여" },
  { id: "perspective",  emoji: "🎨", name: "타인과 나를 잇는 시선",  description: "나와 세계, 타인을 바라보는 아름다운 시각들" },
  { id: "korean",       emoji: "✨", name: "한국어의 결",            description: "오직 한국어만이 담을 수 있는 고운 감각들" },
];

const SEED_WORDS = [
  { id: 1,  language: "한국어",      flag: "🇰🇷", word: "윤슬",        pronunciation: "윤슬",          meaning: "햇빛이나 달빛에 비쳐 반짝이는 잔물결.",                          example: ["강변 카페에서 물멍하며 반짝이는 강물을 볼 때.", "오후의 햇살을 머금은 윤슬이 보석처럼 빛나고 있어."],             themeId: "nature_light" },
  { id: 2,  language: "일본어",      flag: "🇯🇵", word: "木漏れ日",     pronunciation: "코모레비",       meaning: "나뭇잎 사이로 쏟아지는 부드러운 햇살.",                           example: ["숲길을 걷다 나무 아래 줄무늬 햇빛이 보일 때.", "벤치에 앉아 Komorebi를 바라보고 있으니 시간이 멈춘 것 같아."],   themeId: "nature_light" },
  { id: 3,  language: "그리스어/영어", flag: "🌐", word: "Petrichor",   pronunciation: "페트리코",       meaning: "비 온 뒤 땅에서 올라오는 맑은 흙내음.",                           example: ["소나기가 그친 뒤 창문을 열어 숨을 크게 들이마실 때.", "창문을 여니 Petrichor 향이 가득해. 마음이 차분해지는 기분이야."], themeId: "nature_light" },
  { id: 4,  language: "그리스어/영어", flag: "🌐", word: "Ephemeral",   pronunciation: "이페머럴",       meaning: "순식간에 사라지는 덧없는 아름다움.",                              example: ["5분이면 사라질 핑크빛 노을을 급히 사진에 담을 때.", "청춘은 Ephemeral해서 더 눈부시게 아름다운 법이지."],             themeId: "nature_light" },
  { id: 5,  language: "영어",         flag: "🇬🇧", word: "Serendipity", pronunciation: "세렌디피티",    meaning: "우연히 찾아온 보물 같은 행운, 뜻밖의 재미있는 발견.",             example: ["길을 잃었는데 평생 단골이 될 것 같은 맛집을 발견했을 때.", "서점에서 우연히 집어 든 책이 인생 책이 되다니, 정말 Serendipity야."], themeId: "fortune" },
  { id: 6,  language: "영어(신조어)",  flag: "🇬🇧", word: "Sonder",     pronunciation: "손더",          meaning: "타인도 나만큼 복잡하고 생생한 삶을 산다는 깨달음.",               example: ["횡단보도를 건너는 수많은 사람을 보며 각자의 우주를 상상할 때.", "만원 지하철 속 사람들을 보며 문득 Sonder를 느꼈어."],      themeId: "fortune" },
  { id: 7,  language: "한국어",       flag: "🇰🇷", word: "시나브로",    pronunciation: "시나브로",       meaning: "모르는 사이에 조금씩 조금씩.",                                    example: ["거울을 보니 나도 모르게 머리카락이 쑥 자라 있을 때.", "추웠던 겨울이 가고, 시나브로 봄이 우리 곁에 다가왔네."],        themeId: "fortune" },
  { id: 8,  language: "스페인어",     flag: "🇪🇸", word: "Querencia",  pronunciation: "케렌시아",       meaning: "지친 몸과 마음이 온전히 쉴 수 있는 나만의 안식처.",               example: ["퇴근 후 좋아하는 조명만 켜둔 채 소파에 파묻힐 때.", "내 방 침대 옆 조명 아래가 나에게는 가장 완벽한 Querencia야."],  themeId: "peace" },
  { id: 9,  language: "덴마크어",     flag: "🇩🇰", word: "Hygge",      pronunciation: "휘게",           meaning: "소중한 사람들과 함께하는 소박하고 아늑한 행복의 분위기.",         example: ["비 오는 밤, 귤을 까먹으며 친구와 도란도란 수다 떨 때.", "주말 저녁 친구들과의 Hygge한 시간 덕분에 다시 힘이 나."],      themeId: "peace" },
  { id: 10, language: "그리스어",     flag: "🇬🇷", word: "Meraki",     pronunciation: "메라키",         meaning: "어떤 일을 할 때 영혼과 창의성, 사랑을 듬뿍 쏟아붓는 상태.",     example: ["누군가를 위해 정성껏 편지를 쓰거나 요리를 완성했을 때.", "이 편지는 나의 Meraki를 가득 담아 쓴 거야."],                  themeId: "peace" },
  { id: 11, language: "한국어",       flag: "🇰🇷", word: "그루잠",     pronunciation: "그루잠",         meaning: "깨었다가 다시 달콤하게 드는 잠.",                                 example: ["알람 소리에 깼다가 '오늘 주말이지!' 하며 다시 눈 감을 때.", "비 오는 일요일 아침에 즐기는 그루잠은 무엇보다 달콤해."],    themeId: "peace" },
  { id: 12, language: "이탈리아어",   flag: "🇮🇹", word: "Chiaroscuro", pronunciation: "키아로스쿠로",  meaning: "강렬한 빛과 어둠의 대비, 명암의 조화.",                          example: "강렬한 햇살이 나무 그림자를 짙게 만들 때 생기는 빛과 어둠의 조화.",          themeId: "nature_elem" },
  { id: 13, language: "그리스어",     flag: "🇬🇷", word: "Psithurism", pronunciation: "싸이더리즘",     meaning: "나뭇잎 사이를 스치는 바람 소리, 그 바스락거리는 속삭임.",        example: "숲속에서 바람이 나뭇잎을 스칠 때 나는 그 고요한 소리에 귀 기울일 때.",      themeId: "nature_elem" },
  { id: 14, language: "포르투갈어",   flag: "🇵🇹", word: "Nefelibata", pronunciation: "네펠리바타",     meaning: "구름 위를 걷는 사람. 현실에 얽매이지 않고 꿈꾸는 자유로운 영혼.", example: "하늘을 보며 아무 생각 없이 구름 모양을 그려보고 싶어질 때.",                themeId: "nature_elem" },
  { id: 15, language: "프랑스어",     flag: "🇫🇷", word: "Serein",     pronunciation: "서레인",         meaning: "구름 없는 맑은 하늘에서 내리는 신비로운 비.",                    example: "맑은 하늘인데 어디선가 빗방울이 톡 하고 떨어지는 신비로운 순간.",            themeId: "nature_elem" },
  { id: 16, language: "하와이어",     flag: "🌐",  word: "Laniakea",  pronunciation: "라니아케아",      meaning: "헤아릴 수 없는 천국. 광활한 우주를 마주했을 때의 경외감.",       example: "끝없이 펼쳐진 밤하늘이나 바다를 바라보며 내가 작아지는 느낌을 받을 때.",    themeId: "nature_elem" },
  { id: 17, language: "스웨덴어",     flag: "🇸🇪", word: "Lagom",      pronunciation: "라고옴",         meaning: "모자라지도 넘치지도 않는 딱 적당한 상태.",                       example: "화려하진 않아도 나에게는 이 정도의 삶이 딱 Lagom이야.",                      themeId: "attitude" },
  { id: 18, language: "일본어",       flag: "🇯🇵", word: "侘び寂び",   pronunciation: "와비사비",        meaning: "불완전하고 낡은 것 속에서 세월의 멋과 아름다움을 찾아내는 미학.", example: "조금 투박하지만 이 그릇에 담긴 Wabi-sabi가 마음에 들어.",                    themeId: "attitude" },
  { id: 19, language: "그리스어",     flag: "🇬🇷", word: "Ataraxia",  pronunciation: "아타락시아",      meaning: "걱정과 근심이 없는 절대적인 마음의 평안, 완벽한 평정심.",        example: "명상을 마친 후 찾아오는 Ataraxia의 상태를 사랑해.",                          themeId: "attitude" },
  { id: 20, language: "프랑스어",     flag: "🇫🇷", word: "Flâneur",   pronunciation: "플라네르",        meaning: "목적 없이 한가롭게 거닐며 세상을 관찰하는 자유로운 산책자.",     example: "오늘은 서두르지 않고 Flâneur처럼 이 도시를 즐겨볼래.",                       themeId: "perspective" },
  { id: 21, language: "그리스어",     flag: "🇬🇷", word: "Eunoia",    pronunciation: "유노이아",        meaning: "타인을 향한 선의, 그리고 맑고 아름다운 정신.",                   example: "그녀의 미소에는 사람을 기분 좋게 하는 Eunoia가 있어.",                       themeId: "perspective" },
  { id: 22, language: "한국어",       flag: "🇰🇷", word: "아람",       pronunciation: "아람",           meaning: "밤이나 도토리 따위가 충분히 익어 저절로 떨어진 상태. 때가 되어 얻은 결실.", example: "오랜 노력 끝에 내 꿈이 드디어 아람처럼 결실을 보았어.",           themeId: "korean" },
  { id: 23, language: "한국어",       flag: "🇰🇷", word: "안다미로",   pronunciation: "안다미로",        meaning: "그릇에 넘치도록 많이. 정이나 사랑이 가득 담긴 넉넉한 대접.",     example: "어머니가 차려주신 밥상에는 사랑이 안다미로 담겨 있었다.",                    themeId: "korean" },
  { id: 24, language: "한국어",       flag: "🇰🇷", word: "나비잠",     pronunciation: "나비잠",         meaning: "갓난아이가 두 팔을 머리 위로 벌리고 편안히 자는 잠.",            example: "세상 걱정 하나 없는 아이의 나비잠을 보니 내 마음도 편안해져.",               themeId: "korean" },
  { id: 25, language: "한국어",       flag: "🇰🇷", word: "미리내",     pronunciation: "미리내",         meaning: "은하수의 순우리말. 밤하늘에 길게 늘어선 별무리.",                example: "시골 밤하늘을 올려다보니 미리내가 쏟아질 듯 흐르고 있더라.",                 themeId: "korean" },
  { id: 26, language: "라틴어",       flag: "🌐",  word: "Aestivate", pronunciation: "에스티베이트",    meaning: "뜨거운 여름을 견디며 휴식을 취하는 상태. 여름을 나다.",          example: "나무 그늘 아래서 바람을 맞으며 아무것도 하지 않는 오후.",                    themeId: "nature_elem" },
];

/* ══════════════════════════════════════════
   SERVER API (USE_SERVER = true)
══════════════════════════════════════════ */
const SERVER_URL = "http://localhost:3001/api";

const _json = (res) => res.json();
const _post = (url, body) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(_json);
const _put  = (url, body) => fetch(url, { method: "PUT",  headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(_json);
const _del  = (url)       => fetch(url, { method: "DELETE" }).then(_json);

const serverApi = {
  getWords:    ()         => fetch(`${SERVER_URL}/words`).then(_json),
  addWord:     (word)     => _post(`${SERVER_URL}/words`, word),
  updateWord:  (id, word) => _put(`${SERVER_URL}/words/${id}`, word),
  deleteWord:  (id)       => _del(`${SERVER_URL}/words/${id}`),
  getThemes:   ()         => fetch(`${SERVER_URL}/themes`).then(_json),
  addTheme:    (theme)    => _post(`${SERVER_URL}/themes`, theme),
  deleteTheme: (id)       => _del(`${SERVER_URL}/themes/${id}`),
};

/* ══════════════════════════════════════════
   LOCAL STORAGE API (USE_SERVER = false)
══════════════════════════════════════════ */
const LS_W = "bwm_words_v1";
const LS_T = "bwm_themes_v1";

const lsGet  = (key, seed) => {
  try {
    const val = JSON.parse(localStorage.getItem(key));
    // null이거나 빈 배열이면 시드 데이터 반환
    if (!val || (Array.isArray(val) && val.length === 0)) return seed;
    return val;
  } catch { return seed; }
};
const lsSet  = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const localApi = {
  getWords:    ()         => Promise.resolve(lsGet(LS_W, SEED_WORDS)),
  addWord:     (word)     => {
    const newWord = { ...word, id: Date.now() };
    const words = lsGet(LS_W, SEED_WORDS);
    lsSet(LS_W, [newWord, ...words]);
    return Promise.resolve(newWord);
  },
  updateWord:  (id, word) => {
    const words = lsGet(LS_W, SEED_WORDS);
    lsSet(LS_W, words.map(w => w.id === id ? word : w));
    return Promise.resolve({ ok: true });
  },
  deleteWord:  (id)       => {
    const words = lsGet(LS_W, SEED_WORDS);
    lsSet(LS_W, words.filter(w => w.id !== id));
    return Promise.resolve({ ok: true });
  },
  getThemes:   ()         => Promise.resolve(lsGet(LS_T, SEED_THEMES)),
  addTheme:    (theme)    => {
    const themes = lsGet(LS_T, SEED_THEMES);
    lsSet(LS_T, [...themes, theme]);
    return Promise.resolve(theme);
  },
  deleteTheme: (id)       => {
    const themes = lsGet(LS_T, SEED_THEMES);
    lsSet(LS_T, themes.filter(t => t.id !== id));
    return Promise.resolve({ ok: true });
  },
};

/* ══════════════════════════════════════════
   EXPORT
══════════════════════════════════════════ */
export const api = USE_SERVER ? serverApi : localApi;