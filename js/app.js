//Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito =document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners() {
    //Cuando agregas un curso presionando agregar carrito
    listaCursos.addEventListener('click', agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso)

    //Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] // reseteamos el arreglo
        limpiarHTML()//Eliminamos todo el html
    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
    
}
//Elimina curso del carrito
function eliminarCurso(e){
        if(e.target.classList.contains('borrar-curso')){
            const cursoId = e.target.getAttribute('data-id')
            //Elimina del arreglo de articulosCarrito por el data-id
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
            carritoHmtl()//Iterar sobre el carrito y mostrar su HTML
        }

    }

//Lee el contenido del HTML y extrae la info del curso
function leerDatosCurso(curso) {
    // console.log(curso)
 // Crear un objeto con el contenido del curso actual
 const infoCurso = {
     imagen: curso.querySelector('img').src,
     titulo: curso.querySelector('h4').textContent,
     precio: curso.querySelector('.precio span').textContent,
    //  parrafo: curso.querySelector('p').textContent,
     id: curso.querySelector('a').getAttribute('data-id'),
     cantidad: 1
 }

 //Revis si un elemento ya esta en el carrito
 const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
 if(existe){
     //actualizamos la cantidad
     const cursos = articulosCarrito.map(curso => {
         if(curso.id ===infoCurso.id){
            curso.cantidad += 1
            return curso//retorna objecto actualizdo
         } else {
             curso//Retorna los objetos qe no son duplicados
         }
     })
     articulosCarrito = [...cursos]
 } else {
     //Agregar elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
 }
console.log(articulosCarrito)
carritoHmtl()

}

//Muestra el carrito de compras en el HTML
function carritoHmtl() {
    //Limpiar el HTML
    limpiarHTML()
    //RECORRE EL CARRITO Y GENERA EL HTML
    articulosCarrito.forEach((curso) => {
        // const {imagen,titulo,precio,cantidad,id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td
        <td>${curso.cantidad}</td
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td
        `
        //agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = ''
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}