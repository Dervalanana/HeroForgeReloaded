import react, { useLayoutEffect, useState } from "react";


export const CharacterSelect = ({ characters }) => {
    const [charList, setCharList] = useState()
    useLayoutEffect(() => { setCharList(characters) }, [characters])
    return <>
        <select defaultValue=""
            name="character"
            className="form-control small"
        >
            <option value="">
                Select a character
            </option>
            {
                characters.map(o => <option key={o.id} value={o.id}>{o.name}</option>)
            }
        </select>
    </>

}
