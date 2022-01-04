import React, { useEffect, useState } from "react";
import LevelRepository from "../../repositories/LevelRepository";
import "./ClassDependents.css"

export const ClassDependents = ({ character }) => {
    const [BAB, setBAB] = useState(0)
    const [Fort, setFort] = useState(0)
    const [Ref, setRef] = useState(0)
    const [Will, setWill] = useState(0)
    const [levels, setLevels] = useState([])
    const calculateModifier = (ability) => {
        const abilityModifier = Math.floor((ability - 10) / 2)
        return (abilityModifier < 0 ? abilityModifier : `+${abilityModifier}`)
    }
    const sumDetails = (stat) => {
        let count = 0
        levels?.forEach(
            level => count += level.classLevel?.[stat]
        )
        return count
    }
    useEffect(() => {
        LevelRepository.getComplicated(character.id).then(setLevels)
    }, [character])
    useEffect(() => {
        setBAB(sumDetails("BAB"))
        setFort(sumDetails("Fort"))
        setRef(sumDetails("Ref"))
        setWill(sumDetails("Will"))
    }, [levels])

    return <div className="ClassDependents">
        <div className="BAB">{`+${BAB}`}</div>
        <div className="FortTotal">{`${Fort + parseInt(calculateModifier(character.con))}`}</div>
        <div className="FortBase">{Fort}</div>
        <div className="FortAbility">{`${parseInt(calculateModifier(character.con))}`}</div>
        <div className="FortMagic">0</div>
        <div className="FortMisc">0</div>
        <div className="RefTotal">{Ref + parseInt(calculateModifier(character.dex))}</div>
        <div className="RefBase">{Ref}</div>
        <div className="RefAbility">{`${parseInt(calculateModifier(character.dex))}`}</div>
        <div className="RefMagic">0</div>
        <div className="RefMisc">0</div>
        <div className="WillTotal">{Will + parseInt(calculateModifier(character.wis))}</div>
        <div className="WillBase">{Will}</div>
        <div className="WillAbility">{`${parseInt(calculateModifier(character.wis))}`}</div>
        <div className="WillMagic">0</div>
        <div className="WillMisc">0</div>
        <div className="GrappleTotal">{BAB+parseInt(calculateModifier(character.str))}</div>
        <div className="GrappleBase">{BAB}</div>
        <div className="GrappleAbility">{parseInt(calculateModifier(character.str))}</div>
        <div className="GrappleSize">0  </div>
        <div className="GrappleMisc">0</div>
    </div>
}