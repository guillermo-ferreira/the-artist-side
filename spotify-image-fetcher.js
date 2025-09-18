
// ===== SPOTIFY IMAGE FETCHER =====
// Obtiene automáticamente las imágenes de los artistas desde Spotify

class SpotifyImageFetcher {
    constructor(clientId) {
        this.clientId = clientId;
        this.accessToken = null;
    }

    // Obtener token de acceso
    async getAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(this.clientId + ':')
            },
            body: 'grant_type=client_credentials'
        });
        
        const data = await response.json();
        this.accessToken = data.access_token;
        return this.accessToken;
    }

    // Obtener información del artista incluyendo imagen
    async getArtistImage(artistId) {
        if (!this.accessToken) {
            await this.getAccessToken();
        }

        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                'Authorization': 'Bearer ' + this.accessToken
            }
        });

        const data = await response.json();
        
        // Retorna la imagen de mejor calidad (primera en el array)
        return data.images && data.images.length > 0 ? data.images[0].url : null;
    }

    // Obtener todas las imágenes de tus artistas
    async getAllArtistImages() {
        const artistIds = {
            'bad-bunny': '4q3ewBCX7sLwd24euuV69X',
            'drake': '3TVXtAsR1Inumwj472S9r4', 
            'tyler-the-creator': '4V8LLVI7PbaPR0K2TGSxFF',
            'kendrick-lamar': '2YZyLoL8N0Wb9xBt1NhZWg',
            'rosalia': '7ltDVBr6mKbRvohxheJ9h1'
        };

        const images = {};
        
        for (const [artistKey, spotifyId] of Object.entries(artistIds)) {
            try {
                const imageUrl = await this.getArtistImage(spotifyId);
                images[artistKey] = imageUrl;
                console.log(`✅ ${artistKey}: ${imageUrl}`);
            } catch (error) {
                console.error(`❌ Error getting image for ${artistKey}:`, error);
                images[artistKey] = null;
            }
        }
        
        return images;
    }
}

// ===== FUNCIÓN PARA ACTUALIZAR TUS DATOS =====
async function updateArtistImages() {
    // ⚠️ REEMPLAZA 'TU_CLIENT_ID_AQUI' con tu Client ID real
    const fetcher = new SpotifyImageFetcher('08f380b0c88b49398011db2a8b97ce71');
    
    console.log('🎵 Obteniendo imágenes de Spotify...');
    const images = await fetcher.getAllArtistImages();
    
    console.log('📸 Imágenes obtenidas:', images);
    
    // Actualizar artistsData con las nuevas imágenes
    for (const [artistKey, imageUrl] of Object.entries(images)) {
        if (imageUrl && artistsData[artistKey]) {
            artistsData[artistKey].image = imageUrl;
            console.log(`✅ Actualizada imagen de ${artistKey}`);
        }
    }
    
    console.log('🎯 ¡Todas las imágenes actualizadas!');
    
    // Re-renderizar la página si es necesario
    if (typeof renderArtists === 'function') {
        renderArtists();
    }
}

// ===== EJECUTAR AUTOMÁTICAMENTE =====
// Descomenta la siguiente línea para ejecutar automáticamente:
// updateArtistImages();

// ===== INSTRUCCIONES DE USO =====
/*
1. Reemplaza 'TU_CLIENT_ID_AQUI' con tu Client ID real
2. Incluye este script en tu HTML después de cargar artistsData
3. Llama a updateArtistImages() para obtener las imágenes
4. Las imágenes se actualizarán automáticamente en tu objeto artistsData
*/
