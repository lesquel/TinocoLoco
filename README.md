# TinocoLoco

## Instalación

1. Clonar el repositorio
2. Crear un entorno virtual
3. Instalar las dependencias    
    ```
    pip install -r requirements.txt
    ```
4. Crear la base de datos
    ```
    python manage.py migrate
    ```
5. Crear los usuarios
    ```
    python manage.py createsuperuser
    ```
6. Ejecutar el servidor
    ```
    python manage.py runserver
    ```

## Desarrollo

### Desarrollo Frontend

1. Instalar dependencias
    ```
    npm install
    ```
2. Iniciar el servidor de desarrollo
    ```
    npm run dev
    ```
3. Iniciar el servidor de pruebas
    ```
    npm run test
    ```
4. Iniciar el servidor de producción
    ```
    npm run build
    ```

### Desarrollo Backend

1. Iniciar el servidor de desarrollo
    ```
    python manage.py runserver
    ```
2. Iniciar el servidor de pruebas
    ```
    python manage.py test
    ```
