'use strict'

const User = use('App/Models/User')

class UserController
{
    async login({ request, response, auth, view })
    {
        if (request.method() !== 'POST')
            return view.render("Login")
        
        const { email, password } = request.all()
        try
        {
            await auth.attempt(email, password)
        }
        catch (err)
        {
            console.error(err)
            return view.render("Login", { error: `Erreur dans le nom d'utilisateur ou le mot de passe` })
        }

        return response.redirect('/')
    }

    async signIn({ request, response, auth, view, session })
    {
        if (request.method() !== 'POST')
            return view.render('SignIn')

        const { username, email, password, password2 } = request.all()
        if (password !== password2)
        {
            session
                .withErrors([{ field: 'password2', message: 'Doit-être égal au premier!' }])
                .flashExcept(['password', 'password2', 'csrf_token'])
        }

        const user = new User()
        try
        {
            user.username = username
            user.email = email
            user.password = password
            await user.save()
        }
        catch (err)
        {
            console.error(err)
            return view.render('SignIn', { error: `Érreur lors de la création de l'utilisateur` })
        }

        await auth.login(user)
        return response.redirect('/')
    }

    async profile({ auth })
    {
        return auth.user
    }

    async logout({ response, auth })
    {
        await auth.logout()
        return response.redirect('/')
    }
}

module.exports = UserController