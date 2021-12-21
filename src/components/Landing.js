import React from "react";
import { Route } from "react-router-dom";

export const Landing = () => {
    return <>
        <Route exact path="/:characterId(/d+)" >
            <br />
            <br />
            <br />
            Just a placeholder for whatever landing page I decide to implement
        </Route>
    </>
}