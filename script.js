const translations = { /* ... mêmes traductions qu'avant ... */ 
  fr: { all: "Tout", images: "Images", videos: "Vidéos", news: "Actualités", my_photos: "Mes Photos", my_docs: "Mes Documents", about: "À propos", terms: "Conditions", privacy: "Confidentialité", settings_title: "Paramètres", lang_region: "Langue & Région", appearance: "Apparence", light_theme: "Thème Clair", dark_theme: "Thème Sombre", save: "Enregistrer", saved: "✓ Paramètres enregistrés!", back: "← Retour", search_placeholder: "Recher sur Baobab...", ai_title: "✨ Résumé IA par Baobab", ai_summary: "Résumé IA" }
};

let currentTab = 'all'; let currentPage = 1; let isLoading = false;

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('-translate-x-full'); document.getElementById('sidebarOverlay').classList.toggle('hidden'); }
function uploadFile(type) { const input = document.getElementById('fileInput'); input.accept = type === 'image'? 'image/*' : '*/*'; input.click(); }
function takePhoto() { const input = document.getElementById('fileInput'); input.accept = 'image/*'; input.capture = 'environment'; input.click(); }
function startVoice() { /* ... code vocal ... */ }

function switchTab(tab) {
  currentTab = tab; currentPage = 1;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  document.getElementById('resultsList').innerHTML = '';
  search();
}

function search(e) {
  if(e) e.preventDefault();
  const query = document.getElementById('searchInput').value || document.getElementById('searchInputHeader').value;
  if(!query) return;
  
  showPage('resultsPage');
  document.getElementById('mainHeader').classList.remove('hidden');
  document.getElementById('searchInputHeader').value = query;
  
  loadResults(query);
}

function loadResults(query) {
  if(isLoading) return;
  isLoading = true;
  document.getElementById('loader').classList.remove('hidden');
  
  // Simulation API
  setTimeout(() => {
    document.getElementById('aiText').innerText = `Résumé IA pour: ${query}`;
    document.getElementById('resultCount').innerText = `Environ 1 230 000 résultats`;
    
    const newResults = Array(5).fill(0).map((_, i) => `
      <div class="result-card shadow-sm border-[#E2E8F0] dark:border-gray-700">
        <p class="text-sm text-green-700">${query}.com › page-${currentPage}-${i}</p>
        <h3 class="font-sora text-lg text-[#2563EB] hover:underline cursor-pointer mt-1">Titre du résultat ${currentPage}-${i} pour ${query}</h3>
        <p class="text-sm text-[#475569] mt-1">Ceci est une description du résultat. Elle est en gris moyen pour une lecture rapide et aérée.</p>
      </div>
    `).join('');
    
    document.getElementById('resultsList').innerHTML += newResults;
    currentPage++; isLoading = false;
    document.getElementById('loader').classList.add('hidden');
  }, 500);
}

// INFINITE SCROLL
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    const query = document.getElementById('searchInputHeader').value;
    if(query) loadResults(query);
  }
});

function showPage(pageId) {
  document.getElementById('mainHeader').classList.toggle('hidden', pageId !== 'resultsPage');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function clearHistory() { localStorage.clear(); alert('Historique effacé'); }
function quickSearch(q) { document.getElementById('searchInput').value = q; search(); }
function getSettings() { return { language: localStorage.getItem('language') || 'fr', theme: localStorage.getItem('theme') || 'system' } }
function changeLanguage(lang) { localStorage.setItem('language', lang); }
function saveSettings() { /* ... sauvegarde ... */ document.getElementById('saveMsg').classList.remove('hidden'); setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000); }
document.addEventListener('DOMContentLoaded', () => { /* ... init ... */ });
