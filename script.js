// script.js - JavaScript básico para la interactividad
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad de búsqueda
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Función de búsqueda
    function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            alert('Por favor, introduce un término de búsqueda');
            return;
        }
        
        // Lista de artistas disponibles (por ahora simulado)
        const availableArtists = [
            'bad bunny', 'drake', 'tyler', 'kendrick', 'rosalia',
            'tyler the creator', 'kendrick lamar', 'mac miller',
            'frank ocean', 'jorja smith', 'dano', 'kase o'
        ];
        
        // Verificar si el artista está disponible
        const artistFound = availableArtists.some(artist => 
            artist.includes(searchTerm) || searchTerm.includes(artist)
        );
        
        if (artistFound) {
            // Redirigir a la página del artista (por ahora mostrar alerta)
            alert(`Redirigiendo a la página de ${searchTerm}...`);
            // En el futuro: window.location.href = `artista.html?name=${searchTerm}`;
        } else {
            // Mostrar página de colaboración
            showCollaborationModal(searchTerm);
        }
    }
    
    // Event listeners para búsqueda
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Funcionalidad de círculos de artistas
const artistCircles = document.querySelectorAll('.artist-circle');

artistCircles.forEach(circle => {
    circle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const artistName = this.dataset.artist;
        
        // Añadir efecto de click
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Navegación real
        setTimeout(() => {
            const artistUrls = {
                'bad bunny': 'artista.html?artist=bad-bunny',
                'drake': 'artista.html?artist=drake',
                'tyler': 'artista.html?artist=tyler-the-creator',
                'kendrick': 'artista.html?artist=kendrick-lamar',
                'jorja smith': 'artista.html?artist=jorja-smith'
            };
            
            const url = artistUrls[artistName.toLowerCase()] || `artista.html?artist=${artistName.toLowerCase().replace(' ', '-')}`;
            window.location.href = url;
        }, 200);
    });
    
    // Efecto hover mejorado
    circle.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    circle.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});
        
        circle.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Modal de colaboración
    function showCollaborationModal(searchTerm) {
        // Crear modal dinámicamente
        const modal = document.createElement('div');
        modal.className = 'collaboration-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>¡Ayúdanos a crecer!</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>No tenemos información sobre <strong>"${searchTerm}"</strong> todavía.</p>
                    <p>¿Conoces recomendaciones musicales de este artista?</p>
                    <p>¡Envíanos la información que conozcas!</p>
                    <div class="collaboration-actions">
                        <a href="mailto:info@theartistside.com?subject=Información sobre ${searchTerm}" 
                           class="btn-primary">
                            📧 Enviar información
                        </a>
                        <button class="btn-secondary close-modal">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cerrar modal
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });
        
        // Cerrar al hacer click fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Animación suave para el scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efecto parallax suave en el fondo
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body');
        const speed = scrolled * 0.5;
        
        parallax.style.backgroundPosition = `center ${speed}px`;
    });
    
    // Animación de entrada para los elementos
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
    
    // Observar elementos para animación
    document.querySelectorAll('.hero-content, .about-section, .artist-circle').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
