document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: 'Ricosaurios', precio: 2405, imagen: './images/ricosaurios.jpeg', descripcion: 'Pequeñas delicias crujientes por fuera y fundentes por dentro, ideales para picotear.' },
        { id: 2, nombre: 'Papas Mccain', precio: 3739, imagen: './images/papas.jpg.png', descripcion: 'Papas prefritas supercongeladas, conocidas por su sabor delicioso y textura crujiente.' },
        { id: 3, nombre: 'Puerto Cristo', precio: 1718, imagen: './images/puertocristo.jpg.png', descripcion: 'Una cerveza artesanal personal de la empresa Milimar, destacada por su elaboración cuidada y sabor distintivo que la hacen única.' },
        { id: 4, nombre: 'Grangys de pollo', precio: 3157, imagen: './images/grangys.jpeg', descripcion: 'Deliciosos, crujientes y perfectos para compartir. Un bocado irresistible para los amantes de la gastronomía.' },
        { id: 5, nombre: 'Miel Aldeva', precio: 1690, imagen: './images/miel.jpeg', descripcion: 'Miel natural, exquisita y versátil.' },
        { id: 6, nombre: 'Hamburguesas Friar', precio: 616, imagen: './images/Hamburguesas.jpeg', descripcion: 'Carne de calidad, jugosa, sabor auténtico, ideal para parrilla, perfecta para cualquier ocasión.' }
    ];

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoElementos = document.getElementById('carrito-items');
    const totalCarrito = document.getElementById('total-carrito');
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');

    // Mostrar productos en el catálogo
    function mostrarProductos() {
        const productosContainer = document.getElementById('productos');
        productosContainer.innerHTML = ''; // Limpiar contenido existente
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'col-md-4 col-sm-6';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <button class="btn btn-primary" data-id="${producto.id}" data-precio="${producto.precio}">Agregar al Carrito</button>
                    </div>
                </div>`;
            productosContainer.appendChild(card);
        });
    }

    // Agregar producto al carrito
    function agregarAlCarrito(producto) {
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarCarrito();
    }

    // Actualizar el carrito en el DOM y en LocalStorage
    function actualizarCarrito() {
        carritoElementos.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${item.nombre} x ${item.cantidad}
                <button class="btn btn-danger btn-sm" data-id="${item.id}">x</button>`;
            total += item.precio * item.cantidad;

            carritoElementos.appendChild(li);
        });

        totalCarrito.textContent = total.toFixed(2);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Eliminar producto del carrito
    function eliminarDelCarrito(productoId) {
        const productoIndex = carrito.findIndex(item => item.id === productoId);
        if (productoIndex !== -1) {
            if (carrito[productoIndex].cantidad > 1) {
                carrito[productoIndex].cantidad -= 1;
            } else {
                carrito.splice(productoIndex, 1);
            }
            actualizarCarrito();
        }
    }

    // Vaciar el carrito
    botonVaciarCarrito.addEventListener('click', () => {
        carrito.length = 0;
        actualizarCarrito();
    });

    // Evento para agregar producto al carrito
    document.getElementById('productos').addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const productoId = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === productoId);
            if (producto) {
                agregarAlCarrito(producto);
            }
        }
    });

    // Evento para eliminar producto del carrito
    carritoElementos.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const productoId = parseInt(e.target.getAttribute('data-id'));
            eliminarDelCarrito(productoId);
        }
    });

    // Inicializar la página mostrando los productos y actualizando el carrito
    mostrarProductos();
    actualizarCarrito();
});
