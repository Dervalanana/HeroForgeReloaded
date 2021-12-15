import react, { useEffect, useState } from "react";
import CharacterRepository from "../../repositories/CharacterRepository";

export const StatRow = ({stat, chara, trackChar, race}) => {
    const [shortStat, setShortStat] = useState(stat?.slice(0, 3))
    const [racialMod, setRacialMod] = useState("+0")
    const [total, setTotal] = useState(0)
    const [totalStr, setTotalStr] = useState("")
    const changeStats = (evt) => {
        const copy = { ...chara }
        copy[evt.target.name] = parseInt(evt.target.value)
        CharacterRepository.updateCharacter(copy).then(trackChar)
    }
    useEffect(()=>{
        //if the race changes for this stat, in the racial bonus slot, display +2 if it matches the bonus, -2 if the matches the penalty, or nothing if neither applies
        shortStat===race?.racialBonus ? setRacialMod("+2") :shortStat===race?.racialPenalty ? setRacialMod("-2"): setRacialMod("+0")
        shortStat===race?.racialBonus ? setTotal(chara[shortStat]+2) :shortStat===race?.racialPenalty ? setTotal(chara[shortStat]-2): setTotal(chara[shortStat]+0)
    },[race, chara])
    useEffect(()=>{
        setTotalStr(`${total} ( ${total>10?"+":"-"} ${Math.abs(Math.floor((total-10)/2))} )`) //and builds it into a string
    },[total])
    return <>
        <div className="flexside">
            <div className="statgridColumn1">{stat}</div>
            <input className="statgridColumn2"
                maxLength="2"
                name={shortStat}
                defaultValue={chara[shortStat]}
                onBlur={changeStats} />
            <section className="statgridColumn3">{racialMod}</section>
            <section className="statgridColumn4">{totalStr}</section>
        </div>
    </>
}