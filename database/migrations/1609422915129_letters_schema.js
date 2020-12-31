"use strict"

/** @type {import("@adonisjs/lucid/src/Schema")} */
const Schema = use("Schema")

class LettersSchema extends Schema
{
    up()
    {
        this.create("letters", (table) =>
        {
            table.increments()
            table.integer("user_id").unsigned().references("id").inTable("users")
            table.string("title", 255).notNullable()
            table.string("recipient", 255).notNullable()
            table.string("slug", 255).notNullable().unique()
            table.text("content").notNullable()
            table.datetime("available_start")
            table.datetime("available_end")
            table.string("code", 32)
            table.timestamps()
        })
    }

    down()
    {
        this.drop("letters")
    }
}

module.exports = LettersSchema