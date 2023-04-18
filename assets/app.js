const {log} = console;


//variables arays
const contenedorCardsRecom = document.querySelector('.cards-cont');
const contenedorCardsCat = document.querySelector('.cat-cards-cont');
const contenedorCardsPop = document.querySelector('.cards-pop-cont');
const arrayPizzasRecom = 
[
{cantidad: 1, img: './assets/img/recom1.png' ,titulo : 'Benazziana', subtitulo : 'La mas completa', precio : 3650},
{cantidad: 1, img: './assets/img/recom2.png' ,titulo : 'Tronco-Pizza', subtitulo : 'Para todo el dia', precio : 870},
{cantidad: 1, img: './assets/img/recom3.png' ,titulo : 'Papas | Provenzal', subtitulo : 'Van como piña', precio : 360},
];

const arrayCategorias = 
[
{img : './assets/img/cat-pizza.png',titulo : 'Populares'},
{img : './assets/img/cat-pizza2.png',titulo : 'Pizzas'},
{img : './assets/img/cat-burger.png',titulo : 'Hamburgesas'},
{img : './assets/img/cat-papas.png',titulo : 'Napapuki'},
{img : './assets/img/cat-burrito.png',titulo : 'Wraps'},
{img : './assets/img/cat-taco.png',titulo : 'Mexican Food'},
{img : './assets/img/cat-batido.png',titulo : 'Batidos'},
];

const arrayPopulares = 
[
{cantidad: 1, img : './assets/img/Pop-card-img1.png', titulo : 'La Mr. Pit', subtitulo : 'Solo para expertos', precio : 350},
{cantidad: 1, img : './assets/img/Pop-card-img2.png', titulo : "¡Q'Jamone!", subtitulo : 'C/ jamon crudo', precio : 350},
{cantidad: 1, img : './assets/img/Pop-card-img3.png', titulo : 'La Charly García', subtitulo : '¡Basta!', precio : 380},
{cantidad: 1, img : './assets/img/Pop-card-img4.png', titulo : 'La Maradona', subtitulo : '¡Eterna!', precio : 450},
{cantidad: 1, img : './assets/img/Pop-card-img5.png', titulo : 'Picantovich', subtitulo : 'Pica 2 veces', precio : 750},
{cantidad: 1, img : './assets/img/Pop-card-img6.png', titulo : 'La Hasbulla', subtitulo : 'En honor al 1', precio : 990},
{cantidad: 1, img : './assets/img/Pop-card-img7.png', titulo : 'Leo Messi', subtitulo : '¡De pié señores!', precio : 10},
{cantidad: 1, img : './assets/img/Pop-card-img8.png', titulo : 'La maga', subtitulo : 'La que desaparece', precio : 0},
];

//LS
const totalProductos = arrayPizzasRecom.concat(arrayPopulares)


//render seccion recomendados
const funRendeRecom = () => {
   arrayPizzasRecom.map( i => {
        const {img, titulo, subtitulo, precio} = i;
        return contenedorCardsRecom.innerHTML += 
        `
        <div class="recom-cards">
            <div class="img-recom-cont">
                <img src="${img}" alt="">
            </div>
            <div class="text-recom-cont">
                <span class="recom-card-title">${titulo}</span>
                <span class="recom-card-subt">${subtitulo}</span>
                <span class="recom-precio">$${precio}</span>
            </div>
            <div class="btn-agregar">
                <button id="${titulo}" class="boton">Agregar</button>
            </div> 
        </div>
        `;
    });
}
funRendeRecom();

//render seccion categorias
const funRenderCat = () =>{
    arrayCategorias.map( i => {
        const {img, titulo} = i;
        return contenedorCardsCat.innerHTML += 
        `
        <div class="cat-cards">
            <div class="cat-img-cont">
                <img src="${img}" alt="">
            </div>
            <div class="cat-txt-cont">
                <span>${titulo}</span>
                <hr>
            </div>
        </div>
        `;
    });
};
funRenderCat();

//render seccion populares
const funRenderPop = () => {
    arrayPopulares.map(i => {
        const { img, titulo, subtitulo, precio} = i;
        
        contenedorCardsPop.innerHTML +=
        `
        <div class="pop-cards">
            <div class="img-pop-cont">
                <img src="${img}" alt="">
            </div>
            <div class="text-pop-cont">
                <span class="pop-card-title">${titulo}</span>
                <span class="pop-card-subt">${subtitulo}</span>
            </div>
            <div class="pr-btn-recom">
                <span class="recom-precio">$${precio}</span>
                <div class="btn-agregar">
                    <button id="${titulo}" class="boton">Agregar</button>
                </div> 
            </div>   
        </div>
        `;
    });
};
funRenderPop();

//carrito
const modal = document.querySelector('.modal');
const contadorCont = document.querySelector('.contador-cont');
const contadorSpan = document.getElementById('contador-span');
let contador = 0;
let arrayCarrito = [];
let botones = document.querySelectorAll('.boton');
const carrito = document.querySelector('.carrito');
const productosModal = document.querySelector('.productos');
const valorTotal = document.getElementById('precio-total');
const cerrar = document.querySelector('.cerrar');

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carritoLS')){
        log('hola')
        arrayCarrito = JSON.parse(localStorage.getItem('carritoLS'));
        cantidadesLS = arrayCarrito.map(i => i.cantidad) 
        contador = cantidadesLS.reduce((a,b) => {
            return a + b;
        },0);
        contadorSpan.innerHTML = `${contador}`;

        log(contador)
        if(contador === 0){
            contadorCont.style.visibility = 'hidden';  
        }else{
            contadorCont.style.visibility = 'visible';
        }
       
        renderHtml();
    }
   
        
        
})

const sumarPedidosCarrito = () => {

    botones.forEach(boton => {

        boton.addEventListener('click',() => {
        contadorCont.style.visibility = 'visible';
        contador ++;
        contadorSpan.innerHTML = `${contador}`;
        
        
        });
        
    });

};
sumarPedidosCarrito();

//
const btnAgregarF = () => {
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const btnId = btn.id;
            const btnSeleccionado = totalProductos.find(i => i.titulo === btnId);
            let infoProducto = {
                cantidad: btnSeleccionado.cantidad,
                titulo : btnSeleccionado.titulo,
                subtitulo : btnSeleccionado.subtitulo,
                precio : btnSeleccionado.precio,
                img : btnSeleccionado.img,
            };

            const exist = arrayCarrito.some(producto => producto.titulo === infoProducto.titulo)
        

            if(exist){
                const productos = arrayCarrito.map(product => {

                    if(product.titulo === infoProducto.titulo){
                        product.cantidad++;
                        
                        return product;
                    }else{
                        return product;
                    }
                    
                });
                arrayCarrito = [...productos];
              
              
            }
            else{
                arrayCarrito = [...arrayCarrito, infoProducto];    
                     
                
            };

            
           
            renderHtml();

        });

        
    });
};
btnAgregarF();



//renderizar producto en carrito
const renderHtml = () => {

    let total = 0;
    let totalDeProductos = 0;

    productosModal.innerText = '';

    arrayCarrito.map(producto => {

        productosModal.innerHTML += 
        `
        <div class="productos-modal-cont">
            <div class="prod-img">
                <img src="${producto.img}" alt="">
            </div>
            <div class="prod-txt">
                <h5 class="titulo">${producto.titulo}</h5>
                <p>${producto.subtitulo}</p>
                <span>$${producto.precio}</span>
            </div>
            <div class="prod-cant">
                <div id="${producto.titulo}" class="restar">-</div>
                <span id="contadorCarrito">${producto.cantidad}</span>
                <div id="${producto.titulo}" class="sumar">+</div>
            </div> 
        </div>
        `;


        total = total + producto.cantidad * producto.precio;
        totalDeProductos = totalDeProductos + producto.cantidad;
    
       
    });
    
    valorTotal.innerText = `$${total}`;
    localStorage.setItem('carritoLS', JSON.stringify(arrayCarrito));
    
    
};

productosModal.addEventListener('click', e => {
    btnAccion(e);
})

const btnAccion = e => {
    
    if(e.target.classList.contains('sumar')){
        const prodSel = arrayCarrito.find(prod => prod.titulo === e.target.id)
        prodSel.cantidad++;
        contador++;
        contadorSpan.innerHTML = `${contador}`;
        renderHtml();
    }
    
    
    if(e.target.classList.contains('restar')){
        const prodSel = arrayCarrito.find(prod => prod.titulo === e.target.id);

        if(prodSel.cantidad >= 2){

            prodSel.cantidad--;

            contador--;
            contadorSpan.innerHTML = `${contador}`;
            renderHtml();
        }
        else if(prodSel.cantidad = 1){
            const eFil = e.target.id;
            arrayCarrito = arrayCarrito.filter(i => i.titulo !== eFil)
            contador--;
            if(contador === 0){
                contadorCont.style.visibility = 'hidden';  
            }else{
                contadorCont.style.visibility = 'visible';
            }
            contadorSpan.innerHTML = `${contador}`;
            renderHtml();
        }
        else{
            prodSel.cantidad;
            renderHtml();
        };
    };
};

const btnAccionComprado = () => {
    const btnComprar = document.getElementById('comprar');
    btnComprar.addEventListener('click', () => {
        if(arrayCarrito.length >= 1){

            alert('¡Compra exitosa!, gracias por elegirnos.');

            renderHtml();
            arrayCarrito = [];
            contador = 0;
            contadorSpan.innerHTML = `${contador}`;
            contadorCont.style.visibility = 'hidden';  
            renderHtml();
        }

    });
};
btnAccionComprado();

//mostrar y ocultar carrito

const nav = document.querySelector('nav');
const main = document.querySelector('main');
const section = document.querySelectorAll('section');


const mostrarModal = () => {
    carrito.addEventListener('click', () => {
        modal.style.visibility = 'visible';
        nav.style.filter = 'blur(4px)';
        main.style.filter = 'blur(4px)';
        section.forEach(i => {
            i.style.filter = 'blur(4px)';
        })
    });
};
mostrarModal();

const cerrarModal = () => {
    cerrar.addEventListener('click', () => {
        modal.style.visibility = 'hidden';
        nav.style.filter = 'none';
        main.style.filter = 'none';
        section.forEach(i => {
            i.style.filter = 'none';
        })
    });
};
cerrarModal();

