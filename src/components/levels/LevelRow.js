import react, { useEffect, useState } from "react";
import CharacterRepository from "../../repositories/CharacterRepository";
import LevelRepository from "../../repositories/LevelRepository";


export const LevelRow = ({ level, updater, characterId, last }) => {
    const [classList, setClassList] = useState([])
    const [chara, setChara] = useState({})
    const [activeClass, setActiveClass] = useState({})
    const [stats, setStats] = useState([])
    const [notFirst,] = useState(level.characterLevel !== 1)
    useEffect(() => {
        CharacterRepository.get(characterId).then(setChara)
        LevelRepository.getClasses().then(setClassList)
    }, [level])
    useEffect(() => {
        setActiveClass(classList.find(classs => classs.id === level.classId))
    }, [classList])
    useEffect(() => { setStats([Math.floor((chara["con"] - 10) / 2), Math.floor((chara["int"] - 10) / 2)]) }, [chara])

    const roll = () => {
        const copy = { ...level }
        copy.HDRoll = Math.ceil(Math.random() * activeClass.HD)
        LevelRepository.updateLevel(copy).then(updater())
    } //

    const updateClass = (e) => {
        const copy = { ...level }
        copy.HDRoll = 0
        copy.classId = parseInt(e.target.value)
        LevelRepository.updateLevel(copy).then(updater())
    }

    const deleteLevel = () => { 
        LevelRepository.delete(level.id).then(()=>updater())
    }
    const addLevel = () => {
        LevelRepository.addLevel(characterId, (level.characterLevel + 1)).then(()=>updater())
    }


    return <>
        <div className="flexside">
            <div className="levelgridColumn1">{level.characterLevel}</div>
            <div className="levelgridColumn2"><select
                name={"classSelect"}
                className="form-control small"
                onChange={updateClass}
            >
                <option value="">
                    Select a class
                </option>
                {
                    classList?.map(o => <option key={o.id} value={o.id} selected={o.id === level?.classId}>{o.name}</option>)
                }
            </select>
            </div>
            <div className="levelgridColumn3">{activeClass?.HD}
            </div>
            <div className="levelgridColumn4">{`${activeClass?.skillPoints + stats[1]}`}
            </div>
            <div className="levelgridColumn5">
                HP (including con): {level.HDRoll !== 0 ? level.HDRoll + stats[0] : "Not rolled"}<br />
                <button type="submit"
                    onClick={roll}
                    className="btn btn-primary"> ROLL! </button>

            </div>
            {/* obnoxious notation with the chained ternary */}
            <div className="levelgridColumn6">
                {last === level.characterLevel ?
                    <><button onClick={addLevel}>+</button>{notFirst?<button onClick={deleteLevel}>-</button>:null}</>:null
                }

            </div>
        </div>

    </>

}