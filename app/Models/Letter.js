'use strict'

const showdown = require('showdown')
const Model = use('Model')

class Letter extends Model
{
    static boot()
    {
        super.boot()

        this.addHook('beforeSave', async (letter) =>
        {
            if (letter.title)
                letter.slug = letter.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
        })
    }

    getCreatedAt(created_at)
    {
        return created_at.format('DD/MM/YYYY à HH:mm:ss')
    }

    getUpdatedAt(updated_at)
    {
        return updated_at.format('DD/MM/YYYY à HH:mm:ss')
    }

    getContent(content)
    {
        const converter = new showdown.Converter()
        return converter.makeHtml(content)
    }

    author()
    {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Letter