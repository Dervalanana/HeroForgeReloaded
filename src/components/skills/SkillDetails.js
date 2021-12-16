import React, { useEffect, useState, useRef } from "react";

export const SkillDetails = ({skill, characterSkills, levels}) => {
    const [characterSkillss, setCharacterSkillss] = useState(characterSkills)
    const [ranks, setRanks] = useState(0)
    const [rankFlag, setRankFlag] = useState(false)
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
    },[levels])

    return <>
        <div className="flexside">
            <div className="detailColumn1">{skill.name}</div>
            <div className="detailColumn2">Total</div>
            <div className="detailColumn2">{skill.attribute}</div>
            <div className="detailColumn2">{ranks}</div>
            <div className="detailColumn2">{rankFlag?levels.length+3:(levels.length+3)/2}</div>
        </div>
    </>

}