// //crear chaska
// app.post("/chaskas/create",createChaska)
document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    // Obtener los valores del formulario
    const c_name = document.getElementById('c_name').value;
    const c_description = document.getElementById('c_description').value;

    // Obtener el userId desde localStorage
    const userId = localStorage.getItem('userId');

    // Verificar que todos los campos estén llenos
    if (!c_name || !c_description || !userId) {
        alert('Por favor, completa todos los campos y asegúrate de haber iniciado sesión.');
        return;
    }

    // Crear el objeto con los datos de la chaska
    const productData = {
        c_name,
        c_description,
        userId
    };

    try {
        // Enviar los datos al backend
        const response = await fetch('http://127.0.0.1:4000/chaskas/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        const data = await response.json();

        // Manejar la respuesta del backend
        if (response.ok) {
            alert('Chaska creada exitosamente.');
            console.log('Respuesta del backend:', data);
            // Redirigir al dashboard después de crear la chaska
            window.location.href = 'dashboard.html';
        } else {
            alert(`Error: ${data.msg || 'Hubo un problema al crear la chaska.'}`);
        }
    } catch (error) {
        console.error('Error al conectar con el backend:', error);
        alert('Hubo un problema al conectar con el servidor.');
    }
});
