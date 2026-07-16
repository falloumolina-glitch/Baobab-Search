// ========== BAOBAB IA-TECH SCRIPT.JS v3.0 PRO ==========

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const fakeDB = {
  "messi": { ai: "Lionel Messi est un footballeur argentin. 8 Ballons d'Or.", results: [{url: "wikipedia.org", title: "Lionel Messi - Wikipédia", desc: "Lionel Andrés Messi est un footballeur international argentin."}] },
  "baobab": { ai: "Le baobab est un arbre emblématique d'Afrique. Il peut vivre 1000 ans.", results: [{url: "baobab.sn", title: "Baobab Search", desc: "Le premier moteur de recherche intelligent d'Afrique."}] },
  "default": { ai: "Je suis Baobab IA. Essayez 'messi' ou 'baobab'.", results: [] }
};

// RECUPERE TOUS LES PARAMETRES
function getSettings() {
  return {
    safeSearch: localStorage.getItem('safeSearch') === 'true',
    aiSummary: localStorage.getItem('aiSummary') !== 'false',
    openNewTab: localStorage.getItem('openNewTab') !== 'false',
    resultsPerPage: localStorage.getItem('resultsPerPage') || '10',
    region: localStorage.getItem('region') || 'SN',
    language: localStorage.getItem('language') || 'fr',
    theme: localStorage.getItem('theme') || 'light',
    saveHistory: localStorage.getItem('saveHistory') !== 'false'
  };
}

function search(e) {
  e.preventDefault();
  const settings = getSettings();
  const query = document.getElementById('searchInput').value || document.getElementById('searchInput2').value;
  if(!query) return;

  showPage('resultsPage');
  document.getElementById('searchInput2').value = query;

  // Applique le paramètre Langue/Région
  document.documentElement.lang = settings.language;
  
  const data = fakeDB[query.toLowerCase()] || fakeDB['default'];
  const maxResults = parseInt(settings.resultsPerPage);
  const resultsToShow = data.results.slice(0, maxResults);

  document.getElementById('aiSummary').style.display = settings.aiSummary ? 'block' : 'none';
  document.getElementById('aiText').innerText = data.ai;
  document.getElementById('resultCount').innerText = `Environ ${data.results.length} résultats pour "${query}"`;

  const list = document.getElementById('resultsList');
  list.innerHTML = '';
  resultsToShow.forEach(r => {
    const target = settings.openNewTab ? 'target="_blank"' : '';
    list.innerHTML += `<div class="mb-6"><div class="text-sm text-green-700 dark:text-green-400">${r.url}</div><a href="#" ${target} class="text-xl text-blue-700 hover:underline">${r.title}</a><p class="text-sm text-gray-700 dark:text-gray-300 mt-1">${r.desc}</p></div>`;
  });

  // Sauvegarde l'historique si activé
  if(settings.saveHistory){
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if(!history.includes(query)) history.unshift(query);
    localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 10)));
  }
}

function luckySearch(e) {
  if(e) e.preventDefault();
  document.getElementById('searchInput').value = 'baobab';
  search(e);
}

function saveSettings() {
  localStorage.setItem('safeSearch', document.getElementById('safeSearch').checked);
  localStorage.setItem('aiSummary', document.getElementById('aiSummaryToggle').checked);
  localStorage.setItem('openNewTab', document.getElementById('openNewTab').checked);
  localStorage.setItem('resultsPerPage', document.getElementById('resultsPerPage').value);
  localStorage.setItem('region', document.getElementById('region').value);
  localStorage.setItem('language', document.getElementById('language').value);
  localStorage.setItem('theme', document.querySelector('input[name="theme"]:checked').value);
  localStorage.setItem('saveHistory', document.getElementById('saveHistory').checked);
  
  applyTheme(document.querySelector('input[name="theme"]:checked').value);
  
  document.getElementById('saveMsg').classList.remove('hidden');
  setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000);
}

function clearHistory(){
  if(confirm("Effacer tout ?")){
    localStorage.clear();
    alert('Effacé');
    location.reload();
  }
}

function applyTheme(theme) {
  if(theme === 'auto'){
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if(theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}

// CHARGEMENT DES PARAMETRES
document.addEventListener('DOMContentLoaded', () => {
  const settings = getSettings();
  
  document.getElementById('safeSearch').checked = settings.safeSearch;
  document.getElementById('aiSummaryToggle').checked = settings.aiSummary;
  document.getElementById('openNewTab').checked = settings.openNewTab;
  document.getElementById('resultsPerPage').value = settings.resultsPerPage;
  document.getElementById('region').value = settings.region;
  document.getElementById('language').value = settings.language;
  document.getElementById('saveHistory').checked = settings.saveHistory;
  
  const themeRadio = document.querySelector(`input[name="theme"][value="${settings.theme}"]`);
  if(themeRadio) themeRadio.checked = true;
  
  applyTheme(settings.theme);
});
