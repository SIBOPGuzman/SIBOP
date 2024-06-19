import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Cargar nombres de arquitectos en el select
const cargarArquitectos = async () => {
    const arquiSelect = document.getElementById('nombre_arqui');
    const arquiQuery = query(collection(db, "Arquitecto"));
    try {
        const querySnapshot = await getDocs(arquiQuery);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const option = document.createElement('option');
            option.value = doc.id;
            option.text = data.nombre_arqui;
            arquiSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar los arquitectos: ", error);
    }
};

// Agregar proyecto a Firestore
const agregarProyecto = async (proyecto) => {
    try {
        const arquiSelect = document.getElementById('nombre_arqui');
        const arquiId = arquiSelect.value;
        const arquiNombre = arquiSelect.options[arquiSelect.selectedIndex].text; // Obtiene el nombre del arquitecto seleccionado

        if (arquiId) {
            // Modificar el objeto proyecto para incluir el ID y el nombre del arquitecto con los nombres específicos
            //proyecto.id_arqui = arquiId;
            //proyecto.nombre_arqui = arquiNombre;

            // Agregar el proyecto junto con la información del arquitecto a Firestore
            await addDoc(collection(db, "Arquitecto", arquiId, "Proyectos"), proyecto);
            alert("Proyecto agregado exitosamente");
        } else {
            alert("Por favor, seleccione un arquitecto.");
        }
    } catch (error) {
        console.error("Error al agregar el proyecto: ", error);
        alert("Error al agregar el proyecto.");
    }
};

// Maneja el evento submit del formulario
document.getElementById('agregarProyectoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const longitude = parseFloat(document.getElementById('longitud').value);
    const latitude = parseFloat(document.getElementById('latitud').value);

    if (isNaN(longitude) || isNaN(latitude)) {
        alert("Por favor, ingrese valores numéricos válidos para la longitud y la latitud.");
        return;
    }

    const proyecto = {
        codigo: document.getElementById('codigo').value,
        folio_licencias: document.getElementById('folio_licencias').value,
        folio_alineamiento: document.getElementById('folio_alineamiento').value,
        fecha_apertura: document.getElementById('fecha_apertura').value,
        fecha_cierre: document.getElementById('fecha_cierre').value,
        fecha_solicitud: document.getElementById('fecha_solicitud').value,
        nombre_razon_social: document.getElementById('nombre_razon_social').value,
        domicilio: document.getElementById('domicilio').value,
        calle_colonia_FA: document.getElementById('calle_colonia_FA').value,
        longitude: longitude, // Guardar como int
        latitude: latitude, // Guardar como int
        manzana_FA: document.getElementById('manzana_FA').value,
        lote_FA: document.getElementById('lote_FA').value,
        cuenta_catastral_FA: document.getElementById('cuenta_catastral_FA').value,
        descripcion_obra: document.getElementById('descripcion_obra').value,
        superficie_SotanoM2: document.querySelector('[name="superficie_SotanoM2"]').value,
        superficie_SotanoML: document.querySelector('[name="superficie_SotanoML"]').value,
        superficie_PlantaBajaM2: document.querySelector('[name="superficie_PlantaBajaM2"]').value,
        superficie_PlantaBajaML: document.querySelector('[name="superficie_PlantaBajaML"]').value,
        superficie_MezzanineM2: document.querySelector('[name="superficie_MezzanineM2"]').value,
        superficie_MezzanineML: document.querySelector('[name="superficie_MezzanineML"]').value,
        superficie_1erPisoM2: document.querySelector('[name="superficie_1erPisoM2"]').value,
        superficie_1erPisoML: document.querySelector('[name="superficie_1erPisoML"]').value,
        superficie_2doPisoM2: document.querySelector('[name="superficie_2doPisoM2"]').value,
        superficie_2doPisoML: document.querySelector('[name="superficie_2doPisoML"]').value,
        superficie_3erPisoM2: document.querySelector('[name="superficie_3erPisoM2"]').value,
        superficie_3erPisoML: document.querySelector('[name="superficie_3erPisoML"]').value,
        superficie_4toPisoM2: document.querySelector('[name="superficie_4toPisoM2"]').value,
        superficie_4toPisoML: document.querySelector('[name="superficie_4toPisoML"]').value,
        superficie_5toPisoM2: document.querySelector('[name="superficie_5toPisoM2"]').value,
        superficie_5toPisoML: document.querySelector('[name="superficie_5toPisoML"]').value,
    };

    await agregarProyecto(proyecto);
});

// Cargar arquitectos al cargar la página
window.onload = cargarArquitectos;
