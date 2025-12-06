/* ========================================
   PLÁSTICOS Y DESECHABLES LA DOBLE B S.A.S
   JavaScript Global - script.js
   ======================================== */

// ========================================
// SISTEMA DE USUARIOS
// ========================================

/**
 * Obtiene todos los usuarios del localStorage
 */
function getUsers() {
    const users = localStorage.getItem('dobleB_users');
    return users ? JSON.parse(users) : [];
}

/**
 * Guarda un nuevo usuario en localStorage
 */
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('dobleB_users', JSON.stringify(users));
}

/**
 * Verifica si un email ya está registrado
 */
function emailExists(email) {
    const users = getUsers();
    return users.some(user => user.email === email);
}

/**
 * Verifica las credenciales de login
 */
function authenticateUser(email, password) {
    const users = getUsers();
    return users.find(user => user.email === email && user.password === password);
}

/**
 * Guarda la sesión del usuario actual
 */
function setCurrentUser(user) {
    // No guardamos la contraseña en la sesión
    const sessionUser = {
        nombre: user.nombre,
        empresa: user.empresa,
        email: user.email,
        telefono: user.telefono
    };
    localStorage.setItem('dobleB_currentUser', JSON.stringify(sessionUser));
}

/**
 * Obtiene el usuario actual logueado
 */
function getCurrentUser() {
    const user = localStorage.getItem('dobleB_currentUser');
    return user ? JSON.parse(user) : null;
}

/**
 * Cierra la sesión del usuario
 */
function logout() {
    localStorage.removeItem('dobleB_currentUser');
    window.location.href = 'index.html';
}

/**
 * Verifica si hay un usuario logueado
 */
function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// ========================================
// SISTEMA DE PEDIDOS
// ========================================

/**
 * Obtiene todos los pedidos del localStorage
 */
function getOrders() {
    const orders = localStorage.getItem('dobleB_orders');
    return orders ? JSON.parse(orders) : [];
}

/**
 * Guarda un nuevo pedido
 */
function saveOrder(order) {
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem('dobleB_orders', JSON.stringify(orders));
}

/**
 * Obtiene los pedidos de un usuario específico
 */
function getUserOrders(userEmail) {
    const orders = getOrders();
    return orders.filter(order => order.userEmail === userEmail);
}

/**
 * Elimina un pedido por su ID
 */
function deleteOrder(orderId) {
    let orders = getOrders();
    orders = orders.filter(order => order.id !== orderId);
    localStorage.setItem('dobleB_orders', JSON.stringify(orders));
}

// ========================================
// SISTEMA DE PRODUCTOS
// ========================================

/**
 * Inicializa productos de ejemplo en localStorage
 */
function initializeProducts() {
    const products = getProducts();
    if (products.length === 0) {
        const defaultProducts = [
            {
                id: 1,
                nombre: 'Bolsa Plástica Estándar',
                categoria: 'Bolsas',
                descripcion: 'Bolsa plástica de alta densidad, ideal para uso comercial y supermercados.',
                medida: '30x40 cm',
                imagen: '🛍️',
                precio: 'Consultar'
            },
            {
                id: 2,
                nombre: 'Bolsa Biodegradable',
                categoria: 'Bolsas',
                descripcion: 'Bolsa eco-friendly biodegradable, amigable con el medio ambiente.',
                medida: '35x45 cm',
                imagen: '♻️',
                precio: 'Consultar'
            },
            {
                id: 3,
                nombre: 'Empaque Industrial',
                categoria: 'Empaques',
                descripcion: 'Empaque de alta resistencia para industria alimentaria y farmacéutica.',
                medida: '50x60 cm',
                imagen: '📦',
                precio: 'Consultar'
            },
            {
                id: 4,
                nombre: 'Vaso Desechable',
                categoria: 'Desechables',
                descripcion: 'Vaso desechable de 12 oz, ideal para bebidas frías y calientes.',
                medida: '12 oz',
                imagen: '🥤',
                precio: 'Consultar'
            },
            {
                id: 5,
                nombre: 'Plato Desechable',
                categoria: 'Desechables',
                descripcion: 'Plato desechable resistente, perfecto para eventos y catering.',
                medida: '9 pulgadas',
                imagen: '🍽️',
                precio: 'Consultar'
            },
            {
                id: 6,
                nombre: 'Bolsa Tipo Camiseta',
                categoria: 'Bolsas',
                descripcion: 'Bolsa tipo camiseta para supermercados y tiendas.',
                medida: '28x42 cm',
                imagen: '🛍️',
                precio: 'Consultar'
            }
        ];
        localStorage.setItem('dobleB_products', JSON.stringify(defaultProducts));
    }
}

/**
 * Obtiene todos los productos
 */
function getProducts() {
    const products = localStorage.getItem('dobleB_products');
    return products ? JSON.parse(products) : [];
}

/**
 * Guarda un nuevo producto
 */
function saveProduct(product) {
    const products = getProducts();
    product.id = Date.now(); // Genera ID único
    products.push(product);
    localStorage.setItem('dobleB_products', JSON.stringify(products));
}

/**
 * Elimina un producto por su ID
 */
function deleteProduct(productId) {
    let products = getProducts();
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('dobleB_products', JSON.stringify(products));
}

// ========================================
// VALIDACIÓN DE FORMULARIOS
// ========================================

/**
 * Valida un email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Valida un teléfono (formato colombiano)
 */
function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
}

/**
 * Muestra un mensaje de alerta
 */
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Busca el contenedor del formulario o usa el body
    const container = document.querySelector('.form-container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Formatea una fecha
 */
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Genera un ID único
 */
function generateId() {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Actualiza el menú de navegación según el estado de login
 */
function updateNavigationMenu() {
    const user = getCurrentUser();
    const nav = document.querySelector('.main-nav ul');
    
    if (!nav) return;
    
    if (user) {
        // Usuario logueado
        const loginItem = nav.querySelector('a[href="login.html"]')?.parentElement;
        const registerItem = nav.querySelector('a[href="registro.html"]')?.parentElement;
        
        if (loginItem) {
            loginItem.innerHTML = `<a href="#" onclick="logout(); return false;">Cerrar Sesión (${user.nombre})</a>`;
        }
        if (registerItem) {
            registerItem.style.display = 'none';
        }
    }
}

// ========================================
// INICIALIZACIÓN
// ========================================

// Inicializar productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    updateNavigationMenu();
});

// ========================================
// FUNCIONES PARA EL DISEÑADOR
// ========================================

/**
 * Dibuja una bolsa en el canvas
 */
function drawBag(canvas, width, height, thickness) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Calcular escala
    const scale = Math.min((canvasWidth - 40) / width, (canvasHeight - 40) / height);
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    
    // Centrar
    const x = (canvasWidth - scaledWidth) / 2;
    const y = (canvasHeight - scaledHeight) / 2;
    
    // Dibujar bolsa
    ctx.fillStyle = '#e3f2fd';
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 2;
    
    // Cuerpo de la bolsa
    ctx.fillRect(x, y, scaledWidth, scaledHeight);
    ctx.strokeRect(x, y, scaledWidth, scaledHeight);
    
    // Asa (si es una bolsa tipo camiseta)
    const handleWidth = scaledWidth * 0.3;
    const handleHeight = scaledHeight * 0.15;
    ctx.fillRect(x + scaledWidth * 0.1, y - handleHeight, handleWidth, handleHeight);
    ctx.strokeRect(x + scaledWidth * 0.1, y - handleHeight, handleWidth, handleHeight);
    ctx.fillRect(x + scaledWidth * 0.6, y - handleHeight, handleWidth, handleHeight);
    ctx.strokeRect(x + scaledWidth * 0.6, y - handleHeight, handleWidth, handleHeight);
    
    // Texto con dimensiones
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${width} cm`, canvasWidth / 2, canvasHeight - 10);
    
    ctx.save();
    ctx.translate(15, canvasHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${height} cm`, 0, 0);
    ctx.restore();
    
    // Grosor
    ctx.font = '12px Arial';
    ctx.fillText(`Grosor: ${thickness} micras`, canvasWidth / 2, 20);
}

/**
 * Dibuja un capuchón en el canvas
 */
function drawCapucho(canvas, width, height, fuelle) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Calcular escala
    const totalWidth = width + (fuelle * 2);
    const scale = Math.min((canvasWidth - 60) / totalWidth, (canvasHeight - 40) / height);
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const scaledFuelle = fuelle * scale;
    
    // Centrar
    const x = (canvasWidth - scaledWidth) / 2;
    const y = (canvasHeight - scaledHeight) / 2;
    
    // Cuerpo del capuchón
    ctx.fillStyle = '#fff3e0';
    ctx.strokeStyle = '#ff6f00';
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, scaledWidth, scaledHeight);
    ctx.strokeRect(x, y, scaledWidth, scaledHeight);
    
    // Fuelle izquierdo
    if (fuelle > 0) {
        ctx.fillStyle = '#ffe0b2';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - scaledFuelle, y + scaledHeight * 0.2);
        ctx.lineTo(x - scaledFuelle, y + scaledHeight * 0.8);
        ctx.lineTo(x, y + scaledHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Fuelle derecho
        ctx.beginPath();
        ctx.moveTo(x + scaledWidth, y);
        ctx.lineTo(x + scaledWidth + scaledFuelle, y + scaledHeight * 0.2);
        ctx.lineTo(x + scaledWidth + scaledFuelle, y + scaledHeight * 0.8);
        ctx.lineTo(x + scaledWidth, y + scaledHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    
    // Texto con dimensiones
    ctx.fillStyle = '#ff6f00';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Ancho: ${width} cm`, canvasWidth / 2, canvasHeight - 10);
    ctx.fillText(`Alto: ${height} cm | Fuelle: ${fuelle} cm`, canvasWidth / 2, 20);
}

// ========================================
// EXPORTAR FUNCIONES GLOBALES
// ========================================

// Las funciones ya están en el ámbito global
console.log('Script.js cargado correctamente - Sistema La Doble B inicializado');