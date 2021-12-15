import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import CharacterRepository from "../../repositories/CharacterRepository";
import { CharacterSelectDelete } from "./CharacterSelectDelete";
import "./CharacterSelect.css"
import { CreateCharacter } from "./CreateCharacter";

export const Character = () => {
    const [characters, setCharacters] = useState([])
    const { getCurrentUser } = useSimpleAuth()
    const history = useHistory()
    const { characterId } = useParams() //this is going to be a string by default
    const [currentCharacter, setCharacter] = useState()

    useEffect(() => {
        CharacterRepository.getAll(getCurrentUser().id).then(setCharacters) //get all characters you're allowed to see
    }, [])
    useEffect(() => {
        characterId && CharacterRepository.getComplicated(characterId).then(setCharacter) //only set if you have an Id
    }, [])
    const changeCharacter = () => {
        document.querySelector(`[name=characterSelect]`).value? //throws a big error if it can't find anything
        history.push(`/${document.querySelector(`[name=characterSelect]`).value}/character`):
        history.push("/character")
    }
    const deleteCharacter = () => {
        CharacterRepository.delete(document.querySelector(`[name=characterDelete]`).value)
        document.querySelector(`[name=characterDelete]`).value !== characterId? //throws a big error if it can't find anything
        history.push(`/${document.querySelector(`[name=characterDelete]`).value}/character`):
        history.push("/character")
    }


    return (
        <>
            <article>
                <h1>Character Selection</h1>
                {currentCharacter ? <h2>Currently Selected character is {currentCharacter.name}</h2> : <h2>you gotta select a character if you want to go anywhere other than here or the landing page</h2>}
                <section className="flexdown">
                    <section className="flexside">
                        <CharacterSelectDelete characters={characters} />
                        <button type="submit"
                            onClick={changeCharacter}
                            className="btn btn-primary"> Submit </button>
                        <CharacterSelectDelete characters={characters} deleter />
                        <button type="submit"
                            onClick={deleteCharacter}
                            className="btn btn-primary"> Submit </button>
                    </section>
                    <CreateCharacter refresh={setCharacters}/>

                </section>
                {JSON.stringify(currentCharacter, null, 4)}
            </article>
        </>
    )
}