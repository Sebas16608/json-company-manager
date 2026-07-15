import { useState, useRef } from 'react'
import { importCompany } from '../api'
import { notify } from './Notification'

export default function ImportJSON({ onImported }) {
  const [file, setFile] = useState(null)
  const [importing, setImporting] = useState(false)
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return

    if (!selected.name.endsWith('.json')) {
      notify('Solo se permiten archivos .json', 'error')
      e.target.value = ''
      return
    }

    setFile(selected)
  }

  const handleImport = () => {
    if (!file) return

    setImporting(true)
    importCompany(file)
      .then(() => {
        notify('Empresa importada correctamente')
        setFile(null)
        if (inputRef.current) inputRef.current.value = ''
        onImported()
      })
      .catch((err) => {
        const msg = err.response?.data?.error || 'Error al importar empresa'
        notify(msg, 'error')
      })
      .finally(() => setImporting(false))
  }

  const handleClear = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="card import-card">
      <div className="card-header">
        <h3>Importar Empresa</h3>
      </div>
      <div className="import-body">
        <div className="import-row">
          <input
            ref={inputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="import-input"
          />
          {file && (
            <span className="import-filename">{file.name}</span>
          )}
        </div>
        <div className="import-actions">
          {file && (
            <button
              className="btn btn-secondary btn-small"
              onClick={handleClear}
              disabled={importing}
            >
              Limpiar
            </button>
          )}
          <button
            className="btn btn-primary btn-small"
            onClick={handleImport}
            disabled={!file || importing}
          >
            {importing ? 'Importando...' : 'Importar'}
          </button>
        </div>
      </div>
    </div>
  )
}
