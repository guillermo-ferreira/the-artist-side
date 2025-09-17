// artistas.js - JavaScript mejorado para página de artistas

// Base de datos de artistas
const artistsDatabase = [
    {
        id: 'bad-bunny',
        name: 'Bad Bunny',
        realName: 'Benito Antonio Martínez Ocasio',
        genre: 'reggaeton',
        image: 'https://via.placeholder.com/200x200/DB91D6/ffffff?text=BB',
        recommendations: 23,
        description: 'Rapero, cantante y compositor puertorriqueño'
    },
    {
        id: 'drake',
        name: 'Drake',
        realName: 'Aubrey Drake Graham',
        genre: 'hip-hop',
        image: 'https://via.placeholder.com/200x200/F98A75/ffffff?text=D',
        recommendations: 31,
        description: 'Rapero, cantante y actor canadiense'
    },
    {
        id: 'tyler',
        name: 'Tyler, The Creator',
        realName: 'Tyler Gregory Okonma',
        genre: 'hip-hop',
        image: 'https://via.placeholder.com/200x200/DB91D6/ffffff?text=T',
        recommendations: 18,
        description: 'Rapero, productor y diseñador estadounidense'
    },
    {
        id: 'kendrick',
        name: 'Kendrick Lamar',
        realName: 'Kendrick Lamar Duckworth',
        genre: 'hip-hop',
        image: 'https://via.placeholder.com/200x200/F98A75/ffffff?text=K',
        recommendations: 27,
        description: 'Rapero y compositor estadounidense'
    },
    {
        id: 'jorja-smith',
        name: 'Jorja Smith',
        realName: 'Jorja Alice Smith',
        genre: 'r&b',
        image: 'https://via.placeholder.com/200x200/DB91D6/ffffff?text=JS',
        recommendations: 15,
        description: 'Cantante y compositora británica'
    },
    {
        id: 'rosalia',
        name: 'Rosalía',
        realName: 'Rosalía Vila Tobella',
        genre: 'mainstream',
        image: 'https://via.placeholder.com/200x200/F98A75/ffffff?text=R',
        recommendations: 22,
        description: 'Cantante y compositora española'
    },
    {
        id: 'frank-ocean',
        name: 'Frank Ocean',
        realName: 'Christopher Edwin Breaux',
        genre: 'r&b',
        image: 'https://via.placeholder.com/200x200/DB91D6/ffffff?text=FO',
        recommendations: 19,
        description: 'Cantante, compositor y rapero estadounidense'
    },
    {
        id: 'billie-eilish',
        name: 'Billie Eilish',
        realName: 'Billie Eilish Pirate Baird O\'Connell',
        genre: 'indie',
        image: 'https://via.placeholder.com/200x200/F98A75/ffffff?text=BE',
        recommendations: 14,
        description: 'Cantante y compositora estadounidense'
    }
];

// Estado de la aplicación
let currentFilter = 'all';
let searchQuery = '';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeArtistsPage();
});

function initializeArtistsPage() {
    renderArtists();
    setupFilters();
    setupSearch();
    setupAnimations();
}

// Renderizar artistas
function renderArtists() {
    const container = document.getElementById('artists-container');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;
    
    // Filtrar artistas
    const filteredArtists = artistsDatabase.filter(artist => {
        const matchesFilter = currentFilter === 'all' || artist.genre === currentFilter;
        const matchesSearch = searchQuery === '' || 
            artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artist.realName.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });
    
    // Mostrar/ocultar mensaje de no resultados
    if (filteredArtists.length === 0) {
        container.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    } else {
        container.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';
    }
    
    // Generar HTML de artistas
    container.innerHTML = filteredArtists.map(artist => `
        <div class="artist-card" data-genre="${artist.genre}" onclick="goToArtist('${artist.id}')">
            <div class="artist-card-image">
                <img src="${artist.image}" alt="${artist.name}" loading="lazy">
                <div class="artist-overlay">
                    <span class="view-artist">Ver perfil</span>
                </div>
            </div>
            <div class="artist-card-content">
                <h3 class="artist-card-name">${artist.name}</h3>
                <p class="artist-card-real-name">${artist.realName}</p>
                <p class="artist-card-description">${artist.description}</p>
                <div class="artist-card-stats">
                    <span class="stat">
                        <strong>${artist.recommendations}</strong> recomendaciones
                    </span>
                    <span class="genre-tag">${getGenreDisplayName(artist.genre)}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Aplicar animaciones de entrada
    const cards = container.querySelectorAll('.artist-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Configurar filtros
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Actualizar filtro actual
            currentFilter = this.dataset.filter;
            
            // Re-renderizar artistas
            renderArtists();
        });
    });
}

// Configurar búsqueda
function setupSearch() {
    const searchInput = document.getElementById('artist-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            renderArtists();
        });
    }
}

// Configurar animaciones
function setupAnimations() {
    // Animación del equalizer en el logo
    const bars = document.querySelectorAll('.bar');
    
    function animateEqualizer() {
        bars.forEach((bar, index) => {
            const height = Math.random() * 100 + 20;
            bar.style.height = height + '%';
            bar.style.animationDelay = (index * 0.1) + 's';
        });
    }
    
    setInterval(animateEqualizer, 500);
}

// Ir a página del artista
function goToArtist(artistId) {
    window.location.href = `artista.html?artist=${artistId}`;
}

// Obtener nombre de género para mostrar
function getGenreDisplayName(genre) {
    const genreNames = {
        'hip-hop': 'Hip Hop',
        'reggaeton': 'Reggaeton',
        'r&b': 'R&B/Soul',
        'indie': 'Indie/Alt',
        'mainstream': 'Mainstream'
    };
    
    return genreNames[genre] || genre;
}

// Funcionalidad de búsqueda global
const globalSearchInput = document.querySelector('.search-input');
const globalSearchBtn = document.querySelector('.search-btn');

if (globalSearchInput && globalSearchBtn) {
    function performGlobalSearch() {
        const query = globalSearchInput.value.trim();
        if (query) {
            searchQuery = query;
            const artistSearchInput = document.getElementById('artist-search');
            if (artistSearchInput) {
                artistSearchInput.value = query;
            }
            renderArtists();
        }
    }
    
    globalSearchBtn.addEventListener('click', performGlobalSearch);
    
    globalSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performGlobalSearch();
        }
    });
}
