import { useState } from 'react'

export default function PackageForm({
  onSubmit,
  loading,
}) {
  const [formData, setFormData] =
    useState({
      name: '',
      description: '',
      price: '',
    })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    await onSubmit({
      ...formData,
      price: Number(formData.price),
    })

    setFormData({
      name: '',
      description: '',
      price: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-xl p-5 shadow-sm space-y-4"
    >

      <h2 className="text-lg font-semibold text-slate-800">
        Create Package
      </h2>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Package Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Price
        </label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
      >
        {loading
          ? 'Creating...'
          : 'Create Package'}
      </button>

    </form>
  )
}