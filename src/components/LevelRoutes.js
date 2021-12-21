import React from "react"
import { Route } from "react-router-dom"
import { ClassCreator } from "./levels/ClassGenerator"
import { ClassLevelEditor } from "./levels/ClassLevelEditos"
import { Levels } from "./levels/Levels"

export const LevelRoutes = () => {
    return <>
        <Route exact path="/:characterId(\d+)/levels">
            <h1>you found the hidden text! zomg</h1>
            <Levels />
        </Route>
        <Route exact path="/createClassLevels">
            <ClassCreator />
        </Route>
        <Route exact path="/editClassLevels">
            <ClassLevelEditor />
        </Route>
    </>
}