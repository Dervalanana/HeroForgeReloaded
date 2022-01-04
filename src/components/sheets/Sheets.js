import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterRepository from "../../repositories/CharacterRepository";
import { AbilityGrid } from "./Abilities";
import { CharacterDetails } from "./CharacterDetails";
import "./CharacterSheet.css"
import { ClassDependents } from "./ClassDependents";
import { DefensiveSpecs } from "./DefensiveSpecs";
import { SkillTable } from "./SkillTable";
import { SpecialAbilities } from "./SpecialAbilities";


export const Sheets = () => {
    const [character, setCharacter] = useState({})
    //const [characters, setCharacters] = useState([])
    const {characterId} = useParams()
    const complicateCharacter = (id) => characterId && CharacterRepository.getComplicated(id).then(setCharacter)

    useLayoutEffect(()=>{
        complicateCharacter(characterId)
    },[])



    return (
        <>
            <article>
                <h1>Character Sheets</h1>
                    <section className="sheet1Bg">
                        <CharacterDetails className="CharacterDetails" character={character} />
                        <AbilityGrid character={character} />
                        <DefensiveSpecs character={character} />
                        <ClassDependents character={character} />
                        <SkillTable character={character} />
                    </section>
                    <section className="sheet2Bg">
                        <SpecialAbilities character={character} />
                    </section>
            </article>
        </>
    )
}