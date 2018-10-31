'use strict'

const Model = use('Model')

class Post extends Model {
  getCreatedAt (created_at) {
    return created_at.format('DD/MM/YYYY à hh:mm:ss')
  }

  author () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
