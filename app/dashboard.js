// Función para obtener y mostrar las chaskas
const fetchAndDisplayChaskas = async () => {
    try {
        // Obtener las chaskas del backend
        const response = await fetch("http://127.0.0.1:4000/allchaska/get");

        if (response.ok) {
            const data = await response.json();
            const chaskas = data.allChaskas; 

          
            window.allChaskas = chaskas;

        
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
    const chaskasContainer = document.getElementById("chaskasContainer");
    chaskasContainer.innerHTML = ""; // Limpiar antes de agregar nuevas

    chaskas.forEach(chaska => {
        const chaskaCard = document.createElement("div");
        chaskaCard.className = "card";
        chaskaCard.dataset.id = chaska._id;

        chaskaCard.innerHTML = `
            <img src="https://th.bing.com/th/id/OIP.Ff9UpoqhiVbhy4jBkxRKtQHaFu?rs=1&pid=ImgDetMain" alt="Imagen de la chaska" class="chaska-img">
            <h3 class="chaska-title">${chaska.c_name}</h3>
            <p class="chaska-description">${chaska.c_description}</p>
            <button class="delete-btn" data-id="${chaska._id}">Eliminar</button>
        `;

        chaskasContainer.appendChild(chaskaCard);
    });

    addDeleteEventListeners();
};

// Función para agregar eventos a los botones de eliminación
const addDeleteEventListeners = () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const chaskaId = button.getAttribute("data-id"); 

            if (confirm("¿Estás seguro de que quieres eliminar esta chaska?")) {
                try {
                    
                    const response = await fetch("http://127.0.0.1:4000/chaska/delete", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ _id: chaskaId }), 
                    });

                    if (response.ok) {
                        alert("Chaska eliminada exitosamente.");
                      
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

// Función para filtrar chaskas en tiempo real
const searchChaskas = () => {
    const searchInput = document.getElementById("searchInput");
    
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        
        // Filtrar las chaskas globales en base a la búsqueda
        const filteredChaskas = window.allChaskas.filter(chaska =>
            chaska.c_name.toLowerCase().includes(searchText)
        );

    
        displayChaskas(filteredChaskas);
    });
};

// Llamar a la función para obtener y mostrar las chaskas cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayChaskas();
    searchChaskas(); 
});
