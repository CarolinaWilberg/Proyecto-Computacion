const {vendedoras, sucursales, ventas, precios} = local


//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioMaquina = (ventas) => {
    let sumaPrecioComponentes = 0;
    for (const precio of precios){
        ventas.includes(precio.componente) ? sumaPrecioComponentes += precio.precio : false
    }
    return sumaPrecioComponentes
}

//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.
//Esta funcion cuenta si en UNA MISMA VENTA se vendió mas de una vez el componente
const cantidadVentasComponente = (nombreComponente) => {
    let cantidadComponente = 0;
    for (const venta of ventas){
        for (const componente of venta.componentes){
            componente === nombreComponente ? cantidadComponente ++ : false
        }
    }
    return cantidadComponente
}

//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasDelMes = (mes,anio) => {
    return ventas.filter(venta => venta.fecha.getMonth() === mes-1 && venta.fecha.getFullYear() === anio)
}

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

//ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes,anio) => contadorVentas(ventasDelMes(mes,anio))

//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre) => contadorVentas(ventas.filter(venta => venta.nombreVendedora === nombre))

//componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente.

const componenteMasVendido = () => {
    let acc = 0;
    let componentePopular = "";
    for (const precio of precios){
        if (acc < cantidadVentasComponente(precio.componente)){
            acc = cantidadVentasComponente(precio.componente)
            componentePopular = precio.componente
        }
    }
    return componentePopular
}

//huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes,anio) => ventasDelMes(mes,anio).length > 0

//Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = (nombreSucursal) => contadorVentas(ventas.filter(venta => venta.sucursal === nombreSucursal))

//Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

//const ventasVendedoraOSucursal = (nombre, propiedad) => contadorVentas(ventas.filter(venta => venta[propiedad] === nombre))

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
    let acc = "";
    for (const mes of meses){
        acc += `<li>Total de ${mes}/${anio}: $ ${ventasMes(mes,anio)}</li>`
    }
    return acc
}

//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

const renderPorSucursal = () => {
    let acc = ""
    for (const sucursal of sucursales){
        acc += `<li>Total de ${sucursal}: $ ${ventasSucursal(sucursal)}</li>`
    }
    return acc
}

//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó Reporte Ventas por mes: Total de enero 2019: 1250 Total de febrero 2019: 4210 Ventas por sucursal: Total de Centro: 4195 Total de Caballito: 1265 Producto estrella: Monitor GPRS 3000 Vendedora que más ingresos generó: Grace

const vendedoraEstrella = () => {
    let acc = 0;
    let vendedoraEstrella = ""
    for (const vendedora of vendedoras){
        if(acc < ventasVendedora(vendedora)){
            acc = ventasVendedora(vendedora)
            vendedoraEstrella = vendedora
        }
    }
    return vendedoraEstrella
}

const render = () => {
    console.log(`Reporte Ventas por mes:`)
    console.log(renderPorMes(2019))
    console.log(`Ventas por sucursal:`)
    console.log(renderPorSucursal())
    console.log(`Producto estrella: ${componenteMasVendido()}`)
    console.log(`Vendedora que más ingresos generó: ${vendedoraEstrella(ventas)}`)
}
//render()
