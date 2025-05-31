/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('obras', function(table) {
        table.increments('id_obra').primary()
        table.string('nome_obra', 255).notNullable()
        table.text('endereco_obra')
        table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('obras')  
}
