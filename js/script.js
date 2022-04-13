//-----------------------VARIABLES GLOBALES-----------------------

//BLOQUE VENTAS POR SUCURSAL
const ventasCentro = document.querySelector('#ventas-centro')
const ventasCaballito = document.querySelector('#ventas-caballito')
//BLOQUE REPORTES
const productoEstrella = document.querySelector('#producto-estrella')
const mejorVendedora = document.querySelector('#mejor-vendedora')
//BLOQUE VENTAS
const tablaVentas = document.querySelector('#tbody-ventas')
const btnNuevaVenta = document.querySelector("#btn-nueva-venta")
//MODALES
const modalAgregar = document.querySelector("#modal-agregar")
const modalEditar = document.querySelector("#modal-editar")
const modalEliminar = document.querySelector("#modal-eliminar")
//FORMULARIO MODALES
const selectVendedora = document.querySelector("#select-vendedora")
const selectComponente = document.querySelector('#select-componente')
const selectSucursal = document.querySelector('#select-sucursal')
const selectFecha = document.querySelector('#select-fecha')
//BOTONES MODALES
const btnCancelar = document.querySelector("#btn-cancelar")
const btnGuardarNueva = document.querySelector("#btn-guardar-nueva")
const btnGuardarCambio = document.querySelector("#btn-guardar-cambio")
const btnEliminar = document.querySelector("#btn-eliminar")


const {vendedoras, sucursales, ventas, precios} = local

//PARTE 1

//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioMaquina = (ventas) => {
    let sumaPrecioComponentes = 0;
    for (const precio of precios){
        ventas.includes(precio.componente) ? sumaPrecioComponentes += precio.precio : false
    }
    return sumaPrecioComponentes
}
//console.log(precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1500']));

//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const cantidadVentasComponente = (componente) => {
    let cantidadComponente = 0;
    for (const venta of ventas){
        venta.componentes.includes(componente) ? cantidadComponente ++ : false
    }
    return cantidadComponente
}

//Esta funcion es igual que la anterior pero cuenta si en UNA MISMA VENTA se vendió mas de una vez el componente
const cantidadVentasComponente2 = (nombreComponente) => {
    let cantidadComponente = 0;
    for (const venta of ventas){
        for (const componente of venta.componentes){
            componente === nombreComponente ? cantidadComponente ++ : false
        }
    }
    return cantidadComponente
}
//console.log(cantidadVentasComponente('RAM Quinston Fury'));
//console.log(cantidadVentasComponente2('RAM Quinston Fury'));

//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasDelMes = (mes,anio) => {
    return ventas.filter(venta => venta.fecha.getMonth() === mes-1 && venta.fecha.getFullYear() === anio)
}
//console.log(ventasDelMes(1,2019))

const contadorVentas = (ventas) => {
    let acc = 0;
    for (const venta of ventas) {
        acc += precioMaquina(venta.componentes)
    }
    return acc
}

const vendedoraDelMes = (mes,anio) => {
    let acc = 0;
    let mejorVendedora = "";
    for (const vendedora of vendedoras){
        if (acc < contadorVentas((ventasDelMes(mes,anio)).filter(venta => venta.nombreVendedora === vendedora))){
            acc = contadorVentas((ventasDelMes(mes,anio)).filter(venta => venta.nombreVendedora === vendedora))
            mejorVendedora = vendedora
        }
    }
    return mejorVendedora
}
//console.log(vendedoraDelMes(2,2019))

//ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes,anio) => contadorVentas(ventasDelMes(mes,anio))
//console.log(ventasMes(1,2019))
//console.log(ventasMes(2,2019))

//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre) => contadorVentas(ventas.filter(venta => venta.nombreVendedora === nombre))
//console.log(ventasVendedora("Ada"))

//componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente.

const componenteMasVendido = () => {
    let acc = 0;
    let componentePopular = "";
    for (const precio of precios){
        if (acc < cantidadVentasComponente2(precio.componente)){
            acc = cantidadVentasComponente2(precio.componente)
            componentePopular = precio.componente
        }
    }
    return componentePopular
}
//console.log(componenteMasVendido());

//huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes,anio) => ventasDelMes(mes,anio).length > 0
//console.log(huboVentas(3, 2019));

//PARTE 2

//Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = (nombreSucursal) => contadorVentas(ventas.filter(venta => venta.sucursal === nombreSucursal))
//console.log(ventasSucursal('Caballito'))

//Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

//const ventasVendedoraOSucursal = (nombre, propiedad) => contadorVentas(ventas.filter(venta => venta[propiedad] === nombre))

//console.log(ventasVendedoraOSucursal("Caballito","sucursal"))

//Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio) => {
    let acc = 0;
    let mejorSucursal = "";
    for (const sucursal of sucursales) {
        if (acc < contadorVentas((ventasDelMes(mes,anio)).filter(venta => venta.sucursal === sucursal))){
            acc = contadorVentas((ventasDelMes(mes,anio)).filter(venta => venta.sucursal === sucursal))
            mejorSucursal = sucursal
        }
    }
    return mejorSucursal
}
//console.log(sucursalDelMes(1, 2019))

//PARTE 3

//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

const renderPorMes = (anio) => {
    let meses = [];
    for (const venta of ventas){
        !meses.includes(venta.fecha.getMonth()+1) ? meses.push(venta.fecha.getMonth()+1) : false;
    }
    meses.sort(function(x,y){
        if(x>y)
        return 1
        else
        return -1
    })
    //console.log(meses)
    let acc = '';
    for (const mes of meses){
        acc += `<li>Total de ${mes}/${anio}: $ ${ventasMes(mes,anio)}</li>`
    }
    return acc
}
//console.log(renderPorMes(2019))

//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

const renderPorSucursal = () => {
    let acc = ''
    for (const sucursal of sucursales){
        acc += `<li>Total de ${sucursal}: $ ${ventasSucursal(sucursal)}</li>`
    }
    return acc
}
//console.log(renderPorSucursal())

//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó Reporte Ventas por mes: Total de enero 2019: 1250 Total de febrero 2019: 4210 Ventas por sucursal: Total de Centro: 4195 Total de Caballito: 1265 Producto estrella: Monitor GPRS 3000 Vendedora que más ingresos generó: Grace

/*
<ul>
    <li>Reporte Ventas por mes:</li>
        <li>Total de enero 2019: 1250</li>
        <li>Total de febrero 2019: 4210</li>
    <li>Ventas por sucursal:</li>
        <li>Total de Centro: 4195</li>
        <li>Total de Caballito: 1265</li>
    <li>Producto estrella: Monitor GPRS 3000</li>
    <li>Vendedora que más ingresos generó: Grace</li>
</ul>
*/

const vendedoraEstrella = (ventas) => {
    let acc = 0;
    let vendedoraEstrella = ''
    for (const vendedora of vendedoras){
        if(acc < ventasVendedora(vendedora)){
            acc = ventasVendedora(vendedora)
            vendedoraEstrella = vendedora
        }
    }
    return vendedoraEstrella
}
//console.log(vendedoraEstrella(ventas))

const render = () => {
    console.log(`Reporte Ventas por mes:`)
    console.log(renderPorMes(2019))
    console.log(`Ventas por sucursal:`)
    console.log(renderPorSucursal())
    console.log(`Producto estrella: ${componenteMasVendido()}`)
    console.log(`Vendedora que más ingresos generó: ${vendedoraEstrella(ventas)}`)
}
//render()


//-----------AGREGO DATOS PRECARGADOS LA TABLA DE VENTAS-----------

const ordenarVentasPorFecha = () => {
    return ventas.sort((a, b) => new Date(a.fecha).getTime() < new Date(b.fecha).getTime())
}
ordenarVentasPorFecha()

const cargarTablaVentas = () => {
  for (const venta of ventas){
    const filaVenta = document.createElement('tr')
    filaVenta.innerHTML = `<td>${venta.fecha.toLocaleDateString()}</td> <td>${venta.nombreVendedora}</td> <td>${venta.sucursal}</td> <td>${venta.componentes}</td> <td>${precioMaquina(venta.componentes)}</td> <td><i class="fas fa-edit icono btn-editar"></i><i class="fas fa-trash-alt icono btn-eliminar"></i></td>`
    tablaVentas.appendChild(filaVenta)
  }
}
cargarTablaVentas()


//-------AGREGO DATOS A LA TABLA DE VENTAS POR SUCURSAL-------

const totalVentasporSucursal = () => {
  ventasCentro.innerHTML = `$ ${ventasSucursal('Centro')}`
  ventasCaballito.innerHTML = `$ ${ventasSucursal('Caballito')}`
}
totalVentasporSucursal()


//----------AGREGO DATOS A LA TABLA DE REPORTES----------

const cargarProductoEstrella = () => {
  productoEstrella.innerHTML = componenteMasVendido()
}
cargarProductoEstrella()

const cargarVendedoraDelMes = () => {
  mejorVendedora.innerHTML = vendedoraEstrella()
}
cargarVendedoraDelMes()


/*************************************************************
VENTANAS MODALES 
**************************************************************/ 

//-----RELLENANDO LAS OPCIONES DE FORMULARIO CON DATOS PRECARGADOS------

//Vendedoras
const cargarVendedora = () =>{
  for (const vendedora of vendedoras){
    const valorVendedora = document.createElement('option')
    valorVendedora.innerHTML = vendedora
    selectVendedora.appendChild(valorVendedora)
  }
}
cargarVendedora()

//Componentes
const cargarComponente = () => {
  for (const precio of precios){
    const valorComponente = document.createElement('option')
    valorComponente.innerHTML = precio.componente
    selectComponente.appendChild(valorComponente)
    valorComponente.setAttribute('value',precio.componente)
    valorComponente.setAttribute('class','seleccion-componente')
  }
}
cargarComponente()

//Sucursales
const cargarSucursal = () =>{
  for (const sucursal of sucursales){
    const valorSucursal = document.createElement('option')
    valorSucursal.innerHTML = sucursal
    selectSucursal.appendChild(valorSucursal)
  }
}
cargarSucursal()

//-----------------AGREGAR NUEVA VENTA---------------------------

const agregarNuevaVenta = () => {
    const coleccionComponentes = document.querySelectorAll('.seleccion-componente')
    const componentesSeleccionados = []
    for (const element of coleccionComponentes){
        element.selected ? componentesSeleccionados.push(element.value) : false
    }
    const nuevaVenta = {
        fecha: new Date(selectFecha.value),
        nombreVendedora: selectVendedora.value,
        componentes: componentesSeleccionados,
        sucursal: selectSucursal.value
    }
    local.ventas.push(nuevaVenta)
    actualizarDatos()
}


//-----------ACTUALIZO LOS DATOS DE LAS TABLAS-----------------

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
}


//-------------------FUNCIONALIDAD BOTONES----------------------

btnNuevaVenta.addEventListener('click', () => {
  modalAgregar.style.display = 'block';
})

btnCancelar.addEventListener('click', () => {
  modalAgregar.style.display = 'none';
})

btnGuardarNueva.onclick = (e) => {
    e.preventDefault()
    agregarNuevaVenta()
    modalAgregar.style.display = 'none'
}


