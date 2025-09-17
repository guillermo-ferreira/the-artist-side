// artistas.js - JavaScript específico para la página de artistas
document.addEventListener('DOMContentLoaded', function() {
    // Base de datos de artistas (simulada)
    const artistsData = [
        {
            id: 'bad-bunny',
            name: 'Bad Bunny',
            genre: 'reggaeton',
            image: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=BB',
            recommendations: 15,
            sources: 8
        },
        {
            id: 'drake',
            name: 'Drake',
            genre: 'hip-hop',
            image: 'https://via.placeholder.com/100x100/8b5cf6/ffffff?text=D',
            recommendations: 23,
            sources: 12
        },
        {
            id: 'tyler-creator',
            name: 'Tyler, The Creator',
            genre: 'hip-hop',
            image: 'https://via.placeholder.com/100x100/a855f7/ffffff?text=T',
            recommendations: 18,
            sources: 9
        },
        {
            id: 'kendrick-lamar',
            name: 'Kendrick Lamar',
            genre: 'hip-hop',
            image: 'https://via.placeholder.com/100x100/c084fc/ffffff?text=K',
            recommendations: 31,
            sources: 15
        },
        {
            id: 'rosalia',
            name: 'Rosalía',
            genre: 'mainstream',
            image: 'https://via.placeholder.com/100x100/d8b4fe/ffffff?text=R',
            recommendations: 12,
            sources: 7
        },
        {
            id: 'frank-ocean',
            name: 'Frank Ocean',
            genre: 'r&b',
            image: 'https://via.placeholder.com/100x100/e879f9/ffffff?text=FO',
            recommendations: 19,
            sources: 11
        },
        {
            id: 'mac-miller',
            name: 'Mac Miller',
            genre: 'hip-hop',
            image: 'https://via.placeholder.com/100x100/f0abfc/ffffff?text=MM',
            recommendations: 25,
            sources: 13
        },
        {
            id: 'jorja-smith',
            name: 'Jorja Smith',
            genre: 'r&b',
            image: 'https://via.placeholder.com/100x100/fbbf24/ffffff?text=JS',
            recommendations: 14,
            sources: 8
        },
        {
            id: 'dano',
            name: 'Dano',
            genre: 'hip-hop',
            image: 'https://via.placeholder.com/100x100/f59e0b/ffffff?text=D',
            recommendations: 9,
            sources: 5
        },
        {
            id: 'kase-o',
            name: 'Kase.O',
            genre: 'hip-hop',
            image: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=KO',
            recommendations: 16,
            sources: 9
        },
        {
            id: 'c-tangana',
            name: 'C. Tangana',
            genre: 'mainstream',
            image: 'https://via.placeholder.com/100x100/dc2626/ffffff?text=CT',
            recommendations: 11,
            sources: 6
        },
        {
            id: 'mac-demarco',
            name: 'Mac DeMarco',
            genre: 'indie',
            image: 'https://via.placeholder.com/100x100/16a34a/ffffff?text=MD',
            recommendations: 13,
            sources: 7
        },
        {
            id: 'steve-lacy',
            name: 'Steve Lacy',
            genre: 'r&b',
            image: 'https://via.placeholder.com/100x100/059669/ffffff?text=SL',
            recommendations: 8,
            sources: 4
        },
        {
            id: 'the-weeknd',
            name: 'The Weeknd',
            genre: 'mainstream',
            image: 'https://via.placeholder.com/100x100/0891b2/ffffff?text=TW',
            recommendations: 21,
            sources: 12
        },
        {
            id: 'billie-eilish',
            name: 'Billie Eilish',
            genre: 'mainstream',
            image: 'https://via.placeholder.com/100x100/0284c7/ffffff?text=BE',
            recommendations: 17,
            sources: 10
        }
    ];

    // Referencias a elementos del DOM
    const artistsContainer = document.querySelector('.artists-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pageSearch = document.querySelector('.page-search');
    const noResultsDiv = document.querySelector('.no-results');

    // Función para crear una tarjeta de artista
    function createArtistCard(artist) {
        return `
            <div class="artist-card" data-genre="${artist.genre}" data-name="${artist.name.toLowerCase()}" data-id="${artist.id}">
                <img src="${artist.image}" alt="${artist.name}" class="artist-image">
                <div class="artist-info">
                    <h3 class="artist-card-name">${artist.name}</h3>
                    <p class="artist-genre">${getGenreDisplayName(artist.genre)}</p>
                    <div class="artist-stats">
                        <div class="stat-item">
                            <span class="stat-number">${artist.recommendations}</span>
                            <span>Recomendaciones</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${artist.sources}</span>
                            <span>Fuentes</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para obtener el nombre de género para mostrar
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

    // Función para renderizar artistas
    function renderArtists(artists = artistsData) {
        if (artists.length === 0) {
            artistsContainer.innerHTML = '';
            noResultsDiv.style.display = 'block';
            return;
        }

        noResultsDiv.style.display = 'none';
        artistsContainer.innerHTML = artists.map(createArtistCard).join('');

        // Añadir event listeners a las tarjetas
        document.querySelectorAll('.artist-card').forEach(card => {
            card.addEventListener('click', function() {
                const artistId = this.dataset.id;
                const artistName = this.dataset.name;
                
                // Efecto de click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                // Simular navegación a página de artista
                setTimeout(() => {
                    alert(`Navegando a la página de ${artistName}...`);
                    // En el futuro: window.location.href = `artista.html?id=${artistId}`;
                }, 200);
            });
        });
    }

    // Función para filtrar artistas
    function filterArtists() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const searchTerm = pageSearch.value.toLowerCase().trim();

        let filteredArtists = artistsData;

        // Filtrar por género
        if (activeFilter !== 'all') {
            filteredArtists = filteredArtists.filter(artist => artist.genre === activeFilter);
        }

        // Filtrar por búsqueda
        if (searchTerm) {
            filteredArtists = filteredArtists.filter(artist => 
                artist.name.toLowerCase().includes(searchTerm)
            );
        }

        renderArtists(filteredArtists);
    }

    // Event listeners para filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar artistas
            filterArtists();
        });
    });

    // Event listener para búsqueda
    pageSearch.addEventListener('input', filterArtists);

    // Renderizar artistas inicialmente
    renderArtists();

    // Funcionalidad de búsqueda del navbar (heredada)
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    function handleNavbarSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            alert('Por favor, introduce un término de búsqueda');
            return;
        }
        
        // Buscar en los artistas disponibles
        const foundArtist = artistsData.find(artist => 
            artist.name.toLowerCase().includes(searchTerm) || 
            searchTerm.includes(artist.name.toLowerCase())
        );
        
        if (foundArtist) {
            // Filtrar y mostrar el artista encontrado
            pageSearch.value = foundArtist.name;
            filterArtists();
            
            // Scroll hacia el resultado
            setTimeout(() => {
                document.querySelector('.artists-grid').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 100);
        } else {
            // Mostrar modal de colaboración
            showCollaborationModal(searchTerm);
        }
    }
    
    // Event listeners para búsqueda del navbar
    if (searchBtn) {
        searchBtn.addEventListener('click', handleNavbarSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleNavbarSearch();
            }
        });
    }

    // Modal de colaboración (función heredada del script principal)
    function showCollaborationModal(searchTerm) {
        const modal = document.createElement('div');
        modal.className = 'collaboration-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>¡Ayúdanos a crecer!</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>No tenemos información sobre <strong>"${searchTerm}"</strong> todavía.</p>
                        <p>¿Conoces recomendaciones musicales de este artista? ¡Compártelas con nosotros!</p>
                        <div class="modal-actions">
                            <a href="mailto:info@theartistside.com?subject=Información sobre ${searchTerm}" class="btn-primary">
                                Enviar información
                            </a>
                            <button class="btn-secondary modal-close">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners para cerrar modal
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });

        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                document.body.removeChild(modal);
            }
        });
    }
});