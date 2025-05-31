const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    const userTimezoneOffset = date.getTimezoneOffset() * 60000
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('pt-BR')
}

function ObrasList({ obras, onEditar, onDeletar }) {
  if (obras.length === 0) {
    return <p className="text-gray-600">Nenhuma obra cadastrada ainda.</p>;
  }

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início Previsto</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {obras.map((obra) => (
            <tr key={obra.id_obra} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{obra.nome_obra}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{obra.codigo_obra || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    obra.status_obra === 'Concluída' ? 'bg-green-100 text-green-800' :
                    obra.status_obra === 'Em Andamento' ? 'bg-yellow-100 text-yellow-800' :
                    obra.status_obra === 'Cancelada' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                }`}>
                  {obra.status_obra}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(obra.data_inicio)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{obra.responsavel_obra || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEditar(obra)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDeletar(obra.id_obra)}
                  className="text-red-600 hover:text-red-900"
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

export default ObrasList;