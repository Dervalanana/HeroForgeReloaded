import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/classes/${id}`)
            .then(res => res)
    }
    ,
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/classes`)
    },
    async addClassLevel(newClassLevel) {
        return await fetchIt(
            `${Settings.remoteURL}/classLevels`,
            "POST",
            JSON.stringify(newClassLevel)
        )
    },
    async getClassLevel(classId,level){
        return await fetchIt(`${Settings.remoteURL}/classLevels?classId=${classId}&level=${level}`)
    },
    async updateClassLevel(updatedClassLevel) {
        return await fetchIt(
            `${Settings.remoteURL}/classLevels/${updatedClassLevel.id}`,
            "PUT",
            JSON.stringify(updatedClassLevel)
        )
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