import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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

// Función para consultar arquitectos por clave o nombre
const consultarArquitecto = async (clave, nombre) => {
    let q;
    if (clave) {
        q = query(collection(db, "Arquitecto"), where("clave", "==", clave));
    } else if (nombre) {
        q = query(collection(db, "Arquitecto"), where("nombre_arqui", "==", nombre));
    } else {
        return;
    }

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            
            // Verifica si el elemento resultados existe antes de intentar acceder a su estilo
            const resultados = document.getElementById('resultadosForm');
            if (resultados) {
                resultados.style.display = 'block';
            }

            // Rellenar el formulario de consulta con los datos obtenidos
            document.getElementById('clave').textContent = data.clave || '0';
            document.getElementById('nombre_arqui').textContent = data.nombre_arqui || '0';
            document.getElementById('direccion_arqui').textContent = data.direccion_arqui || '0';
            document.getElementById('telefono_arqui').textContent = data.telefono_arqui || '0';
            document.getElementById('profesion').textContent = data.profesion || '0';
            document.getElementById('drp').textContent = data.drp || '0';
            document.getElementById('dro').textContent = data.dro || '0';
            document.getElementById('dru').textContent = data.dru || '0';
            document.getElementById('drpt').textContent = data.drpt || '0';


        } else {
            alert("No se encontró el arquitecto.");
        }
    } catch (error) {
        console.error('Error al consultar los arquitectos: ', error);
    }
};

// Maneja el evento submit del formulario para consultar un arquitecto
document.getElementById('consultarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtiene los datos del formulario
    const clave = document.getElementById('claveConsulta').value.trim();
    const nombre = document.getElementById('nombreConsulta').value.trim();

    // Consulta los datos del arquitecto en Firestore
    await consultarArquitecto(clave, nombre);
});







// Función para eliminar arquitecto
const eliminarArquitecto = async (clave) => {
    if (confirm("¿Está seguro de que desea eliminar este arquitecto?")) {
        try {
            const arquiRef = query(collection(db, "Arquitecto"), where("clave", "==", clave));
            const querySnapshot = await getDocs(arquiRef);
            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id;
                await deleteDoc(doc(db, "Arquitecto", docId));
                alert("Arquitecto eliminado exitosamente.");
                document.getElementById('resultados').style.display = 'none';
                document.getElementById('eliminarForm').style.display = 'none';
                resetForm('consultarForm');
            } else {
                alert("No se encontró el arquitecto.");
            }
        } catch (error) {
            console.error("Error al eliminar el arquitecto: ", error);
            alert("Error al eliminar el arquitecto.");
        }
    }
};

// Función para resetear el formulario
const resetForm = (formId) => {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
};


// Maneja el evento submit del formulario para eliminar un arquitecto
document.getElementById('eliminarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtiene la clave del arquitecto desde los resultados mostrados
    const clave = document.getElementById('clave').textContent;

    // Elimina el arquitecto en Firestore
    await eliminarArquitecto(clave);
});
