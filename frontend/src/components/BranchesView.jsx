import { useState } from 'react'
import { updateBranch, deleteBranch } from '../api'
import { notify } from './Notification'
import Modal from './Modal'
import EditForm from './EditForm'

const fields = [
  { name: 'name', label: 'Nombre' },
  { name: 'address', label: 'Dirección' },
  { name: 'phone', label: 'Teléfono' },
]

export default function BranchesView({ company, onBack, onSelectBranch }) {
  const [branches, setBranches] = useState(company.branches || [])
  const [editing, setEditing] = useState(null)

  const handleSave = (data) => {
    updateBranch(editing.id, data)
      .then(() => {
        notify('Sucursal actualizada')
        setEditing(null)
        setBranches((prev) =>
          prev.map((b) => (b.id === editing.id ? { ...b, ...data } : b))
        )
      })
      .catch(() => notify('Error al actualizar sucursal', 'error'))
  }

  const handleDelete = (id) => {
    if (!confirm('¿Eliminar esta sucursal?')) return
    deleteBranch(id)
      .then(() => {
        notify('Sucursal eliminada')
        setBranches((prev) => prev.filter((b) => b.id !== id))
      })
      .catch(() => notify('Error al eliminar sucursal', 'error'))
  }

  return (
    <div>
      <div className="breadcrumb">
        <span onClick={onBack}>Empresas</span>
        <span className="separator">/</span>
        <span>{company.name}</span>
      </div>

      <div className="card-header" style={{ borderRadius: '12px 12px 0 0', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 20 }}>
        <h3>Sucursales de {company.name}</h3>
        <span className="badge badge-count">{branches.length}</span>
      </div>

      {branches.length === 0 ? (
        <div className="empty-state">Esta empresa no tiene sucursales</div>
      ) : (
        <div className="card">
          <div className="responsive-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((b) => (
                  <tr key={b.id}>
                    <td><strong>{b.name}</strong></td>
                    <td>{b.address}</td>
                    <td>{b.phone}</td>
                    <td>
                      <div className="action-group">
                        <button
                          className="btn btn-warning btn-small"
                          onClick={() => setEditing(b)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDelete(b.id)}
                        >
                          Eliminar
                        </button>
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => onSelectBranch(b)}
                        >
                          Colaboradores
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editing && (
        <Modal title="Editar sucursal" onClose={() => setEditing(null)}>
          <EditForm
            fields={fields}
            initial={{ name: editing.name, address: editing.address, phone: editing.phone }}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  )
}
