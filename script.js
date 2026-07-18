let currentTab = 'all';

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}
function goHome() { showPage('homePage'); }

function search(e) {
  if(e) e.preventDefault();
  const query = document.getElementById('searchInput')?.value || document.getElementById('searchInputResults')?.value;
  if(!query) return;
  document.getElementById('searchInputResults').value = query;
  showPage('resultsPage');
  loadResults(query);
}

function loadResults(query) {
  // BAOBAB AI
  if(currentTab === 'ai' || query.includes('?')) {
    document.getElementById('aiBox').classList.remove('hidden');
    document.getElementById('aiAnswer').innerText = `Réponse IA pour: ${query}. Je peux résumer, traduire et expliquer.`;
  } else { document.getElementById('aiBox').classList.add('hidden'); }

  // RESULTATS FAKE
  document.getElementById('resultsList').innerHTML = `
    <div class="result-item">
      <div class="flex items-center gap-2 mb-1"><div class="w-4 h-4 rounded-full bg-[#F1F3F4]"></div><span class="result-url">exemple.com › article</span><span class="text-xs text-[#5F6368]">2 heures</span></div>
      <h3 class="result-title cursor-pointer" onclick="alert('Ouvrir lien')">Titre du résultat pour ${query}</h3>
      <p class="result-desc">Description du résultat avec <b>${query}</b> en gras. Date, icône et actions disponibles.</p>
    </div>
  `;
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');

  const pages = {images: 'imagesPage', videos: 'videosPage', news: 'newsPage', maps: 'mapsPage', shopping: 'shoppingPage', ai: 'aiPage'};
  if(pages[tab]) showPage(pages[tab]); else showPage('resultsPage');
  search();
}

function showAutocomplete(val) {
  const list = document.getElementById('autocompleteList');
  if(val.length < 2) { list.classList.add('hidden'); return; }
  const sug = ['météo', 'actualités', 'traduction', 'calcul'].filter(s => s.startsWith(val));
  list.innerHTML = sug.map(s => `<div onclick="selectSug('${s}')" class="p-3 hover:bg-[#F1F3F4] dark:hover:bg-[#3C4043] cursor-pointer">${s}</div>`).join('');
  list.classList.remove('hidden');
}
function selectSug(s) { document.getElementById('searchInput').value = s; search(); }

function startVoice() { alert('Recherche vocale activée'); }
function takePhoto() { document.getElementById('fileInput').click(); }
function setTheme(theme) {
  if(theme === 'dark') document.documentElement.classList.add('dark');
  else if(theme === 'light') document.documentElement.classList.remove('dark');
  else { if(window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark'); }
  localStorage.setItem('theme', theme);
}
function clearData() { localStorage.clear(); alert('Données supprimées'); }

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme') || 'system';
  document.getElementById('themeSelect').value = theme;
  setTheme(theme);
});
