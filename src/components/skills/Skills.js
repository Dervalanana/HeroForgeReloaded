import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SkillDetails } from "./SkillDetails"
import SkillsRepository from "../../repositories/SkillsRepository";
import LevelRepository from "../../repositories/LevelRepository";
import "./CharacterSelect.css"
import { SkillColumn } from "./SkillColumn";

export const Skills = () => {
    const [skills, setSkills] = useState([])
    const { characterId } = useParams()
    const [levels, setLevels] = useState([])
    const [classSkills, setClassSkills] = useState([])
    const [characterSkills, setCharacterSkills] = useState([])

    const syncLevels = () => {
        LevelRepository.getComplicated(parseInt(characterId)).then(setLevels)
    }
    const syncClassSkills = () => {
        setClassSkills(
            levels.map(level => level.class.classSkills)
        )
    }
    const syncCharacterSkills = () => {
        SkillsRepository.getCharacterSkills(setCharacterSkills)
    }

    useEffect(() => {
        SkillsRepository.getAll().then(setSkills)
        syncLevels()
        syncCharacterSkills()
    }, [])
    useEffect(()=> {
        syncClassSkills()
    },[levels])

    return (
        <>
            <article>
                <h1>Skills</h1>
                <section className="flexside">
                    <section className="flexdown">
                        <h3>Level</h3>
                        <h3>Points</h3>
                        <div className="flexside">
                            <div className="detailColumn1">Skill name</div>
                            <div className="detailColumn2">Total</div>
                            <div className="detailColumn3">Stat</div>
                            <div className="detailColumn4">Ranks</div>
                            <div className="detailColumn5">Max Ranks</div>
                        </div>
                        <div className="flexdown">
                            {skills.map(skill => <SkillDetails skill={skill} characterSkills={characterSkills} levels={levels} />)}
                        </div>
                    </section>
                    <section className="flexsidescroll">
                        {levels.map(levell=> <SkillColumn level={levell} classSkills={classSkills[levell.characterLevel-1]} updater={syncLevels}/>)}
                    </section>
                </section>
            </article>
        </>
    )
}