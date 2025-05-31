import React, { useState, useEffect, useCallback } from "react"
import ObraForm from "../components/obras/ObrasForm"
import ObraList from "../components/obras/ObrasList"
import {
  getObras,
  createObra,
  updateObra,
  deleteObra as deleteObraAPI,
} from "../sevices/obraService"

function PaginaPrincipalObras() {
  const [obras, setObras] = useState([])
  const [obraParaEditar, setObraParaEditar] = useState(null)
  const [isModalFormAberto, setIsModalFormAberto] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const carregarObras = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const data = await getObras()
      setObras(data)
    } catch (err) {
      setError(
        "Falha ao carregar obras: " +
          (err.response?.data?.message || err.message)
      )
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    carregarObras()
  }, [carregarObras])

  const handleSaveObra = async (dadosObra) => {
    setIsLoading(true)
    setError("")
    try {
      if (obraParaEditar) {
        await updateObra(obraParaEditar.id_obra, dadosObra)
      } else {
        await createObra(dadosObra)
      }
      await carregarObras()
      setModalFormAberto(false)
      setObraParaEditar(null)
    } catch (err) {
      setError(
        "Falha ao salvar obra: " + (err.response?.data?.message || err.message)
      )
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditarObra = (obra) => {
    setObraParaEditar(obra)
    setIsModalFormAberto(true)
  }

  const handleDeletarObra = async (idObra) => {
    if (window.confirm("Tem certeza que deseja excluir esta obra?")) {
      setIsLoading(true)
      setError("")
      try {
        await deleteObraAPI(idObra)
        await carregarObras()
      } catch (err) {
        setError(
          "Falha ao deletar obra: " +
            (err.response?.data?.message || err.message)
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  const abrirFormNovaObra = () => {
    setObraParaEditar(null)
    setIsModalFormAberto(true)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Controle de Obras
      </h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      {isLoading && <div className="text-center py-4">Carregando...</div>}

      <div className="mb-4">
        <button
          onClick={abrirFormNovaObra}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Adicionar Nova Obra
        </button>
      </div>

      {isModalFormAberto && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 
        overflow-y-auto h-full w-full z-50"
        >
          <div
            className="relative top-1/4 mx-auto p-5 border 2-full
            max-2-2x1 shadow-lg rounded-md bg-white"
          >
            <ObraForm
              obraInicial={obraParaEditar}
              onSave={handleSaveObra}
              onCancel={() => {
                setIsModalFormAberto(false)
                setObraParaEditar(null)
                setError("")
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      <ObraList
        obras={obras}
        onEditar={handleEditarObra}
        onDeletar={handleDeletarObra}
      />
    </div>
  )
}

export default PaginaPrincipalObras