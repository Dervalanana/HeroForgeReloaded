import react, { useEffect, useState } from "react";
import CharacterRepository from "../../repositories/CharacterRepository";
import "./CharacterSelect.css";
import { StatRow } from "./StatRow";

export const StatBlock = ({ chara, trackChar }) => {
    const [race, setRace] = useState({})

    useEffect(() => {
        return CharacterRepository.getWithLevelAndRace(chara.id).then(res => setRace(res.race))
    }, [chara])

    return <>
        <div className="flexdown">
            <div className="flexside"><div className="statgridColumn1">Attribute</div><div className="statgridColumn2">Dice Value</div>
            <div className="statgridColumn3">Racial Modifier</div><div className="statgridColumn3">Total Attribute</div></div>
            <StatRow stat={"strength"} chara={chara} trackChar={trackChar} race={race}/>
            <StatRow stat={"dexterity"} chara={chara} trackChar={trackChar} race={race}/>
            <StatRow stat={"constitution"} chara={chara} trackChar={trackChar} race={race}/>
            <StatRow stat={"intelligence"} chara={chara} trackChar={trackChar} race={race}/>
            <StatRow stat={"wisdom"} chara={chara} trackChar={trackChar} race={race}/>
            <StatRow stat={"charisma"} chara={chara} trackChar={trackChar} race={race}/>
        </div>
    </>
}