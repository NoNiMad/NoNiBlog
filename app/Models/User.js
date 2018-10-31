'use strict'

const Hash = use('Hash')
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    
    this.addHook('beforeCreate', async (userInstance) => {
      if (userInstance.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = User
