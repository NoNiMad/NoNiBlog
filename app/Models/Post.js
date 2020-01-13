'use strict'

const showdown  = require('showdown')
const Model = use('Model')

class Post extends Model {
    static boot () {
        super.boot()
        
        this.addHook('beforeSave', async (post) => {
            if (post.title) {
                post.slug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
            }
        })
      }

    getCreatedAt (created_at) {
        return created_at.format('DD/MM/YYYY à HH:mm:ss')
    }

    getContent(content) {
        const converter = new showdown.Converter()
        return converter.makeHtml(content)
    }

    author () {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Post
