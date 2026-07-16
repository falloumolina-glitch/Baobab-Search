// BAOBAB IA-TECH SCRIPT.JS v3.0 PRO

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if(pageId === 'historyPage') loadHistory();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getSettings() {
  return {
    safeSearch: localStorage.getItem('safeSearch') === 'true',
    aiSummary: localStorage.getItem('aiSummary')!== 'false',
    openNewTab: localStorage.getItem('openNewTab')!== 'false',
    instantSearch: localStorage.getItem('instantSearch') === 'true',
    resultsPerPage: localStorage.getItem('resultsPerPage') || '10',
    region: localStorage.getItem('region') || 'SN',
    language: localStorage.getItem('language') || 'fr',
    theme: localStorage.getItem('theme') || 'light',
    saveHistory: localStorage.getItem('saveHistory')!== 'false',
    autoDelete: localStorage.getItem('autoDelete') === 'true'
  };
}

const fakeDB = {
  "messi": { ai: "Lionel Messi est un footballeur argentin. 8 Ballons d'Or et vainqueur de la Coupe du Monde 2022.", results: [{url: "wikipedia.org", title: "Lionel Messi - Wikipédia", desc: "Lionel Andrés Messi est un footballeur international argentin."}] },
  "baobab": { ai: "Le baobab est un arbre emblématique d'Afrique. Il peut vivre 1000 ans et stocker 120 000L d'eau.", results: [{url: "baobab.sn", title: "Baobab Search", desc: "Le premier moteur de recherche intelligent d'Afrique."}] },
  "senegal": { ai: "Le Sénégal est un pays d'Afrique de l'Ouest. Capitale: Dakar.", results: [{url: "wikipedia.org", title: "Sénégal - Wikipédia", desc: "Le Sénégal est un pays d'Afrique de l'Ouest."}] },
  "default": { ai: "Je suis Baobab IA. Essayez 'messi', 'baobab' ou 'senegal'.", results: [] }
};

function search(e) {
  if(e) e.preventDefault();
  const settings = getSettings();
  const query = document.getElementById('searchInput').value || document.getElementById('searchInput2').value;
  if(!query) return;

  showPage('resultsPage');
  document.getElementById('searchInput2').value = query;
  document.documentElement.lang = settings.language;
  document.getElementById('footerLocation').innerText = document.getElementById('region').options[document.getElementById('region').selectedIndex].text;

  const data = fakeDB[query.toLowerCase()] || fakeDB['default'];
  const maxResults = parseInt(settings.resultsPerPage);
  const resultsToShow = data.results.slice(0, maxResults);

  document.getElementById('aiSummary').style.display = settings.aiSummary? 'block' : 'none';
  document.getElementById('aiText').innerText = data.ai;
  document.getElementById('resultCount').innerText = `Environ ${data.results.length} résultats`;

  const list = document.getElementById('resultsList');
  list.innerHTML = '';
  resultsToShow.forEach(r => {
    const target = settings.openNewTab? 'target="_blank"' : '';
    list.innerHTML += `<div class="mb-6"><div class="text-sm text-green-700 dark:text-green-400">${r.url}</div><a href="#" ${target} class="text-xl text-blue-700 hover:underline">${r.title}</a><p class="text-sm text-gray-700 dark:text-gray-300 mt-1">${r.desc}</p></div>`;
  });

  if(settings.saveHistory){
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history = history.filter(item => item.query!== query);
    history.unshift({query: query, date: new Date().toISOString()});
    localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 20)));
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
  localStorage.setItem('instantSearch', document.getElementById('instantSearch').checked);
  localStorage.setItem('resultsPerPage', document.getElementById('resultsPerPage').value);
  localStorage.setItem('region', document.getElementById('region').value);
  localStorage.setItem('language', document.getElementById('language').value);
  localStorage.setItem('theme', document.querySelector('input[name="theme"]:checked').value);
  localStorage.setItem('saveHistory', document.getElementById('saveHistory').checked);
  localStorage.setItem('autoDelete', document.getElementById('autoDelete').checked);

  applyTheme(document.querySelector('input[name="theme"]:checked').value);
  document.getElementById('saveMsg').classList.remove('hidden');
  setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000);
}

function clearHistory(){
  if(confirm("Effacer tout l'historique et les paramètres?")){
    localStorage.clear();
    alert('Effacé');
    location.reload();
  }
}

function loadHistory(){
  const list = document.getElementById('historyList');
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if(history.length === 0){ list.innerHTML = "<p>Aucun historique</p>"; return; }
  list.innerHTML = '';
  history.forEach(item => {
    list.innerHTML += `<div onclick="document.getElementById('searchInput').value='${item.query}'; search()" class="p-3 bg-gray-100 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">${item.query}</div>`;
  });
}

function applyTheme(theme) {
  if(theme === 'auto'){ theme = window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark' : 'light'; }
  if(theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}

document.addEventListener('DOMContentLoaded', () => {
  const s = getSettings();
  document.getElementById('safeSearch').checked = s.safeSearch;
  document.getElementById('aiSummaryToggle').checked = s.aiSummary;
  document.getElementById('openNewTab').checked = s.openNewTab;
  document.getElementById('instantSearch').checked = s.instantSearch;
  document.getElementById('resultsPerPage').value = s.resultsPerPage;
  document.getElementById('region').value = s.region;
  document.getElementById('language').value = s.language;
  document.getElementById('saveHistory').checked = s.saveHistory;
  document.getElementById('autoDelete').checked = s.autoDelete;
  document.querySelector(`input[name="theme"][value="${s.theme}"]`).checked = true;
  applyTheme(s.theme);
});
