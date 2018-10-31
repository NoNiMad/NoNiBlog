'use strict'
const User = use('App/Models/User')
const Post = use('App/Models/Post')

class AdminController {
  async home ({ request, response, auth, session, view }) {
    return view.render('Admin/Admin')
  }

  async posts ({ view }) {
    let posts = await Post.query().with('author').orderBy('created_at', 'desc').fetch()
    return view.render('Admin/PostList', { posts: posts.toJSON() })
  }

  async postNew ({ view }) {
    return view.render('Admin/PostEdit')
  }

  async postEdit ({ params, view }) {
    const post = await Post.find(params.id)
    return view.render('Admin/PostEdit', { post: post })
  }

  async postSave ({ request, response, auth, view }) {
    const { title, content } = request.all()
    try {
      const post = new Post()
      post.author = auth.user.id
      post.title = title
      post.slug = title.toLowerCase().replace(" ", "-").replace(/[^a-z0-9-]/g, "")
      post.content = content

      await post.save()
    } catch(err) {
      return view.render('Admin/PostEdit', { error: `Erreur d'insertion` })
    }

    return response.redirect('/admin/posts')
  }

  async users ({ request, response, view }) {
    let users = await User.query().fetch()
    return view.render('Admin/UserList', { users: users.toJSON() })
  }
}

module.exports = AdminController
