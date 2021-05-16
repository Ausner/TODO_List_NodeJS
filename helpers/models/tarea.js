const { v4: uuidv4 } = require('uuid'); //Requiere el paquete uuid para crear id único para cada tarea


class Tarea {

    id = '';
    desc = '';
    completadoEn = null;


    constructor(desc) { //Obtiene la descripcion de la tarea a crear
        this.id = uuidv4(); //Crea el id
        this.desc = desc; //Iguala la descripción
        this.completadoEn = null; //Asigna null a la fecha de completado
    }

}


module.exports = Tarea; //Exporta la clase