// contacto.js - JavaScript para la página de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    const buyCoffeeBtn = document.getElementById('buy-coffee-btn');
    
    // Manejar envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validar campos
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }
        
        // Simular envío de email (en producción usarías un servicio real)
        sendEmail(name, email, subject, message);
    });
    
    // Función para simular envío de email
    function sendEmail(name, email, subject, message) {
        // Mostrar loading
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Enviando...</span>';
        submitBtn.disabled = true;
        
        // Simular delay de envío
        setTimeout(() => {
            // Crear enlace mailto como fallback
            const mailtoLink = `mailto:info@theartistside.com?subject=${encodeURIComponent(getSubjectText(subject))}&body=${encodeURIComponent(
                `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
            )}`;
            
            // Abrir cliente de email
            window.location.href = mailtoLink;
            
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Mostrar mensaje de éxito
            showNotification('¡Gracias por tu mensaje! Se ha abierto tu cliente de email para completar el envío.', 'success');
            
            // Limpiar formulario
            contactForm.reset();
        }, 1500);
    }
    
    // Convertir valor del select a texto legible
    function getSubjectText(value) {
        const subjects = {
            'colaboracion': 'Quiero colaborar - The Artist Side',
            'recomendacion': 'Tengo una recomendación - The Artist Side',
            'consulta': 'Consulta general - The Artist Side',
            'error': 'Reportar un error - The Artist Side',
            'otro': 'Otro - The Artist Side'
        };
        return subjects[value] || 'Contacto - The Artist Side';
    }
    
    // Buy me a coffee button
    buyCoffeeBtn.addEventListener('click', function() {
        // En producción, aquí iría el enlace real a Buy Me A Coffee
        showNotification('¡Gracias por querer apoyar el proyecto! 💜', 'success');
        // window.open('https://www.buymeacoffee.com/theartistside', '_blank');
    });
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Añadir estilos si no existen
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: rgba(30, 27, 75, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 10px;
                    padding: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    z-index: 10000;
                    max-width: 400px;
                    animation: slideIn 0.3s ease;
                }
                
                .notification-success {
                    border-color: rgba(34, 197, 94, 0.5);
                }
                
                .notification-error {
                    border-color: rgba(239, 68, 68, 0.5);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: white;
                }
                
                .notification-message {
                    flex: 1;
                    font-size: 0.9rem;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .notification-close:hover {
                    color: white;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Manejar cierre
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        // Remover clases de validación previas
        field.classList.remove('field-valid', 'field-invalid');
        
        if (isRequired && !value) {
            field.classList.add('field-invalid');
            return false;
        }
        
        // Validación específica para email
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('field-invalid');
                return false;
            }
        }
        
        if (value) {
            field.classList.add('field-valid');
        }
        
        return true;
    }
});

// Añadir estilos para validación de campos
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .field-valid {
        border-color: rgba(34, 197, 94, 0.5) !important;
        box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1) !important;
    }
    
    .field-invalid {
        border-color: rgba(239, 68, 68, 0.5) !important;
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(validationStyles);