//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos =document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso); //Agreagar curso al carrito dar click.
    carrito.addEventListener('click', eliminarCurso); //Elimina curso agregado
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reset al arreglo
        limpiarHTML(); //Limpiar el HTML que muestra los cursos agregados
    })
}



//Funciones
function agregarCurso(e) {
    if(e.target.classList.contains('agregar-carrito')) {
        e.preventDefault()
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
    
}

//Elimina Curso del Carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina  del arreghlo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

        carritoHTML(); // Volvemos a iterar sobre el carrito
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

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe){
        //Actualizamos el curso al carrito
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            }else{
                return curso;//Retorna los objetos no duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
        //Arregla elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    

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