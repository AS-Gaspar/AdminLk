import React from "react";

const formatDate = (dateString) => {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  } catch (error) {
    console.error("Error formatting date:", dateString, error)
    return 'Data inválida'
  }
}

function ObrasList({ obras, onEditar, onDeletar, isLoading }) {
  if (isLoading && (!obras || obras.length === 0)) {
    return <p className="text-gray-600 py-4 text-center">Carregando obras...</p>;
  }

  if (!obras || obras.length === 0) {
    return <p className="text-gray-600 py-4 text-center">Nenhuma obra cadastrada ainda.</p>;
  }

  return (
    <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Nome da Obra
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Endereço
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">
              Criado em
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Atualizado em
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {obras.map((obra) => (
            <tr key={obra.id_obra} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{obra.nome_obra}</div>
              </td>
              <td className="px-6 py-4 whitespace-normal"> {/* whitespace-normal para quebrar linha se o endereço for longo */}
                <div className="text-sm text-gray-600">{obra.endereco_obra || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {formatDate(obra.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(obra.updated_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => onEditar(obra)}
                  className="text-indigo-600 hover:text-indigo-900 font-semibold py-1 px-2 rounded hover:bg-indigo-100"
                  aria-label={`Editar ${obra.nome_obra}`}
                >
                  Editar
                </button>
                <button
                  onClick={() => onDeletar(obra.id_obra)}
                  className="text-red-600 hover:text-red-900 font-semibold py-1 px-2 rounded hover:bg-red-100"
                  aria-label={`Excluir ${obra.nome_obra}`}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ObrasList