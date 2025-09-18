// imagenes-artistas.js
const IMAGENES_SPOTIFY = {
    "Bad Bunny": "https://i.scdn.co/image/ab6761610000101f81f47f44084e0a09b5f0fa13",
    "Drake": "https://i.scdn.co/image/ab6761610000101f4293385d324db8558179afd9",
    "Tyler": "https://i.scdn.co/image/ab6761610000101fdf2728294ff77dd11eeb18fb",
    "Kendrick": "https://i.scdn.co/image/ab6761610000101f39ba6dcd4355c03de0b50918",
    "Rosalía": "https://i.scdn.co/image/ab6761610000101fd7bb678bef6d2f26110cae49",
    "Jorja Smith": "https://i.scdn.co/image/ab6761610000101fa6524d02e26778b0b99a33d5"
};

// Precargar imágenes de Spotify para mejor rendimiento
function precargarImagenesSpotify() {
    console.log('🚀 Precargando imágenes de Spotify...');
    Object.values(IMAGENES_SPOTIFY).forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Ejecutar precarga inmediatamente
precargarImagenesSpotify();

// Función para obtener imagen de artista
function obtenerImagenSpotify(nombreArtista) {
    return IMAGENES_SPOTIFY[nombreArtista] || null;
}

// Función para aplicar imagen a un elemento con transición suave
function aplicarImagenSpotify(nombreArtista, elementoImg) {
    const imagenUrl = obtenerImagenSpotify(nombreArtista);
    if (imagenUrl && elementoImg) {
        // Transición suave - ocultar mientras carga
        elementoImg.style.opacity = '0.3';
        elementoImg.style.transition = 'opacity 0.3s ease';
        
        elementoImg.src = imagenUrl;
        elementoImg.alt = `Foto de ${nombreArtista}`;
        
        // Mostrar con transición cuando esté lista
        elementoImg.onload = function() {
            this.style.opacity = '1';
            console.log(`✅ Imagen de ${nombreArtista} cargada correctamente`);
        };
        
        // Restaurar opacidad si hay error
        elementoImg.onerror = function() {
            this.style.opacity = '1';
            console.log(`Error cargando imagen de ${nombreArtista}`);
            // Opcional: imagen por defecto
            // this.src = 'assets/default-artist.jpg';
        };
    }
}

// Función para actualizar automáticamente las imágenes de artistas en la página
function actualizarImagenesSpotify() {
    // Buscar todas las imágenes de artistas en la página
    const imagenesArtistas = document.querySelectorAll('img[data-artist], .artist-image, [class*="artist"] img');
    
    imagenesArtistas.forEach(img => {
        // Intentar obtener el nombre del artista de diferentes formas
        let nombreArtista = null;
        
        // Método 1: atributo data-artist
        if (img.hasAttribute('data-artist')) {
            nombreArtista = img.getAttribute('data-artist');
        }
        // Método 2: desde el alt de la imagen
        else if (img.alt && img.alt.includes('Foto de')) {
            nombreArtista = img.alt.replace('Foto de ', '');
        }
        // Método 3: desde el src actual (buscar coincidencias)
        else {
            // Buscar en nuestro objeto de imágenes si algún artista coincide
            for (const artista in IMAGENES_SPOTIFY) {
                if (img.src && (img.alt.toLowerCase().includes(artista.toLowerCase()) || 
                               img.className.toLowerCase().includes(artista.toLowerCase().replace(' ', '-')))) {
                    nombreArtista = artista;
                    break;
                }
            }
        }
        
        // Si encontramos el artista, aplicar la imagen de Spotify
        if (nombreArtista && IMAGENES_SPOTIFY[nombreArtista]) {
            aplicarImagenSpotify(nombreArtista, img);
        }
    });
}

// Función para actualizar imágenes basándose en los datos JSON de artistas
function actualizarImagenesDesdeJSON(artistsData) {
    if (!artistsData) return;
    
    Object.values(artistsData).forEach(artist => {
        const nombreArtista = artist.name;
        const imagenSpotify = obtenerImagenSpotify(nombreArtista);
        
        if (imagenSpotify) {
            // Actualizar la imagen en el objeto JSON
            artist.image = imagenSpotify;
            
            // Buscar y actualizar la imagen en el DOM
            const imgElements = document.querySelectorAll(`img[alt*="${nombreArtista}"], img[data-artist="${nombreArtista}"]`);
            imgElements.forEach(img => {
                aplicarImagenSpotify(nombreArtista, img);
            });
        }
    });
}

// Auto-ejecutar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Cargando imágenes de Spotify...');
    
    // Reducir timeout ya que las imágenes están precargadas
    setTimeout(() => {
        actualizarImagenesSpotify();
        
        if (typeof artistsData !== 'undefined') {
            actualizarImagenesDesdeJSON(artistsData);
        }
    }, 500); // ← Reducido a 0.5 segundos gracias a la precarga
});
