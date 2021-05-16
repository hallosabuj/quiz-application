import React from "react"
import {shuffleArray} from "./utils" 
import data from "./questions.json"

export type Question={
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string;
}
export type QuestionState=Question & {answers:string[]}

export async function fetchQuizQuestions(amount:number,difficulty :Difficulty){
    // const endpoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    // const data=await (await fetch(endpoint)).json()
    var result:Question[]
    return data.results.map((question:Question)=>{
        return (
            {
                ...question,
                answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
            }
        )
    })
}

export enum Difficulty{
    EASY="easy",
    MEDIUM="medium",
    HARD="hard"
}