import React from "react"
import { Redirect, Route } from "react-router-dom"
import { Character } from "./characters/Character"

export const CharacterRoutes = () => {
    return <>
        <Route exact path="/:characterId(\d+)/character">
            <h1>you found the hidden text! zomg</h1>
            <Character />
        </Route>
        <Route path="/undefined">
            {/* makes sure that if you don't have a character selected, it kicks you back to the character page */}
            <Redirect to="/character" />
        </Route>
        <Route path="/character">
            <h1>you found the hidden text! zomg</h1>
            <Character />
        </Route>

    </>
}