import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"

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
        return await fetchIt(`${Settings.remoteURL}/skills/${id}`)
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
    // async delete(id) {
    //     return await fetchIt(`${Settings.remoteURL}/animals/${id}`, "DELETE")
    // },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/skills`)
    },
    async addCharacterSkills(characterSkill) {
        return await fetchIt(
            `${Settings.remoteURL}/characterSkills`,
            "POST",
            JSON.stringify(characterSkill)
        )
    },
    async getCharacterSkills(id){
        return await fetchIt(`${Settings.remoteURL}/characterSkills/${id}`)
    },
    async addLevelSkills(levelSkill) {
        return await fetchIt(
            `${Settings.remoteURL}/levelSkills`,
            "POST",
            JSON.stringify(levelSkill)
        )
    },
    async addClassSkills(classSkill) {
        return await fetchIt(
            `${Settings.remoteURL}/classSkills`,
            "POST",
            JSON.stringify(classSkill)
        )
    },
    async updateLevelSkill(levelSkill) {
        return await fetchIt(
            `${Settings.remoteURL}/levelSkills/${levelSkill.id}`,
            "PUT",
            JSON.stringify(levelSkill)
        )
    },
    async getClassSkills(id){
        return await fetchIt(`${Settings.remoteURL}/classSkills?classId=${id}`)
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