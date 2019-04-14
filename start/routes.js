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
  
  Route.get('posts', 'PostController.posts')
  Route.get('posts/new', 'PostController.postNew')
  Route.get('posts/edit/:id', 'PostController.postEdit').as('post.edit')
  Route.post('posts/edit', 'PostController.postSave')
  Route.get('posts/delete/:id', 'PostController.postDelete').as('post.delete')

  Route.get('users', 'AdminController.users')
})
.prefix('admin')
.middleware(['auth', 'isAdmin'])