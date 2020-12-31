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
Route.get('/tag/:id', 'GlobalController.postsForTag')

Route.route('sign-in', 'UserController.signIn', ['GET', 'POST'])
Route.route('login', 'UserController.login', ['GET', 'POST'])
Route.get('logout', 'UserController.logout').middleware('auth')
Route.get('profile', 'UserController.profile').middleware('auth')

Route.group(() =>
    {
        Route.get('/', 'AdminController.home')

        Route.get('posts', 'PostController.list')
        Route.get('posts/create', 'PostController.create')
        Route.get('posts/edit/:id', 'PostController.edit')
        Route.post('posts/edit', 'PostController.save')
        Route.get('posts/delete/:id', 'PostController.delete')

        Route.get('tags', 'TagController.list')
        Route.get('tags/create', 'TagController.create')
        Route.get('tags/edit/:id', 'TagController.edit')
        Route.post('tags/edit', 'TagController.save')
        Route.get('tags/delete/:id', 'TagController.delete')

        Route.get('users', 'AdminController.users')
    })
    .prefix('admin')
    .middleware(['auth', 'isAdmin'])

Route.get("letter/:slug", "LettersController.read")