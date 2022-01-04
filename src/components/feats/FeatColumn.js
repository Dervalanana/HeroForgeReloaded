import React, { useEffect, useState } from "react";
import CharacterRepository from "../../repositories/CharacterRepository";
import LevelRepository from "../../repositories/LevelRepository";



export const FeatColumn = ({ level, feats, updater }) => {
    const [column1, setColumn1] = useState([])
    const [column2, setColumn2] = useState([])
    const levelClassPair = () => {
        if (level.featAdd) {
            setColumn1([<div className="sidewaysText">Level {level.characterLevel}</div>,<div className="detailColumn3"> </div>,
            feats.map(feat => {
                return <div className="detailColumn3"> 
                    <input name={`level${level.characterLevel}`} checked={feat.id === level.featId} type="radio" onChange={evt => updateLevelFeat(evt, feat.id)} />
                </div>
            }
            )])
        }
        if (level.classLevel?.featAdd) {
            setColumn2([<div className="sidewaysText">{level.class.name} {level.classLevel.level}</div>,<div className="detailColumn3"> </div>,
                feats.map(feat => {
                return <div className="detailColumn3">
                    <input name={`level${level.class.name}${level.classLevel.level}`} checked={feat.id === level.classfeatId} type="radio" onChange={evt => updateClassLevelFeat(evt, feat.id)} />
                </div>
            })])
        }
    }
    const updateLevelFeat = (evt, id) => {
        if (evt.target.checked) {
            LevelRepository.getSingle(level.id).then(lev => {
                lev.featId = id
                LevelRepository.updateLevel(lev).then(updater)
            })
        }
    }
    const updateClassLevelFeat = (evt, id) => {
        if (evt.target.checked) {
            LevelRepository.getSingle(level.id).then(lev => {
                lev.classfeatId = id
                LevelRepository.updateLevel(lev).then(updater)
            })
        }
    }
    useEffect(() => {
        levelClassPair()
    }, [level,feats])
    return <>
        <div className="flexside">
            <div className="flexdown">
                {column1}
            </div>
            <div className="flexdown">
                {column2}
            </div>
        </div>
    </>
}