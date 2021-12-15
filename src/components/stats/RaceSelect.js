import react, { useEffect, useState } from "react";
import CharacterRepository from "../../repositories/CharacterRepository";


export const RaceSelect = ({character, trackChar}) => {
    const [raceList, setRaceList] = useState()
    useEffect(() => { CharacterRepository.getRace().then(setRaceList) }, [])
    const changeRace = (e) => {
        const copy = {...character}
        copy.raceId = parseInt(e.target.value)
        CharacterRepository.updateCharacter(copy).then(trackChar)
    }
    return <>
        <select defaultValue={character.raceId}
            name={"raceSelect"}
            className="form-control small"
            onChange={changeRace}
        >
            <option value="">
                Select a race
            </option>
            {
                raceList?.map(o => <option key={o.id} value={o.id} selected={o.id===character.raceId}>{o.name}</option>)
            }
        </select>
    </>

}