//------- AGREGO DATOS A LA TABLA DE VENTAS POR SUCURSAL -------

const ventasCentro = document.querySelector('#ventas-centro')
const ventasCaballito = document.querySelector('#ventas-caballito')

const totalVentasporSucursal = () => {
  ventasCentro.innerHTML = `$ ${ventasSucursal('Centro')}`
  ventasCaballito.innerHTML = `$ ${ventasSucursal('Caballito')}`
}
totalVentasporSucursal()

//---------- AGREGO DATOS A LA TABLA DE REPORTES ----------

const productoEstrella = document.querySelector('#producto-estrella')

const cargarProductoEstrella = () => {
  productoEstrella.innerHTML = componenteMasVendido()
}
cargarProductoEstrella()

const mejorVendedora = document.querySelector('#mejor-vendedora')

const cargarVendedoraDelMes = () => {
  mejorVendedora.innerHTML = vendedoraEstrella()
}
cargarVendedoraDelMes()

//----------- AGREGO DATOS PRECARGADOS LA TABLA DE VENTAS -----------

const ordenarVentasPorFecha = () => {
    return ventas.sort((a, b) => new Date(a.fecha).getTime() < new Date(b.fecha).getTime())
}
ordenarVentasPorFecha()

const tablaVentas = document.querySelector('#tbody-ventas')

const cargarTablaVentas = () => {
  ventas.forEach((venta, index)=>{
    const filaVenta = document.createElement('tr')
    filaVenta.innerHTML = `<td>${venta.fecha.toLocaleDateString()}</td> <td>${venta.nombreVendedora}</td> <td>${venta.sucursal}</td> <td>${venta.componentes}</td> <td>${precioMaquina(venta.componentes)}</td> <td><i class="fas fa-edit icono btn-editar" id=${index}></i><i class="fas fa-trash-alt icono btn-eliminar" id=${index}></i></td>`
    tablaVentas.appendChild(filaVenta)
  })
}
cargarTablaVentas()

const btnNuevaVenta = document.querySelector("#btn-nueva-venta")
const modalAgregar = document.querySelector("#modal-agregar")

btnNuevaVenta.addEventListener('click', () => {
  modalAgregar.style.display = 'block';
})

//-------- FUNCIONALIDAD BOTONES/ICONOS DE LA TABLA VENTAS -----------

const modalEditar = document.querySelector("#modal-editar")
const btnConfirmarEditar = document.querySelector("#btn-guardar-cambio")

const abrirEditarVenta = () => {
  const coleccionIconosEditar = document.querySelectorAll(".btn-editar")
  for(const iconoEditar of coleccionIconosEditar) {
      iconoEditar.addEventListener('click', () => {
        let indexEditar = iconoEditar.getAttribute("id");
        btnConfirmarEditar.setAttribute('idEditar', indexEditar)
        modalEditar.style.display = 'block'
      })
  }
}
abrirEditarVenta()

const modalEliminar = document.querySelector("#modal-eliminar")
const btnConfirmarEliminar = document.querySelector("#btn-eliminar")

const abrirEliminarVenta = () => {
  const coleccionIconosEliminar = document.querySelectorAll(".btn-eliminar")
  for(const iconoEliminar of coleccionIconosEliminar) {
      iconoEliminar.addEventListener('click', () => {
        let indexEliminar = iconoEliminar.getAttribute("id");
        btnConfirmarEliminar.setAttribute('idEliminar', indexEliminar)
        modalEliminar.style.display = 'block'
      })
  }
}
abrirEliminarVenta()

//----------- ACTUALIZAR LOS DATOS DE LAS TABLAS -----------------

const actualizarDatos = () => {
  ordenarVentasPorFecha()
  tablaVentas.innerHTML = ""
  cargarTablaVentas()
  ventasCentro.innerHTML = ""
  ventasCaballito.innerHTML = ""
  totalVentasporSucursal()
  productoEstrella.innerHTML = ""
  cargarProductoEstrella()
  mejorVendedora.innerHTML = ""
  cargarVendedoraDelMes()
  abrirEliminarVenta()
  abrirEditarVenta()
}


/*************************************************************
VENTANA MODAL AGREGAR NUEVA VENTA 
**************************************************************/ 

//----- RELLENO LAS OPCIONES DEL FORMULARIO CON DATOS PRECARGADOS ------

const selectVendedoraNueva = document.querySelector("#select-vendedora-nueva")
const selectComponenteNueva = document.querySelector("#select-componente-nueva")
const selectSucursalNueva = document.querySelector("#select-sucursal-nueva")
const selectFechaNueva = document.querySelector("#select-fecha-nueva")

//Vendedoras
const cargarVendedoraNuevaVenta = () =>{
  for (const vendedora of vendedoras){
    const valorVendedora = document.createElement('option')
    valorVendedora.innerHTML = vendedora
    selectVendedoraNueva.appendChild(valorVendedora)
  }
}
cargarVendedoraNuevaVenta()

//Componentes
const cargarComponenteNuevaVenta = () => {
  for (const precio of precios){
    const valorComponente = document.createElement('option')
    valorComponente.innerHTML = precio.componente
    selectComponenteNueva.appendChild(valorComponente)
    valorComponente.setAttribute('value', precio.componente)
    valorComponente.setAttribute('class','seleccion-componente-nueva')
  }
}
cargarComponenteNuevaVenta()

//Sucursales
const cargarSucursalNuevaVenta = () =>{
  for (const sucursal of sucursales){
    const valorSucursal = document.createElement('option')
    valorSucursal.innerHTML = sucursal
    selectSucursalNueva.appendChild(valorSucursal)
  }
}
cargarSucursalNuevaVenta()

//------------------ FUNCIONALIDAD BOTONES ---------------------

const btnCancelarNueva = document.querySelector("#btn-cancelar-nueva")
const btnGuardarNueva = document.querySelector("#btn-guardar-nueva")

btnCancelarNueva.addEventListener('click', (e) => {
  e.preventDefault()
  modalAgregar.style.display = 'none';
})

btnGuardarNueva.addEventListener('click',(e) => {
    e.preventDefault()
    agregarNuevaVenta()
    modalAgregar.style.display = 'none'
})

//----------------- AGREGAR NUEVA VENTA ---------------------------

const corregirFecha = (fecha, dias) => {
  fecha.setDate(fecha.getDate()+dias);
  return fecha;
}

const agregarNuevaVenta = () => {
  const coleccionComponentes = document.querySelectorAll('.seleccion-componente-nueva')
  const componentesSeleccionados = []
  for (const element of coleccionComponentes){
      element.selected ? componentesSeleccionados.push(element.value) : false
  }
  const nuevaVenta = {
      fecha: corregirFecha(new Date(selectFechaNueva.value),1),
      nombreVendedora: selectVendedoraNueva.value,
      componentes: componentesSeleccionados,
      sucursal: selectSucursalNueva.value
  }
  ventas.push(nuevaVenta)
  actualizarDatos()
}


/*************************************************************
VENTANA MODAL EDITAR VENTA 
**************************************************************/ 

//----- RELLENO LAS OPCIONES DEL FORMULARIO CON DATOS PRECARGADOS ------

const selectVendedoraEditar = document.querySelector("#select-vendedora-editar")
const selectComponenteEditar = document.querySelector("#select-componente-editar")
const selectSucursalEditar = document.querySelector("#select-sucursal-editar")
const selectFechaEditar = document.querySelector("#select-fecha-editar")

//Vendedoras
const cargarVendedoraEditarVenta = () =>{
  for (const vendedora of vendedoras){
    const valorVendedora = document.createElement('option')
    valorVendedora.innerHTML = vendedora
    selectVendedoraEditar.appendChild(valorVendedora)
  }
}
cargarVendedoraEditarVenta()

//Componentes
const cargarComponenteEditarVenta = () => {
  for (const precio of precios){
    const valorComponente = document.createElement('option')
    valorComponente.innerHTML = precio.componente
    selectComponenteEditar.appendChild(valorComponente)
    valorComponente.setAttribute('value', precio.componente)
    valorComponente.setAttribute('class','seleccion-componente-editar')
  }
}
cargarComponenteEditarVenta()

//Sucursales
const cargarSucursalEditarVenta = () =>{
  for (const sucursal of sucursales){
    const valorSucursal = document.createElement('option')
    valorSucursal.innerHTML = sucursal
    selectSucursalEditar.appendChild(valorSucursal)
  }
}
cargarSucursalEditarVenta()

//---------------------- EDITAR VENTA --------------------------

const editarVenta = () => {
  const coleccionComponentes = document.querySelectorAll('.seleccion-componente-editar')
  const componentesSeleccionados = []
  for (const element of coleccionComponentes){
      element.selected ? componentesSeleccionados.push(element.value) : false
  }
  const ventaEditada = {
      fecha: corregirFecha(new Date(selectFechaEditar.value),1),
      nombreVendedora: selectVendedoraEditar.value,
      componentes: componentesSeleccionados,
      sucursal: selectSucursalEditar.value
  }
  ventas.forEach((venta, index) => {
    if(index === parseInt(btnConfirmarEditar.getAttribute('idEditar'))){
      ventas.splice(index,1,ventaEditada)
    }
  })
  actualizarDatos()
}

btnConfirmarEditar.addEventListener('click', (e) => {
  e.preventDefault()
  editarVenta()
  modalEditar.style.display = 'none'
})

const btnCancelarEditar = document.querySelector("#btn-cancelar-cambio")

btnCancelarEditar.addEventListener('click', (e) => {
  e.preventDefault()
  modalEditar.style.display = 'none';
})


/*************************************************************
VENTANA MODAL ELIMINAR VENTA 
**************************************************************/ 

const eliminarVenta = () => {
  ventas.forEach((venta, index) => {
    if(index === parseInt(btnConfirmarEliminar.getAttribute('idEliminar'))){
      ventas.splice(index,1)
      actualizarDatos()
    }
  })
}

btnConfirmarEliminar.addEventListener('click', (e) => {
  e.preventDefault()
  eliminarVenta()
  modalEliminar.style.display = 'none'
})

const btnCancelarEliminar = document.querySelector("#btn-cancelar-eliminar")

btnCancelarEliminar.addEventListener('click', (e) => {
  e.preventDefault()
  modalEliminar.style.display = 'none';
})
