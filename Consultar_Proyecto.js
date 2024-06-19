import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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

        // Asumiendo que el ID del arquitecto y del proyecto son correctos,
        // obtener el arquitecto seleccionado
        const listaArquitectos = document.getElementById('listaArquitectos');
        const [id_arqui, nombre_arqui] = listaArquitectos.value.split(',');

        const arquitectoDocRef = doc(db, "Arquitecto", id_arqui);
        const proyectoDocRef = doc(arquitectoDocRef, "Proyectos", projId);

        const docSnap = await getDoc(proyectoDocRef);
        if (docSnap.exists()) {
            const proyecto = docSnap.data();
            console.log('Datos del proyecto:', proyecto);

            // Mostrar los detalles del proyecto en los elementos HTML correspondientes
            document.getElementById('codigo').textContent = proyecto.codigo || '';
            document.getElementById('folio_licencias').textContent = proyecto.folio_licencias || '';
            document.getElementById('folio_alineamiento').textContent = proyecto.folio_alineamiento || '';
            document.getElementById('fecha_apertura').textContent = proyecto.fecha_apertura || '';
            document.getElementById('fecha_cierre').textContent = proyecto.fecha_cierre || '';
            document.getElementById('fecha_solicitud').textContent = proyecto.fecha_solicitud || '';
            document.getElementById('nombre_razon_social').textContent = proyecto.nombre_razon_social || '';
            document.getElementById('domicilio').textContent = proyecto.domicilio || '';
            document.getElementById('calle_colonia_FA').textContent = proyecto.calle_colonia_FA || '';
            document.getElementById('longitude').textContent = proyecto.longitude || '';
            document.getElementById('latitude').textContent = proyecto.latitude || '';
            document.getElementById('manzana_FA').textContent = proyecto.manzana_FA || '';
            document.getElementById('lote_FA').textContent = proyecto.lote_FA || '';
            document.getElementById('cuenta_catastral_FA').textContent = proyecto.cuenta_catastral_FA || '';
            document.getElementById('descripcion_obra').textContent = proyecto.descripcion_obra || '';

            // Asegurarse de que 'superficie' está definido y manejar casos donde algunas propiedades pueden faltar
            const superficie = proyecto.superficie || {};
            document.getElementById('superficie_SotanoM2').textContent = proyecto.superficie_SotanoM2 || '';
            document.getElementById('superficie_SotanoML').textContent = proyecto.superficie_SotanoML || '';
            document.getElementById('superficie_PlantaBajaM2').textContent = proyecto.superficie_PlantaBajaM2 || '';
            document.getElementById('superficie_PlantaBajaML').textContent = proyecto.superficie_PlantaBajaML || '';
            document.getElementById('superficie_MezzanineM2').textContent = proyecto.superficie_MezzanineM2 || '';
            document.getElementById('superficie_MezzanineML').textContent = proyecto.superficie_MezzanineML || '';
            document.getElementById('superficie_1erPisoM2').textContent = proyecto.superficie_1erPisoM2 || '';
            document.getElementById('superficie_1erPisoML').textContent = proyecto.superficie_1erPisoML || '';
            document.getElementById('superficie_2doPisoM2').textContent = proyecto.superficie_2doPisoM2 || '';
            document.getElementById('superficie_2doPisoML').textContent = proyecto.superficie_2doPisoML || '';
            document.getElementById('superficie_3erPisoM2').textContent = proyecto.superficie_3erPisoM2 || '';
            document.getElementById('superficie_3erPisoML').textContent = proyecto.superficie_3erPisoML || '';
            document.getElementById('superficie_4toPisoM2').textContent = proyecto.superficie_4toPisoM2 || '';
            document.getElementById('superficie_4toPisoML').textContent = proyecto.superficie_4toPisoML || '';
            document.getElementById('superficie_5toPisoM2').textContent = proyecto.superficie_5toPisoM2 || '';
            document.getElementById('superficie_5toPisoML').textContent = proyecto.superficie_5toPisoML || '';
            document.getElementById('superficie_TotalM2').textContent = proyecto.superficie_TotalM2 || '';
            document.getElementById('superficie_TotalML').textContent = proyecto.superficie_TotalML || '';
                    // Mostrar el nombre del arquitecto
            
    } else {
        console.log("No existe un documento con el ID:", projId);
    }
} catch (error) {
    console.error('Error al mostrar los detalles del proyecto:', error);
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

// Cargar arquitectos al iniciar la página
cargarArquitectos();
