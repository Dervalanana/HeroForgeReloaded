import React, { useEffect, useState } from "react";
import "./DefensiveSpecs.css"

export const DefensiveSpecs = ({ character }) => {
    const [HP, setHP] = useState(0)
    const [AC, setAC] = useState(0)
    const calculateModifier = (ability) => {
        const abilityModifier = Math.floor((ability - 10) / 2)
        return (abilityModifier < 0 ? abilityModifier : `+${abilityModifier}`)
    }
    const calcHP = () => {
        let count = 0
        character.levels?.forEach(level => count += level.HDRoll)
        count += calculateModifier(character.con) * character.levels?.length
        return count
    }
    useEffect(() => {
        setHP(calcHP())
    }, [character])

    // const calculateModifier = (ability) => {
    //     const abilityModifier = Math.floor((ability - 10) / 2)
    //     return (abilityModifier < 0 ? abilityModifier : `+${abilityModifier}`)
    // }
    // useEffect(() => {
    //     let copy = [...abilities]
    //     for (const stat in character) {
    //         if (abilities.find(ability => ability === stat)) {
    //             copy[copy.indexOf(stat)] = character[stat]
    //         }
    //     }
    //     setAbilities(copy)
    // }, [character])

    return <div className="DefensiveSpecs">
        <div className="TotalHP">{HP}</div>
        <div className="Movement">30 ft / x4</div>
        <div className="TotalAC">{`${10 + parseInt(calculateModifier(character.dex))}`}</div>
        <div className="ACBar">
            <div className="ACComponent" id="ArmorBonus">0</div>
            <div className="ACComponent" id="ShieldBonus">0</div>
            <div className="ACComponent" id="DexBonus">{parseInt(calculateModifier(character.dex))}</div>
            <div className="ACComponent" id="SizeBonus">0</div>
            <div className="ACComponent" id="NaturalBonus">0</div>
            <div className="ACComponent" id="DeflectionBonus">0</div>
            <div className="ACComponent" id="MiscBonus">0</div>
        </div>
        <div className="TouchAC">{`${10 + parseInt(calculateModifier(character.dex))}`}</div>
        <div className="FlatFootedAC">{`${10}`}</div>
        <div className="Initiative">{`${calculateModifier(character.dex)}`}</div>
        <div className="DexInit">{`${calculateModifier(character.dex)}`}</div>
        <div className="MiscInit">{`${0}`}</div>
    </div>
}