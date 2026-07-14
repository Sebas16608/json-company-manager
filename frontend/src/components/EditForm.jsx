import { useState } from 'react'

export default function EditForm({ fields, initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...initial })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((f) => (
        <div className="form-group" key={f.name}>
          <label>{f.label}</label>
          <input
            name={f.name}
            value={form[f.name] || ''}
            onChange={handleChange}
            required={f.required !== false}
          />
        </div>
      ))}
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  )
}
