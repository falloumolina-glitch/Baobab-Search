// MET TES CLES ICI
const API_KEY = "COLLE_TA_CLE_ICI";
const CX = "COLLE_TON_CX_ICI";

let recognition;
let currentTab = 'all';

// MENU FILTRE
function filterMenu() {
  const input = document.getElementById('menuSearch').value.toLowerCase();
  const items = document.querySelectorAll('.menu-item');
  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(input)? 'flex' : 'none';
  });
}

// MET PREFIXE DANS BARRE
function searchPrefix(prefix) {
  toggleSidebar();
  const input = document.getElementById('searchInput');
  input.value = prefix;
  input.focus();
}

// OUVRE CAMERA
function openCamera() {
  toggleSidebar();
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  input.onchange = e => alert('Photo prise! Recherche par image arrive bientôt');
  input.click();
}

function showHistory() {
  toggleSidebar();
  const history = JSON.parse(localStorage.getItem('baobabHistory') || '[]');
  if(history.length === 0) return alert('Aucun historique');
  document.getElementById('searchInput').value = history[0];
  search();
}

function showTrending() {
  toggleSidebar();
  const trends = ["Actualités Sénégal", "Météo Dakar", "Foot", "IA 2026", "Crypto"];
  document.getElementById('searchInput').value = trends[Math.floor(Math.random() * trends.length)];
  search();
}

function startVoiceFromMenu() {
  toggleSidebar();
  startVoice();
}

function openTranslate() {
  toggleSidebar();
  const q = prompt("Colle le texte à traduire:");
  if(q) {
    document.getElementById('searchInput').value = `traduire ${q} en anglais`;
    search();
  }
}

function openCalculator() {
  toggleSidebar();
  const q = prompt("Tape ton calcul: ex: 25*4");
  if(q) {
    document.getElementById('searchInput').value = q;
    search();
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('-translate-x-full');
  document.getElementById('sidebarOverlay').classList.toggle('hidden');
}

function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert('Micro non supporté');
  recognition = new SpeechRecognition();
  recognition.lang = 'fr-FR';
  recognition.onstart = () => document.getElementById('micIcon').classList.add('text-red-500');
  recognition.onresult = (event) => {
    document.getElementById('searchInput').value = event.results[0][0].transcript;
    saveToHistory(event.results[0][0].transcript);
    search();
  };
  recognition.onend = () => document.getElementById('micIcon').classList.remove('text-red-500');
  recognition.start();
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('border-blue-600', 'text-blue-600', 'font-semibold');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  document.getElementById(`tab-${tab}`).classList.add('border-blue-600', 'text-blue-600', 'font-semibold');
  if(document.getElementById('searchInput').value) search();
}

function showPage(pageId) {
  toggleSidebar();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if(pageId === 'settingsPage') loadSettingsUI();
}

function getSettings() {
  return {
    safeSearch: localStorage.getItem('safeSearch') || 'medium',
    theme: localStorage.getItem('theme') || 'light',
    language: localStorage.getItem('language') || 'fr'
  };
}

function loadSettingsUI() {
  const s = getSettings();
  document.getElementById('safeSearch').value = s.safeSearch;
  document.getElementById('language').value = s.language;
  document.querySelector(`input[name="theme"][value="${s.theme}"]`).checked = true;
}

function saveSettings() {
  localStorage.setItem('safeSearch', document.getElementById('safeSearch').value);
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

function changeLanguage(lang) {
  localStorage.setItem('language', lang);
}

function saveToHistory(query) {
  let history = JSON.parse(localStorage.getItem('baobabHistory') || '[]');
  history = [query,...history.filter(h => h!== query)].slice(0, 10);
  localStorage.setItem('baobabHistory', JSON.stringify(history));
}

async function search(e) {
  if(e) e.preventDefault();
  const {safeSearch} = getSettings();
  const q = document.getElementById('searchInput').value;
  if(!q.trim()) return;
  if(API_KEY === "COLLE_TA_CLE_ICI") return alert('Colle la clé API dans script.js');

  saveToHistory(q);
  showPage('resultsPage');
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('resultsList').innerHTML = '';

  let url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(q)}&safe=${safeSearch}`;
  if(currentTab === 'images' || q.startsWith('image:')) url += '&searchType=image';
  if(currentTab === 'news') url += '&sort=date';

  try {
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById('loading').classList.add('hidden');
    if(data.items) {
      document.getElementById('resultCount').innerText = `Environ ${data.searchInformation.totalResults} résultats`;
      document.getElementById('aiText').innerText = `Résultats pour: ${q}`;
      displayResults(data.items);
    }
  } catch(err) {
    document.getElementById('loading').classList.add('hidden');
    alert('Erreur de recherche');
  }
}

function displayResults(items) {
  const list = document.getElementById('resultsList');
  const q = document.getElementById('searchInput').value;
  if(currentTab === 'images' || q.startsWith('image:')) {
    list.className = 'grid grid-cols-3 gap-2';
    list.innerHTML = items.map(item => `
      <a href="${item.image.contextLink}" target="_blank" class="block">
        <img src="${item.link}" class="w-full h-32 object-cover rounded-lg" loading="lazy">
      </a>
    `).join('');
  } else {
    list.className = 'space-y-5';
    list.innerHTML = items.map(item => `
      <div>
        <a href="${item.link}" target="_blank" class="text-blue-600 hover:underline text-lg font-medium">${item.title}</a>
        <p class="text-green-700 dark:text-green-400 text-sm">${item.displayLink}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">${item.snippet}</p>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getSettings().theme);
});
