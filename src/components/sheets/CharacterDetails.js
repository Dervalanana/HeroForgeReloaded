import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import ClassRepository from "../../repositories/ClassRepository";
import LevelRepository from "../../repositories/LevelRepository";
import "./CharacterDetails.css"

export const CharacterDetails = ({ character }) => {
    const [classTracker, setClassTracker] = useState([])
    const [levels, setLevels] = useState([])
    const [levelReadout, setLevelReadout] = useState("")
    const [levelWatcher, setLevelWatcher] = useState([])
    
    useEffect(() => {
        setClassTracker(ClassRepository.classFinder(character.levels))
        setLevelWatcher(character.levels)
        LevelRepository.getComplicated(character.id).then(setLevels)
    },[character])
    useEffect(() => {
        setLevelReadout(convertClasses().join("||"))
    },[levels])
    
    const convertClasses = () => {
        const levellingDummy = []
        classTracker.forEach(classId => levellingDummy.push(levels.filter(level => level.classId===classId)))
        return levellingDummy?.map(classArray => `${classArray[0]?.class?.name} ${classArray.length}`)
    }

    return (<div className="CharacterDetails">
        <div className="CharacterName">{character.name}</div>
        <div className="PlayerName">{character.user?.name}</div>
        <div className="Classes">{levelReadout}</div>
        <div className="Race">{character.race?.name}</div>
    </div>)
}