class Vehicle {
    constructor(id, brand, name, year, price, img) {
        this.id = id;
        this.brand= brand;
        this.name = name;
        this.year = year;
        this.price = price;
        this.img = img;
        this.amount = 1;
    }
}

const corsa = new Vehicle(1, "Chevrolet", "Corsa", "2017", 7000, "img/corsa.jpeg");
const kwid = new Vehicle(2, "Renault", "Kwid", "2018", 9000, "img/kwid.jpeg");
const suran = new Vehicle(3, "Volkswagen", "Suran", "2016", 8500, "img/suran.jpeg");
const p308 = new Vehicle(4, "Peugeot", "308", "2017", 10000, "img/308.jpeg");
const sandero = new Vehicle(5, "Renault", "Sandero", "2017", 12000, "img/sandero.jpeg");
const renegade = new Vehicle(6, "Jeep", "Renegade", "2018", 18500, "img/jeep.jpeg");
const spin = new Vehicle(7, "Chevrolet", "Spin", "2018", 21000, "img/spin.jpeg");
const ecosport = new Vehicle(8, "Ford", "Eco Sport", "2016", 14000, "img/Ecosport-2016.jpg");

const vehicles = [corsa, kwid, suran, p308, sandero, renegade, spin, ecosport];
console.log(vehicles);

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Modificamos el DOM mostrando los productos

const vehicleContainer = document.getElementById("vehicleContainer");

//Creamos una función para mostrar los productos. 

const showVehicles = () => {
    vehicles.forEach(vehicle => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${vehicle.img}" class = "card-img-top imgProductos" alt = "${vehicle.name}">
                            <div>
                                <h5> ${vehicle.name} </h5>
                                <p> ${vehicle.price} </p>
                                <button class = "btn colorBoton" id="boton${vehicle.id}" > Agregar a la reserva</button>
                            </div>
                        </div>
                        `
        vehicleContainer.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${vehicle.id}`);
        boton.addEventListener("click", () => {
            addToCart(vehicle.id);
        })
    })
}

showVehicles();

//Creamos la función agregar al carrito: 

const addToCart = (id) => {
    const productoEnCarrito = carrito.find(vehicle => vehicle.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.amount++;
    } else {
        const vehicle = vehicles.find(vehicle => vehicle.id === id);
        carrito.push(vehicle);
    }
    calcularTotal();
    //     //Trabajamos con el localStorage: 
    // localStorage.setItem("carrito", JSON.stringify(carrito));
}

// //Mostrar el carrito de compras:

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(vehicle => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${vehicle.img}" class = "card-img-top imgProductos" alt = "${vehicle.name}">
                            <div>
                                <h5> ${vehicle.name} </h5>
                                <p> ${vehicle.price} </p>
                                <button class = "btn colorBoton" id="restar${vehicle.id}" > - </button>
                                <button class = "btn colorBoton" id="sumar${vehicle.id}" > + </button>
                                <p> ${vehicle.amount} </p>
                                <button class = "btn colorBoton" id="eliminar${vehicle.id}" > Eliminar </button>
                                
                            </div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);


        const btnSubtract = document.getElementById(`restar${vehicle.id}`);
        btnSubtract.addEventListener("click", () => {
            if(vehicle.amount !== 1){
                vehicle.amount--;
            }
            mostrarCarrito();
        })

        const btnAdd = document.getElementById(`sumar${vehicle.id}`);
        btnAdd.addEventListener("click", () => {
            
            vehicle.amount ++;          
            mostrarCarrito();
        })

        //Eliminamos productos desde el carrito:
        const boton = document.getElementById(`eliminar${vehicle.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(vehicle.id);
        })
    })
    calcularTotal();
}

// //Funcion que elimina el producto del carrito:

const eliminarDelCarrito = (id) => {
    const vehicle = carrito.find(vehicle => vehicle.id === id);
    const indice = carrito.indexOf(vehicle);
    carrito.splice(indice, 1);
    mostrarCarrito();
}


// //Mostramos el total de la compra:

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(vehicle => {
        totalCompra += vehicle.price * vehicle.amount;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

// //Vaciar todo el carrito:

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage:
    localStorage.clear();
}