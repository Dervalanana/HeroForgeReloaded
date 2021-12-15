import React, { useEffect, useState } from "react";

export const DiceList = ({ rolls }) => {
    const [results, CalculateResults] = useState([])
    const [diceString, setString] = useState("")
    useEffect(() => {
        CalculateResults([])
        CalculateResults(rolls)
        if(rolls[0]) setString(displayDice(rolls))
    }, [rolls])

    const displayDice = (diceRolls) => {
        const die = diceRolls[diceRolls.length - 4]
        const count = diceRolls[diceRolls.length - 3]
        const keep = diceRolls[diceRolls.length - 2]
        const repeat = diceRolls[diceRolls.length - 1]
        const rollsOnly = diceRolls.slice(0, results.length - 4)
        let stringBuilder = []
        stringBuilder.push(<div>Rolling {count} d{die}, keeping the best {keep}, and taking the best 6 of {repeat} sets yields:</div>)
        for(let i=0;i<6;i++){
            stringBuilder.push(
            <div>
            <b>{rollsOnly[i]?.slice(0,keep).join('+')}</b> {/*kept dice*/}
            <strike>{" + " + rollsOnly[i]?.slice(keep,rollsOnly[i].length-1).join('+')}</strike>{/*dropped dice*/}
            <b>{" = " + rollsOnly[i][rollsOnly[i].length-1]}</b> {/*total*/}
            </div>)
        }
        for(let i=6;i<rollsOnly.length;i++){
            stringBuilder.push(
            <div>
            {rollsOnly[i]?.slice(0,keep).join('+')}{/*kept dice*/}
            <strike>{" + " + rollsOnly[i]?.slice(keep,rollsOnly[i].length-1).join('+')}</strike>{/*dropped dice*/}
            {" = " + rollsOnly[i][rollsOnly[i].length-1]}{/*total*/}
            </div>)
        }
        return stringBuilder

    }


    return (
        <>
            {
                (results.length === 0) ? "roll some dice" : diceString
            }
        </>
    )
}