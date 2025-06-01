import knex from 'knex'
import knexfileConfig from '../../../knexfile.js' 

const environment = process.env.NODE_ENV || 'development'
const activeConfig = knexfileConfig[environment]
if (!activeConfig) {
  console.error(`Configuração do Knex não encontrada para o ambiente: ${environment}`)
  console.error('Configurações disponíveis:', Object.keys(knexfileConfig))
  console.error('Verifique seu knexfile.js e a variável de ambiente NODE_ENV.')
  process.exit(1)
}

const db = knex(activeConfig)

db.raw('SELECT 1')
  .then(() => {
    console.log(`Conexão com o banco de dados (${environment}) estabelecida com sucesso.`)
  })
  .catch((err) => {
    console.error(`Falha ao conectar com o banco de dados (${environment}):`, err)
  })

export default db