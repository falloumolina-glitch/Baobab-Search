const YOUTUBE_KEY = "COLLE_TA_CLE_ICI"; // <-- Mets ta clé ici
let currentTab = 'all';
let currentQuery = '';
let recognition;

const translations = {
  fr: { all: "Tous", images: "Images", videos: "Vidéos", news: "Actualités", search_btn: "Rechercher", lucky_btn: "J'ai de la chance", search_placeholder: "Recher sur Baobab...", ai_title: "✨ Résumé IA par Baobab", about: "À propos", terms: "Conditions", privacy: "Confidentialité", settings_title: "Paramètres", appearance: "Apparence", light_theme: "Thème Clair", dark_theme: "Thème Sombre", save: "Enregistrer", back: "← Retour" }
};

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0,0);
}

function quickTab(tab) { 
  document.getElementById('searchInput').value = "tendance";
  currentTab = tab; 
  search(); 
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('border-blue-600', 'text-blue-600', 'font-semibold'));
  document.getElementById(`tab-${tab}`).classList.add('border-blue-600', 'text-blue-600', 'font-semibold');
  if(currentQuery) search();
}

function randomSearch() { 
  const arr = ["messi", "baobab", "dakar", "météo"]; 
  document.getElementById('searchInput').value = arr[Math.floor(Math.random()*arr.length)]; 
  search(); 
}

function takePhoto() { 
  document.getElementById('fileInput').click(); 
  document.getElementById('fileInput').onchange = (e) => alert("Photo: " + e.target.files[0].name)
}

function startVoice(iconId) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert('Voix non supportée');
  recognition = new SpeechRecognition();
  recognition.lang = 'fr-FR';
  document.getElementById(iconId).classList.add('text-red-500', 'animate-pulse');
  recognition.onresult = (event) => {
    document.getElementById('searchInput').value = event.results[0][0].transcript;
    search();
  };
  recognition.onend = () => document.getElementById(iconId).classList.remove('text-red-500', 'animate-pulse');
  recognition.start();
}

async function search(event) {
  if(event) event.preventDefault();
  const query = document.getElementById('searchInput')?.value || document.getElementById('searchInputResults').value;
  if(!query) return;
  
  currentQuery = query;
  document.getElementById('searchInputResults').value = query;
  showPage('resultsPage');
  document.getElementById('resultCount').innerText = `Environ 1 200 000 résultats pour "${query}"`;
  document.getElementById('aiText').innerText = `Résumé IA: ${query} est un sujet populaire. Voici les infos principales...`;

  if(currentTab === 'videos') await searchYouTube(query);
  else {
    let html = '';
    for(let i=1; i<=5; i++) {
      html += `<div><a href="#" class="text-xl text-blue-700 hover:underline">${query} - Résultat ${i}</a><p class="text-sm text-green-700">baobab.com/resultat-${i}</p><p>Description du résultat ${i} pour "${query}". Cliquez pour voir plus d'informations.</p></div>`;
    }
    document.getElementById('resultsList').innerHTML = html;
  }
}

async function searchYouTube(query) {
  if(YOUTUBE_KEY === "COLLE_TA_CLE_ICI") {
    document.getElementById('resultsList').innerHTML = "⚠️ Colle ta clé YouTube dans script.js ligne 1";
    return;
  }
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${encodeURIComponent(query)}&key=${YOUTUBE_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    let html = '<div class="grid grid-cols-2 gap-4">';
    data.items.forEach(item => {
      if(item.id.videoId){
        html += `<div class="cursor-pointer" onclick="window.open('https://youtube.com/watch?v=${item.id.videoId}', '_blank')"><img src="${item.snippet.thumbnails.medium.url}" class="rounded-lg w-full"><p class="text-sm mt-2">${item.snippet.title}</p></div>`;
      }
    });
    html += '</div>';
    document.getElementById('resultsList').innerHTML = html;
  } catch(e) { document.getElementById('resultsList').innerHTML = "Erreur YouTube"; }
}

function saveSettings() {
  const theme = document.querySelector('input[name="theme"]:checked').value;
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  alert("Paramètres enregistrés");
}

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.querySelector(`input[name="theme"][value="${theme}"]`).checked = true;
});
