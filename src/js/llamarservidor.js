// export const mensaje = "Hola Mundo soy un modulo"

// export function decirHola(nombre) {
//     console.log("Bienvenido " + nombre);
// }

// export class Persona {
//     nombre = "Pepe";
// }

// const laURLdePokemon = "https://pokeapi.co/api/v2/";

// export async function obtenerPokemon(pokemon){

//     return fetch (laURLdePokemon + "pokemon/" + pokemon)

// }

// const laURLdePokemon = "https://pokeapi.co/api/v2/";

// export async function getPokemon(namePokemonParam) {
//     var miPromesa = fetch(laURLdePokemon + "pokemon/" + namePokemonParam);
//     let resultado = await miPromesa; // solo puedo usar *await* en funciones asincrónomas, por ende, se le indica *async* a la funcion
//     let data = await resultado.json();
//     return (data);
// }

// const laURLdePokemon = "https://pokeapi.co/api/v2/";

// export async function obtenerPokemon(PokemonParam){
//     let promesaServidor = fetch(laURLdePokemon+"pokemon/"+PokemonParam)
//     let respuestaServidor = await promesaServidor;
//     let datosPokemon = await respuestaServidor.json();
//     return datosPokemon;
// }



const laURLdeToDoList = "http://localhost:3000/api/task/";

/////GET

export async function ObtenerTareas (){
    let promesaTareas = fetch (laURLdeToDoList);
    let resultadoPromesa = await promesaTareas;
    let datosTarea = await resultadoPromesa.json();
    return datosTarea;
}


// POST TAREAS (Guardar tareas)

export async function postTarea(tareaParametro){
    let promesaTarea = fetch(laURLdeToDoList, {
        method:"POST",
        body: JSON.stringify( 
            {
                "task": tareaParametro,
                "check": "false"
            }
        ),
        headers:{
            "Content-Type": "application/json"
        }
    });

    let resultado = await promesaTarea; 
    
    if ( resultado.status === 200 && resultado.ok === true ){
        
        let datosInsertados = await resultado.json();
        return datosInsertados;

    }else{
        console.log("No se logró insertar");
    }

}


//////CHECAR TAREA (PUT)

export async function marcarTarea (checkParametro, idTareaParametro){
    let promesaTarea = fetch(laURLdeToDoList + idTareaParametro, {
        method:"PUT",
        body: JSON.stringify( 
            {
            
                "check": checkParametro
            }
        ),
        headers:{
            "Content-Type": "application/json"
        }
    });

    let resultado = await promesaTarea; 
    
    if ( resultado.status === 200 && resultado.ok === true ){
        
        let datosActualizados = await resultado.json();
        return datosActualizados;

    }else{
        console.log("No se logró actualizar");
    }
}

// CHECAR TAREA (PUT)

export async function marcarTareas(checkParametro, idTareaParametro){
    let promesaTarea = fetch(laURLdeToDoList + idTareaParametro, {
        method:"PUT",
        body: JSON.stringify( 
            {
                "check": checkParametro
            }
        ),
        headers:{
            "Content-Type": "application/json"
        }
    });

    let resultado = await promesaTarea; 
    
    if ( resultado.status === 200 && resultado.ok === true ){
        
        let datosInsertados = await resultado.json();
        return datosInsertados;

    }else{
        console.log("No se logró insertar");
    }
}

// DELETE TAREAS


export async function borrarTarea(idTareaAEliminar){
    let promesaBorrar = fetch(laURLdeToDoList + idTareaAEliminar, {
        method:"DELETE"
    });
    let resultado = await promesaBorrar;

    if(resultado.status === 200 && resultado.ok === true){
        let datos = await resultado.json()
        return datos;
    }else{
        console.log("Algo paso mal")
    }
}