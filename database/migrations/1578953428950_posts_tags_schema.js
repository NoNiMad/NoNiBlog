'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsTagsSchema extends Schema {
  up () {
    this.create('posts_tags', (table) => {
      table.integer('post_id').unsigned().references('id').inTable('posts')
      table.integer('tag_id').unsigned().references('id').inTable('tags')
      table.primary(['post_id', 'tag_id'])
    })
  }

  down () {
    this.drop('posts_tags')
  }
}

module.exports = PostsTagsSchema
