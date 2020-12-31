'use strict'

const Post = use('App/Models/Post')
const Tag = use('App/Models/Tag')

class GlobalController
{
    async home({ view })
    {
        let posts = await Post
            .query()
            .where({ is_draft: false })
            .with('author')
            .with('tags')
            .orderBy('created_at', 'desc')
            .fetch()

        return view.render('Home', { posts: posts.toJSON() })
    }

    async postsForTag({ params, response, view })
    {
        let tag = await Tag.find(params.id)
        if (tag == null)
            return response.route('GlobalController.home')

        let posts = await Post
            .query()
            .where({ is_draft: false })
            .with('author')
            .with('tags')
            .whereHas('tags', builder =>
            {
                builder.where({ id: tag.id })
            })
            .orderBy('created_at', 'desc')
            .fetch()

        return view.render('Home',
        {
            info: `Vous consultez actuellement les posts avec le tag "${tag.name}".`,
            posts: posts.toJSON()
        })
    }
}

module.exports = GlobalController