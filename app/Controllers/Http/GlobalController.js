'use strict'

const Post = use('App/Models/Post')

class GlobalController {
  async home({ request, view }) {
    let posts = await Post.query().where('is_draft', 'false').with('author').orderBy('created_at', 'desc').fetch()
    return view.render('Home', { posts: posts.toJSON() })
  }
}

module.exports = GlobalController