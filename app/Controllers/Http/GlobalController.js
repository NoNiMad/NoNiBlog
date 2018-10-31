'use strict'

const Post = use('App/Models/Post')

class GlobalController {
  async home({ request, view }) {
    let posts = await Post.query().with('author').orderBy('created_at', 'desc').fetch()
    return view.render('Home', { posts: posts.toJSON() })
  }
}

module.exports = GlobalController