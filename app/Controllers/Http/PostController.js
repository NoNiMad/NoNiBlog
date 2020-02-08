'use strict'
const Database = use('Database')
const Post = use('App/Models/Post')
const Tag = use('App/Models/Tag')

class PostController {
    async getTagsWithSelected(postId)
    {
        return await Tag
            .query()
            .select('id', 'name', Database.raw('IF(post_id > 0, TRUE, FALSE) as is_selected'))
            .leftJoin('posts_tags', function () {
                this
                  .on('tags.id', 'posts_tags.tag_id')
                  .andOn('posts_tags.post_id', postId)
              })
            .fetch()
    }

    async list ({ view }) {
        let posts = await Post.query().with('author').with('tags').orderBy('created_at', 'desc').fetch()
        return view.render('Admin/Posts/PostList', { posts: posts.toJSON() })
    }

    async create ({ view }) {
        const tags = await Tag.all()
        const newPost = new Post()
        newPost.id = -1
        newPost.title = ""
        newPost.content = ""
        newPost.is_draft = true
        return view.render('Admin/Posts/PostEdit', { post: newPost, tags: tags.toJSON() })
    }

    async edit ({ params, view }) {
        const post = await Post.find(params.id)
        const tags = await this.getTagsWithSelected(post.id)

        return view.render('Admin/Posts/PostEdit', { post: post, tags: tags.toJSON() })
    }

    async save ({ request, response, auth, view }) {
        const { id, title, content, is_draft, tags } = request.all()

        let post
        try {
            if (id == -1) {
                post = new Post()
                post.user_id = auth.user.id
            } else {
                post = await Post.find(id)
            }
            post.title = title
            post.content = content
            post.is_draft = is_draft === "on"

            await post.tags().detach()
            await post.tags().attach(tags)
            await post.save()
        } catch(err) {
            console.error(err)
            const tags = await this.getTagsWithSelected(post.id)
            return view.render('Admin/Posts/PostEdit', { error: `Erreur d'insertion`, post: post, tags: tags.toJSON() })
        }

        return response.redirect('/admin/posts')
    }

    async delete ({ params, response }) {
        const post = await Post.find(params.id)
        await post.delete()
        return response.redirect('/admin/posts')
    }
}

module.exports = PostController