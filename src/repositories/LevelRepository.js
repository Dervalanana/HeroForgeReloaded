import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import SkillsRepository from "./SkillsRepository"

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
    // async searchByName(query) {
    //     const users = await OwnerRepository.getAll() //copied the extra code for expansion from get and getall to make sure I could get the full info in the search
    //     const animals = await fetchIt(`${Settings.remoteURL}/animals?_embed=animalOwners&_embed=treatments&_embed=animalCaretakers&_expand=location&name_like=${query}`)
    //     .then(data => {
    //         const embedded = data.map(animal => {
    //             animal = expandAnimalUser(animal, users)
    //             return animal
    //         })
    //         return embedded
    //     })
    //     return animals
    // },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/levels/${id}`, "DELETE")
    },
    async getAll(characterId) {
        return await fetchIt(`${Settings.remoteURL}/levels?characterId=${characterId}`)
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
    async getComplicated(id) {
        let levels = await fetchIt(`${Settings.remoteURL}/levels?characterId=${id}&_embed=levelSkills&_expand=class`)
        const classSkills = await Promise.all(levels.map(level => SkillsRepository.getClassSkills(level.classId).then(res=> res)))
        classSkills.forEach(chunk => chunk.sort((a, b) => a.skillId - b.skillId)) //need to make sure that the array is in skill order for future iteration
        levels.forEach(level =>
            {level.class.classSkills = classSkills.find(classSkill => classSkill[0].classId === level.class.id)}//all elements of a classSkills subarray share the same classId
        )
        return levels
    }

    // async addAnimalCaretaker(newAnimalCaretaker) { //added function to add caretakers
    //     return await fetchIt(
    //         `${Settings.remoteURL}/animalCaretakers`,
    //         "POST",
    //         JSON.stringify(newAnimalCaretaker)
    //     )
    // },
    // async updateAnimal(editedAnimal) {
    //     return await fetchIt(
    //         `${Settings.remoteURL}/animals/${editedAnimal.id}`,
    //         "PUT",
    //         JSON.stringify(editedAnimal)
    //     )
    // }
}