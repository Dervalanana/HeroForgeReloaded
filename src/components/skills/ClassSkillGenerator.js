import React, { useState, useEffect } from "react";
import SkillsRepository from "../../repositories/SkillsRepository";

export const ClassSkillGenerator = () => {
    const[skills, setSkills] = useState([])
    useEffect(()=>{SkillsRepository.getAll().then(setSkills)},[])
    const createClassSkills = () => {
        skills.forEach(skill=> {
            const classSkill = {
                classId: (parseInt(document.querySelector(`[name=classId]`).value)),
                skillId: skill.id,
                classSkillProf: (document.querySelector(`[name=skill--${skill.id}]`).checked),
            }
            SkillsRepository.addClassSkills(classSkill)
        })
    }


    return <>
        <h1>1</h1>
        <h1>1</h1>
        <input name="classId" />
        {skills.map(skill=>{
            return <div>
                {skill.name}<input name={`skill--${skill.id}`} type="checkbox"/>
            </div>
        })}
        <button onClick={createClassSkills}>Submit</button>
    </>
}