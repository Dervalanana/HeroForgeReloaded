import react from "react";
import "./CharacterSelect.css"

export const Skills = () => {


    return (
        <>
            <article>
                <h1>Skills</h1>
                <h2>Currently Selected character is {"placeholder to call a reference to the current character. should be changed through filepath"}</h2>
                <section className="flexside">
                    <section className="flexdown">
                        <h3>Level <br/> Row</h3>
                        <h3>Available <br/>skill <br/>points</h3>
                        <div className="flexside">
                            <h3>Skill name</h3>
                            <h3>Total</h3>
                            <h3>Stat</h3>
                            <h3>Ranks</h3>
                            <h3>Max Ranks</h3>
                        </div>
                    </section>
                    <section className="flexsidescroll">
                        <div className="flexdown">
                            <h3>Level<br/>#</h3>
                            <h3>Skill points <br/>with <br/>live updates</h3>
                            <h3>double space <br/>for consistency</h3>
                            <h3>Column of skills. All 3 of these are going to be in an indiviudal element that will map through vertically, then that element will be mapped horizonally for multiple levels</h3>
                        </div>
                        <div className="flexdown">
                            <h3>Level<br/>#</h3>
                            <h3>Skill points <br/>with <br/>live updates</h3>
                            <h3>double space <br/>for consistency</h3>
                            <h3>Column of skills. All 3 of these are going to be in an indiviudal element that will map through vertically, then that element will be mapped horizonally for multiple levels</h3>
                        </div>
                        <div className="flexdown">
                            <h3>Level<br/>#</h3>
                            <h3>Skill points <br/>with <br/>live updates</h3>
                            <h3>double space <br/>for consistency</h3>
                            <h3>Column of skills. All 3 of these are going to be in an indiviudal element that will map through vertically, then that element will be mapped horizonally for multiple levels</h3>
                        </div>
                        
                    </section>

                </section>
            </article>
        </>
    )
}