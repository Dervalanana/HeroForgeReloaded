import react from "react";

export const SkillDetails = ({skill}) => {
    return <>
        <div className="flexside">
            <div className="detailColumn1">{skill.name}</div>
            <div className="detailColumn2">Total</div>
            <div className="detailColumn3">{skill.attribute}</div>
            <div className="detailColumn4">Ranks</div>
            <div className="detailColumn5">Max Ranks</div>
        </div>
    </>

}