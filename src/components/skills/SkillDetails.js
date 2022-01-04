import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CharacterRepository from "../../repositories/CharacterRepository";

export const SkillDetails = ({skill, characterSkills, levels}) => {
    const [characterSkillss, setCharacterSkillss] = useState(characterSkills)
    const [ranks, setRanks] = useState(0)
    const [rankFlag, setRankFlag] = useState(false)
    const [character, setCharacter] = useState({})
    const {characterId} = useParams()
    const firstRef = useRef()
    const maxRanks = () => {
        levels.forEach((l,i) => {
            const identifier = document.querySelector(`#classLevel--${i+1}--skill${skill.id}`)
            if(identifier?.className==="classSkill") setRankFlag(true) 
        })
    }
    const totalRanks = () => {
        let total = 0
        levels.forEach((l,i) => {
            const identifier = document.querySelector(`#classLevel--${i+1}--skill${skill.id}`)
            identifier?.className==="crossClassSkill" ? total += parseInt(identifier?.value)/2 : total += parseInt(identifier?.value) 
        })
        setRanks(total)
    }
    useEffect(()=>{
        totalRanks()
        maxRanks()
        CharacterRepository.get(characterId).then(setCharacter)
    },[levels])

    return <>
        <div className="flexside">
            <div className="skillColumn1">{skill.name}</div>
            <div className="skillColumn2">Total: {ranks + Math.floor((character[skill.attribute]-10)/2)}</div>
            <div className="skillColumn2">{skill.attribute}</div>
            <div className="skillColumn2">{ranks}</div>
            <div className="skillColumn2">{rankFlag?levels.length+3:(levels.length+3)/2}</div>
        </div>
    </>

}