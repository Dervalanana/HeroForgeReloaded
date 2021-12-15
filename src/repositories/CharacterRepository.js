import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import SkillsRepository from "./SkillsRepository"
import LevelRepository from "./LevelRepository"
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
const expandCharacterTraits = (character, classes, skills, feats) => {
    character.levels = character.levels.map(level => {
        level.class = classes.find(classs => classs.id === level.classId) //attaches the whole of the class information.
        return level
    })
    character.characterSkills = character.characterSkills.map(skill => {
        skill.name = skills.find(skilll => skilll.id === skill.skillId).name //only need the name, because bonus is updated in other modules
        return skill
    })
    return character
}

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/characters/${id}?_embed=levels`)
            .then(res => res)
    },
    async getWithRace(id) {
        return await fetchIt(`${Settings.remoteURL}/characters/${id}?_embed=levels&_expand=race`)
            .then(res => res)
    }
    ,
    async getComplicated(id) {
        const skills = await SkillsRepository.getAll()
        const classes = await ClassRepository.getAll()
        return await fetchIt(`${Settings.remoteURL}/characters/${id}?_embed=levels&_embed=characterSkills`)
            .then(character => {
                character = expandCharacterTraits(character, classes, skills)
                return character
            })
    }
    ,
    async getRace(){
        return await fetchIt(`${Settings.remoteURL}/races`)
            .then(res => res)
    },
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
        await fetchIt(`${Settings.remoteURL}/characters/${id}?_embed=levels`).then(res => res.levels.forEach(level => LevelRepository.delete(level.id)))
        return await fetchIt(`${Settings.remoteURL}/characters/${id}`, "DELETE")
    },
    async getAll(playerId) {
        let userCharacters = []
        const characters = await fetchIt(`${Settings.remoteURL}/characters`)
            .then(data => {
                userCharacters = data.filter(char => char.userId === playerId)
            })
        return userCharacters
    },
    async addCharacter(newCharacter) {
        return await fetchIt(
            `${Settings.remoteURL}/characters`,
            "POST",
            JSON.stringify(newCharacter)
        )
    },
    async updateCharacter(updatedCharacter) {
        return await fetchIt(
            `${Settings.remoteURL}/characters/${updatedCharacter.id}`,
            "PUT",
            JSON.stringify(updatedCharacter)
        )
    }
}