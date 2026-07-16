const API_KEY = "COLLE_TA_CLE_ICI";
const CX = "COLLE_TON_CX_ICI";
let currentTab = 'all';

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function searchQuick(q) {
  document.getElementById('searchInput').value = q;
  search();
}

function submitSearch() {
  search();
}

function search(e) {
  if(e) e.preventDefault();
  const q = document.getElementById('searchInput').value;
  if(!q.trim()) return;
  showPage('resultsPage');
  document.getElementById('loading').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('aiText').innerText = `Baobab IA a analysé "${q}" et voici le résumé intelligent...`;
    document.getElementById('resultCount').innerText = `Environ 1,240,000 résultats`;
    document.getElementById('resultsList').innerHTML = `<div><a href="#" class="text-blue-600 text-lg font-medium">${q} - Résultat Baobab</a><p class="text-sm">Ceci est un résultat unique généré par Baobab IA</p></div>`;
  }, 800);
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('border-baobab-orange', 'text-baobab-orange', 'font-bold');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  document.getElementById(`tab-${tab}`).classList.add('border-baobab-orange', 'text-baobab-orange', 'font-bold');
}

function startVoice() { 
  document.getElementById('micIcon').classList.add('text-baobab-orange');
  setTimeout(() => document.getElementById('micIcon').classList.remove('text-baobab-orange'), 2000);
}

function playVideo() { alert('Lecture vidéo Baobab'); }
function likeVideo(btn) { btn.innerText = btn.innerText === '♡' ? '♥' : '♡'; }
function shareVideo() { navigator.share ? navigator.share({title: 'Baobab'}) : alert('Lien copié'); }
function moreOptions() { alert('Options Baobab'); }
function showHistory() { alert('Historique Baobab ouvert'); }
function clearCookies() { localStorage.clear(); alert('Données Baobab supprimées'); }
function saveSettings() { localStorage.setItem('safe', document.getElementById('safeToggle').checked); }
function changeLanguage(l) { document.getElementById('currentLang').innerText = l === 'fr' ? 'Français' : 'English'; }
