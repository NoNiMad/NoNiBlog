'use strict'
const User = use('App/Models/User')

class AdminController {
    async home ({ request, response, auth, session, view }) {
        return view.render('Admin/Admin')
    }

    async users ({ request, response, view }) {
        let users = await User.query().fetch()
        return view.render('Admin/UserList', { users: users.toJSON() })
    }
}

module.exports = AdminController
