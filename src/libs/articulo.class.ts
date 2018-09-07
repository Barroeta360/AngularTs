class Articulo{
    desc:string;
    codigo:number;
    precio:number;
    cantidad:number;
    ubicacion:Ubicacion;
    lote:Lote;
}
class Ubicacion{
    almacen:string;
    pasillo:string;
    codigo:number;
}
interface Lote{
    fechaCreacion:date,
    fechaVencimiento:date,
    number:number
}