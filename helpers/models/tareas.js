const Tarea = require('./tarea');


class Tareas {

    _listado = {}; //Objeto de tareas

    get listaArr() { //Retorna un array de tareas
        const listado = [];
        Object.keys(this._listado).forEach(key => { //Recorre _listado para crear el array
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {}; //Inicializa el _listado
    }

    cargarTareasFromArray(tareas = []) { //Carga las tareas de la bd al  _listado

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })



    }


    crearTarea(desc = '') { //Crea una tarea, recibe la descripcion
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; //Agrega la tarea
    }

    listadoCompleto() { //Muestra todas las tareas (Pendientes y Completadas)
        this.listaArr.forEach((tarea, i) => { //Recorre el arreglo del tareas
            const id = `${i+1}`;
            tarea.completadoEn ?
                console.log(`${ id.green } ${ '.'.green } ${ tarea.desc } :: ${ 'Completada'.green }`) :
                console.log(`${ id.green } ${ '.'.green } ${ tarea.desc } :: ${ 'Pendiente'.red }`)
        })
    }


    listarCompletadasPendientes(completadas = true) { //Muestra las tareas Completadas o las pendientes
        let idC = 0;
        let idI = 0;
        this.listaArr.forEach((tarea) => {
            if (completadas) {
                if (tarea.completadoEn !== null) {
                    idC++;
                    console.log(`${ idC.toString().green } ${ '.'.green } ${ tarea.desc } :: ${ tarea.completadoEn.green }`)
                }
            }

            if (!completadas) {
                if (!tarea.completadoEn) {
                    idI++;
                    console.log(`${ idI.toString().green } ${ '.'.green } ${ tarea.desc } :: ${ 'Pendiente'.red }`)
                }
            }
        })

    }

    borrarTarea(id = '') { //Borra una tarea por medio de un id
        if (this._listado[id]) {
            delete this._listado[id]; //elimina la tarea
        }
    }


    toggleCompletadas(ids = []) { //Permite marcar como completadas o pendientes las tareas

        ids.forEach(id => { //Recorre el array de ids que llegan por parámetro
            const tarea = this._listado[id]; //Obtiene la tarea correspondiente del listado por medio del id
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString(); //Obtiene la fecha
            }
        });

        this.listaArr.forEach(tarea => { //Recorre el arreglo de tareas
            if (!ids.includes(tarea.id)) { //Las tareas que no existen en el array de ids
                this._listado[tarea.id].completadoEn = null; //Las asigna como pendientes
            }
        })

    }


}


module.exports = Tareas; //Exporta la clase