import { useState, useEffect } from 'react'
import { getCompanies } from '../api'

export default function CompaniesView({ onSelectCompany }) {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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
                  <th>Nombre</th>
                  <th>País</th>
                  <th>Sucursales</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.country}</td>
                    <td>
                      <span className="badge badge-count">
                        {c.branches ? c.branches.length : 0}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-small"
                        onClick={() => onSelectCompany(c)}
                      >
                        Ver sucursales
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
