# Scripts de inicio

Scripts para ejecutar la aplicación en modo desarrollo local.

## Uso

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

## Qué hacen

Cada script inicia dos procesos en paralelo:

1. **Backend** - Django runserver en `http://127.0.0.1:8000`
2. **Frontend** - Vite dev server en `http://localhost:5173`

## Detener

- **Linux/macOS**: Presiona `Ctrl+C`
- **Windows**: Cierra las ventanas de las terminales o presiona cualquier tecla en la ventana principal
