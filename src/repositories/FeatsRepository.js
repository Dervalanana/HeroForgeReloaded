import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/feats/${id}`)
            .then(res => res)
    }
    ,
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/feats`)
    },
    async addFeat(newFeat) {
        return await fetchIt(
            `${Settings.remoteURL}/feats`,
            "POST",
            JSON.stringify(newFeat)
        )
    },
    async updateFeat(updatedFeat) {
        return await fetchIt(
            `${Settings.remoteURL}/feats/${updatedFeat.id}`,
            "PUT",
            JSON.stringify(updatedFeat)
        )
    }
}