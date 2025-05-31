import express from 'express'
import * as obras from '../controllers/obras.js'

const router = express.Router()

router.get('/', obras.listarObras)
router.post('/', obras.adicionarObra)
router.get('/:idObra', obras.buscarObraPorId)
router.put('/:idObra', obras.alterarObra)
router.delete('/:idObra', obras.deletarObra)

export default router