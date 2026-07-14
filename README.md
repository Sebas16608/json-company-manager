# JSON Company Manager

Prueba tecnica para aplicacion de empleo. Sistema de gestion de empresas, sucursales y colaboradores expuesto mediante una API REST.

## Descripcion

Aplicacion web que modela una jerarquia de **Empresa > Sucursal > Colaborador**, permitiendo administrar la informacion de las companias, sus oficinas y las personas que trabajan en cada una.

## Estado actual

- [x] Modelos de datos (Company, Branch, Collaborator)
- [x] Serializadores con validaciones (DRF)
- [x] Migraciones de base de datos
- [ ] Endpoints API (CRUD)
- [ ] Registro en el panel de admin
- [ ] Pruebas unitarias
- [ ] Frontend

## Stack tecnico

### Backend
- Python 3.12
- Django 6.0.7
- Django REST Framework 3.17.1
- PostgreSQL (psycopg2)

### Frontend
Pendiente

## Estructura del proyecto

```
json-company-manager/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── core/                  # Configuracion del proyecto Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── company/               # App principal
│       ├── models.py          # Company, Branch, Collaborator
│       ├── serializers.py     # Serializadores DRF con validaciones
│       ├── views.py
│       └── admin.py
├── frontend/                  # Pendiente
└── README.md
```

## Modelo de datos

- **Company**: `name`, `country`
- **Branch**: `name`, `address`, `phone` (FK a Company)
- **Collaborator**: `name`, `cui` (FK a Branch)

## Instalacion

### Requisitos
- Python 3.12
- PostgreSQL

### Pasos

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd json-company-manager

# Crear y activar entorno virtual
python -m venv .venv
source .venv/bin/activate

# Instalar dependencias
pip install -r backend/requirements.txt

# Configurar variables de entorno
# Crear el archivo backend/.env con las credenciales de PostgreSQL

# Ejecutar migraciones
cd backend
python manage.py migrate

# Iniciar servidor de desarrollo
python manage.py runserver
```

### Variables de entorno

El archivo `backend/.env` debe contener:

```
SECRET_KEY=tu-clave-secreta
DEBUG=True
DB_NAME=das_global
DB_USER=postgres
DB_PASSWORD=tu-password
DB_HOST=localhost
DB_PORT=5432
```

## Licencia

Proyecto realizado como prueba tecnica.
