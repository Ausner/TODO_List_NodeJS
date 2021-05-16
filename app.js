require('colors');
const Tareas = require('./helpers/models/tareas');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, Confirmar, MostrarListadoChecklist } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./db/guardarArchivo');



const main = async() => { //Funcion main

    let opt = '';
    const tareas = new Tareas(); //Objeto tareas

    const tareasDB = leerDB(); //objeto de la base de datos

    if (tareasDB) { //Si existe
        //Establecer tareas
        tareas.cargarTareasFromArray(tareasDB); //Agrega los datos
    }

    do {


        const { opcion } = await inquirerMenu();
        opt = opcion;

        switch (opt) {
            case '1':
                //Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                //Listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                //Listar tareas completadas
                tareas.listarCompletadasPendientes(true);
                break;
            case '4':
                //Listar tareas pendientes
                tareas.listarCompletadasPendientes(false);
                break;
            case '5':
                //Completar tarea(s)
                const { ids } = await MostrarListadoChecklist(tareas.listaArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                //Borrar tarea
                const { id } = await listadoTareasBorrar(tareas.listaArr);
                if (id !== '0') { //Si el id es diferente de 0 entonces no es la opcion salir
                    const ok = await Confirmar('¿Estas seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }
                break;

        }


        guardarDB(tareas.listaArr); //Guarda las tareas en la db



        if (opcion !== '0') {
            await pausa(); //Muestra una pausa
        }

    }
    while (opt !== '0');


}

main();