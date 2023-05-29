'use client';
import StaticMath from '../components/StaticMath/StaticMath'
import MathInput from '../components/MathInput/MathInput';
import { useState, useRef, useEffect } from 'react';
import '../public/styles/globals.css'
import { evaluateTex } from 'tex-math-parser';
import Quantities from "../data/Quantities.json";

export default function App({}){

    const [memory, setMemory] = useState({});
    const [solutionShown, setSolutionShown] = useState(false);

    const [i, setI] = useState(getRandomInt(2,10));
    const [j , setJ] = useState(getRandomInt(2,10));
    const [x , setX] = useState(getRandomInt(2,10));
    const [y , setY] = useState(getRandomInt(2,10));
    const [A, setA] = useState(Quantities[getRandomInt(1, Quantities.length)]);
    const [B, setB] = useState(Quantities[getRandomInt(1, Quantities.length)]);
    const [answer, setAnswer] = useState(Number.parseInt(A.value, 10) + Number.parseInt(B.value, 10));

    useEffect(()=>{

        function initializeQuestion(){
            setI(getRandomInt(2,10));
            setJ(getRandomInt(2,10));
            if(i === j){
                setJ(getRandomInt(2,10));
            }
            setX(getRandomInt(2,10));
            setY(getRandomInt(2,10));
            if(x === y){
                setY(getRandomInt(2,10));
            }
            if(j === y){
                setY(getRandomInt(2,10));
            }
            setA(Quantities[getRandomInt(1, Quantities.length)]);
            setB(Quantities[getRandomInt(1, Quantities.length)]);
            if(A.id === B.id){
                setB(Quantities[getRandomInt(1, Quantities.length)]);
            }
            setAnswer(Number.parseInt(A.value, 10) + Number.parseInt(B.value, 10));
            console.log("New question generated");
        }

        initializeQuestion();
      },[]);


    function addToMemory(newValue){
        setMemory((prev)=>{
            return {...prev, ...newValue}
        });
    }

    function handleShow(){
        setSolutionShown(!solutionShown);
    }

    function handleMemory(){
        setMemory((prev)=>{
            return{...prev, feedbackShown:true}
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
                <StaticMath latex={`\\text{${i}kg of ${A.name} and ${j}kg of ${B.name} have a total cost of ${i*A.value + j*B.value}p.}`} />
                <StaticMath latex={`\\text{${x}kg of ${A.name} and ${y}kg of ${B.name} have a total cost of ${x*A.value + y*B.value}p.}`} />
                <StaticMath latex={`\\text{Work out the total cost of 1kg of ${A.name} and 1kg of ${B.name}.}`} />
                
                <br/>
                <br/>
                {solutionShown && <StaticMath latex={`\\text{The answer is: ${answer}`} />}
                <br/>
                <br/>
                <MathInput buttons={['power', 'times']} markingFunction={markingFunction} memKey='mathinput1' memory={memory} setMemory={addToMemory} placeholder="Type your answer here!"/>
                <br/>
                <br/>
                <button onClick={handleMemory}>Check Answer</button>
                <br/>

                <button style={{marginTop:'20px'}} onClick={handleShow}>{solutionShown? "Hide " : "Show " }Solution</button>
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
    if(inputValue === answer){
        return 1
    }else{
        return 0;
    }
}