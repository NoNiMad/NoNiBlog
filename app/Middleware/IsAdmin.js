'use strict'

class IsAdmin
{
    async handle({ response, auth }, next)
    {
        if (!auth.user.is_admin)
            return response.redirect('/', false, 403)

        await next()
    }
}

module.exports = IsAdmin