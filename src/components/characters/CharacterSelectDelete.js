import react, { useEffect, useState } from "react";


export const CharacterSelectDelete = ({ characters, deleter }) => {
    const [charList, setCharList] = useState()
    useEffect(() => { setCharList(characters) }, [characters])
    return <>
        <select defaultValue=""
            name={deleter? "characterDelete":"characterSelect"}
            className="form-control small"
        >
            <option value="">
                Select a character {deleter && "to delete"}
            </option>
            {
                characters.map(o => <option key={o.id} value={o.id}>{o.name}</option>)
            }
        </select>
    </>

}
