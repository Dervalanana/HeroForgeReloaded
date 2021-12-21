import React from "react";
import ClassRepository from "../../repositories/ClassRepository";

export const ClassCreator = () => {

    const establishClassLevels = async () => {
        const classId = parseInt(document.querySelector("[name=classId]").value)
        const BAB = document.querySelector("[name=BAB]").value
        const Fort = document.querySelector("[name=Fort]").value
        const Ref = document.querySelector("[name=Ref]").value
        const Will = document.querySelector("[name=Will]").value
        for(let i=1; i<21;i++){
            const newClassLevel= {
                classId:classId,
                level:i,
                features:"",
                featAdd:false,
                BAB:BAB==="3" ? 1 : BAB==="2" ? ((i+3)%4?1:0) : (i+1)%2, //for good bab, always one. for poor, alternate. for fair, 1, 5, 9 etc should be 0,that is 1+4%4 is 0 and should assess falsy, returning 0
                Fort:Fort==="2" ? (i===1 ? 2 : (i+1)%2) : ( i%3 ?0:1), //if good, 2 at level 1, otherwise 1 every even level. if poor, 1 every 3rd level
                Ref:Ref==="2" ? (i===1 ? 2 : (i+1)%2) : ( i%3 ?0:1),
                Will:Will==="2" ? (i===1 ? 2 : (i+1)%2) : ( i%3 ?0:1)
            }
            await ClassRepository.addClassLevel(newClassLevel)
        }
    }

    return <>
        <h1>-</h1>
        <h1>-</h1>
        <div>
            ClassId <input name="classId" />
        </div>
        <div>
            Base Attack Bonus Progression
            <select name="BAB">
                <option value="1">Poor</option>
                <option value="2">Fair</option>
                <option value="3">Good</option>
            </select>
        </div>
        <div>
            Fort Progression
            <select name="Fort">
                <option value="1">Poor</option>
                <option value="2">Good</option>
            </select>
        </div>
        <div>
            Ref Progression
            <select name="Ref">
                <option value="1">Poor</option>
                <option value="2">Good</option>
            </select>
        </div>
        <div>
            Will Progression
            <select name="Will">
                <option value="1">Poor</option>
                <option value="2">Good</option>
            </select>
        </div>
        <button type="submit"
            className="btn btn-primary"
            onClick={establishClassLevels}> Initialize Class </button>
    </>
}