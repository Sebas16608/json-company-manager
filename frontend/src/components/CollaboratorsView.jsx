import { useState } from 'react'
import { updateCollaborator, deleteCollaborator } from '../api'
import { notify } from './Notification'
import Modal from './Modal'
import EditForm from './EditForm'

const fields = [
  { name: 'name', label: 'Nombre' },
  { name: 'cui', label: 'CUI' },
]

export default function CollaboratorsView({ branch, onBack }) {
  const [collaborators, setCollaborators] = useState(branch.collaborators || [])
  const [editing, setEditing] = useState(null)

  const handleSave = (data) => {
    updateCollaborator(editing.id, data)
      .then(() => {
        notify('Colaborador actualizado')
        setEditing(null)
        setCollaborators((prev) =>
          prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c))
        )
      })
      .catch(() => notify('Error al actualizar colaborador', 'error'))
  }

  const handleDelete = (id) => {
    if (!confirm('¿Eliminar este colaborador?')) return
    deleteCollaborator(id)
      .then(() => {
        notify('Colaborador eliminado')
        setCollaborators((prev) => prev.filter((c) => c.id !== id))
      })
      .catch(() => notify('Error al eliminar colaborador', 'error'))
  }

  return (
    <div>
      <div className="breadcrumb">
        <span onClick={onBack}>Sucursales</span>
        <span className="separator">/</span>
        <span>{branch.name}</span>
      </div>

      <div className="card-header" style={{ borderRadius: '12px 12px 0 0', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 20 }}>
        <h3>Colaboradores de {branch.name}</h3>
        <span className="badge badge-count">{collaborators.length}</span>
      </div>

      {collaborators.length === 0 ? (
        <div className="empty-state">Esta sucursal no tiene colaboradores</div>
      ) : (
        <div className="card">
          <div className="responsive-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>CUI</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {collaborators.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.cui}</td>
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
                          onClick={() => handleDelete(c.id)}
                        >
                          Eliminar
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
        <Modal title="Editar colaborador" onClose={() => setEditing(null)}>
          <EditForm
            fields={fields}
            initial={{ name: editing.name, cui: editing.cui }}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  )
}
