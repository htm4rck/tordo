# Alcance Técnico del Proyecto

## Introducción

Este documento presenta el alcance técnico del proyecto, incluyendo la estructura de la base de datos y los módulos de la aplicación, para gestionar la autenticación y autorización de usuarios en una aplicación web. La implementación se realizará utilizando NestJS y PostgreSQL.

## Estructura de la Base de Datos

### 1. Tabla `Objects`

**Descripción**: Almacena los objetos de las aplicaciones (menús, formularios, botones, entradas).

**Campos**:
- `objectCode`: string, código único del objeto (PRIMARY KEY).
- `objectType`: enum, tipo del objeto ('MENU', 'FORM', 'BUTTON', 'INPUT').
- `app`: string, aplicación a la que pertenece el objeto.
- `menu`: string, menú al que pertenece el objeto (nullable).
- `form`: string, formulario al que pertenece el objeto (nullable).
- `buttonOrInput`: string, botón o campo de entrada al que pertenece el objeto (nullable).
- `createdAt`: Date, fecha de creación del objeto.
- `updatedAt`: Date, fecha de última actualización del objeto.

### 2. Tabla `Permission`

**Descripción**: Almacena los permisos asignados a los roles.

**Campos**:
- `id`: int, identificador único del permiso (PRIMARY KEY).
- `objectCode`: string, código del objeto (FOREIGN KEY referenciando `Objects`).
- `rolCode`: string, código del rol (FOREIGN KEY referenciando `Role`).

### 3. Tabla `Role`

**Descripción**: Almacena los roles de los usuarios.

**Campos**:
- `rolCode`: string, código único del rol (PRIMARY KEY).
- `name`: string, nombre del rol.
- `parentRol`: string, código del rol padre (nullable).

### 4. Tabla `UserRolCompany`

**Descripción**: Almacena la relación entre usuarios, roles y compañías, junto con la licencia asociada. Maneja la lógica para permisos basados en el tipo de licencia.

**Campos**:
- `id`: int, identificador único de la relación (PRIMARY KEY).
- `companyCode`: string, código de la compañía.
- `userCode`: string, código del usuario (FOREIGN KEY referenciando `User`).
- `licenseCode`: string, código de la licencia (FOREIGN KEY referenciando `License`).
- `rolCode`: string, código del rol (FOREIGN KEY referenciando `Role`, nullable).
- `activationDate`: Date, fecha de activación de la licencia.
- `expirationDate`: Date, fecha de expiración de la licencia.

### 5. Tabla `License`

**Descripción**: Almacena la información de las licencias, incluyendo el tipo de licencia y su comportamiento.

**Campos**:
- `uid`: string, identificador único de la licencia (PRIMARY KEY).
- `name`: string, nombre de la licencia.
- `licenseKey`: string, clave de la licencia (serial key).
- `type`: enum, tipo de la licencia ('root', 'professional', 'applicative').
- `expirationDate`: Date, fecha de expiración de la licencia (nullable).
- `durationInDays`: int, duración de la licencia en días.
- `isActive`: boolean, indica si la licencia está activa.
- `createdAt`: Date, fecha de creación de la licencia.
- `updatedAt`: Date, fecha de última actualización de la licencia.
- `deletedAt`: Date, fecha de eliminación de la licencia (soft delete).
- `createdBy`: string, usuario que creó la licencia (nullable).
- `updatedBy`: string, usuario que actualizó la licencia (nullable).
- `deletedBy`: string, usuario que eliminó la licencia (nullable).

### 6. Tabla `Session`

**Descripción**: Almacena la información de las sesiones de los usuarios.

**Campos**:
- `id`: int, identificador único de la sesión (PRIMARY KEY).
- `userCode`: string, código del usuario (FOREIGN KEY referenciando `User`).
- `token`: string, token de la sesión.
- `createdAt`: Date, fecha de inicio de la sesión.
- `updatedAt`: Date, fecha de última actualización de la sesión.
- `expirationDate`: Date, fecha de expiración de la sesión.

## Módulos de la Aplicación

### 1. Módulo `Objects`

**Responsabilidad**: Gestionar la creación, actualización y eliminación de objetos de la aplicación.

### 2. Módulo `Permission`

**Responsabilidad**: Gestionar los permisos de acceso a los objetos para cada rol.

### 3. Módulo `Role`

**Responsabilidad**: Gestionar la creación, actualización y eliminación de roles.

### 4. Módulo `UserRolCompany`

**Responsabilidad**: Gestionar la asociación entre usuarios, roles y compañías, así como la asignación de licencias. Manejar la lógica de permisos basada en el tipo de licencia.

### 5. Módulo `License`

**Responsabilidad**: Gestionar la creación, actualización y eliminación de licencias.

### 6. Módulo `Session`

**Responsabilidad**: Gestionar la creación y expiración de sesiones de usuario.

## Configuración del Proyecto

### 1. Archivo `docker-compose.yml`

Configura los servicios necesarios, incluyendo PostgreSQL y la aplicación NestJS.

```yaml name=docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: tordo_postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: yourpassword
      POSTGRES_DB: general
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - tordo_network

  backend:
    build:
      context: ./business
      dockerfile: Dockerfile
    container_name: tordo_backend
    restart: always
    ports:
      - "3000:3000"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: general
      DB_USER: postgres
      DB_PASSWORD: yourpassword
      JWT_SECRET: your_secret_key
    depends_on:
      - postgres
    networks:
      - tordo_network

  portainer:
    image: portainer/portainer-ce:latest
    container_name: tordo_portainer
    restart: always
    ports:
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data
    networks:
      - tordo_network

networks:
  tordo_network:

volumes:
  postgres_data:
  portainer_data:
```

### 2. Archivo `Dockerfile`

Define cómo se construye la aplicación NestJS.

```dockerfile name=Dockerfile
# Usar una imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
```

## Conclusión

Este documento proporciona una visión general del alcance técnico del proyecto, incluyendo la estructura de la base de datos y los módulos de la aplicación necesarios para gestionar la autenticación y autorización de usuarios. La configuración del proyecto está diseñada para ser escalable y fácil de mantener, utilizando Docker para la gestión de servicios y NestJS para la lógica de la aplicación.