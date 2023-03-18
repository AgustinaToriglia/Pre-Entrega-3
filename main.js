let vehicles = [];
let carrito = [];
carrito = [];
localStorage.setItem("carrito", carrito);
localStorage.setItem("mostrarCarrito", false);
const urlLocal = "vehicles.json";

fetch(urlLocal)
    .then(response => response.json())
    .then(data => {
        vehicles = data;
        showVehicles(data);
    })
    .catch(error => console.log(error));

const vehicleContainer = document.getElementById("vehicleContainer");

const showVehicles = () => {
    carrito = [];
    vehicles.forEach(vehicles => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${vehicles.imgUrl}" class = "card-img-top imgProductos" alt = "${vehicles.name}">
                            <div>
                                <h5> ${vehicles.name} </h5>
                                <p> ${vehicles.price} </p>
                                <button class = "btn colorBoton" id="boton${vehicles.id}" > Agregar a la reserva</button>
                            </div>
                        </div>
                        `
        vehicleContainer.appendChild(card);

        const boton = document.getElementById(`boton${vehicles.id}`);
        boton.addEventListener("click", () => {
            Toastify({
                text: "Vehículo agregado a la reserva",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, lightslategray, gray)",
                    borderRadius: "2rem"
                },
                onClick: function () { } // Callback after click
            }).showToast();
            addToCart(vehicles.id);
        })
    })
}

const addToCart = (id) => {
    const productoEnCarrito = carrito.find(vehicles => vehicles.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.amount++;
    } else {
        const vehicle = vehicles.find(vehicles => vehicles.id === id);
        const copy = JSON.parse(JSON.stringify(vehicle));
        copy.amount = 1
        carrito.push(copy);
    }
    calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const mCarrito = localStorage.getItem("mostrarCarrito");
    if (mCarrito === true) {
        mostrarCarrito();
    }
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(vehicles => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${vehicles.imgUrl}" class = "card-img-top imgProductos" alt = "${vehicles.name}">
                            <div>
                                <h5> ${vehicles.name} </h5>
                                <p> ${vehicles.price} </p>
                                <button class = "btn colorBoton" id="restar${vehicles.id}" > - </button>
                                <button class = "btn colorBoton" id="sumar${vehicles.id}" > + </button>
                                <p> ${vehicles.amount} </p>
                                <button class = "btn colorBoton" id="eliminar${vehicles.id}" > Eliminar </button>
                                
                            </div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);


        const btnSubtract = document.getElementById(`restar${vehicles.id}`);
        btnSubtract.addEventListener("click", () => {
            if (vehicles.amount !== 1) {
                vehicles.amount--;
            }
            mostrarCarrito();
        })

        const btnAdd = document.getElementById(`sumar${vehicles.id}`);
        btnAdd.addEventListener("click", () => {

            vehicles.amount++;
            mostrarCarrito();
        })
        const boton = document.getElementById(`eliminar${vehicles.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(vehicles.id);
        })
    })
    calcularTotal();
    localStorage.setItem("mostrarCarrito", true);
}

const eliminarDelCarrito = (id) => {
    const vehicles = carrito.find(vehicles => vehicles.id === id);
    const indice = carrito.indexOf(vehicles);
    carrito.splice(indice, 1);
    mostrarCarrito();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    console.log("calcularCarrito", carrito);
    carrito.forEach(item => {
        totalCompra += item.price * item.amount;
        console.log(item.brand)
        console.log(item.price)
        console.log(item.amount)
    })
    total.innerHTML = `Total: $${totalCompra}`;
}



const vaciarCarrito = document.getElementById("vaciarCarrito");


const eliminarTodoElCarrito = () => {
    localStorage.setItem("carrito", []);
    localStorage.setItem("mostrarCarrito", false);
    carrito = [];

    mostrarCarrito();
    vaciarCarrito.addEventListener("click", () => {
        Swal.fire({
            title: "¿Seguro que quieres vaciar el carrito?",
            icon: "warning",
            confirmButtonText: "Aceptar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            background: "lightslategray",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    console.log("voy a eliminar todo el carrito")
                    eliminarTodoElCarrito();
                    Swal.fire({
                        title: "Carrito Vacio",
                        icon: "success",
                        confirmButtonText: "Aceptar",

                        background: "green",
                    })
                }
            })
    })
}
