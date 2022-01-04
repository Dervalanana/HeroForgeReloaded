import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import SkillsRepository from "./SkillsRepository"
import ClassRepository from "./ClassRepository"

// const expandAnimalUser = (animal, users) => {
//     animal.animalOwners = animal.animalOwners.map(ao => {
//         ao.user = users.find(user => user.id === ao.userId)
//         return ao
//     })

//     animal.animalCaretakers = animal.animalCaretakers.map(caretaker => {
//         caretaker.user = users.find(user => user.id === caretaker.userId)
//         return caretaker
//     })

//     return animal
// }

// const expandClassSkills = (level, classSkills) => {
//     classSkills = classSkills.sort((a, b) => a.skillId - b.skillId) //need to make sure that the array is in skill order for future iteration
//     level.class.classSkills = classSkills
//     return level
// }

const addComplications = (level) => {
    SkillsRepository.getAll().then(res => {
        const skills = res
        skills.forEach(skill =>
            SkillsRepository.addLevelSkills({ //creates the objects to track a given levels allocation of skill points
                skillId: skill.id,
                levelId: level.id,
                points: 0
            }
            ))
    })
}

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/levels/${id}?/_embed=classLevels&_expand=classes`)
            .then(res => res)
    }
    ,
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/levels/${id}`, "DELETE")
    },
    async getAll(characterId) {
        return await fetchIt(`${Settings.remoteURL}/levels?characterId=${characterId}`)
    },
    async getSingle(levelId) {
        return await fetchIt(`${Settings.remoteURL}/levels/${levelId}`)
    },
    async getClasses() {
        return await fetchIt(`${Settings.remoteURL}/classes`)
    },
    async addLevel(characterId, level) {
        const newLevel = {
            characterId: characterId,
            classId: 0,
            characterLevel: level,
            statBoost: (level % 4 === 0),
            stat: "",
            featAdd: (level === 1 || level % 3 === 0),
            featId: 0,
            classfeatAdd: false,
            classfeatId:0,
            HDRoll: 0
        }
        return await fetchIt(
            `${Settings.remoteURL}/levels`,
            "POST",
            JSON.stringify(newLevel)
        ).then(level => {
            addComplications(level)
            return level
        })
    },
    async updateLevel(updatedLevel) {
        return await fetchIt(
            `${Settings.remoteURL}/levels/${updatedLevel.id}`,
            "PUT",
            JSON.stringify(updatedLevel)
        )
    },
    async getFeats() {
        return await fetchIt(`${Settings.remoteURL}/feats`)
    },
    async getComplicated(id) {
        let levels = await fetchIt(`${Settings.remoteURL}/levels?characterId=${id}&_embed=levelSkills&_expand=class`)
        const classLevels = await fetchIt(`${Settings.remoteURL}/classLevels`) //gets all class levels
        let importantLevels = [] //to hold the class levels we want to keep
        const classes = await ClassRepository.classFinder(levels)
        classes.forEach(classId => importantLevels.push(classLevels.filter(classLevel => classId === classLevel.classId))) //pushes an array of each classes's class level
        levels.forEach(level => { //take the level
            importantLevels = importantLevels.map(importantLevel => {
                if (importantLevel[0]?.classId === level?.classId) { //if the lowest available class level and our current level share an id
                    level.classLevel = importantLevel[0] //set the class level of the current level equal to the available class level
                    return importantLevel.slice(1) //then get rid of that level, no multiples of level 1
                }
                else {
                    return importantLevel //otherwise, return that set of levels unchanged and move on to the next one
                }
            })
        }
        )
        const classSkills = await Promise.all(levels.map(level => SkillsRepository.getClassSkills(level.classId).then(res => res)))
        classSkills.forEach(chunk => chunk.sort((a, b) => a.skillId - b.skillId)) //need to make sure that the array is in skill order for future iteration
        levels.forEach(level => { level.class.classSkills = classSkills.find(classSkill => classSkill[0]?.classId === level.class.id) }//all elements of a classSkills subarray share the same classId
        )
        return levels
    }
}