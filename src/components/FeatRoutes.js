import React from "react"
import { Route } from "react-router-dom"
import { Feats } from "./feats/Feats"

export const FeatRoutes = () => {
    return <>
        <Route exact path="/:characterId(\d+)/feats">
            <h1>you found the hidden text! zomg</h1>
            <Feats />
        </Route>
    </>
}