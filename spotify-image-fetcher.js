// ===== SPOTIFY IMAGE FETCHER - VERSIÓN CORREGIDA =====
// Obtiene automáticamente las imágenes de los artistas desde Spotify

class SpotifyImageFetcher {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.accessToken = null;
    }

    // Obtener token de acceso
    async getAccessToken() {
        const credentials = btoa(this.clientId + ':' + this.clientSecret);
        
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + credentials
            },
            body: 'grant_type=client_credentials'
        });
        
        const data = await response.json();
        
        if (data.access_token) {
            this.accessToken = data.access_token;
            console.log('✅ Token obtenido correctamente');
            return this.accessToken;
        } else {
            console.error('❌ Error obteniendo token:', data);
            throw new Error('No se pudo obtener el token de acceso');
        }
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

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

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
                
                // Pequeña pausa entre requests
                await new Promise(resolve => setTimeout(resolve, 100));
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
    // ⚠️ REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES REALES
    const CLIENT_ID = '08f380b0c88b49398011db2a8b97ce71';
    const CLIENT_SECRET = '0fcbbbded6dc4ae1ad0c51c6980d4238';
    
    const fetcher = new SpotifyImageFetcher(CLIENT_ID, CLIENT_SECRET);
    
    try {
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
        console.log('📋 URLs finales:', Object.fromEntries(
            Object.entries(images).map(([key, url]) => [key, url])
        ));
        
        // Re-renderizar la página si es necesario
        if (typeof renderArtists === 'function') {
            renderArtists();
        }
        
    } catch (error) {
        console.error('❌ Error general:', error);
    }
}
