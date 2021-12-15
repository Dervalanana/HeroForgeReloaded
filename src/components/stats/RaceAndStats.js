import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterRepository from "../../repositories/CharacterRepository";
import { DiceRoller } from "../rollers/DiceRoller";
import "./CharacterSelect.css"
import { RaceSelect } from "./RaceSelect";
import { StatBlock } from "./StatBlock";

export const RaceAndStats = () => {
    const[character, setChara] = useState({})
    const {characterId} = useParams()
    useEffect(() => {
        CharacterRepository.get(characterId).then(setChara)
    },[])
    const trackChar = () => CharacterRepository.getWithRace(characterId).then(setChara)

    return(
        <>
            <article>
                <h1>Race and Stats</h1>
                <section className="flexdown">
                    <section className="flexside">
                        <section><StatBlock chara={character} trackChar={trackChar}/> </section>  
                        <section><DiceRoller /></section>
                    </section>
                    <RaceSelect character={character} trackChar={trackChar}/>   
                </section>    
            </article>
        </>
    )
}