const fs = require('fs'); //Requiere el filesystem

const archivo = './db/data.json'; //Requiere el archivo para leerlos datos

const guardarDB = (data) => { //Guarda los datos 
    fs.writeFileSync(archivo, JSON.stringify(data)); //con el JSON.stringify los convierte a string ya que son un array
}


const leerDB = () => { //lee los datos
    if (!fs.existsSync(archivo)) { //Si No existe el archivo
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' }); //Abre el archivo
    const data = JSON.parse(info); //Parsea la información del archivo 
    //console.log(data);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}