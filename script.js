const translations = {
  fr: { news: "Actualités", ai_chat: "IA Chat", translate: "Traduction", weather: "Météo", images: "Images", videos: "Vidéos", about: "À propos", terms: "Conditions", privacy: "Confidentialité", settings_title: "Paramètres", lang_region: "Langue & Région", appearance: "Apparence", light_theme: "Thème Clair", dark_theme: "Thème Sombre", save: "Enregistrer", saved: "✓ Paramètres enregistrés!", back: "← Retour", search_placeholder: "Rechercher sur Baobab...", ai_title: "✨ Résumé IA par Baobab", ai_summary: "Résumé IA", new_tab: "Nouvel onglet", about_title: "À propos de Baobab Search", about_p1: "Bienvenue sur Baobab Search.", terms_title: "Conditions d'utilisation", terms_p1: "1. Usage légal.", privacy_title: "Politique de confidentialité", privacy_p1: "Votre vie privée est importante." },
  en: { news: "News", ai_chat: "AI Chat", translate: "Translate", weather: "Weather", images: "Images", videos: "Videos", about: "About", terms: "Terms", privacy: "Privacy", settings_title: "Settings", lang_region: "Language & Region", appearance: "Appearance", light_theme: "Light Theme", dark_theme: "Dark Theme", save: "Save", saved: "✓ Settings saved!", back: "← Back", search_placeholder: "Search on Baobab...", ai_title: "✨ AI Summary by Baobab", ai_summary: "AI Summary", new_tab: "New tab", about_title: "About Baobab Search", about_p1: "Welcome to Baobab Search.", terms_title: "Terms of Use", terms_p1: "1. Legal use.", privacy_title: "Privacy Policy", privacy_p1: "Your privacy is important." },
  wo: { news: "Lëndëm", ai_chat: "AI Koor", translate: "Sopi Làkk", weather: "Weer", images: "Nataal", videos: "Video", about: "Ci Baobab", terms: "Yoon yi", privacy: "Sutura", settings_title: "Jëfandikoo", lang_region: "Làkk ak Dëkku", appearance: "Nataal", light_theme: "Leer", dark_theme: "Guddi", save: "Denc", saved: "✓ Denc na!", back: "← Dellu", search_placeholder: "Laaj Baobab...", ai_title: "✨ Résumé AI", ai_summary: "Résumé AI", new_tab: "Fenetra bes", about_title: "Ci Baobab Search", about_p1: "Dalal ak jàmm.", terms_title: "Yoonu Jëfandikoo", terms_p1: "1. Jëf ci wàllu yoon.", privacy_title: "Sutura", privacy_p1: "Sutura la nu daj." }
};

const trends = [
  {q: "angleterre - argentine", n: "20 000+"},
  {q: "météo demain", n: "20 000+"},
  {q: "messi", n: "500+"}
];

let recognition;

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('-translate-x-full');
  document.getElementById('sidebarOverlay').classList.toggle('hidden');
}

function takePhoto() {
  const input = document.getElementById('fileInput');
  input.accept = 'image/*';
  input.capture = 'environment';
  input.click();
}

// MICRO 100% FONCTIONNEL AVEC WEB SPEECH API
function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Votre navigateur ne supporte pas la voix');
    return;
  }
  recognition = new SpeechRecognition();
  recognition.lang = getSettings().language === 'wo'? 'fr-FR' : getSettings().language + '-FR';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    document.getElementById('micIcon').classList.add('text-red-500', 'animate-pulse');
  };
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('searchInput').value = transcript;
    search(); // Lance direct
  };
  recognition.onerror = () => {
    document.getElementById('micIcon').classList.remove('text-red-500', 'animate-pulse');
  };
  recognition.onend = () => {
    document.getElementById('micIcon').classList.remove('text-red-500', 'animate-pulse');
  };
  recognition.start();
}

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

function loadTrends() {
  const list = document.getElementById('trendsList');
  list.innerHTML = trends.map(t => `
    <div onclick="quickSearch('${t.q}')" class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg cursor-pointer">
      <div class="flex items-center gap-4">
        <svg class="w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
        <span>${t.q}</span>
      </div>
      <span class="text-sm text-gray-500">${t.n}</span>
    </div>
  `).join('');
}

function showPage(pageId) {
  // BUG FIX CRITIQUE: On ferme le menu sans le toggle
  document.getElementById('sidebar').classList.add('-translate-x-full');
  document.getElementById('sidebarOverlay').classList.add('hidden');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if(pageId === 'settingsPage') loadSettingsUI();
}

function getSettings() {
  return {
    aiSummary: localStorage.getItem('aiSummary')!== 'false',
    openNewTab: localStorage.getItem('openNewTab')!== 'false',
    safeSearch: localStorage.getItem('safeSearch') === 'true',
    autoComplete: localStorage.getItem('autoComplete') === 'true',
    theme: localStorage.getItem('theme') || 'light',
    language: localStorage.getItem('language') || 'fr'
  };
}

function loadSettingsUI() {
  const s = getSettings();
  document.getElementById('aiSummaryToggle').checked = s.aiSummary;
  document.getElementById('openNewTab').checked = s.openNewTab;
  document.getElementById('safeSearch').checked = s.safeSearch;
  document.getElementById('autoComplete').checked = s.autoComplete;
  document.getElementById('language').value = s.language;
  document.querySelector(`input[name="theme"][value="${s.theme}"]`).checked = true;
}

function quickSearch(query) {
  document.getElementById('searchInput').value = query;
  search();
}

function search(e) {
  if(e) e.preventDefault();
  const s = getSettings();
  const q = document.getElementById('searchInput').value;
  if(!q.trim()) return;
  showPage('resultsPage'); // Ne touche plus au menu
  document.getElementById('aiSummary').style.display = s.aiSummary? 'block' : 'none';
  document.getElementById('aiText').innerText = `Résumé IA pour: ${q}`;
  document.getElementById('resultCount').innerText = `1 résultat`;
}

function saveSettings() {
  localStorage.setItem('aiSummary', document.getElementById('aiSummaryToggle').checked);
  localStorage.setItem('openNewTab', document.getElementById('openNewTab').checked);
  localStorage.setItem('safeSearch', document.getElementById('safeSearch').checked);
  localStorage.setItem('autoComplete', document.getElementById('autoComplete').checked);
  localStorage.setItem('theme', document.querySelector('input[name="theme"]:checked').value);
  applyTheme(document.querySelector('input[name="theme"]:checked').value);
  document.getElementById('saveMsg').classList.remove('hidden');
  setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000);
}

function applyTheme(t) {
  if(t === 'dark') document.documentElement.classList.add('dark');
  else if(t === 'light') document.documentElement.classList.remove('dark');
  else {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTrends();
  const s = getSettings();
  changeLanguage(s.language);
  applyTheme(s.theme);
});
