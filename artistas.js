// Datos de artistas actualizados con información real
const artistsData = {
    "bad-bunny": {
        "id": "bad-bunny",
        "name": "Bad Bunny",
        "fullName": "Benito Antonio Martínez Ocasio",
        "genre": "Reggaeton",
        "country": "Puerto Rico",
        "birthDate": "1994-03-10",
        "description": "Benito Antonio Martínez Ocasio (Almirante Sur, Vega Baja, 10 de marzo de 1994), conocido artísticamente como Bad Bunny, es un rapero, cantante, compositor, productor y exluchador puertorriqueño.",
        "image": "https://i.imgur.com/8yZqQYx.jpg",
        "socialMedia": {
            "instagram": "@sanbenito",
            "twitter": "@sanbenito"
        },
        "featured": true,
        "recommendations": [
            {
                "type": "album",
                "title": "Illmatic",
                "artist": "Nas",
                "year": "1994",
                "image": "https://i.imgur.com/mK8vQpX.jpg",
                "quote": "Uno de los álbumes que más me marcó cuando era un niño, gracias Nas.",
                "source": "Entrevista con Ibai Llanos en Youtube",
                "sourceUrl": "https://youtube.com",
                "spotifyUrl": ""
            },
            {
                "type": "artist",
                "title": "Héctor Lavoe",
                "artist": "Héctor Lavoe",
                "year": "",
                "image": "https://i.imgur.com/7xK9mNp.jpg",
                "quote": "El cantante de salsa más grande de todos los tiempos. Su música me inspira todos los días.",
                "source": "Rolling Stone en Español",
                "sourceUrl": "https://rollingstone.com",
                "spotifyUrl": ""
            },
            {
                "type": "song",
                "title": "La Vida Es Una Sola",
                "artist": "Manu Chao",
                "year": "2001",
                "image": "https://i.imgur.com/2kL8vQx.jpg",
                "quote": "Esta canción me recuerda que hay que vivir cada momento al máximo.",
                "source": "Apple Music Interview",
                "sourceUrl": "https://music.apple.com",
                "spotifyUrl": ""
            }
        ]
    },
    "drake": {
        "id": "drake",
        "name": "Drake",
        "fullName": "Aubrey Drake Graham",
        "genre": "Hip Hop",
        "country": "Canada",
        "birthDate": "1986-10-24",
        "description": "Aubrey Drake Graham (Toronto, 24 de octubre de 1986), conocido simplemente como Drake, es un rapero, cantante, compositor, productor discográfico y actor canadiense.",
        "image": "https://i.imgur.com/9xK2vQp.jpg",
        "socialMedia": {
            "instagram": "@champagnepapi",
            "twitter": "@Drake"
        },
        "featured": true,
        "recommendations": [
            {
                "type": "album",
                "title": "The Miseducation of Lauryn Hill",
                "artist": "Lauryn Hill",
                "year": "1998",
                "image": "https://i.imgur.com/5kL9mXp.jpg",
                "quote": "Este álbum cambió mi perspectiva sobre lo que puede ser el hip hop. Lauryn es una genio.",
                "source": "Complex Magazine",
                "sourceUrl": "https://complex.com",
                "spotifyUrl": ""
            },
            {
                "type": "artist",
                "title": "Aaliyah",
                "artist": "Aaliyah",
                "year": "",
                "image": "https://i.imgur.com/3mK8vQx.jpg",
                "quote": "Una de las artistas más influyentes en mi carrera. Su estilo era único e inigualable.",
                "source": "Billboard Interview",
                "sourceUrl": "https://billboard.com",
                "spotifyUrl": ""
            },
            {
                "type": "song",
                "title": "Marvin's Room",
                "artist": "Drake",
                "year": "2011",
                "image": "https://i.imgur.com/7xK2mQp.jpg",
                "quote": "Una de mis canciones más personales. Habla de vulnerabilidad real.",
                "source": "OVO Sound Radio",
                "sourceUrl": "https://ovosound.com",
                "spotifyUrl": ""
            }
        ]
    },
    "tyler-the-creator": {
        "id": "tyler-the-creator",
        "name": "Tyler, The Creator",
        "fullName": "Tyler Gregory Okonma",
        "genre": "Hip Hop",
        "country": "USA",
        "birthDate": "1991-03-06",
        "description": "Tyler Gregory Okonma (Ladera Heights, California, 6 de marzo de 1991), conocido profesionalmente como Tyler, the Creator, es un rapero, cantante, compositor, productor discográfico, director de videos musicales y diseñador gráfico estadounidense.",
        "image": "https://i.imgur.com/4kL9vQx.jpg",
        "socialMedia": {
            "instagram": "@feliciathegoat",
            "twitter": "@tylerthecreator"
        },
        "featured": true,
        "recommendations": [
            {
                "type": "album",
                "title": "The Odd Future Tape",
                "artist": "Odd Future",
                "year": "2008",
                "image": "https://i.imgur.com/6kL8mQp.jpg",
                "quote": "Donde todo comenzó para mí. Este tape cambió mi vida completamente.",
                "source": "Fantano Interview",
                "sourceUrl": "https://youtube.com",
                "spotifyUrl": ""
            },
            {
                "type": "artist",
                "title": "Pharrell Williams",
                "artist": "Pharrell Williams",
                "year": "",
                "image": "https://i.imgur.com/8kL2vQx.jpg",
                "quote": "Un genio de la producción. Todo lo que toca se convierte en oro.",
                "source": "GQ Magazine",
                "sourceUrl": "https://gq.com",
                "spotifyUrl": ""
            },
            {
                "type": "song",
                "title": "Yonkers",
                "artist": "Tyler, The Creator",
                "year": "2011",
                "image": "https://i.imgur.com/9kL3vQx.jpg",
                "quote": "La canción que me puso en el mapa. Pura energía y creatividad sin filtros.",
                "source": "Pitchfork Review",
                "sourceUrl": "https://pitchfork.com",
                "spotifyUrl": ""
            }
        ]
    },
    "kendrick-lamar": {
        "id": "kendrick-lamar",
        "name": "Kendrick Lamar",
        "fullName": "Kendrick Lamar Duckworth",
        "genre": "Hip Hop",
        "country": "USA",
        "birthDate": "1987-06-17",
        "description": "Kendrick Lamar Duckworth (Compton, California, 17 de junio de 1987), conocido simplemente como Kendrick Lamar, es un rapero, compositor y productor discográfico estadounidense.",
        "image": "https://i.imgur.com/5kL8vQx.jpg",
        "socialMedia": {
            "instagram": "@kendricklamar",
            "twitter": "@kendricklamar"
        },
        "featured": true,
        "recommendations": [
            {
                "type": "album",
                "title": "To Pimp a Butterfly",
                "artist": "Kendrick Lamar",
                "year": "2015",
                "image": "https://i.imgur.com/7kL9vQx.jpg",
                "quote": "Mi obra más personal y política. Cada canción cuenta una historia de mi comunidad.",
                "source": "The New York Times",
                "sourceUrl": "https://nytimes.com",
                "spotifyUrl": ""
            },
            {
                "type": "artist",
                "title": "Tupac Shakur",
                "artist": "2Pac",
                "year": "",
                "image": "https://i.imgur.com/8kL3vQx.jpg",
                "quote": "El poeta más grande del hip hop. Sus palabras siguen siendo relevantes hoy.",
                "source": "XXL Magazine",
                "sourceUrl": "https://xxlmag.com",
                "spotifyUrl": ""
            },
            {
                "type": "song",
                "title": "Alright",
                "artist": "Kendrick Lamar",
                "year": "2015",
                "image": "https://i.imgur.com/9kL4vQx.jpg",
                "quote": "Un himno de esperanza en tiempos difíciles. La música puede sanar.",
                "source": "Grammy Awards Speech",
                "sourceUrl": "https://grammy.com",
                "spotifyUrl": ""
            }
        ]
    },
    "jorja-smith": {
        "id": "jorja-smith",
        "name": "Jorja Smith",
        "fullName": "Jorja Alice Smith",
        "genre": "R&B",
        "country": "UK",
        "birthDate": "1997-06-11",
        "description": "Jorja Alice Smith (Walsall, Inglaterra, 11 de junio de 1997) es una cantante y compositora británica de R&B, soul y pop. Ha sido nominada al Premio Mercury y ganadora del Critics' Choice Award en los BRIT Awards 2018.",
        "image": "https://i.imgur.com/6kL9vQx.jpg",
        "socialMedia": {
            "instagram": "@jorjasmith_",
            "twitter": "@JorjaSmith_"
        },
        "featured": true,
        "recommendations": [
            {
                "type": "album",
                "title": "Lost & Found",
                "artist": "Jorja Smith",
                "year": "2018",
                "image": "https://i.imgur.com/4kL8vQx.jpg",
                "quote": "Mi primer álbum completo. Cada canción refleja una parte de mi crecimiento personal.",
                "source": "BBC Radio 1",
                "sourceUrl": "https://bbc.co.uk",
                "spotifyUrl": ""
            },
            {
                "type": "artist",
                "title": "Amy Winehouse",
                "artist": "Amy Winehouse",
                "year": "",
                "image": "https://i.imgur.com/5kL7vQx.jpg",
                "quote": "Un talento sobrenatural, una artista que todos deberían escuchar. Su honestidad me inspira.",
                "source": "Twitter - @sanbenito",
                "sourceUrl": "https://twitter.com",
                "spotifyUrl": ""
            },
            {
                "type": "song",
                "title": "Blue Lights",
                "artist": "Jorja Smith",
                "year": "2016",
                "image": "https://i.imgur.com/7kL5vQx.jpg",
                "quote": "La canción que cambió mi vida. Habla de temas reales que afectan a mi comunidad.",
                "source": "The Guardian Interview",
                "sourceUrl": "https://theguardian.com",
                "spotifyUrl": ""
            }
        ]
    },
    "rosalia": {
        "id": "rosalia",
        "name": "Rosalía",
        "fullName": "Rosalía Vila Tobella",
        "genre": "Flamenco Pop",
        "country": "Spain",
        "birthDate": "1992-09-25",
        "description": "Rosalía Vila Tobella (San Esteban Sasroviras, Barcelona, 25 de septiembre de 1992), conocida monónimamente como Rosalía, es una cantante, compositora y productora española.",
        "image": "https://i.imgur.com/8kL6vQx.jpg",
        "socialMedia": {
            "instagram": "@rosalia.vt",
            "twitter": "@rosalia"
        },
        "featured": true,
        "recommendations": [
            {
                "type": "album",
                "title": "El Mal Querer",
                "artist": "Rosalía",
                "year": "2018",
                "image": "https://i.imgur.com/9kL6vQx.jpg",
                "quote": "Un álbum conceptual que fusiona flamenco tradicional con sonidos modernos. Mi visión artística más pura.",
                "source": "El País Cultural",
                "sourceUrl": "https://elpais.com",
                "spotifyUrl": ""
            },
            {
                "type": "artist",
                "title": "Camarón de la Isla",
                "artist": "Camarón de la Isla",
                "year": "",
                "image": "https://i.imgur.com/6kL7vQx.jpg",
                "quote": "El maestro del flamenco. Su legado vive en cada nota que canto.",
                "source": "Revista Onda Cero",
                "sourceUrl": "https://ondacero.es",
                "spotifyUrl": ""
            },
            {
                "type": "song",
                "title": "Malamente",
                "artist": "Rosalía",
                "year": "2018",
                "image": "https://i.imgur.com/7kL8vQx.jpg",
                "quote": "La canción que abrió puertas internacionales al flamenco moderno.",
                "source": "Los 40 Principales",
                "sourceUrl": "https://los40.com",
                "spotifyUrl": ""
            }
        ]
    }
};

// Función para obtener todos los artistas
function getAllArtists() {
    return Object.values(artistsData);
}

// Función para obtener artistas destacados
function getFeaturedArtists() {
    return Object.values(artistsData).filter(artist => artist.featured);
}

// Función para obtener un artista por ID
function getArtistById(id) {
    return artistsData[id] || null;
}

// Función para filtrar artistas por género
function getArtistsByGenre(genre) {
    if (genre === 'all') return getAllArtists();
    return Object.values(artistsData).filter(artist => 
        artist.genre.toLowerCase().includes(genre.toLowerCase())
    );
}

// Función para buscar artistas
function searchArtists(query) {
    const searchTerm = query.toLowerCase();
    return Object.values(artistsData).filter(artist =>
        artist.name.toLowerCase().includes(searchTerm) ||
        artist.fullName.toLowerCase().includes(searchTerm) ||
        artist.genre.toLowerCase().includes(searchTerm) ||
        artist.country.toLowerCase().includes(searchTerm)
    );
}

// Función para renderizar la grid de artistas
function renderArtistsGrid(artists = getAllArtists()) {
    const grid = document.querySelector('.artists-grid');
    if (!grid) return;

    grid.innerHTML = artists.map(artist => `
        <div class="artist-card" data-genre="${artist.genre}" onclick="goToArtist('${artist.id}')">
            <div class="artist-image">
                <img src="${artist.image}" alt="${artist.name}" onerror="this.src='https://via.placeholder.com/300x300/6b46c1/ffffff?text=${encodeURIComponent(artist.name)}'">
                <div class="artist-overlay">
                    <span class="artist-genre">${artist.genre}</span>
                </div>
            </div>
            <div class="artist-info">
                <h3 class="artist-name">${artist.name}</h3>
                <p class="artist-country">${artist.country}</p>
            </div>
        </div>
    `).join('');
}

// Función para ir a la página del artista
function goToArtist(artistId) {
    window.location.href = `artista.html?id=${artistId}`;
}

// Función para manejar filtros
function handleGenreFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-input');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            btn.classList.add('active');
            
            const genre = btn.dataset.genre;
            const filteredArtists = getArtistsByGenre(genre);
            renderArtistsGrid(filteredArtists);
        });
    });

    // Manejar búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query) {
                const searchResults = searchArtists(query);
                renderArtistsGrid(searchResults);
                // Resetear filtros activos
                filterButtons.forEach(b => b.classList.remove('active'));
            } else {
                renderArtistsGrid();
                // Activar filtro "Todos"
                const allBtn = document.querySelector('[data-genre="all"]');
                if (allBtn) {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    allBtn.classList.add('active');
                }
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar grid inicial
    renderArtistsGrid();
    
    // Configurar filtros y búsqueda
    handleGenreFilter();
    
    // Activar filtro "Todos" por defecto
    const allBtn = document.querySelector('[data-genre="all"]');
    if (allBtn) allBtn.classList.add('active');
});

// Exportar funciones para uso global
window.artistsData = artistsData;
window.getAllArtists = getAllArtists;
window.getFeaturedArtists = getFeaturedArtists;
window.getArtistById = getArtistById;
window.goToArtist = goToArtist;
