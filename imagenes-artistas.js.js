// imagenes-artistas.js
const IMAGENES_SPOTIFY = {
    "Bad Bunny": "https://i.scdn.co/image/ab6761610000101f81f47f44084e0a09b5f0fa13",
    "Drake": "https://i.scdn.co/image/ab6761610000101f4293385d324db8558179afd9",
    "Tyler": "https://i.scdn.co/image/ab6761610000101fdf2728294ff77dd11eeb18fb",
    "Kendrick": "https://i.scdn.co/image/ab6761610000101f39ba6dcd4355c03de0b50918",
    "Rosalía": "https://i.scdn.co/image/ab6761610000101fd7bb678bef6d2f26110cae49"
};

// Función para obtener imagen de artista
function obtenerImagenSpotify(nombreArtista) {
    return IMAGENES_SPOTIFY[nombreArtista] || null;
}

// Función para aplicar imagen a un elemento
function aplicarImagenSpotify(nombreArtista, elementoImg) {
    const imagenUrl = obtenerImagenSpotify(nombreArtista);
    if (imagenUrl && elementoImg) {
        elementoImg.src = imagenUrl;
        elementoImg.alt = `Foto de ${nombreArtista}`;
        
        // Manejar errores de carga
        elementoImg.onerror = function() {
            console.log(`Error cargando imagen de ${nombreArtista}`);
            // Opcional: imagen por defecto
            // this.src = 'assets/default-artist.jpg';
        };
        
        elementoImg.onload = function() {
            console.log(`✅ Imagen de ${nombreArtista} cargada correctamente`);
        };
    }
}