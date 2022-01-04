import React, { useEffect, useState } from "react";
import ClassRepository from "../../repositories/ClassRepository";

export const ClassLevelEditor = () => {
    const [selectedClass, setSelectedClass] = useState(0)
    const [selectedLevel, setSelectedLevel] = useState(1)
    const [displayedDetails, setDisplayedDetails] = useState({})
    const [classes, setClasses] = useState([])
    const levels = []
    for (let i = 1; i < 21; i++) {
        levels.push(<option value={i}>Level {i}</option>)
    }

    useEffect(() => {
        ClassRepository.getClassLevel(selectedClass, selectedLevel).then(res => setDisplayedDetails(res[0]))
    }, [selectedClass, selectedLevel])

    useEffect(() => {
        document.querySelector("[name=featAdd]").checked = (displayedDetails.featAdd)
        document.querySelector("[name=levelFeatures]").value = (displayedDetails.features)
    }, [displayedDetails])

    useEffect(() => {
        ClassRepository.getClassLevel(0, 1).then(res => setDisplayedDetails(res[0])).then()
        ClassRepository.getAll().then(setClasses)
    }, [])

    const updateClassLevel = () => {
        const copy = { ...displayedDetails }
        copy.featAdd = document.querySelector("[name=featAdd]").checked
        copy.features = document.querySelector("[name=levelFeatures]").value
        ClassRepository.updateClassLevel(copy).then(setDisplayedDetails)
    }

    return <>
        <h1>-</h1>
        <h1>-</h1>
        <select name="selectedClass" onChange={evt => setSelectedClass(parseInt(evt.target.value))}>
            {classes.map(classs => {
                return <option value={classs.id}>{classs.name}</option>
            })}
        </select>
        <select name="selectedLevel" onChange={evt => setSelectedLevel(parseInt(evt.target.value))}>
            {levels}
        </select>
        <div>details</div>
        <textarea className="chungus" name="levelFeatures" />
        <div>Feat add <input type="checkbox" name="featAdd" /> </div>
        <button type="submit"
            className="btn btn-primary"
            onClick={updateClassLevel}> Update Level </button>
        <div>{displayedDetails.features}</div>
    </>
}