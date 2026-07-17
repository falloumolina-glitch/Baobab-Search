const YOUTUBE_KEY = "COLLE_TA_CLE_ICI";
let currentTab = 'all';
let currentQuery = '';
let recognition;

function getSettings() {
  return {
    userName: localStorage.getItem('userName') || '',
    userEmail: localStorage.getItem('userEmail') || '',
    uiLanguage: localStorage.getItem('uiLanguage') || 'fr',
    resultsLanguage: localStorage.getItem('resultsLanguage') || 'any',
    region: localStorage.getItem('region') || 'sn',
    timeFilter: localStorage.getItem('timeFilter') || 'any',
    verbatim: localStorage.getItem('verbatim') === 'true',
    saveHistory: localStorage.getItem('saveHistory')!== 'false',
    personalization: localStorage.getItem('personalization') === 'true',
    safeSearch: localStorage.getItem('safeSearch') || 'off',
    barPosition: localStorage.getItem('barPosition') || 'top',
    autocomplete: localStorage.getItem('autocomplete')!== 'false',
    openNewTab: localStorage.getItem('openNewTab') === 'true',
    voiceSearch: localStorage.getItem('voiceSearch')!== 'false',
    twoFactor: localStorage.getItem('twoFactor') === 'true',
    theme: localStorage.getItem('theme') || 'system'
  }
}

function saveSettings() {
  localStorage.setItem('userName', document.getElementById('userName').value);
  localStorage.setItem('userEmail', document.getElementById('userEmail').value);
  localStorage.setItem('uiLanguage', document.getElementById('uiLanguage').value);
  localStorage.setItem('resultsLanguage', document.getElementById('resultsLanguage').value);
  localStorage.setItem('region', document.getElementById('region').value);
  localStorage.setItem('timeFilter', document.getElementById('timeFilter').value);
  localStorage.setItem('verbatim', document.getElementById('verbatim').checked);
  localStorage.setItem('saveHistory', document.getElementById('saveHistory').checked);
  localStorage.setItem('personalization', document.getElementById('personalization').checked);
  localStorage.setItem('safeSearch', document.getElementById('safeSearch').value);
  localStorage.setItem('barPosition', document.getElementById('barPosition').value);
  localStorage.setItem('autocomplete', document.getElementById('autocomplete').checked);
  localStorage.setItem('openNewTab', document.getElementById('openNewTab').checked);
  localStorage.setItem('voiceSearch', document.getElementById('voiceSearch').checked);
  localStorage.setItem('twoFactor', document.getElementById('twoFactor').checked);
  localStorage.setItem('theme', document.getElementById('theme').value);
  applyTheme();
  applyBarPosition();
  document.getElementById('saveMsg').classList.remove('hidden');
  setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000);
}

function applyTheme() {
  const theme = getSettings().theme;
  if(theme === 'system') {
    document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
  } else {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}

function applyBarPosition() {
  const pos = getSettings().barPosition;
  if(pos === 'bottom') {
    document.getElementById('topBar').classList.add('hidden');
    document.getElementById('bottomBar').classList.remove('hidden');
  } else {
    document.getElementById('topBar').classList.remove('hidden');
    document.getElementById('bottomBar').classList.add('hidden');
  }
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0,0);
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('border-blue-600', 'text-blue-600', 'font-semibold'));
  document.getElementById(`tab-${tab}`).classList.add('border-blue-600', 'text-blue-600', 'font-semibold');
  if(currentQuery) search();
}

function takePhoto() { 
  document.getElementById('fileInput').click(); 
}

function startVoice(iconId) {
  if(!getSettings().voiceSearch) return alert("Recherche vocale désactivée dans Paramètres");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert('Voix non supportée');
  recognition = new SpeechRecognition();
  recognition.lang = getSettings().uiLanguage + '-FR';
  document.getElementById(iconId).classList.add('text-red-500', 'animate-pulse');
  recognition.onresult = (event) => {
    document.getElementById('searchInput').value = event.results[0][0].transcript;
    search();
  };
  recognition.onend = () => document.getElementById(iconId).classList.remove('text-red-500', 'animate-pulse');
  recognition.start();
}

function buildSearchUrl(query) {
  const s = getSettings();
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${encodeURIComponent(query)}`;
  if(s.resultsLanguage!== 'any') url += `&relevanceLanguage=${s.resultsLanguage}`;
  if(s.region) url += `&regionCode=${s.region}`;
  if(s.timeFilter === 'day') url += `&publishedAfter=${new Date(Date.now()-86400000).toISOString()}`;
  if(s.safeSearch === 'on') url += `&safeSearch=strict`;
  if(s.safeSearch === 'blur') url += `&safeSearch=moderate`;
  return url + `&key=${YOUTUBE_KEY}`;
}

async function search(event) {
  if(event) event.preventDefault();
  let query = document.getElementById('searchInput')?.value || document.getElementById('searchInputResults').value;
  if(!query) return;

  const s = getSettings();
  if(s.verbatim) query = `"${query}"`;

  if(s.saveHistory) {
    let history = JSON.parse
