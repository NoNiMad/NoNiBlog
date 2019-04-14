'use strict'
const User = use('App/Models/User')
const Post = use('App/Models/Post')

class PostController {
    async posts ({ view }) {
        let posts = await Post.query().with('author').orderBy('created_at', 'desc').fetch()
        return view.render('Admin/PostList', { posts: posts.toJSON() })
    }

    async postNew ({ view }) {
        const newPost = new Post()
        newPost.id = -1
        newPost.title = ""
        newPost.content = ""
        return view.render('Admin/PostEdit', { post: newPost })
    }

    async postEdit ({ params, view }) {
        const post = await Post.find(params.id)
        return view.render('Admin/PostEdit', { post: post })
    }

    async postSave ({ request, response, auth, view }) {
        const { id, title, content } = request.all()
        try {
            let post
            if (id == -1) {
                console.log("coucou")
                post = new Post()
                post.user_id = auth.user.id
            } else {
                post = await Post.find(id)
            }
            post.title = title
            post.content = content

            await post.save()
        } catch(err) {
            console.error(err)
            return view.render('Admin/PostEdit', { error: `Erreur d'insertion`, post: post })
        }

        return response.redirect('/admin/posts')
    }

    async postDelete ({ params, response }) {
        const post = await Post.find(params.id)
        await post.delete()
        return response.redirect('/admin/posts')
    }
}

module.exports = PostController