import React from "react"
import { Route } from "react-router-dom"
import { Skills } from "./skills/Skills"

export const SkillRoutes = () => {
    return <>
        <Route exact path="/:characterId(\d+)/skills">
            <h1>you found the hidden text! zomg</h1>
            <Skills />
        </Route>
    </>
}