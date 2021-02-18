

const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []


registrar()
function registrar() {
    listaCursos.addEventListener('click',agregarCurso)
}

function agregarCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

function leerDatosCurso(curso) {
    // console.log(curso)
   const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        parrafo: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad += 1
                return curso 
            } else {
                curso
            }
        })
        articulosCarrito = [...cursos]
    }  else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    console.log(articulosCarrito)
    carritoHtml()
}


//Muestra el carrito de compras enel HTML
function carritoHtml() {
    limpiarHtml()
    articulosCarrito.forEach((curso) => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.parrafo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `
        contenedorCarrito.appendChild(row)

    })
}
function limpiarHtml() {
    contenedorCarrito.innerHTML = ''
}