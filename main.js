document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: 'Ricosaurios', precio: 150, imagen: '../images/ricosaurios.jpeg' },
        { id: 2, nombre: 'Papas Mccain', precio: 200, imagen: '../images/papas.jpg.png' },
        { id: 3, nombre: 'Puerto Cristo', precio: 350, imagen: '../images/puertocristo.jpg.png' },
        { id: 4, nombre: 'Grangys de pollo', precio: 180, imagen: '../images/grangys.jpeg' },
        { id: 5, nombre: 'Miel Aldeva', precio: 250, imagen: '../images/miel.jpeg' },
        { id: 6, nombre: 'Hamburguesas Friar', precio: 220, imagen: '../images/Hamburguesas.jpeg' }
    ];
    
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoElementos = document.getElementById('carrito-items');
    const totalCarrito = document.getElementById('total-carrito');
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');

    //////////////////////////////////////// EVENTOS/////////////////////////////////////////////////////
    document.getElementById('productos').addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const productoId = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === productoId);
            agregarAlCarrito(producto);
        }
    });

    ////////////////////////////////  agregar producto al carrito ////////////////////////
    function agregarAlCarrito(producto) {
        // Verificar si el producto esta en el carro //
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 }); 
        }
        actualizarCarrito();
    }

    ////////////////////////////Actualizar carro///////////////////////////////
    function actualizarCarrito() {
        carritoElementos.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = `${item.nombre} x ${item.cantidad}`;
            total += item.precio * item.cantidad;

            carritoElementos.appendChild(li);
        });

        totalCarrito.textContent = total;
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    ////////////////////////////vaciar carrito////////////////////////////////////////////7
    botonVaciarCarrito.addEventListener('click', () => {
        carrito.length = 0; 
        actualizarCarrito();
    });

    actualizarCarrito();
});
