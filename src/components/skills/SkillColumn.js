import React, { useEffect, useState } from "react";
import CharacterRepository from "../../repositories/CharacterRepository";
import SkillsRepository from "../../repositories/SkillsRepository";

export const SkillColumn = ({ level, classSkills, updater }) => {
    const [skillPointsMax, setSkillPointsMax] = useState(0)
    const [classsSkills, setClassSkills] = useState([])
    const [levelSkills, setLevelSkills] = useState([])
    const [spentPoints, setSpentPoints] = useState(0)

    useEffect(() => {
        CharacterRepository.get(level.characterId).then(res => setSkillPointsMax(
            Math.floor((res["int"] - 10) / 2) + level?.class?.skillPoints))
        setClassSkills(classSkills)
        setLevelSkills(level.levelSkills.sort((a,b)=> a.skillId - b.skillId))
        calcSpentPoints()
    }, [level])

    useEffect(()=> {
        updater()
    },[])

    const spendPoints = (evt,levelSkill) => {
        const copy = { ...levelSkill }
        copy.points = parseInt(evt.target.value)
        SkillsRepository.updateLevelSkill(copy).then(updater)
    }

    const calcSpentPoints = () => {
        let spent = 0
        levelSkills.forEach(levelSkill => {
            spent += parseInt(document.querySelector(`#classLevel--${level.characterLevel}--skill${levelSkill.skillId}`)?.value)
        })
        setSpentPoints(spent)
    }

    return <>
        <div className="flexdown">
            <h3>{level.characterLevel}</h3>
            <h3>{skillPointsMax - spentPoints}</h3>
            <div className="classSkillBlank"/>
            {levelSkills?.map(levelSkill =>
                <input id={`classLevel--${level.characterLevel}--skill${levelSkill.skillId}`}
                    defaultValue={levelSkill.points} 
                    onBlur={(evt)=>spendPoints(evt,levelSkill)} 
                    className={classsSkills&&classsSkills[levelSkill.skillId]?.classSkillProf?"classSkill":"crossClassSkill"}/>)}
        </div>
    </>
}