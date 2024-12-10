const peticionPost = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/user/login/', { // Añade la barra al final
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": "miquel",
                "password": "less12345"
            }),
        });

        const data = await response.json();
        console.log(data.errors?.username);
        console.log(data);
    }
    catch (error) {
        console.error('Error en la petición:', error);
    }
};

peticionPost();
