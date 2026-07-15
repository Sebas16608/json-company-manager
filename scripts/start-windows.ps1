# ============================================================
# Script de inicio - Desarrollo local (Windows PowerShell)
# ============================================================

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir

Write-Host "=== JSON Company Manager - Desarrollo ===" -ForegroundColor Cyan
Write-Host ""

# Iniciar backend en un nuevo proceso
Write-Host "[1/2] Iniciando backend (Django)..." -ForegroundColor Green
$BackendProc = Start-Process -FilePath "python" -ArgumentList "manage.py runserver" -WorkingDirectory "$ProjectDir\backend" -PassThru

# Iniciar frontend en un nuevo proceso
Write-Host "[2/2] Iniciando frontend (Vite)..." -ForegroundColor Green
$FrontendProc = Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "$ProjectDir\frontend" -PassThru

Write-Host ""
Write-Host "Backend:  http://127.0.0.1:8000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Para detener, cierra las ventanas de las terminales o presiona Ctrl+C." -ForegroundColor DarkGray

# Esperar a que el usuario presione una tecla para salir
Write-Host ""
Write-Host "Presiona cualquier tecla para detener ambos servicios..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Detener procesos
Stop-Process -Id $BackendProc.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Id $FrontendProc.Id -Force -ErrorAction SilentlyContinue
Write-Host "Servicios detenidos." -ForegroundColor Cyan
