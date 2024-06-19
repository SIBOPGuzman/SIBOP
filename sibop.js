import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {
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

    // Inicialización de Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    // Función para mostrar un mensaje de error
    const mjsError = (error) => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al guardar los datos: ' + error,
        });
    };

    // Función para mostrar un mensaje de éxito
    const mjsOk = () => {
        console.log('Guardado con éxito');
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Los datos se guardaron correctamente.',
        });
    };

    // Función para guardar un arquitecto en Firestore
    const saveArquitecto = async (arquitecto) => {
        try {
            console.log('Datos del arquitecto a guardar:', arquitecto);
            await addDoc(collection(db, 'Arquitecto'), arquitecto);
            mjsOk();
            // Actualizar la clave después de guardar
            //setClaveAutomatica();
        } catch (error) {
            mjsError(error);
            console.error('Error al guardar el arquitecto: ', error);
        }
    };

    

    // Maneja el evento submit del formulario
    document.getElementById('agregarForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const clave = document.getElementById('clave').value;
        const profesion = document.getElementById('profesion').value;
        const nombre_arqui = document.getElementById('nombre_arqui').value;
        const direccion_arqui = document.getElementById('direccion_arqui').value;
        const telefono_arqui = document.getElementById('telefono_arqui').value;
        const dro = document.getElementById('dro').value;
        const drp = document.getElementById('drp').value;
        const dru = document.getElementById('dru').value;
        const drpt = document.getElementById('drpt').value;

        const de_obra = document.getElementById('checkbox1').checked ? "De Obra" : "";
        const de_proyecto = document.getElementById('checkbox2').checked ? "De Proyecto" : "";
        const de_urbanizacion = document.getElementById('checkbox3').checked ? "De Urbanización" : "";
        const de_patrimonio = document.getElementById('checkbox4').checked ? "De Patrimonio" : "";

        const arquitecto = {
            clave: clave,
            profesion: profesion,
            nombre_arqui: nombre_arqui,
            direccion_arqui: direccion_arqui,
            telefono_arqui: telefono_arqui,
            dro: dro,
            drp: drp,
            dru: dru,
            drpt: drpt,
            de_obra: de_obra,
            de_proyecto: de_proyecto,
            de_urbanizacion: de_urbanizacion,
            de_patrimonio: de_patrimonio
        };

        await saveArquitecto(arquitecto);

        // Limpiar el formulario
        document.getElementById('agregarForm').reset();
    });

    
});
