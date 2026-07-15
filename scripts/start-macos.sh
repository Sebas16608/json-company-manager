#!/bin/bash
# ============================================================
# Script de inicio - Desarrollo local (macOS)
# Compatible con bash y zsh
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=== JSON Company Manager - Desarrollo ==="
echo ""

# Iniciar backend en segundo plano
echo "[1/2] Iniciando backend (Django)..."
cd "$PROJECT_DIR/backend"
python manage.py runserver &
BACKEND_PID=$!

# Iniciar frontend en segundo plano
echo "[2/2] Iniciando frontend (Vite)..."
cd "$PROJECT_DIR/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Backend:  http://127.0.0.1:8000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Presiona Ctrl+C para detener ambos servicios."
echo ""

# Capturar Ctrl+C y detener ambos procesos
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
