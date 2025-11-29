# insight-flow-frontend
## Proyecto que es está basado en una arquitectura de microservicios.
## Para levantar el proyecto se deben seguir lo siguientes pasos:

## Requisitos previos:
- Node JS 22 o superior
- NextJS 16 o superior
- Visual Studio Code 1.95.3 o superior

## Instalación
1.- Primero debemos abrir la consola de comandos apretando las siguientes teclas y escribir 'cmd':

- "Windows + R" y escribimos 'cmd'

2.- Ahora debemos crear una carpeta en donde guardar el proyecto, esta carpeta puede estar donde desee el usuario:
```bash
mkdir [NombreDeCarpeta]
```
3.- Accedemoss a la carpeta.
```bash
cd NombreDeCarpeta
```
4.- Se debe clonar el repositorio en el lugar deseado por el usuario con el siguiente comando:
```bash
git clone https://github.com/AlbertoLyons/insightflow-frontend.git
```
5.- Accedemos a la carpeta creada por el repositorio:
```bash
cd insightflow-frontend
```
6.- Ahora debemos restaurar las dependencias del proyecto con el siguiente comando:
```bash
npm install
```
7.- Con las dependencias restauradas, abrimos el editor:
```bash
code .
```
8.- Establecer las credenciales del archivo .env
```bash
notepad .env
```
9.- Finalmente ya en el editor ejecutamos el siguiente comando para ejecutar el proyecto:
```bash
npm run dev
```

## Estructura del repositorio
- Funciona con la conexión de diferentes microservicios
- Se ofrece un .env de con datos de ejemplo
- Se utiliza el Framework NextJS de Vercel
- Utiliza un pipeline de CI/CD que construye una imagen en docker, lo envía a docker hub y realiza despliegue automático en Vercel
- Utiliza endpoints para realizar el CRUD de los módulos
- Se utiliza la ruta "http://localhost:3000" para visualizar el proyecto y sus uncionalidades

# Servicio workspaces-service
El módulo de espacios de trabajo está definido en el siguiente link:
```bash
https://workspace-service-app.onrender.com/api/
```
Las consultas disponibles en el módulo son las siguientes (Se adjunta una colección de postman en el repositorio para un mayor entendimiento.):
[Colección de postman del módulo routes](./postman-collections/Workspace.postman_collection.json)
### Crear espacio de trabajo (Metodo POST)
```bash
https://workspace-service-app.onrender.com/api/workspaces
```
Este metodo permite crear un nuevo espacio de trabajo dando los siguientes parametros en el body como un form data:
- Name: Nombre del espacio del trabajo
- Description: Descripción del espacio de trabajo
- Topic: Temática
- Image: Ícono a asignar para el espacio. Debe de ser un archivo .png o .jpg
- OwnerId: ID del usuario que creará el espacio
- OwnerName: Nombre del usuario que creara el espacio

### Obtener espacios de trabajo por usuario (Metodo GET)
```bash
https://workspace-service-app.onrender.com/api/workspaces?userId=id
```
Este metodo permite obtener todos los espacios de trabajo en el que un usuario esté asignado sea propietario o editor

### Obtener espacio de trabajo por id (Metodo GET)
```bash
https://workspace-service-app.onrender.com/api/workspaces/{id}
```
Este metodo permite obtener una un espacio de trabajo por su id

### Actualizar espacio de trabajo (Metodo PATCH)
```bash
https://workspace-service-app.onrender.com/api/workspaces/{id}
```
Este metodo permite editar un espacio de trabajo dando como párametro en la ruta su id. Los párametros que deben de ir en el body como form data son los siguientes:
- Name: Nombre a modificar del espacio de trabajo
- Image: Ícono a asignar para el espacio. Debe de ser un archivo .png o .jpg (Parámetro opcional) 

Esta ruta está protegida por autenticación, en la que solo el propietario del espacio de trabajo puede usar.

### Eliminar ruta (Metodo DELETE)
```bash
https://workspace-service-app.onrender.com/api/workspaces/{id}
```
Este metodo permite la eliminación de un espacio de trabajo mediante el uso de soft delete. Se debe de dar la id del espacio de trabajo como párametro en la ruta.

Esta ruta está protegida por autenticación, en la que solo el propietario del espacio de trabajo puede usar.

# Servicio users-service
# Servicio documents-service
# Servicio tasks-service