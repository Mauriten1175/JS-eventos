const contenedor = document.querySelector('.containerCards');
const carritoVer = document.querySelector('.carrito');
const precioTotal = document.getElementById('total');


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


const productos = [ 
    {id: 1, name: "Radiant C", description: "Crema facial", price: 1500, img: "https://http2.mlstatic.com/D_NQ_NP_842031-MLA48453686009_122021-O.webp", stock: 10},
    {id: 2, name: "Formula limpieza", description: "Limpiador facial", price: 1250, img:"https://www.lidherma.com/thumbnails/ldh_limpieza_emulsion_110gr_mobile_450x450.jpg", stock: 15},
    {id: 3, name: "Plasma infusion", description: "Crema facial", price: 1800, img:"https://http2.mlstatic.com/D_NQ_NP_657999-MLA51196175217_082022-O.webp", stock: 20},
    {id: 4, name: "Aquashot exfoliante", description: "Exfoliante facial", price: 1400, img:"https://www.lidherma.com/thumbnails/ldh_aquashot_gel_exfoliante_90g_mobile_450x450.jpg" , stock: 5}
]

console.log(productos);

function creaCards() {
    productos.forEach(el => {
        let card = document.createElement('card');
        card.className = 'cards'
        card.innerHTML += `<div>
        <h2>${el.name}</h2>
        <p>${el.description}</p>
        <p class= colorprice>$${el.price}</p>
        <img class="images" src="${el.img}" alt="">
        <button class="btnCarrito" id="btn-agregar${el.id}" >Agregar</button>
        </div>
        `
        contenedor.append(card);
    })
    botonComprar();
    
}



function botonComprar(){
    productos.forEach(producto => {
    document.querySelector(`#btn-agregar${producto.id}`).addEventListener('click',()=>{
        agregarAlCarrito(producto)
    })
    })
    totalCarrito();
}

function agregarAlCarrito(producto){ 
    
    let existe =carrito.some(prod=>prod.id === producto.id);
    if(existe===false){
    producto.cantidad = 1;
    carrito.push(producto);
    }
    else{
    let prodFind = carrito.find(prod=>prod.id === producto.id)
    prodFind.cantidad++;
    }
    console.log(carrito);
    
    armarCarrito();
    totalCarrito();
    
    
}

function armarCarrito(){
    carritoVer.innerHTML='';
        carrito.forEach(prod=>{
            carritoVer.innerHTML += `<div class= cards>
            <h2>${prod.name}</h2>
            <p>${prod.description}</p>
            <p class= colorprice>$${prod.price}</p>
            <h3>Cantidad: ${prod.cantidad}</h3>
            <button class="btnCarrito" id="btn-quitar${prod.id}" >Quitar</button>
            </div>
            `
        })
        localStorage.setItem('carrito',JSON.stringify(carrito));
        console.log(carritoVer);
        
        quitarProducto();
        totalCarrito();

}

function quitarProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#btn-quitar${producto.id}`).addEventListener('click',()=>{
            console.log('click');
            let indice = carrito.findIndex(e=>e.id===producto.id);
            carrito.splice(indice,1);
            armarCarrito();
        })
    
})
}



function totalCarrito(){

    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.price*prod.cantidad,0);

}    


armarCarrito();


creaCards();