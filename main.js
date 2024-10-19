document.addEventListener('DOMContentLoaded', () => {
    const productos = [];

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoElementos = document.getElementById('carrito-items');
    const totalCarrito = document.getElementById('total-carrito');
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');

    // Fetch de productos desde una API externa
    axios.get('https://api.ejemplo.com/productos')
        .then(response => {
            productos.push(...response.data);
            mostrarProductos(productos);
        })
        .catch(error => console.error('Error al obtener los productos:', error));

    function mostrarProductos(productos) {
        const productosContainer = document.getElementById('productos');
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'col-md-4 col-sm-6';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <button class="btn btn-primary" data-id="${producto.id}">Agregar al Carrito</button>
                    </div>
                </div>`;
            productosContainer.appendChild(card);
        });
    }

    document.getElementById('productos').addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const productoId = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === productoId);
            agregarAlCarrito(producto);
        }
    });

    function agregarAlCarrito(producto) {
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 }); 
        }
        actualizarCarrito();
    }

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

        totalCarrito.textContent = total;
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    carritoElementos.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const productoId = parseInt(e.target.getAttribute('data-id'));
            eliminarDelCarrito(productoId);
        }
    });

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

    botonVaciarCarrito.addEventListener('click', () => {
        carrito.length = 0; 
        actualizarCarrito();
    });

    actualizarCarrito();
});
