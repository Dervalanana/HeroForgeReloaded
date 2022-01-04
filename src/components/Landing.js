import React from "react";
import { Route } from "react-router-dom";

export const Landing = () => {
    return <>
        <Route exact path="/:characterId(/d+)" >
            <br />
            <br />
            <br />
            <img src="https://sites.google.com/site/heroforgeanew/_/rsrc/1414743045374/config/customLogo.gif?revision=6" alt="HFR"/>
        </Route>
        <Route exact path="/" >
            <br />
            <br />
            <br />
            <img src="https://sites.google.com/site/heroforgeanew/_/rsrc/1414743045374/config/customLogo.gif?revision=6" alt="HFR"/>
        </Route>
    </>
}