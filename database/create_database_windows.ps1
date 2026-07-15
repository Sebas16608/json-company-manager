# ============================================================
# Script de creación de base de datos (Windows PowerShell)
# ============================================================

param(
    [string]$DBName = "das_global",
    [string]$DBUser = "postgres",
    [string]$DBHost = "localhost",
    [string]$DBPort = "5432"
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackupFile = Join-Path $ScriptDir "backup.sql"

Write-Host "=== Creación de base de datos (Windows) ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Base de datos: $DBName"
Write-Host "Usuario:       $DBUser"
Write-Host "Host:          $DBHost"
Write-Host "Puerto:        $DBPort"
Write-Host ""

# Verificar que psql esté disponible
if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: psql no se encuentra en el PATH." -ForegroundColor Red
    Write-Host "Instale PostgreSQL desde: https://www.postgresql.org/download/windows/"
    Write-Host "Agregue la carpeta bin al PATH del sistema."
    exit 1
}

# Verificar conexión a PostgreSQL
try {
    psql -h $DBHost -p $DBPort -U $DBUser -c "SELECT 1;" 2>$null | Out-Null
} catch {
    Write-Host "ERROR: No se pudo conectar a PostgreSQL." -ForegroundColor Red
    Write-Host "Verifique que PostgreSQL este ejecutandose."
    exit 1
}
Write-Host "Conectado a PostgreSQL." -ForegroundColor Green

# Verificar si la base de datos ya existe
$DBExists = psql -h $DBHost -p $DBPort -U $DBUser -tAc "SELECT 1 FROM pg_database WHERE datname='$DBName';" 2>$null

if ($DBExists.Trim() -eq "1") {
    Write-Host "La base de datos '$DBName' ya existe." -ForegroundColor Yellow
    $Confirm = Read-Host "Desea eliminarla y recrearla? (s/n)"
    if ($Confirm -eq "s" -or $Confirm -eq "S") {
        Write-Host "Eliminando base de datos existente..." -ForegroundColor Yellow
        dropdb -h $DBHost -p $DBPort -U $DBUser $DBName
    } else {
        Write-Host "Operacion cancelada."
        exit 0
    }
}

# Crear la base de datos
Write-Host "Creando base de datos '$DBName'..." -ForegroundColor Green
createdb -h $DBHost -p $DBPort -U $DBUser $DBName
Write-Host "Base de datos creada." -ForegroundColor Green

# Verificar que el archivo de backup existe
if (-not (Test-Path $BackupFile)) {
    Write-Host "ERROR: No se encontro el archivo $BackupFile" -ForegroundColor Red
    exit 1
}

# Restaurar el backup
Write-Host "Restaurando backup..." -ForegroundColor Green
psql -h $DBHost -p $DBPort -U $DBUser -d $DBName -f $BackupFile 2>$null | Out-Null
Write-Host "Backup restaurado." -ForegroundColor Green

Write-Host ""
Write-Host "=== Proceso completado ===" -ForegroundColor Cyan
Write-Host "La base de datos '$DBName' esta lista para usar."
Write-Host ""
Write-Host "Ejecute el backend con:" -ForegroundColor Yellow
Write-Host "  cd backend; python manage.py runserver"
