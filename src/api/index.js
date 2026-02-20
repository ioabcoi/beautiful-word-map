const API = "http://localhost:3001/api";

const json = (res) => res.json();
const post = (url, body) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(json);
const put  = (url, body) => fetch(url, { method: "PUT",  headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(json);
const del  = (url)       => fetch(url, { method: "DELETE" }).then(json);

export const api = {
  getWords:    ()         => fetch(`${API}/words`).then(json),
  addWord:     (word)     => post(`${API}/words`, word),
  updateWord:  (id, word) => put(`${API}/words/${id}`, word),
  deleteWord:  (id)       => del(`${API}/words/${id}`),

  getThemes:   ()         => fetch(`${API}/themes`).then(json),
  addTheme:    (theme)    => post(`${API}/themes`, theme),
  deleteTheme: (id)       => del(`${API}/themes/${id}`),
};