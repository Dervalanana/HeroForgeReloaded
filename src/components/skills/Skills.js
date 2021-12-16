import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SkillDetails } from "./SkillDetails"
import SkillsRepository from "../../repositories/SkillsRepository";
import LevelRepository from "../../repositories/LevelRepository";
import "./CharacterSelect.css"

export const Skills = () => {
    const [skills, setSkills] = useState([])
    const { characterId } = useParams()
    const [levels, setLevels] = useState([])



    useEffect(() => {
        SkillsRepository.getAll().then(setSkills)
        LevelRepository.getComplicated(characterId).then(setLevels)
    }, [])

    return (
        <>
            <article>
                <h1>Skills</h1>
                <h2>Currently Selected character is {"placeholder to call a reference to the current character. should be changed through filepath"}</h2>
                <section className="flexside">
                    <section className="flexdown">
                        <h3>Level <br /> Row</h3>
                        <h3>Available <br />skill <br />points</h3>
                        <div className="flexside">
                            <div className="detailColumn1">Skill name</div>
                            <div className="detailColumn2">Total</div>
                            <div className="detailColumn3">Stat</div>
                            <div className="detailColumn4">Ranks</div>
                            <div className="detailColumn5">Max Ranks</div>
                        </div>
                        <div className="flexdown">
                            {skills.map(skill => <SkillDetails skill={skill} />)}
                        </div>
                    </section>
                    <section className="flexsidescroll">
                        <div className="flexdown">
                            <h3>Level<br />#</h3>
                            <h3>Skill points <br />with <br />live updates</h3>
                            <h3>double space <br />for consistency</h3>
                            <h3>Column of skills. All 3 of these are going to be in an indiviudal element that will map through vertically, then that element will be mapped horizonally for multiple levels</h3>
                        </div>
                        <div className="flexdown">
                            <h3>Level<br />#</h3>
                            <h3>Skill points <br />with <br />live updates</h3>
                            <h3>double space <br />for consistency</h3>
                            <h3>Column of skills. All 3 of these are going to be in an indiviudal element that will map through vertically, then that element will be mapped horizonally for multiple levels</h3>
                        </div>
                        <div className="flexdown">
                            <h3>Level<br />#</h3>
                            <h3>Skill points <br />with <br />live updates</h3>
                            <h3>double space <br />for consistency</h3>
                            <h3>Column of skills. All 3 of these are going to be in an indiviudal element that will map through vertically, then that element will be mapped horizonally for multiple levels</h3>
                        </div>

                    </section>

                </section>
            </article>
        </>
    )
}