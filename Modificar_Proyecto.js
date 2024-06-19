import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBDb67xi8sfYvnWDh0lJ7WlPtPF1TzkoFg",
    authDomain: "sibopprueba.firebaseapp.com",
    projectId: "sibopprueba",
    storageBucket: "sibopprueba.appspot.com",
    messagingSenderId: "625324871301",
    appId: "1:625324871301:web:5e9f8e5e9d2947d4dc63ec",
    measurementId: "G-60C2PFWBSB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar arquitectos en el select
const cargarArquitectos = async () => {
    const listaArquitectos = document.getElementById('listaArquitectos');
    const q = query(collection(db, "Arquitecto"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const arquitecto = doc.data();
        const option = document.createElement('option');
        option.value = `${doc.id},${arquitecto.nombre_arqui}`; // Concatenar id_arqui y nombre_arqui
        option.textContent = arquitecto.nombre_arqui;
        listaArquitectos.appendChild(option);
    });
};

// Función para cargar proyectos en el select cuando se selecciona un arquitecto
const cargarProyectos = async (nombreArquitecto) => {
    try {
        const [id_arqui, nombre_arqui] = nombreArquitecto.split(','); // Separar id_arqui y nombre_arqui
        const arquitectoSnapshot = await getDocs(query(collection(db, 'Arquitecto'), where('nombre_arqui', '==', nombre_arqui)));

        if (!arquitectoSnapshot.empty) {
            const arquitectoDoc = arquitectoSnapshot.docs[0];
            const arquitectoDocRef = arquitectoDoc.ref;
            const proyectosSnapshot = await getDocs(collection(arquitectoDocRef, 'Proyectos'));

            // Limpiar la lista de proyectos antes de agregar nuevos elementos
            const listaProyectos = document.getElementById('listaProyectos');
            listaProyectos.innerHTML = '';

            proyectosSnapshot.forEach((doc) => {
                const proyecto = doc.data();
                const option = document.createElement('option');
                option.textContent = proyecto.codigo; // Usar el código del proyecto como texto del option
                option.value = doc.id;
                listaProyectos.appendChild(option);
            });
        } else {
            console.log('No se encontraron arquitectos con el nombre:', nombre_arqui);
        }
    } catch (error) {
        console.error('Error al cargar los proyectos:', error);
    }
};

// Función para mostrar detalles del proyecto cuando se selecciona un proyecto
const mostrarDetallesProyecto = async (projId) => {
    try {
        console.log("Entrando en mostrarDetallesProyecto");
        console.log("ID del proyecto:", projId);

        // Obtener el arquitecto seleccionado
        const listaArquitectos = document.getElementById('listaArquitectos');
        if (listaArquitectos) {
            const [id_arqui, nombre_arqui] = listaArquitectos.value.split(',');

            const arquitectoDocRef = doc(db, "Arquitecto", id_arqui);
            const proyectoDocRef = doc(arquitectoDocRef, "Proyectos", projId);

            const docSnap = await getDoc(proyectoDocRef);
            if (docSnap.exists()) {
                const proyecto = docSnap.data();
                console.log('Datos del proyecto:', proyecto);

                // Función auxiliar para establecer el valor de un elemento si existe
                const setValueIfExists = (id, value) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.value = value || '';
                    } else {
                        console.log(`Elemento con id '${id}' no encontrado.`);
                    }
                };

                setValueIfExists('codigo', proyecto.codigo);
                setValueIfExists('folio_licencias', proyecto.folio_licencias);
                setValueIfExists('folio_alineamiento', proyecto.folio_alineamiento);
                setValueIfExists('fecha_apertura', proyecto.fecha_apertura);
                setValueIfExists('fecha_cierre', proyecto.fecha_cierre);
                setValueIfExists('fecha_solicitud', proyecto.fecha_solicitud);
                setValueIfExists('nombre_razon_social', proyecto.nombre_razon_social);
                setValueIfExists('domicilio', proyecto.domicilio);
                setValueIfExists('calle_colonia_FA', proyecto.calle_colonia_FA);
                setValueIfExists('longitude', proyecto.longitude);
                setValueIfExists('latitude', proyecto.latitude);
                setValueIfExists('manzana_FA', proyecto.manzana_FA);
                setValueIfExists('lote_FA', proyecto.lote_FA);
                setValueIfExists('cuenta_catastral_FA', proyecto.cuenta_catastral_FA);
                setValueIfExists('descripcion_obra', proyecto.descripcion_obra);

                // Asegurarse de que 'superficie' está definido y manejar casos donde algunas propiedades pueden faltar
                
                setValueIfExists('superficie_SotanoM2', proyecto.superficie_SotanoM2);
                setValueIfExists('superficie_SotanoML', proyecto.superficie_SotanoML);
                setValueIfExists('superficie_PlantaBajaM2', proyecto.superficie_PlantaBajaM2);
                setValueIfExists('superficie_PlantaBajaML', proyecto.superficie_PlantaBajaML);
                setValueIfExists('superficie_MezzanineM2', proyecto.superficie_MezzanineM2);
                setValueIfExists('superficie_MezzanineML', proyecto.superficie_MezzanineML);
                setValueIfExists('superficie_1erPisoM2', proyecto.superficie_1erPisoM2);
                setValueIfExists('superficie_1erPisoML', proyecto.superficie_1erPisoML);
                setValueIfExists('superficie_2doPisoM2', proyecto.superficie_2doPisoM2);
                setValueIfExists('superficie_2doPisoML', proyecto.superficie_2doPisoML);
                setValueIfExists('superficie_3erPisoM2', proyecto.superficie_3erPisoM2);
                setValueIfExists('superficie_3erPisoML', proyecto.superficie_3erPisoML);
                setValueIfExists('superficie_4toPisoM2', proyecto.superficie_4toPisoM2);
                setValueIfExists('superficie_4toPisoML', proyecto.superficie_4toPisoML);
                setValueIfExists('superficie_5toPisoM2', proyecto.superficie_5toPisoM2);
                setValueIfExists('superficie_5toPisoML', proyecto.superficie_5toPisoML);
                //setValueIfExists('superficie_TotalM2', superficie.superficie_TotalM2);
                //setValueIfExists('superficie_TotalML', superficie.superficie_TotalML);

            } else {
                console.log("No existe un documento con el ID:", projId);
            }
        } else {
            console.log("El elemento 'listaArquitectos' no fue encontrado.");
        }
    } catch (error) {
        console.error('Error al mostrar los detalles del proyecto:', error);
    }
};

// Función para guardar los cambios en Firebase
const guardarCambios = async () => {
    try {
        const listaArquitectos = document.getElementById('listaArquitectos');
        const listaProyectos = document.getElementById('listaProyectos');

        console.log("Elemento listaArquitectos:", listaArquitectos);
        console.log("Elemento listaProyectos:", listaProyectos);

        // Verificar si los elementos no son nulos y tienen la propiedad 'value'
        if (listaArquitectos && listaProyectos &&
            listaArquitectos.value !== null && listaProyectos.value !== null) {
            const proyectoId = listaProyectos.value;
            if (proyectoId) {
                const [id_arqui] = listaArquitectos.value.split(',');
                const arquitectoDocRef = doc(db, "Arquitecto", id_arqui);
                const proyectoDocRef = doc(arquitectoDocRef, "Proyectos", proyectoId);

                await setDoc(proyectoDocRef, {
                    codigo: document.getElementById('codigo').value,
                    folio_licencias: document.getElementById('folio_licencias').value,
                    folio_alineamiento: document.getElementById('folio_alineamiento').value,
                    fecha_apertura: document.getElementById('fecha_apertura').value,
                    fecha_cierre: document.getElementById('fecha_cierre').value,
                    fecha_solicitud: document.getElementById('fecha_solicitud').value,
                    nombre_razon_social: document                    .getElementById('nombre_razon_social').value,
                    domicilio: document.getElementById('domicilio').value,
                    calle_colonia_FA: document.getElementById('calle_colonia_FA').value,
                    longitude: document.getElementById('longitude').value,
                    latitude: document.getElementById('latitude').value,
                    manzana_FA: document.getElementById('manzana_FA').value,
                    lote_FA: document.getElementById('lote_FA').value,
                    cuenta_catastral_FA: document.getElementById('cuenta_catastral_FA').value,
                    descripcion_obra: document.getElementById('descripcion_obra').value,
                    
                    superficie_SotanoM2: document.getElementById('superficie_SotanoM2').value,
                    superficie_SotanoML: document.getElementById('superficie_SotanoML').value,
                    superficie_PlantaBajaM2: document.getElementById('superficie_PlantaBajaM2').value,
                    superficie_PlantaBajaML: document.getElementById('superficie_PlantaBajaML').value,
                    superficie_MezzanineM2: document.getElementById('superficie_MezzanineM2').value,
                    superficie_MezzanineML: document.getElementById('superficie_MezzanineML').value,
                    superficie_1erPisoM2: document.getElementById('superficie_1erPisoM2').value,
                    superficie_1erPisoML: document.getElementById('superficie_1erPisoML').value,
                    superficie_2doPisoM2: document.getElementById('superficie_2doPisoM2').value,
                    superficie_2doPisoML: document.getElementById('superficie_2doPisoML').value,
                    superficie_3erPisoM2: document.getElementById('superficie_3erPisoM2').value,
                    superficie_3erPisoML: document.getElementById('superficie_3erPisoML').value,
                    superficie_4toPisoM2: document.getElementById('superficie_4toPisoM2').value,
                    superficie_4toPisoML: document.getElementById('superficie_4toPisoML').value,
                    superficie_5toPisoM2: document.getElementById('superficie_5toPisoM2').value,
                    superficie_5toPisoML: document.getElementById('superficie_5toPisoML').value,
                    // superficie_TotalM2: document.getElementById('superficie_TotalM2').value,
                    // superficie_TotalML: document.getElementById('superficie_TotalML').value
                    
                }, { merge: true });

                console.log("Los cambios se han guardado correctamente.");
                alert("Los cambios se han guardado correctamente.");
            } else {
                console.log("No se ha seleccionado ningún proyecto para modificar.");
                alert("No se ha seleccionado ningún proyecto para modificar.");
            }
        } else {
            console.log("Uno de los elementos 'listaArquitectos' o 'listaProyectos' es nulo o su propiedad 'value' es nula.");
        }
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('Error al guardar los cambios:');
    }
};

// Event listeners
document.getElementById('listaArquitectos').addEventListener('change', async (event) => {
    const nombreArquitecto = event.target.value;
    if (nombreArquitecto) {
        await cargarProyectos(nombreArquitecto);
    }
});

document.getElementById('listaProyectos').addEventListener('change', (event) => {
    mostrarDetallesProyecto(event.target.value);
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    guardarCambios();
});

// Cargar arquitectos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarArquitectos);

