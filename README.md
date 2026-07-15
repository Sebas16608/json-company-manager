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
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── core/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── company/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       └── admin.py
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── scripts/
│   ├── start-linux.sh
│   ├── start-macos.sh
│   ├── start-windows.ps1
│   └── README.md
├── empresa.json
└── README.md
```

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

El archivo `backend/.env` debe contener:

```env
SECRET_KEY=tu-clave-secreta
DEBUG=True
ALLOWED_HOSTS=*
DB_NAME=das_global
DB_USER=postgres
DB_PASSWORD=tu-password
DB_HOST=localhost
DB_PORT=5432
```

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

## Base de datos

### Restaurar backup

```bash
psql -U postgres -d das_global < database/backup.sql
```

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
