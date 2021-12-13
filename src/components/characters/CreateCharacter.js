import react from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import CharacterRepository from "../../repositories/CharacterRepository";

export const CreateCharacter = ({refresh}) => {
    const { getCurrentUser } = useSimpleAuth()
    const postCharacter = () => {
        const newCharacter = {
            "xp": 0,
            "name": document.querySelector(`[name=characterName]`).value,
            "campaign": document.querySelector(`[name=campaignName]`).value,
            "str": 0,
            "dex": 0,
            "con": 0,
            "int": 0,
            "wis": 0,
            "cha": 0,
            "userId": getCurrentUser().id,
            "raceId": 1
        }
        CharacterRepository.addCharacter(newCharacter).then(
        CharacterRepository.getAll(getCurrentUser().id).then(refresh))
    }

    return <>
        <div>Create a new character</div>
        <div>
            Character Name:<input name="characterName"></input>
            Campaign Name:<input name="campaignName"></input>
            <button type="submit"
                className="btn btn-primary"
                onClick={postCharacter}> Submit </button>
        </div>

    </>
} 