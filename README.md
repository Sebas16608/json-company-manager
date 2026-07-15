# JSON Company Manager

Sistema de gestión de empresas, sucursales y colaboradores expuesto mediante una API REST.

## Descripción

Aplicación web que modela una jerarquía de **Empresa > Sucursal > Colaborador**, permitiendo administrar la información de las compañías, sus oficinas y las personas que trabajan en cada una.

## Stack técnico

### Backend
- Python 3.12
- Django 6.0.7
- Django REST Framework 3.17.1
- PostgreSQL (psycopg2)

### Frontend
- React 18
- Vite 5
- Axios

## Requisitos

- Python 3.12+
- Node.js
- PostgreSQL

## Estructura del proyecto

```
json-company-manager/
├── backend/          API Django REST Framework
├── frontend/         Aplicación React + Vite
├── database/         Scripts y backup de PostgreSQL
├── scripts/          Scripts de ejecución
├── .env.example      Ejemplo de variables de entorno
└── README.md
```

## Base de datos

### Requisitos

- PostgreSQL instalado y ejecutándose

### Crear base de datos

Ejecutar el script que crea la base de datos y restaura el backup:

```bash
./database/create_database.sh
```

El script permite configurar las variables de entorno:

```bash
DB_NAME=das_global DB_USER=postgres ./database/create_database.sh
```

### Restaurar manualmente

Si ya tiene la base de datos creada, puede restaurar el backup directamente:

```bash
psql -U postgres -d das_global < database/backup.sql
```

### Variables de entorno

El backend utiliza las siguientes variables de entorno definidas en `backend/.env`:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DB_NAME` | Nombre de la base de datos | `das_global` |
| `DB_USER` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña del usuario | `tu_password` |
| `DB_HOST` | Host del servidor | `localhost` |
| `DB_PORT` | Puerto de conexión | `5432` |
| `SECRET_KEY` | Clave secreta de Django | `tu_clave_secreta` |
| `DEBUG` | Modo depuración | `True` |

Ver [.env.example](.env.example) para el archivo de ejemplo.

## Backend

### Configurar entorno virtual

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Linux / macOS
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### Instalar dependencias

```bash
pip install -r requirements.txt
```

### Variables de entorno

Copiar el archivo de ejemplo y configurar las credenciales:

```bash
cp .env.example backend/.env
```

Editar `backend/.env` con los valores correctos de su base de datos.

### Ejecutar migraciones

```bash
python manage.py migrate
```

### Iniciar servidor

```bash
python manage.py runserver
```

El backend estará disponible en `http://127.0.0.1:8000`.

## Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

## Importación JSON

La aplicación permite cargar archivos JSON con la siguiente estructura a través del endpoint `/company/companies/import/`:

```json
{
  "nombre": "Nombre de la empresa",
  "pais": "País",
  "sucursales": [
    {
      "nombre": "Nombre de la sucursal",
      "direccion": "Dirección",
      "telefono": "Teléfono",
      "colaboradores": [
        {
          "nombre": "Nombre del colaborador",
          "cui": "CUI"
        }
      ]
    }
  ]
}
```

## Scripts de inicio

Para ejecutar la aplicación con un solo comando:

### Linux

```bash
chmod +x scripts/start-linux.sh
./scripts/start-linux.sh
```

### macOS

```bash
chmod +x scripts/start-macos.sh
./scripts/start-macos.sh
```

### Windows

```powershell
.\scripts\start-windows.ps1
```

Ver [scripts/README.md](scripts/README.md) para más detalles.

## API

La API está disponible en `http://127.0.0.1:8000/company/` con los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/company/companies/` | Listar empresas |
| POST | `/company/companies/` | Crear empresa |
| PATCH | `/company/companies/{id}/` | Actualizar empresa |
| DELETE | `/company/companies/{id}/` | Eliminar empresa |
| POST | `/company/companies/import/` | Importar empresa desde JSON |
| GET | `/company/branches/` | Listar sucursales |
| PATCH | `/company/branches/{id}/` | Actualizar sucursal |
| DELETE | `/company/branches/{id}/` | Eliminar sucursal |
| GET | `/company/collaborators/` | Listar colaboradores |
| PATCH | `/company/collaborators/{id}/` | Actualizar colaborador |
| DELETE | `/company/collaborators/{id}/` | Eliminar colaborador |

## Modelo de datos

- **Company**: `name`, `country`
- **Branch**: `name`, `address`, `phone` (FK a Company)
- **Collaborator**: `name`, `cui` (FK a Branch)

## Licencia

Proyecto realizado como prueba técnica.
