#!/bin/bash
# ============================================================
# Script de creación de base de datos (macOS)
# Compatible con bash y zsh
# ============================================================

set -e

DB_NAME="${DB_NAME:-das_global}"
DB_USER="${DB_USER:-postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKUP_FILE="$SCRIPT_DIR/backup.sql"

# Agregar rutas de Homebrew al PATH (Apple Silicon e Intel)
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

echo "=== Creación de base de datos (macOS) ==="
echo ""
echo "Base de datos: $DB_NAME"
echo "Usuario:       $DB_USER"
echo "Host:          $DB_HOST"
echo "Puerto:        $DB_PORT"
echo ""

# Verificar que psql esté disponible
if ! command -v psql &> /dev/null; then
    echo "ERROR: psql no se encuentra en el PATH."
    echo "Instale PostgreSQL con Homebrew:"
    echo "  brew install postgresql@16"
    echo "  brew services start postgresql@16"
    exit 1
fi

# Verificar conexión a PostgreSQL
if ! psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "SELECT 1;" > /dev/null 2>&1; then
    echo "ERROR: No se pudo conectar a PostgreSQL."
    echo "Verifique que PostgreSQL este ejecutandose:"
    echo "  brew services start postgresql@16"
    exit 1
fi
echo "Conectado a PostgreSQL."

# Verificar si la base de datos ya existe
DB_EXISTS=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME';" 2>/dev/null)

if [ "$DB_EXISTS" = "1" ]; then
    echo "La base de datos '$DB_NAME' ya existe."
    read -p "Desea eliminarla y recrearla? (s/n): " CONFIRM
    if [ "$CONFIRM" = "s" ] || [ "$CONFIRM" = "S" ]; then
        echo "Eliminando base de datos existente..."
        dropdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"
    else
        echo "Operacion cancelada."
        exit 0
    fi
fi

# Crear la base de datos
echo "Creando base de datos '$DB_NAME'..."
createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"
echo "Base de datos creada."

# Verificar que el archivo de backup existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo "ERROR: No se encontro el archivo $BACKUP_FILE"
    exit 1
fi

# Restaurar el backup
echo "Restaurando backup..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$BACKUP_FILE" > /dev/null 2>&1
echo "Backup restaurado."

echo ""
echo "=== Proceso completado ==="
echo "La base de datos '$DB_NAME' esta lista para usar."
echo ""
echo "Ejecute el backend con:"
echo "  cd backend && python manage.py runserver"
