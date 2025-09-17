// artistas.js CORREGIDO - Navegación a páginas individuales

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
        noResults.style.display = 'block';
        return;
    } else {
        container.style.display = 'grid';
        noResults.style.display = 'none';
    }
    
    // Generar HTML de artistas (LIMPIO CON NAVEGACIÓN)
    container.innerHTML = filteredArtists.map(artist => `
        <div class="artist-card" onclick="navigateToArtist('${artist.id}')" data-genre="${artist.genre}">
            <div class="artist-image">
                <img src="${artist.image}" alt="${artist.name}" loading="lazy">
            </div>
            <div class="artist-info">
                <h3 class="artist-name">${artist.name}</h3>
                <div class="artist-stats">
                    <span class="recommendations-count">${artist.recommendations} recomendaciones</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Navegar a página individual del artista
function navigateToArtist(artistId) {
    // Guardar el ID del artista para la página individual
    localStorage.setItem('currentArtistId', artistId);
    
    // Navegar directamente a la página individual
    window.location.href = `artista.html?id=${artistId}`;
}

// Configurar filtros
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
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
            searchQuery = this.value.trim();
            renderArtists();
        });
    }
}

// Configurar animaciones
function setupAnimations() {
    // Animación de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas de artistas
    setTimeout(() => {
        const artistCards = document.querySelectorAll('.artist-card');
        artistCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
}

// Función auxiliar para nombres de géneros
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

// Función para manejar clicks en artistas del homepage
function handleArtistClick(artistId) {
    navigateToArtist(artistId);
}
