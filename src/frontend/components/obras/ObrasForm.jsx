import React, { useState, useEffect } from "react"

function ObraForm({ obraInicial, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    nome_obra: "",
    endereco_obra: "",
  })

  useEffect(() => {
    if (obraInicial) {
      setFormData({
        nome_obra: obraInicial.nome_obra || "",
        endereco_obra: obraInicial.endereco_obra || "",
      })
    } else {
      setFormData({
        nome_obra: "",
        endereco_obra: "",
      })
    }
  }, [obraInicial])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dadosParaSalvar = {
      nome_obra: formData.nome_obra,
      endereco_obra: formData.endereco_obra || null,
    }

    onSave(dadosParaSalvar)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {obraInicial ? "Editar Obra" : "Adicionar Nova Obra"}
      </h2>

      <div>
        <label
          htmlFor="nome_obra"
          className="block text-sm font-medium text-gray-700"
        >
          Nome da Obra *
        </label>
        <input
          type="text"
          name="nome_obra"
          id="nome_obra"
          value={formData.nome_obra}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="endereco_obra"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Endereço da Obra
        </label>
        <textarea
          name="endereco_obra"
          id="endereco_obra"
          rows="3"
          value={formData.endereco_obra}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Ex: Rua Amora, 123, Bairro, Cidade - UF"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading
            ? obraInicial
              ? "Salvando Alterações..."
              : "Adicionando Obra..."
            : obraInicial
            ? "Salvar Alterações"
            : "Adicionar Obra"}
        </button>
      </div>
    </form>
  )
}

export default ObraForm
