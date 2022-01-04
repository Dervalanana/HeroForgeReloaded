import React, { useEffect, useState } from "react"
import LevelRepository from "../../repositories/LevelRepository"
import SkillsRepository from "../../repositories/SkillsRepository"
import "./SkillTable.css"

export const SkillTable = ({character}) => {
    const [levels, setLevels] = useState([])
    const [skills, setSkills] = useState([])

    useEffect(()=>{
        LevelRepository.getComplicated(character.id).then(setLevels)
        SkillsRepository.getAll().then(setSkills)
    },[character])

    const calculateModifier = (ability) => {
        const abilityModifier = Math.floor((ability - 10) / 2)
        return (abilityModifier < 0 ? abilityModifier : `+${abilityModifier}`)
    }

    const calculateRanks = (skill) => {
        let count = 0
        levels.forEach(level => {
            (level.class.classSkills.find(classSkill => classSkill.skillId === skill).classSkillProf) ? 
                count += level.levelSkills.find(levelSkill => levelSkill.skillId === skill).points:
                count += (level.levelSkills.find(levelSkill => levelSkill.skillId === skill).points)/2
        })
        return count
    }
    const maxRankChecker = (skill) => {
        let tracker = false
        levels.forEach(level =>{
            if (level.class.classSkills.find(classSkill => classSkill.skillId === skill).classSkillProf) tracker=true
        })
        return tracker
    }

    return <div className="SkillTable">
        {skills.map(skill => {
            return <div className="flexside">
                <div className="classSkillCheck">{maxRankChecker(skill.id)?"x":" "}</div>
                <div className="SkillTotal">{`${parseInt(calculateModifier(character[skill.attribute])) + calculateRanks(skill.id)}`}</div>
                <div className="SkillAbility">{calculateModifier(character[skill.attribute])}</div>
                <div className="SkillRanks">{calculateRanks(skill.id)}</div>
                <div className="SkillMisc">0</div>
            </div>
        })}
    </div>
}