import React, { useEffect, useState } from "react";
import FeatsRepository from "../../repositories/FeatsRepository";

export const FeatCreator = () => {
    const [feats, setFeats] = useState([])

    const syncFeats = () => {
        FeatsRepository.getAll().then(setFeats)
    }

    useEffect(()=> {
        syncFeats()
    },[])

    const CreateFeat = () => {
        const newFeat = {
            name: document.querySelector("[name=featName]").value,
            description: document.querySelector("[name=shortDescription]").value,
            strPR: parseInt(document.querySelector("[name=strPR]").value),
            dexPR: parseInt(document.querySelector("[name=dexPR]").value),
            conPR: parseInt(document.querySelector("[name=conPR]").value),
            intPR: parseInt(document.querySelector("[name=intPR]").value),
            wisPR: parseInt(document.querySelector("[name=wisPR]").value),
            chaPR: parseInt(document.querySelector("[name=chaPR]").value),
            featPR1: parseInt(document.querySelector("[name=featPR1]").value),
            featPR2: parseInt(document.querySelector("[name=featPR2]").value),
            featPR3: parseInt(document.querySelector("[name=featPR3]").value),
            featPR4: parseInt(document.querySelector("[name=featPR4]").value),
            fortPR: parseInt(document.querySelector("[name=fortPR]").value),
            reflPR: parseInt(document.querySelector("[name=reflPR]").value),
            willPR: parseInt(document.querySelector("[name=willPR]").value),
            babPR: parseInt(document.querySelector("[name=babPR]").value),
        }
        FeatsRepository.addFeat(newFeat).then(syncFeats)
    }

    return <div className="flexside">
        <div className="creation">
            <text>Feat Name:</text><input name="featName" />
            <text>Short Description:</text><textarea name="shortDescription" />
            <text>Strength Pre-req:</text><input name="strPR"/>
            <text>Dexterity Pre-req:</text><input name="dexPR"/>
            <text>Constitution Pre-req:</text><input name="conPR"/>
            <text>Intelligence Pre-req:</text><input name="intPR"/>
            <text>Wisdow Pre-req:</text><input name="wisPR"/>
            <text>Charisma Pre-req:</text><input name="chaPR"/>
            <text>Feat 1 Pre-Req:</text><input name="featPR1"/>
            <text>Feat 2 Pre-Req:</text><input name="featPR2"/>
            <text>Feat 3 Pre-Req:</text><input name="featPR3"/>
            <text>Feat 4 Pre-Req:</text><input name="featPR4"/>
            <text>Fort Pre-Req:</text><input name="fortPR"/>
            <text>Ref Pre-Req:</text><input name="reflPR"/>
            <text>Will Pre-Req:</text><input name="willPR"/>
            <text>BAB Pre-Req:</text><input name="babPR"/>
            <button type="submit"
            className="btn btn-primary"
            onClick={CreateFeat}> Create Feat </button>
        </div>
        <div className="listing">
            {feats.map(feat=> {
                return <>
                    <div>{`${feat.id}:${feat.name}`}</div>
                </>
            })}
        </div>
    </div>
}