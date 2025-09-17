// artista-individual.js - JavaScript para la página individual de artista
document.addEventListener('DOMContentLoaded', function() {
    // Base de datos de recomendaciones (usando las reales de tus documentos)
    const artistsRecommendations = {
        'bad-bunny': {
            name: 'Bad Bunny',
            realName: 'Benito Antonio Martínez Ocasio',
            details: 'Almirante Sur, Vega Baja, 10 de marzo de 1994',
            description: 'Rapero, cantante, compositor, productor y exluchador puertorriqueño.',
            image: 'https://via.placeholder.com/200x200/6366f1/ffffff?text=BB',
            playlistName: "Bad Bunny's side",
            recommendations: [
                {
                    id: 1,
                    type: 'album',
                    title: 'Illmatic',
                    artist: 'Nas',
                    quote: 'Uno de los álbumes que más me marcó cuando era un niño, gracias Nas.',
                    source: 'Entrevista con Ibai Llanos en Youtube',
                    spotifyUrl: '#'
                },
                {
                    id: 2,
                    type: 'artist',
                    title: 'Jorja Smith',
                    artist: 'Jorja Smith',
                    quote: 'Un talento sobrenatural, una artista que todos deberían escuchar',
                    source: 'Twitter - @sanbenito',
                    spotifyUrl: '#'
                },
                {
                    id: 3,
                    type: 'song',
                    title: 'N.Y. State of Mind',
                    artist: 'Nas',
                    quote: 'Esta canción cambió mi perspectiva del rap para siempre',
                    source: 'Entrevista Rolling Stone',
                    spotifyUrl: '#'
                },
                {
                    id: 4,
                    type: 'album',
                    title: 'good kid, m.A.A.d city',
                    artist: 'Kendrick Lamar',
                    quote: 'Un álbum que me inspiró a contar historias reales en mi música',
                    source: 'Instagram Stories',
                    spotifyUrl: '#'
                },
                {
                    id: 5,
                    type: 'artist',
                    title: 'Frank Ocean',
                    artist: 'Frank Ocean',
                    quote: 'Su creatividad no tiene límites, siempre me sorprende',
                    source: 'Entrevista con Complex',
                    spotifyUrl: '#'
                }
            ]
        },
        'jorja-smith': {
            name: 'Jorja Smith',
            realName: 'Jorja Alice Smith',
            details: '11 de junio de 1997, Walsall, West Midlands, Inglaterra',
            description: 'Cantante y compositora británica de R&B, soul y pop.',
            image: 'https://via.placeholder.com/200x200/fbbf24/ffffff?text=JS',
            playlistName: "Jorja Smith's side",
            recommendations: [
                {
                    id: 1,
                    type: 'album',
                    title: 'Illmatic',
                    artist: 'Nas',
                    quote: 'Sus álbumes preferidos - The Genesis',
                    source: 'Entrevista oficial',
                    spotifyUrl: '#'
                },
                {
                    id: 2,
                    type: 'song',
                    title: 'N.Y. State of Mind',
                    artist: 'Nas',
                    quote: 'Una de las canciones que más me ha influenciado',
                    source: 'Entrevista oficial',
                    spotifyUrl: '#'
                },
                {
                    id: 3,
                    type: 'song',
                    title: "Life's A Bitch",
                    artist: 'Nas',
                    quote: 'La profundidad lírica de esta canción es increíble',
                    source: 'Entrevista oficial',
                    spotifyUrl: '#'
                },
                {
                    id: 4,
                    type: 'song',
                    title: 'The World is Yours',
                    artist: 'Nas',
                    quote: 'Un mensaje poderoso que siempre me motiva',
                    source: 'Entrevista oficial',
                    spotifyUrl: '#'
                },
                {
                    id: 5,
                    type: 'song',
                    title: 'Halftime',
                    artist: 'Nas',
                    quote: 'El flow en esta canción es perfecto',
                    source: 'Entrevista oficial',
                    spotifyUrl: '#'
                }
            ]
        }
    };

    // Obtener parámetros de la URL
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Cargar datos del artista
    function loadArtistData() {
        const artistId = getUrlParameter('artist') || 'bad-bunny';
        const artistData = artistsRecommendations[artistId];

        if (!artistData) {
            // Si no existe el artista, mostrar Bad Bunny por defecto
            loadDefaultArtist();
            return;
        }

        // Actualizar información del artista
        document.getElementById('page-title').textContent = `${artistData.name} - The Artist Side`;
        document.getElementById('current-artist').textContent = artistData.name;
        document.getElementById('artist-name').textContent = artistData.name;
        document.getElementById('artist-name-title').textContent = artistData.name;
        document.getElementById('artist-real-name').textContent = artistData.realName;
        document.getElementById('artist-details').textContent = artistData.details;
        document.getElementById('artist-description').textContent = artistData.description;
        document.getElementById('artist-main-image').src = artistData.image;
        document.getElementById('artist-main-image').alt = artistData.name;
        document.getElementById('playlist-name').textContent = artistData.playlistName;
        
        // Actualizar estadísticas
        document.getElementById('total-recommendations').textContent = artistData.recommendations.length;
        document.getElementById('total-sources').textContent = [...new Set(artistData.recommendations.map(r => r.source))].length;

        // Cargar recomendaciones
        loadRecommendations(artistData.recommendations);
    }

    // Cargar artista por defecto
    function loadDefaultArtist() {
        loadArtistData();
    }

    // Cargar recomendaciones
    function loadRecommendations(recommendations) {
        const grid = document.getElementById('recommendations-grid');
        grid.innerHTML = '';

        recommendations.forEach(rec => {
            const card = createRecommendationCard(rec);
            grid.appendChild(card);
        });
    }

    // Crear tarjeta de recomendación
    function createRecommendationCard(recommendation) {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.dataset.type = recommendation.type;

        card.innerHTML = `
            <div class="recommendation-header">
                <div class="recommendation-info">
                    <h3>${recommendation.title}</h3>
                    <div class="artist">${recommendation.artist}</div>
                </div>
                <div class="recommendation-type">${getTypeLabel(recommendation.type)}</div>
            </div>
            <div class="recommendation-quote">"${recommendation.quote}"</div>
            <div class="recommendation-source">
                <div class="source-info">
                    <strong>Fuente:</strong> ${recommendation.source}
                </div>
                <button class="spotify-btn-small" onclick="openSpotify('${recommendation.spotifyUrl}')">
                    <span>▶</span> Spotify
                </button>
            </div>
        `;

        return card;
    }

    // Obtener etiqueta del tipo
    function getTypeLabel(type) {
        const labels = {
            'album': 'Álbum',
            'song': 'Canción',
            'artist': 'Artista'
        };
        return labels[type] || type;
    }

    // Sistema de filtros
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Añadir clase active al botón clickeado
                this.classList.add('active');
                
                const filterType = this.dataset.filter;
                filterRecommendations(filterType);
            });
        });
    }

    // Filtrar recomendaciones
    function filterRecommendations(filterType) {
        const cards = document.querySelectorAll('.recommendation-card');
        
        cards.forEach(card => {
            if (filterType === 'all' || card.dataset.type === filterType) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Abrir Spotify (placeholder)
    window.openSpotify = function(url) {
        if (url === '#') {
            alert('¡Próximamente! Link directo a Spotify.');
        } else {
            window.open(url, '_blank');
        }
    };

    // Botón de playlist principal
    document.getElementById('spotify-playlist-btn').addEventListener('click', function() {
        alert('¡Próximamente! Playlist completa en Spotify.');
    });

    // Inicializar página
    loadArtistData();
    setupFilters();
});
