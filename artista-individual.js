// Script para páginas individuales de artistas
// Importar datos de artistas (asumiendo que artistas.js se carga primero)

// Función para obtener parámetros de URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para renderizar la información del artista
function renderArtistInfo(artist) {
    if (!artist) {
        document.body.innerHTML = '<div class="error-message">Artista no encontrado</div>';
        return;
    }

    // Actualizar título de la página
    document.title = `${artist.name} - The Artist Side`;

    // Actualizar breadcrumbs
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (breadcrumbs) {
        breadcrumbs.innerHTML = `
            <a href="index.html">Home</a> > 
            <a href="artistas.html">Artistas</a> > 
            <span>${artist.name}</span>
        `;
    }

    // Actualizar información del header
    const artistImage = document.querySelector('.artist-main-image img');
    const artistName = document.querySelector('.artist-main-name');
    const artistDescription = document.querySelector('.artist-main-description');
    const socialLinks = document.querySelector('.artist-social-links');

    if (artistImage) {
        artistImage.src = artist.image;
        artistImage.alt = artist.name;
        aplicarImagenSpotify(artist.name, artistImage);
        artistImage.onerror = function() {
            this.src = `https://via.placeholder.com/300x300/6b46c1/ffffff?text=${encodeURIComponent(artist.name)}`;
        };
    }

    if (artistName) {
        artistName.textContent = artist.name;
    }

    if (artistDescription) {
        artistDescription.textContent = artist.description;
    }

    if (socialLinks && artist.socialMedia) {
        socialLinks.innerHTML = `
            ${artist.socialMedia.instagram ? `
                <a href="https://instagram.com/${artist.socialMedia.instagram.replace('@', '')}" target="_blank" class="social-link">
                    <i class="fab fa-instagram"></i>
                </a>
            ` : ''}
            ${artist.socialMedia.spotify ? `
                <a href="${artist.socialMedia.spotify}" target="_blank" class="social-link">
                    <i class="fab fa-spotify"></i>
                </a>
            ` : ''}
        `;
    }
}

// Función para renderizar las recomendaciones
function renderRecommendations(recommendations) {
    const recommendationsContainer = document.querySelector('.recommendations-container');
    if (!recommendationsContainer || !recommendations) return;

    // Actualizar el título de la sección
    const sectionTitle = document.querySelector('.recommendations-title');
    if (sectionTitle) {
        const artistName = getUrlParameter('id').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        sectionTitle.textContent = `Descubre las canciones, álbumes o artistas que te recomendaría ${artistName}`;
    }

    recommendationsContainer.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card">
            <div class="recommendation-image">
                <img src="${rec.image}" alt="${rec.title}" 
                     onerror="this.src='https://via.placeholder.com/200x200/6b46c1/ffffff?text=${encodeURIComponent(rec.title)}'">
                <div class="recommendation-type">${getTypeLabel(rec.type)}</div>
            </div>
            <div class="recommendation-content">
                <div class="recommendation-info">
                    <h3 class="recommendation-title">${rec.title}</h3>
                    <p class="recommendation-artist">${rec.artist}</p>
                    ${rec.year ? `<p class="recommendation-year">${rec.year}</p>` : ''}
                </div>
                <div class="recommendation-quote">
                    <blockquote>"${rec.quote}"</blockquote>
                    <cite>Fuente: ${rec.source}</cite>
                </div>
                <div class="recommendation-actions">
                    <a href="${rec.spotifyUrl || '#'}" 
                       class="spotify-btn ${!rec.spotifyUrl ? 'disabled' : ''}" 
                       target="_blank"
                       ${!rec.spotifyUrl ? 'onclick="return false;"' : ''}>
                        <i class="fab fa-spotify"></i>
                        Escuchar en Spotify
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para obtener etiqueta del tipo de recomendación
function getTypeLabel(type) {
    const labels = {
        'album': 'Álbum',
        'song': 'Canción',
        'artist': 'Artista'
    };
    return labels[type] || type;
}

// Función para manejar filtros de recomendaciones
function handleRecommendationFilters(recommendations) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase activa
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterType = btn.dataset.filter;
            let filteredRecommendations = recommendations;
            
            if (filterType !== 'all') {
                filteredRecommendations = recommendations.filter(rec => rec.type === filterType);
            }
            
            renderRecommendations(filteredRecommendations);
        });
    });
}

// Función para manejar la navegación entre artistas
function setupArtistNavigation() {
    const allArtists = Object.keys(window.artistsData || {});
    const currentArtistId = getUrlParameter('id');
    const currentIndex = allArtists.indexOf(currentArtistId);
    
    if (currentIndex === -1) return;
    
    const prevArtistId = currentIndex > 0 ? allArtists[currentIndex - 1] : allArtists[allArtists.length - 1];
    const nextArtistId = currentIndex < allArtists.length - 1 ? allArtists[currentIndex + 1] : allArtists[0];
    
    // Agregar botones de navegación si no existen
    const navigation = document.createElement('div');
    navigation.className = 'artist-navigation';
    navigation.innerHTML = `
        <button onclick="goToArtist('${prevArtistId}')" class="nav-btn prev-btn">
            <i class="fas fa-chevron-left"></i>
            Anterior
        </button>
        <button onclick="goToArtist('${nextArtistId}')" class="nav-btn next-btn">
            Siguiente
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    const container = document.querySelector('.recommendations-section');
    if (container) {
        container.appendChild(navigation);
    }
}

// Función para ir a otro artista
function goToArtist(artistId) {
    window.location.href = `artista.html?id=${artistId}`;
}

// Función principal de inicialización
function initializeArtistPage() {
    const artistId = getUrlParameter('id');
    
    if (!artistId) {
        window.location.href = 'artistas.html';
        return;
    }
    
    // Esperar a que se carguen los datos de artistas
    if (typeof window.artistsData === 'undefined') {
        // Si los datos no están disponibles, intentar cargarlos
        setTimeout(initializeArtistPage, 100);
        return;
    }
    
    const artist = window.artistsData[artistId];
    
    if (!artist) {
        // Redirigir a página de artistas si no se encuentra el artista
        window.location.href = 'artistas.html';
        return;
    }
    
    // Renderizar información del artista
    renderArtistInfo(artist);
    
    // Renderizar recomendaciones
    renderRecommendations(artist.recommendations);
    
    // Configurar filtros
    handleRecommendationFilters(artist.recommendations);
    
    // Configurar navegación
    setupArtistNavigation();
    // Activar filtro "Todos" por defecto
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');
}

// Función para agregar estilos CSS adicionales si no existen
function addAdditionalStyles() {
    const styles = `
        <style>
        .recommendation-card {
            display: flex;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .recommendation-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .recommendation-image {
            position: relative;
            flex-shrink: 0;
            margin-right: 20px;
        }
        
        .recommendation-image img {
            width: 120px;
            height: 120px;
            border-radius: 10px;
            object-fit: cover;
        }
        
        .recommendation-type {
            position: absolute;
            top: 5px;
            right: 5px;
            background: var(--accent-color);
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .recommendation-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .recommendation-title {
            color: white;
            margin: 0 0 5px 0;
            font-size: 1.2rem;
            font-weight: 700;
        }
        
        .recommendation-artist {
            color: var(--accent-color);
            margin: 0 0 5px 0;
            font-weight: 600;
        }
        
        .recommendation-year {
            color: rgba(255, 255, 255, 0.7);
            margin: 0 0 10px 0;
            font-size: 0.9rem;
        }
        
        .recommendation-quote blockquote {
            color: rgba(255, 255, 255, 0.9);
            font-style: italic;
            margin: 10px 0 5px 0;
            font-size: 0.95rem;
            line-height: 1.4;
        }
        
        .recommendation-quote cite {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.85rem;
            display: block;
            margin-bottom: 15px;
        }
        
        .spotify-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #1DB954;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .spotify-btn:hover:not(.disabled) {
            background: #1ed760;
            transform: translateY(-2px);
        }
        
        .spotify-btn.disabled {
            background: #666;
            cursor: not-allowed;
            opacity: 0.6;
        }
        
        .artist-navigation {
            display: flex;
            justify-content: space-between;
            margin: 40px 0;
            padding: 20px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .nav-btn {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .nav-btn:hover {
            background: var(--accent-color);
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .recommendation-card {
                flex-direction: column;
                text-align: center;
            }
            
            .recommendation-image {
                margin-right: 0;
                margin-bottom: 15px;
                align-self: center;
            }
            
            .artist-navigation {
                flex-direction: column;
                gap: 10px;
            }
        }
        </style>
    `;
    
    if (!document.querySelector('#artist-individual-styles')) {
        const styleElement = document.createElement('div');
        styleElement.id = 'artist-individual-styles';
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    addAdditionalStyles();
    initializeArtistPage();
});

// Exportar funciones para uso global
window.goToArtist = goToArtist;
window.initializeArtistPage = initializeArtistPage;
// Exportar funciones para uso global
window.goToArtist = goToArtist;
window.initializeArtistPage = initializeArtistPage;

// AÑADIR ESTAS LÍNEAS AQUÍ:
// Aplicar imágenes de Spotify después de cargar el contenido
setTimeout(() => {
    if (typeof aplicarImagenSpotify !== 'undefined') {
        const img = document.querySelector('.artist-main-image');
        const artistName = document.querySelector('.artist-main-name')?.textContent;
        if (img && artistName) {
            console.log('🎵 Aplicando imagen de Spotify para:', artistName);
            aplicarImagenSpotify(artistName, img);
        }
    }
}, 1000);
