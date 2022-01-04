import React from "react"
import { Route } from "react-router-dom"
import { FeatCreator } from "./feats/FeatCreator"
import { Feats } from "./feats/Feats"

export const FeatRoutes = () => {
    return <>
        <Route exact path="/:characterId(\d+)/feats">
            <h1>you found the hidden text! zomg</h1>
            <Feats />
        </Route>
        <Route exact path="/featCreator">
            <h1>you found the hidden text! zomg</h1>
            <FeatCreator />
        </Route>
    </>
}