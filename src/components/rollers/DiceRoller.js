import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { DiceList } from "./DiceList"
import "./DiceRoller.css"

export const DiceRoller = () => {
    const [rolls, SaveRolls] = useState([])
    const history = useHistory()
    useEffect(() => {

    }, [rolls])
    const rollTheDice = (evt) => {
        evt.preventDefault()
        const size = document.querySelector("#dieSize").value
        const count = document.querySelector("#diceCount").value
        const keep = document.querySelector("#keep").value
        const repeat = document.querySelector("#repeat").value
        SaveRolls(fill(size, count, keep, repeat))
    }

    const roll = (Die) => {
        let number = Math.ceil(Math.random() * Die)
        return number
    }
    const fill = (Die, Count, Keep, Repeat) => {
        const statArray = []
        for (let repeat = 0; repeat < Repeat; repeat++) {
            let singleStat = []
            for (let count = 0; count < Count; count++) {
                singleStat.push(roll(Die))
            }
            singleStat.sort((b,a)=>a-b) //sorts highest to lowest
            const sum = singleStat.slice(0,Keep).reduce((a,b) => a+b) //sums the highest "keep" numbers in the set
            singleStat.push(sum) //appends the total to the end of each stat
            statArray.push(singleStat)
        }
        statArray.sort((b,a)=> {return (a[a.length-1] - b[b.length-1])}) //sorts each set by its total
        statArray.push(Die, Count, Keep, Repeat) //adds the parameters for the roll to be handed down
        return statArray
    }
    return (
        <>
            <div>
                <h4>Select Dice</h4>
                <div>
                    <input id="diceCount" className="diceinput"/> d 
                    <input id="dieSize" className="diceinput"/> keep 
                    <input id="keep" className="diceinput"></input> repeat 
                    <input id="repeat" className="diceinput"></input> times
                </div>
                <button onClick={rollTheDice} >ROLL!</button>
            </div>
            <div>
                <DiceList rolls={rolls} />
            </div>
        </>
    )
}