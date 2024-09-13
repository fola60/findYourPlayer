import React from "react";

export default function MfDP(props,{updateBr,updateCa,updateDa,updateGs,updateHvp,sendData}){
    const hvp = props.hvp;
    const da = props.da;
    const ca = props.ca;
    const br = props.br; 
    const gs = props.gs;
    const pos = props.pos;
    const dataPoints = props.dataPoints;
    const key = props.key;
    
    


    
        return(
        <>
            <div className="container-data-points" key={key}>
                <div className="data-points" onClick={() => updateHvp}>High Volume passing :{hvp}</div>
                <div className="data-points" onClick={() => updateDa}>Defensive Ability :{da}</div>
                <div className="data-points" onClick={() => updateCa}>Creative Ability: {ca}</div>
                <div className="data-points" onClick={() => updateGs}>Gool Scoring: {gs}</div>
                <div className="data-points" onClick={() => updateBr}>Ball Retention: {br}</div>
                <div className="data-points">{dataPoints}</div>
                    <div className="data-points" 
                    onClick={() => sendData}
                    >Generate Player!
                    </div>
            </div>
        </>
        )   
    
}