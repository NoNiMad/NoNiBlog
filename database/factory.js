'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Hash = use('Hash')
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker) =>
{
    return {
        username: faker.username(),
        email: faker.email(),
        password: await Hash.make(faker.password())
    }
})

Factory.blueprint('App/Models/Post', async (faker) =>
{
    let title = faker.sentence({ words: 8 })
    return {
        author: faker.integer({ min: 1, max: 5 }),
        title: title,
        slug: title.replace(' ', '-'),
        content: faker.paragraph()
    }
})