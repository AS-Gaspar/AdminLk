import React, { useState, useEffect, useCallback } from "react"
import ObraForm from "../components/obras/ObrasForm.jsx"
import ObrasList from "../components/obras/ObrasList.jsx"
import {
  getObras,
  createObra,
  updateObra,
  deleteObra,
} from "../sevices/obraService.js"

function Obras() {
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
      setObras(data || [])
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Erro inexplicável"
      setError(`Falha ao carregar obras: ${errorMsg}`)
      console.error("Erro ao carregar obras:", err)
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
      if (obraParaEditar && obraParaEditar.id_obra) {
        await updateObra(obraParaEditar.id_obra, dadosObra)
      } else {
        await createObra(dadosObra)
      }
      await carregarObras()
      setIsModalFormAberto(false)
      setObraParaEditar(null)
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Erro inexplicável"
      setError(`Falha ao carregar obras: ${errorMsg}`)
      console.error("Erro ao carregar obras:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditarObra = (obra) => {
    setObraParaEditar(obra)
    setError("")
    setIsModalFormAberto(true)
  }

  const handleDeletarObra = async (idObra) => {
    if (window.confirm("Tem certeza que deseja excluir esta obra?")) {
      setIsLoading(true)
      setError("")
      try {
        await deleteObra(idObra)
        await carregarObras()
      } catch (err) {
        setError(
          "Falha ao deletar obra: " +
            (err.response?.data?.message || err.message)
        )
      } finally {
        setIsLoading(false)
      }
    } else {
      console.log("Usuário cancelou exclusão")
    }
  }

  const handleAbrirFormNovaObra = () => {
    setObraParaEditar(null)
    setError("")
    setIsModalFormAberto(true)
  }

  const handleFecharForm = () => {
    setIsModalFormAberto(false)
    setObraParaEditar(null)
    setError("")
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Gerenciamento de Obras
        </h1>
        <button
          onClick={handleAbrirFormNovaObra}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
        >
          + Nova Obra
        </button>
      </div>

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md shadow-sm"
          role="alert"
        >
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      {isModalFormAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-white bg-opacity-60 p-4">
          <div className="relative w-full max-w-lg mx-auto">
            <ObraForm
              obraInicial={obraParaEditar}
              onSave={handleSaveObra}
              onCancel={handleFecharForm}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      <ObrasList
        obras={obras}
        onEditar={handleEditarObra}
        onDeletar={handleDeletarObra}
        isLoading={isLoading && obras.length === 0}
      />
    </div>
  )
}

export default Obras
