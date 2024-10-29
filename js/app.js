//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos =document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso) //Agreagar curso al carrito dar click.
}



//Funciones
function agregarCurso(e) {
    if(e.target.classList.contains('agregar-carrito')) {
        e.preventDefault()
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
    
}

//Leer y extraer datos del curso

function leerDatosCurso(curso){

    //Crear objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Arregla elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso]

    console.log(articulosCarrito)
    carritoHTML()

}

//Muestra el Carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML()

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        console.log(curso)
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" alt="Imagen de ${titulo}" width="100"></td> 
        <td>${titulo}</td>
        <td>${precio} </td> 
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}" >X</a></td>
        `;
        //Agrega el HTML en el Tbody
        contenedorCarrito.appendChild(row)
    })
}

//Elimina los cursos del TBody

function limpiarHTML() {
    //contenedorCarrito.innerHTML = ''
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}