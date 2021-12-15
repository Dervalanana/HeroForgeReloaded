import react from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import CharacterRepository from "../../repositories/CharacterRepository";
import LevelRepository from "../../repositories/LevelRepository";
import SkillsRepository from "../../repositories/SkillsRepository";

export const CreateCharacter = ({ refresh }) => {
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
            "raceId": 1,
            "HDRoll": 0,
        }
        CharacterRepository.addCharacter(newCharacter).then(
            res => {
                const charId = res.id
                SkillsRepository.getAll().then(res => {
                    const skills = res
                    skills.forEach(re => SkillsRepository.addCharacterSkills({ skillId: re.id, characterId: charId, bonus:0 })) //generates the objects to track a characters total points for a given skill
                    LevelRepository.addLevel(charId, 1).then(levelRes => //creates the character's first level
                        skills.forEach(skill => 
                            SkillsRepository.addLevelSkills({ //creates the objects to track a given levels allocation of skill points
                                skillId: skill.id, 
                                levelId: levelRes.id, 
                                points: 0 }
                            )))
                })
                CharacterRepository.getAll(getCurrentUser().id).then(refresh)
            }
        )
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