"use strict"

const Letter = use("App/Models/Letter")

class LetterController
{
    async read({ params, request, response, view })
    {
        const { c } = request.get()

        const query = Letter
            .query()
            .with("author")
            .where("slug", params.slug)
        
        if (c !== undefined)
            query.andWhere("code", c)
        else
            query.whereNull("code", null)
        
        const letter = await query.first()
        if (letter == null)
            return response.route("GlobalController.home")

        let viewToRender = "Letters/Read"

        // Not yet available
        if (letter.available_start !== null && Date.now() < letter.available_start)
            viewToRender = "Letters/Countdown"
        // Expired
        else if (letter.available_end !== null && Date.now() > letter.available_end)
            viewToRender = "Letters/Expired"

        return view.render(viewToRender, { letter: letter.toJSON() })
    }
}

module.exports = LetterController