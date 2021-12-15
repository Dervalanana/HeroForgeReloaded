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
    async getAll(playerId) {
        const characters = await fetchIt(`${Settings.remoteURL}/levels`)
    },
    async addLevel(character, level) {
        const newLevel = {
            characterId: character,
            classId: 0,
            characterLevel: level,
            statBoost: (level%4 === 0),
            stat: "",
            featAdd: (level === 1 || level%3 === 0),
            featId: 0
        }
        return await fetchIt(
            `${Settings.remoteURL}/levels`,
            "POST",
            JSON.stringify(newLevel)
        )
    },
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