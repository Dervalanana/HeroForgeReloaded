import React from "react"
import { Route } from "react-router-dom"
import { Levels } from "./levels/Levels"

export const LevelRoutes = () => {
    return <>
        <Route exact path="/:characterId(\d+)/levels">
            <h1>you found the hidden text! zomg</h1>
            <Levels />
        </Route>
    </>
}