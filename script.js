// ========================================
// BAOBAB SEARCH - VERSION GOOGLE GEMINI
// ========================================

// 1. COLLE TA CLÉ GOOGLE CLOUD ICI
const GEMINI_API_KEY = "AIzaSyD6aTPeBpKTBFNNT6LOaXbfmpMG7XWl2V4";

let currentLang = 'fr';
let currentSecurity = 'balanced';
let currentTheme = 'light';

const $ = (id) => document.getElementById(id);

// TRADUCTIONS
const translations = {
  fr: { title: "Baobab Search", tagline: "La recherche africaine, intelligente et respectueuse.", placeholder: "Pose ta question à Baobab...", searching: "Recherche en cours...", aiTitle: "Baobab IA", aiThink: "Réflexion de Baobab IA...", aiBtn: "Demander à Baobab IA", aiSources: "Sources", footer: "Fait avec ❤️ pour l'Afrique. Powered by Google Gemini." },
  wo: { title: "Baobab Seet", tagline: "Seetug Afrik bi, xel te jàmm.", placeholder: "Laj Baobab...", searching: "Dii seet...", aiTitle: "Baobab AI", aiThink: "Xalaat bi... ", aiBtn: "Laj Baobab AI", aiSources: "Lëndëm yi", footer: "Def nañ ko ak bégg. Baobab, garab xam-xam." }
};

// THÈMES
const themes = {
  light: { '--bg': '#F8F5F0', '--text': '#2D241F', '--accent': '#A0522D', '--card': '#FFFFFF', '--border': '#E0DAD1' },
  dark: { '--bg': '#1A1612', '--text': '#F8F5F0', '--accent': '#D4A373', '--card': '#2D241F', '--border': '#4A3F35' }
};

// AU DÉMARRAGE
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  applyTranslations();
  $('#searchBtn').addEventListener('click', performSearch);
  $('#searchInput').addEventListener('keypress', (e) => { if(e.key === 'Enter') performSearch(); });
  $('#aiBtn').addEventListener('click', () => runBaobabAI($('#searchInput').value));
  $('#langSelect').addEventListener('change', (e) => { currentLang = e.target.value; applyTranslations(); });
  $('#securitySelect').addEventListener('change', (e) => { currentSecurity = e.target.value; });
  $('#themeToggle').addEventListener('click', toggleTheme);
});

function applyTranslations() {
  const t = translations[currentLang];
  $('#logoTitle').innerText = t.title;
  $('#tagline').innerText = t.tagline;
  $('#searchInput').placeholder = t.placeholder;
  $('#aiTitle').innerText = t.aiTitle;
  $('#aiBtn').innerText = t.aiBtn;
  $('#aiSourcesLabel').innerText = t.aiSources + ":";
  $('#footerText').innerText = t.footer;
}

function applyTheme() {
  const theme = themes[currentTheme];
  for(const key in theme) { document.documentElement.style.setProperty(key, theme[key]); }
  $('#themeToggle').innerText = currentTheme === 'light'? '🌙' : '☀️';
}

function toggleTheme() {
  currentTheme = currentTheme === 'light'? 'dark' : 'light';
  applyTheme();
}

// RECHERCHE
async function performSearch() {
  const query = $('#searchInput').value.trim();
  if(!query) return;

  $('#results').innerHTML = `<p>${translations[currentLang].searching}</p>`;
  $('#aiBlock').classList.add('hidden');
  $('#aiBtn').classList.remove('hidden');

  const wikiResults = await searchWikipedia(query);
  displayResults(wikiResults, query);

  if(currentSecurity!== 'strong') {
    runBaobabAI(query);
  }
}

async function searchWikipedia(query) {
  const url = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.query.search.slice(0, 5);
  } catch(e) { return []; }
}

function displayResults(results, query) {
  if(results.length === 0) {
    $('#results').innerHTML = `<p>Aucun résultat trouvé pour "${query}"</p>`;
    return;
  }
  $('#results').innerHTML = results.map(r => `
    <div class="result-card">
      <h3><a href="https://fr.wikipedia.org/?curid=${r.pageid}" target="_blank">${r.title}</a></h3>
      <p>${r.snippet.replace(/<[^>]*>/g, '')}...</p>
    </div>
  `).join('');
}

// BAOBAB IA AVEC GOOGLE GEMINI
async function runBaobabAI(query) {
  const aiBlock = $('#aiBlock');
  if(currentSecurity === 'strong') { aiBlock.classList.add('hidden'); return; }
  aiBlock.classList.remove('hidden');
  $('#aiText').innerText = translations[currentLang].aiThink;
  $('#aiBtn').classList.add('hidden');

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{text: `Tu es Baobab IA, un assistant de recherche pour l'Afrique. Réponds en ${currentLang}. Sois utile et chaleureux. Question: ${query}`}]
        }]
      })
    });

    if(!response.ok) throw new Error("Erreur API Google");

    const data = await response.json();
    $('#aiText').innerText = data.candidates[0].content.parts[0].text;
    $('#aiSources').innerHTML = `<span>Source: Google Gemini</span>`;
    $('#aiBtn').classList.remove('hidden');
  } catch (error) {
    $('#aiText').innerText = "Erreur: Vérifie ta clé Google et que l'API Gemini est activée.";
    $('#aiBtn').classList.remove('hidden');
  }
          }
