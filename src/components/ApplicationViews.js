import React from "react"
import { Route } from "react-router-dom"
import { CharacterRoutes } from "./CharacterRoutes"
import { FeatRoutes } from "./FeatRoutes"
import { Landing } from "./Landing"
import { LevelRoutes } from "./LevelRoutes"
import { SheetRoutes } from "./SheetRoutes"
import { SkillRoutes } from "./SkillRoutes"
import { StatRoutes } from "./StatRoutes"


export default () => {
    return (
        <>
            <Landing />
            <CharacterRoutes />
            <StatRoutes />
            <LevelRoutes />
            <SkillRoutes />
            <FeatRoutes />
            <SheetRoutes />
        </>
    )
}

