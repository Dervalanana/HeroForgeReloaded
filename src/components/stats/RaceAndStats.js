import react from "react";
import { DiceRoller } from "../rollers/DiceRoller";
import "./CharacterSelect.css"

export const RaceAndStats = () => {


    return(
        <>
            <article>
                <h1>Race and Stats</h1>
                <section className="flexdown">
                    <section className="flexside">
                        <h3>Placeholder for Stats Block grid</h3>    
                        <DiceRoller />
                    </section>
                    <h3>Placeholder for Race Selection (no submit button, just a select)</h3>    
                </section>    
            </article>
        </>
    )
}