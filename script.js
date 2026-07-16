const translations = {
  fr: { workspace: "Workspace", drive: "Drive", docs: "Docs", history: "🕒 Historique", settings: "⚙️ Paramètres", subtitle: "L'IA de la connaissance", search_placeholder: "Demande à Baobab IA...", search_btn: "Baobab Search", lucky_btn: "J'ai de la chance", all: "Tous", images: "Images", videos: "Vidéos", news: "Actualités", maps: "Maps", ai_title: "✨ Résumé IA", settings_title: "Paramètres", search_settings: "Recherche", ai_summary: "Afficher le résumé IA", new_tab: "Ouvrir dans un nouvel onglet", language: "Langue", appearance: "Apparence", light_theme: "Thème Clair", dark_theme: "Thème Sombre", save: "Enregistrer", saved: "✓ Paramètres enregistrés!", back_home: "← Retour", history_title: "Historique" },
  en: { workspace: "Workspace", drive: "Drive", docs: "Docs", history: "🕒 History", settings: "⚙️ Settings", subtitle: "The AI of Knowledge", search_placeholder: "Ask Baobab AI...", search_btn: "Baobab Search", lucky_btn: "I'm Feeling Lucky", all: "All", images: "Images", videos: "Videos", news: "News", maps: "Maps", ai_title: "✨ AI Summary", settings_title: "Settings", search_settings: "Search", ai_summary: "Show AI Summary", new_tab: "Open results in new tab", language: "Language", appearance: "Appearance", light_theme: "Light Theme", dark_theme: "Dark Theme", save: "Save", saved: "✓ Settings saved!", back_home: "← Back", history_title: "History" },
  wo: { workspace: "Liggeey", drive: "Drive", docs: "Docs", history: "🕒 Dencitaay", settings: "⚙️ Jëfandikoo", subtitle: "AI bi ci xam-xam", search_placeholder: "Laaj Baobab AI...", search_btn: "Baobab Search", lucky_btn: "Ma nekk na ci wàllu ma", all: "Lépp", images: "Nataal", videos: "Video", news: "Lumiy jëf", maps: "Carte", ai_title: "✨ Résumé AI", settings_title: "Jëfandikoo", search_settings: "Laaj", ai_summary: "Wone Résumé AI", new_tab: "Ubi ci fereet bu bees", language: "Làkk", appearance: "Nataal", light_theme: "Leer", dark_theme: "Guddi", save: "Denc", saved: "✓ Denc na!", back_home: "← Dellu", history_title: "Dencitaay" }
};

function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if(translations[key]) el.innerText = translations[key];
  });
  document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
    const key = el.getAttribute('data-lang-placeholder');
    if(translations[key]) el.placeholder = translations[key];
  });
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if(pageId === 'historyPage') loadHistory();
}

function getSettings() {
  return {
    safeSearch: localStorage.getItem('safeSearch') === 'true',
    aiSummary: localStorage.getItem('aiSummary')!== 'false',
    openNewTab: localStorage.getItem('openNewTab')!== 'false',
    language: localStorage.getItem('language') || 'fr',
    theme: localStorage.getItem('theme') || 'light'
  };
}

const fakeDB = {
  "messi": { ai: "Lionel Messi est un footballeur argentin 8x Ballon d'Or.", results: [{url: "wikipedia.org › Lionel_Messi", title: "Lionel Messi - Wikipédia", desc: "Lionel Andrés Messi est un footballeur international argentin."}] },
  "default": { ai: "Essayez 'messi'", results: [] }
};

function search(e) {
  e.preventDefault();
  const s = getSettings();
  const q = document.getElementById('searchInput').value || document.getElementById('searchInput2').value;
  if(!q.trim()) return;
  showPage('resultsPage');
  document.getElementById('searchInput2').value = q;
  const data = fakeDB[q.toLowerCase()] || fakeDB['default'];
  document.getElementById('aiSummary').style.display = s.aiSummary? 'block' : 'none';
  document.getElementById('aiText').innerText = data.ai;
  document.getElementById('resultCount').innerText = data.results.length + " résultats";
  const list = document.getElementById('resultsList');
  list.innerHTML = '';
  data.results.forEach(r => {
    const t = s.openNewTab? 'target="_blank"' : '';
    list.innerHTML += `<div><div class="text-sm text-green-700">${r.url}</div><a href="#" ${t} class="text-lg text-blue-700 dark:text-blue-400 hover:underline">${r.title}</a><p class="text-sm">${r.desc}</p></div>`;
  });
  let h = JSON.parse(localStorage.getItem('searchHistory')) || [];
  h.unshift({query: q, date: new Date().toLocaleString()});
  localStorage.setItem('searchHistory', JSON.stringify(h.slice(0, 20)));
}

function luckySearch(e) {
  e.preventDefault();
  document.getElementById('searchInput').value = 'messi';
  search(e);
}

function saveSettings() {
  localStorage.setItem('safeSearch', document.getElementById('safeSearch').checked);
  localStorage.setItem('aiSummary', document.getElementById('aiSummaryToggle').checked);
  localStorage.setItem('openNewTab', document.getElementById('openNewTab').checked);
  localStorage.setItem('language', document.getElementById('language').value);
  localStorage.setItem('theme', document.querySelector('input[name="theme"]:checked').value);
  applyTheme(document.querySelector('input[name="theme"]:checked').value);
  document.getElementById('saveMsg').classList.remove('hidden');
  setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000);
}

function loadHistory(){ const list = document.getElementById('historyList'); const h = JSON.parse(localStorage.getItem('searchHistory')) || []; list.innerHTML = h.map(i => `<div class="p-2 border-b">${i.query} - ${i.date}</div>`).join('') || "Aucun"; }

function applyTheme(t) {
  if(t === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}

document.addEventListener('DOMContentLoaded', () => {
  const s = getSettings();
  if(document.getElementById('safeSearch')) document.getElementById('safeSearch').checked = s.safeSearch;
  if(document.getElementById('aiSummaryToggle')) document.getElementById('aiSummaryToggle').checked = s.aiSummary;
  if(document.getElementById('openNewTab')) document.getElementById('openNewTab').checked = s.openNewTab;
  if(document.getElementById('language')) document.getElementById('language').value = s.language;
  const themeRadio = document.querySelector(`input[name="theme"][value="${s.theme}"]`);
  if(themeRadio) themeRadio.checked = true;
  changeLanguage(s.language);
  applyTheme(s.theme);
});
