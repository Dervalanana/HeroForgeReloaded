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
    },
    classFinder(levels){
        const classes = new Set() //creates a set
        levels?.forEach(level => classes.add(parseInt(level.classId))) //adds the ID for one of each unique class to the set
        return classes
    }
}