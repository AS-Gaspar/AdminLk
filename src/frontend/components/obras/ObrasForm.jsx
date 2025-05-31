import React, { useState, useEffect } from 'react'

function ObraForm({ obraInicial, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    nome_obra: '',
    codigo_obra: '',
    endereco_obra: '',
    cidade_obra: '',
    estado_obra: '',
    data_inicio: '',
    data_fim_prevista: '',
    status_obra: 'Planejada',
    responsavel_obra: '',
  })

  useEffect(() => {
    if (obraInicial) {
      const formatInputDate = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toISOString().split('T')[0]
      }

      setFormData({
        nome_obra: obraInicial.nome_obra || '',
        codigo_obra: obraInicial.codigo_obra || '',
        endereco_obra: obraInicial.endereco_obra || '',
        cidade_obra: obraInicial.cidade_obra || '',
        estado_obra: obraInicial.estado_obra || '',
        data_inicio: formatInputDate(obraInicial.data_inicio),
        data_fim_prevista: formatInputDate(obraInicial.data_fim_prevista),
        status_obra: obraInicial.status_obra || 'Planejada',
        responsavel_obra: obraInicial.responsavel_obra || '',
      })
    } else {
      // Reset para novo formulário
       setFormData({
        nome_obra: '', codigo_obra: '', endereco_obra: '', cidade_obra: '', estado_obra: '',
        data_inicio: '', data_fim_prevista: '', status_obra: 'Planejada', responsavel_obra: '',
      })
    }
  }, [obraInicial])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const dadosParaSalvar = { ...formData }
    if (dadosParaSalvar.data_inicio === '') dadosParaSalvar.data_inicio = null
    if (dadosParaSalvar.data_fim_prevista === '') dadosParaSalvar.data_fim_prevista = null

    onSave(dadosParaSalvar)
  }

  const statusOptions = ['Planejada', 'Em Andamento', 'Concluída', 'Cancelada', 'Pausada']

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {obraInicial ? 'Editar Obra' : 'Adicionar Nova Obra'}
      </h2>

      <div>
        <label htmlFor="nome_obra" className="block text-sm font-medium text-gray-700">Nome da Obra *</label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="codigo_obra" className="block text-sm font-medium text-gray-700">Código da Obra</label>
          <input type="text" name="codigo_obra" id="codigo_obra" value={formData.codigo_obra} onChange={handleChange} className="input-form" />
        </div>
        <div>
          <label htmlFor="status_obra" className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status_obra" id="status_obra" value={formData.status_obra} onChange={handleChange} className="input-form">
            {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="endereco_obra" className="block text-sm font-medium text-gray-700">Endereço</label>
        <input type="text" name="endereco_obra" id="endereco_obra" value={formData.endereco_obra} onChange={handleChange} className="input-form" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cidade_obra" className="block text-sm font-medium text-gray-700">Cidade</label>
          <input type="text" name="cidade_obra" id="cidade_obra" value={formData.cidade_obra} onChange={handleChange} className="input-form" />
        </div>
        <div>
          <label htmlFor="estado_obra" className="block text-sm font-medium text-gray-700">Estado (UF)</label>
          <input type="text" name="estado_obra" id="estado_obra" value={formData.estado_obra} onChange={handleChange} maxLength="2" className="input-form" />
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="data_inicio" className="block text-sm font-medium text-gray-700">Data de Início</label>
          <input type="date" name="data_inicio" id="data_inicio" value={formData.data_inicio} onChange={handleChange} className="input-form" />
        </div>
        <div>
          <label htmlFor="data_fim_prevista" className="block text-sm font-medium text-gray-700">Data de Fim Prevista</label>
          <input type="date" name="data_fim_prevista" id="data_fim_prevista" value={formData.data_fim_prevista} onChange={handleChange} className="input-form" />
        </div>
      </div>

      <div>
        <label htmlFor="responsavel_obra" className="block text-sm font-medium text-gray-700">Responsável</label>
        <input type="text" name="responsavel_obra" id="responsavel_obra" value={formData.responsavel_obra} onChange={handleChange} className="input-form" />
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
          {isLoading ? (obraInicial ? 'Salvando Alterações...' : 'Adicionando Obra...') : (obraInicial ? 'Salvar Alterações' : 'Adicionar Obra')}
        </button>
      </div>
      <style jsx global>{`
        .input-form {
          margin-top: 0.25rem;
          display: block;
          width: 100%;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-width: 1px;
          border-color: #D1D5DB; /* gray-300 */
          border-radius: 0.375rem; /* rounded-md */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
        }
        .input-form:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);
          --tw-ring-offset-width: 0px;
          --tw-ring-offset-color: #fff;
          --tw-ring-color: #60A5FA; /* focus:ring-indigo-500 (ajustado para blue-400) */
          border-color: #60A5FA; /* focus:border-indigo-500 (ajustado para blue-400) */
        }
      `}</style>
    </form>
  )
}

export default ObraForm;