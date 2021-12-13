import React from "react"
import { Route } from "react-router-dom"
import { RaceAndStats } from "./stats/RaceAndStats"

export const StatRoutes = () => {
    return <>
        <Route exact path="/:characterId(\d+)/raceandstats">
            <h1>you found the hidden text! zomg</h1>
            <RaceAndStats />
        </Route>
    </>
}