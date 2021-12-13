import React from "react"
import { Route } from "react-router-dom"
import { Sheets } from "./sheets/Sheets"

export const SheetRoutes = () => {
    return <>
        <Route exact path="/:characterId(\d+)/sheets">
            <h1>you found the hidden text! zomg</h1>
            <Sheets />
        </Route>
    </>
}