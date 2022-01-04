import React, {useState, useEffect} from "react";
import FeatsRepository from "../../repositories/FeatsRepository";
import LevelRepository from "../../repositories/LevelRepository";

export const SpecialAbilities = ({character}) => {
    const [levels, setLevels] = useState([])
    const [featsList, setFeatsList] = useState([])
    const [feats, setFeats] = useState([])
    const [abilities, setAbilities] = useState([])
    const buildTracker = () => {
        let abilityTracker = []
        let featTracker = []
        levels.forEach(level => {
            if(level.classLevel.features !== "") {abilityTracker.push(level.classLevel.features)}
            if(level.featAdd) {featTracker.push(featsList.find(feat => feat.id === level.featId))}
            if(level.classLevel?.featAdd || level.classfeatAdd) {featTracker.push(featsList.find(feat => feat.id === level.classfeatId))}
        })
        setFeats(featTracker)
        setAbilities(abilityTracker)
    }

    useEffect(async()=>{
        await LevelRepository.getComplicated(character.id).then(setLevels)
        FeatsRepository.getAll().then(setFeatsList)
    }, [character])

    useEffect(()=> {
        buildTracker()
    },[levels,featsList])


    return<>
        <div className="featsAndAbilities">
            {feats.map(feat => <div className="specialAbilityRow">{`${feat.name}: ${feat.description}`}</div>)}
            {abilities.map(feat => <div className="specialAbilityRow">{`${feat}`}</div>)}
        </div>
    </>
}