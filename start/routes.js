'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const User = use('App/Models/User')

Route.get('/', 'GlobalController.home')

Route.route('sign-in', 'UserController.signIn', ['GET', 'POST'])
Route.route('login', 'UserController.login', ['GET', 'POST'])
Route.get('logout', 'UserController.logout').middleware('auth')
Route.get('profile', 'UserController.profile').middleware('auth')

Route.group(() => {
  Route.get('/', 'AdminController.home')
  
  Route.get('posts', 'AdminController.posts')
  Route.get('posts/new', 'AdminController.postNew')
  Route.get('posts/edit/:id', 'AdminController.postEdit')
  Route.post('posts/edit', 'AdminController.postSave')

  Route.get('users', 'AdminController.users')
})
.prefix('admin')
.middleware(['auth', 'isAdmin'])