import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LevelRepository from "../../repositories/LevelRepository";
import "./CharacterSelect.css"
import { LevelRow } from "./LevelRow";

export const Levels = () => {
    const [levelList, setLevelList] = useState([])
    const {characterId} = useParams()

    useEffect(() => { LevelRepository.getAll(parseInt(characterId)).then(setLevelList) }, [])
    const syncLevels = () => {
        LevelRepository.getAll(parseInt(characterId)).then(setLevelList)
    }

    return (
        <>
            <article>
                <h1>Levels</h1>
                <section className="flexside">
                    <section className="flexdown">
                        <div className="flexside">
                            <div className="levelgridColumn1">Level:</div>
                            <div className="levelgridColumn2">Class:</div>
                            <div className="levelgridColumn3">HD</div>
                            <div className="levelgridColumn4">Skill Points</div>
                            <div className="levelgridColumn5">HP Total</div>
                        </div>
                        {levelList.map(level =>{
                            return <LevelRow level={level} updater={syncLevels} characterId={parseInt(characterId)} last={levelList.length}/>
                        })}
                    </section>
                    <h3>special</h3>
                </section>
            </article>
        </>
    )
}