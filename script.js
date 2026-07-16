const trends = [
  {q: "angleterre - argentine", n: "20 000+"},
  {q: "météo demain", n: "20 000+"},
  {q: "messi", n: "500+"},
  {q: "final coupe du monde 2026", n: "1 000+"}
];

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('-translate-x-full');
  document.getElementById('sidebarOverlay').classList.toggle('hidden');
}

function uploadFile(type) {
  const input = document.getElementById('fileInput');
  input.accept = type === 'image'? 'image/*' : '*/*';
  input.click();
  input.onchange = (e) => {
    const file = e.target.files[0];
    if(file) alert(`${type === 'image'? 'Photo' : 'Document'} sélectionné: ${file.name}`);
  }
}

function takePhoto() {
  const input = document.getElementById('fileInput');
  input.accept = 'image/*';
  input.capture = 'environment';
  input.click();
}

function startVoice() {
  const mic = document.getElementById('micIcon');
  mic.classList.add('text-red-500', 'animate-pulse');
  alert('Reconnaissance vocale - Bientôt disponible');
  setTimeout(() => mic.classList.remove('text-red-500', 'animate-pulse'), 1000);
}

function loadTrends() {
  const list = document.getElementById('trendsList');
  list.innerHTML = trends.map(t => `
    <div onclick="quickSearch('${t.q}')" class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg cursor-pointer">
      <div class="flex items-center gap-4">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
        <span>${t.q}</span>
      </div>
      <span class="text-sm text-gray-500">${t.n}</span>
    </div>
  `).join('');
}

function showPage(pageId) {
  toggleSidebar();
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
    saveHistory: localStorage.getItem('saveHistory')!== 'false',
    resultsPerPage: localStorage.getItem('resultsPerPage') || '10',
    language: localStorage.getItem('language') || 'fr',
    theme: localStorage.getItem('theme') || 'light'
  };
}

function loadSettingsUI() {
  const s = getSettings();
  document.getElementById('aiSummaryToggle').checked = s.aiSummary;
  document.getElementById('openNewTab').checked = s.openNewTab;
  document.getElementById('safeSearch').checked = s.safeSearch;
  document.getElementById('autoComplete').checked = s.autoComplete;
  document.getElementById('saveHistory').checked = s.saveHistory;
  document.getElementById('resultsPerPage').value = s.resultsPerPage;
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
  showPage('resultsPage');
  document.getElementById('aiSummary').style.display = s.aiSummary? 'block' : 'none';
  document.getElementById('aiText').innerText = `Résumé IA pour: ${q}`;
  document.getElementById('resultCount').innerText = `1 résultat`;
  document.getElementById('resultsList').innerHTML = `<div><p class="text-xs text-green-700">baobab.sn</p><a href="#" ${s.openNewTab?'target="_blank"':''} class="text-lg text-blue-700 hover:underline font-medium">Résultat pour ${q}</a></div>`;

  if(s.saveHistory) {
    let h = JSON.parse(localStorage.getItem('searchHistory')) || [];
    h.unshift({query: q, date: new Date().toLocaleString()});
    localStorage.setItem('searchHistory', JSON.stringify(h.slice(0, 50)));
  }
}

function saveSettings() {
  localStorage.setItem('aiSummary', document.getElementById('aiSummaryToggle').checked);
  localStorage.setItem('openNewTab', document.getElementById('openNewTab').checked);
  localStorage.setItem('safeSearch', document.getElementById('safeSearch').checked);
  localStorage.setItem('autoComplete', document.getElementById('autoComplete').checked);
  localStorage.setItem('saveHistory', document.getElementById('saveHistory').checked);
  localStorage.setItem('resultsPerPage', document.getElementById('resultsPerPage').value);
  localStorage.setItem('language', document.getElementById('language').value);
  localStorage.setItem('theme', document.querySelector('input[name="theme"]:checked').value);
  applyTheme(document.querySelector('input[name="theme"]:checked').value);
  document.getElementById('saveMsg').classList.remove('hidden');
  setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000);
}

function clearHistory() {
  if(confirm("Effacer tout l'historique?")) {
    localStorage.removeItem('searchHistory');
    alert('Historique effacé');
  }
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
  applyTheme(getSettings().theme);
});
