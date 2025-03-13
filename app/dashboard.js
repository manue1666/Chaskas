// Función para obtener y mostrar las chaskas
// Función para obtener y mostrar las chaskas
const fetchAndDisplayChaskas = async () => {
    try {
        // Obtener las chaskas del backend
        const response = await fetch("http://127.0.0.1:4000/allchaska/get");

        if (response.ok) {
            const data = await response.json();
            const chaskas = data.allChaskas; // Acceder al array de chaskas

            // Guardar las chaskas en una variable global para usarlas en la búsqueda
            window.allChaskas = chaskas;

            // Mostrar las chaskas en la página
            displayChaskas(chaskas);
        } else {
            const errorMsg = await response.text();
            alert(`Error al obtener las chaskas: ${errorMsg}`);
            console.error(`Error: ${response.status} - ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al obtener las chaskas.");
    }
};

// Función para mostrar las chaskas en la página
const displayChaskas = (chaskas) => {
    // Obtener el contenedor donde se mostrarán las chaskas
    const chaskasContainer = document.getElementById("chaskasContainer");

    // Limpiar el contenedor antes de agregar las chaskas
    chaskasContainer.innerHTML = "";

    // Recorrer las chaskas y crear elementos HTML para cada una
    chaskas.forEach(chaska => {
        const chaskaCard = document.createElement("div");
        chaskaCard.className = "card";

        // Agregar el nombre y la descripción de la chaska
        chaskaCard.innerHTML = `
            <h3>${chaska.c_name}</h3>
            <p>${chaska.c_description}</p>
            <button class="delete-btn" data-id="${chaska._id}">Eliminar</button>
        `;

        // Agregar la tarjeta al contenedor
        chaskasContainer.appendChild(chaskaCard);
    });

    // Agregar eventos a los botones de eliminación
    addDeleteEventListeners();
};


// Función para agregar eventos a los botones de eliminación
const addDeleteEventListeners = () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const chaskaId = button.getAttribute("data-id"); // Obtener el _id de la chaska

            if (confirm("¿Estás seguro de que quieres eliminar esta chaska?")) {
                try {
                    // Enviar una solicitud DELETE al backend con el _id en el cuerpo
                    const response = await fetch("http://127.0.0.1:4000/chaska/delete", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ _id: chaskaId }), // Enviar el _id en el cuerpo
                    });

                    if (response.ok) {
                        alert("Chaska eliminada exitosamente.");
                        // Actualizar la lista de chaskas
                        fetchAndDisplayChaskas();
                    } else {
                        const errorMsg = await response.text();
                        alert(`Error: ${errorMsg}`);
                        console.error(`Error: ${response.status} - ${errorMsg}`);
                    }
                } catch (error) {
                    console.error("Error al conectar con el servidor:", error);
                    alert("Hubo un problema al eliminar la chaska.");
                }
            }
        });
    });
};




// Llamar a la función para obtener y mostrar las chaskas cuando la página cargue
document.addEventListener("DOMContentLoaded", fetchAndDisplayChaskas);

