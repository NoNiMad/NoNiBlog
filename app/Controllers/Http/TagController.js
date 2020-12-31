'use strict'

const Tag = use('App/Models/Tag')

class TagController
{
    async list({ view })
    {
        let tags = await Tag.all()
        return view.render('Admin/Tags/TagList', { tags: tags.toJSON() })
    }

    async create({ view })
    {
        const newTag = new Tag()
        newTag.id = -1
        newTag.name = ""
        return view.render('Admin/Tags/TagEdit', { tag: newTag })
    }

    async edit({ params, view })
    {
        const tag = await Tag.find(params.id)
        return view.render('Admin/Tags/TagEdit', { tag: tag })
    }

    async save({ request, response, view })
    {
        const { id, name } = request.all()

        let tag
        if (id == -1)
            tag = new Tag()
        else
            tag = await Tag.find(id)
        tag.name = name

        try
        {
            await tag.save()
        }
        catch (err)
        {
            console.error(err)
            return view.render('Admin/Tags/TagEdit', { error: `Erreur d'insertion`, tag: tag })
        }

        return response.redirect('/admin/tags')
    }

    async delete({ params, response })
    {
        const tag = await Tag.find(params.id)
        await tag.posts().detach()
        await tag.delete()
        return response.redirect('/admin/tags')
    }
}

module.exports = TagController