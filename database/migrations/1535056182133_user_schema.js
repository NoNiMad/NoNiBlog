'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.int('role').defaultTo(false).notNullable()
      table.int('group').defaultTo(false).notNullable()
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('role')
      table.dropColumn('group')
    })
  }
}

module.exports = UserSchema
