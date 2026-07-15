import { useState, useEffect, useCallback } from 'react'
import { getCompanies, updateCompany, deleteCompany } from '../api'
import { notify } from './Notification'
import Modal from './Modal'
import EditForm from './EditForm'

const fields = [
  { name: 'name', label: 'Nombre' },
  { name: 'country', label: 'País' },
]

export default function CompaniesView({ onSelectCompany, refreshKey }) {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)

  const fetchCompanies = useCallback(() => {
    setLoading(true)
    setError(null)
    getCompanies()
      .then((res) => {
        setCompanies(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Error al cargar empresas')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies, refreshKey])

  const handleSave = (data) => {
    updateCompany(editing.id, data)
      .then(() => {
        notify('Empresa actualizada')
        setEditing(null)
        setCompanies((prev) =>
          prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c))
        )
      })
      .catch(() => notify('Error al actualizar empresa', 'error'))
  }

  const handleDelete = (company) => {
    if (!confirm(`¿Eliminar la empresa "${company.name}"? Se eliminarán todas sus sucursales y colaboradores.`)) return
    deleteCompany(company.id)
      .then(() => {
        notify('Empresa eliminada')
        setCompanies((prev) => prev.filter((c) => c.id !== company.id))
      })
      .catch(() => notify('Error al eliminar empresa', 'error'))
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <span className="loading-text">Cargando empresas...</span>
      </div>
    )
  }

  if (error) {
    return <div className="empty-state">{error}</div>
  }

  return (
    <div>
      <h2 className="page-title">Empresas</h2>
      <div className="card">
        {companies.length === 0 ? (
          <div className="empty-state">No hay empresas registradas</div>
        ) : (
          <div className="responsive-table">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>País</th>
                  <th>Sucursales</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.country}</td>
                    <td>
                      <span className="badge badge-count">
                        {c.branches ? c.branches.length : 0}
                      </span>
                    </td>
                    <td>
                      <div className="action-group">
                        <button
                          className="btn btn-warning btn-small"
                          onClick={() => setEditing(c)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDelete(c)}
                        >
                          Eliminar
                        </button>
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => onSelectCompany(c)}
                        >
                          Ver sucursales
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <Modal title="Editar empresa" onClose={() => setEditing(null)}>
          <EditForm
            fields={fields}
            initial={{ name: editing.name, country: editing.country }}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  )
}
