import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LevelRepository from "../../repositories/LevelRepository";
import "./CharacterSelect.css"
import { FeatDetails } from "./FeatDetails";
import { FeatColumn } from "./FeatColumn";

export const Feats = () => {
    const[levels, setLevels] = useState([])
    const[feats, setFeats] = useState([])
    const {characterId} = useParams()
    const syncLevels = () => {
        LevelRepository.getComplicated(parseInt(characterId)).then(setLevels)
    }
    useEffect(()=>{
        syncLevels()
        LevelRepository.getFeats().then(setFeats)
    },[])


    return(
        <>
            <article>
                <h1>Feats</h1>
                <section className="flexside">
                    <section className="flexdown">
                        <h3>Acquisition</h3>
                        <div className="flexside">
                            <div className="detailColumn1">Feat Name</div>
                            <div className="detailColumn1">Pre-requisites</div>
                            <div className="detailColumn1">Short Description</div>
                        </div>
                        {feats.map(feat => <FeatDetails feat={feat} feats={feats}/>)}
                    </section>
                    <section className="flexsidescroll">
                        {levels.map(level => <FeatColumn feats={feats} level={level} updater={syncLevels}/>)}                        
                    </section>

                </section>
            </article>
        </>
    )
}