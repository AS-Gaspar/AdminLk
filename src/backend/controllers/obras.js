import db from '../database/index.js'

export const alterarObra = async (req, res) => {
    try {
        const { idObra } = req.params
        const { nome_obra, endereco_obra } = req.body

        if (nome_obra === undefined && endereco_obra === undefined) {
            return res.status(400).json({ message: 'Nenhum dado fornecido para atualização' })
        }

        const atualizarDados = {}
        if (nome_obra !== undefined) atualizarDados.nome_obra = nome_obra
        if (endereco_obra !== undefined) atualizarDados.endereco_obra = endereco_obra

        atualizarDados.updated_at = db.fn.now()

        const [obraAtualizada] = await db('obras') 
            .where('id_obra', idObra)
            .update(atualizarDados)
            .returning(['id_obra', 'nome_obra', 'endereco_obra', 'created_at', 'updated_at'])

        if (!obraAtualizada) {
            return res.status(404).json({ message: 'Obra não encontrada para localização'})
        }

        return res.json(obraAtualizada)
    } catch (error) {
        console.error('Erro em alterarObra:', error)
        return res.status(500).json({ message: 'Erro ao alterar obra.', error: error.message})
    }
}

export const deletarObra = async (req, res) => {
    try {
        const { idObra } = req.params
        const deletada = await db('obras').where('id_obra', idObra).del()

        if (!deletada) {
            return res.status(404).json({ message: 'Obra não encontrada para remoção.' })
        }

        return res.status(200).json({ message: 'Obra deletada' })
    } catch (error) {
        console.error('erro em deletarObra:', error)
        res.status(500).json({ message: 'Erro ao deletear obra.', error: error.message })
    }

}

export const listarObras = async (req, res) => {
    try {
        const obras = await db('obras').select('*').orderBy('nome_obra')
        return res.json(obras)
    } catch (error) {
        console.error("Erro em listarObras:", error)
        return res.status(500).json({ message: 'Erro ao buscar dados.', error: error.message })
    }
}

export const buscarObraPorId = async (req, res) => {
    try {
        const { idObra } = req.params
        const obra = await db('obras').where('id_obra', idObra).first()

        if (!obra) {
            return res.status(404).json({ message: 'Obra não encontrada.'})
        }
        return res.json(obra)
    } catch (error) {
        console.error('Erro em buscarObraPorId:', error)
        return res.status(500).json({ message: 'Erro ao buscar obra.', error: error.message})
    }
}

export const adicionarObra = async (req, res) => {
    try {
        const { nome_obra, endereco_obra } = req.body

        if (!nome_obra) {
            return res.status(400).json({ message: 'O nome da obra é obrigatório'})
        }

        const [insertedObra] = await db('obras').insert({
            nome_obra,
            endereco_obra: endereco_obra || null,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        }).returning('*')

        return res.status(201).json(insertedObra)
    } catch (error) {
        console.error('Erro em adicionarObra', error)
        return res.status(500).json({ message: 'Erro ao adicionar obra.', error: error.message })
    }
}