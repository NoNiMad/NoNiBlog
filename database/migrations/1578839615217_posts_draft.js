'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema
{
    up()
    {
        this.table('posts', (table) =>
        {
            table.boolean('is_draft').defaultTo(true).notNullable()
        })
    }

    down()
    {
        this.table('posts', (table) =>
        {
            table.dropColumn('is_draft')
        })
    }
}

module.exports = PostsSchema