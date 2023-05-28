import StaticMath from '../components/StaticMath/StaticMath'
import MathInput from '../components/MathInput/MathInput';
import { useState } from 'react';
import '../public/styles/globals.css'
import { evaluateTex } from 'tex-math-parser';

export default function App({}){

    const [memory, setMemory] = useState({});
    const [solutionShown, setSolutionShown] = useState(false);

    const i = getRandomInt(2,10);
    const j = getRandomInt(2,10);
    const x = getRandomInt(2,10);
    const y = getRandomInt(2,10);
    const A = Quantities.id(getRandomInt(1, Quantities.length));
    const B = Quantities.id(getRandomInt(1, Quantities.length));

    function addToMemory(newValue){
        setMemory((prev)=>{
            return {...prev, ...newValue}
        });
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
      

    return(
        <div style={{display:'flex', justifyContent:'center'}}>
            <div style={{maxWidth:'800px', width:'calc(100vw - 40px)', marginTop:'50px'}}>
                <StaticMath latex={`\\text{${i}kg of ${A.name} and ${j}kg of ${B.name} have a total cost of ${i*A.value + j*B.value}}`} />
                <StaticMath latex={`\\text{${x}kg of ${A.name} and ${y}kg of ${B.name} have a total cost of ${x*A.value + y*B.value}}`} />
                <StaticMath latex={`\\text{Work out the total cost of 1kg of ${A.name} and 1kg of ${B.name}.}`} />
                
                <br/>
                <br/>
                {solutionShown ? <StaticMath latex={`\\text{The answer is: ${A.value + B.value}`} /> : ''}
                <br/>
                <br/>
                <MathInput buttons={['power', 'times']} markingFunction={markingFunction} memKey='mathinput1' memory={memory} setMemory={addToMemory} placeholder="Type your answer here!"/>
                <br/>
                <br/>
                <button onClick={()=>{setMemory((prev)=>{return{...prev, feedbackShown:true}})}}>Check Answer</button>
                <br/>
                {!solutionShown ? <button style={{marginTop:'20px'}} onClick={()=>{setSolutionShown(true)}}>Show Solution</button> : ''}
                {solutionShown ? <button style={{marginTop:'20px'}} onClick={()=>{setSolutionShown(false)}}>Hide Solution</button> : ''}
            </div>
        </div>
    );
}

function markingFunction(userInput){
    let inputValue;
    try{
        //the evaluateTex function takes a latex string as an input and returns the evaluation as a javascript number
        inputValue = evaluateTex(userInput).evaluated;
    }catch{
        return 0;
    }
    if(inputValue === 5){
        return 1
    }else{
        return 0;
    }
}