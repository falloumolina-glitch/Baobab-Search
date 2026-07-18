// ========================================
// BAOBAB SEARCH - VERSION AVEC IA GROQ
// ========================================

// COLLE TA CLÉ GROQ ICI. Elle commence par gsk_
const GEMINI_API_KEY = "AQ.Ab8RN6L6XnRBAiaSRhJd3UTg0-iep0d1I93rUQVgeLSgqSlipA"; 

let currentLang = 'fr';
let currentSecurity = 'balanced';
let currentTheme = 'light';

const $ = (id) => document.getElementById(id);

// TRADUCTIONS
const translations = {
  fr: { title: "Baobab Search", tagline: "La recherche africaine, intelligente et respectueuse.", placeholder: "Pose ta question à Baobab...", searching: "Recherche en cours...", aiTitle: "Baobab IA", aiThink: "Réflexion de Baobab IA...", aiBtn: "Demander à Baobab IA", aiSources: "Sources", footer: "Fait avec ❤️ pour l'Afrique. Inspiré par le Baobab, arbre de sagesse." },
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

  // ICI ON APPELLE WIKIPEDIA + IA
  const wikiResults = await searchWikipedia(query);
  displayResults(wikiResults, query);
  
  // On lance l'IA en fond
  if(currentSecurity!== 'strong') {
    runBaobabAI(query);
  }
}

async function searchWikipedia(query) {
  const lang = currentLang === 'wo'? 'fr' : currentLang; // Wikipedia wolof limité
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

// BAOBAB IA AVEC GROQ
async function runBaobabAI(query) {
  const aiBlock = $('#aiBlock');
  if(currentSecurity === 'strong') { aiBlock.classList.add('hidden'); return; }
  aiBlock.classList.remove('hidden');
  $('#aiText').innerText = translations[currentLang].aiThink;
  $('#aiBtn').classList.add('hidden');

  try {
    const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${GEMINI_API_KEY}` 
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {role: "system", content: `Tu es Baobab IA, un assistant de recherche pour l'Afrique. Réponds de manière claire, utile et chaleureuse en ${currentLang}. Donne des infos concrètes.`},
          {role: "user", content: query}
        ]
      })
    });
    
    if(!response.ok) throw new Error("API Error");
    
    const data = await response.json();
    $('#aiText').innerText = data.choices[0].message.content;
    $('#aiSources').innerHTML = `<span>Source: Llama 3 par Groq</span>`;
    $('#aiBtn').classList.remove('hidden');
  } catch (error) { 
    $('#aiText').innerText = "Erreur API. Vérifie que ta clé gsk_ est bien collée ligne 5."; 
    $('#aiBtn').classList.remove('hidden');
  }
       }
