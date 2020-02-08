'use strict'

const Model = use('Model')

class Tag extends Model {
    static boot () {
        super.boot()
        
        this.addHook('beforeSave', async (post) => {
            post.name = post.name.trim()
        })
    }

    static get createdAtColumn () {
        return null
    }

    static get updatedAtColumn () {
        return null
    }

    posts () {
        return this
            .belongsToMany('App/Models/Tag')
            .pivotTable('posts_tags')
    }
}

module.exports = Tag
