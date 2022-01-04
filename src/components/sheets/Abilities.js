import React, { useEffect, useState } from "react";
import "./Abilities.css"

export const AbilityGrid = ({ character }) => {
    const [abilities, setAbilities] = useState(["str", "dex", "con", "int", "wis", "cha"])
    const calculateModifier = (ability) => {
        const abilityModifier = Math.floor((ability - 10) / 2)
        return (abilityModifier < 0 ? abilityModifier : `+${abilityModifier}`)
    }
    useEffect(() => {
        let copy = [...abilities]
        for (const stat in character) {
            if (abilities.find(ability => ability === stat)) {
                copy[copy.indexOf(stat)] = character[stat]
            }
        }
        setAbilities(copy)
    }, [character])

    return <div className="AbilityGrid">
        {abilities.map(ability => {
            return <div className="AbilityRow">
                <div className="Ability">{ability}</div>
                <div className="AbilityMod">{calculateModifier(ability)}</div>
            </div>
        })}
    </div>
}