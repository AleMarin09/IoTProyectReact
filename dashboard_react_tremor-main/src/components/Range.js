import React, { useEffect, useState } from "react";
import './Range.module.css';

function Range() {
    const [data,setData] = useState(0)
    const [emoji,setEmoji] = useState('')
    useEffect(()=>{
        if(data == 0){
            setEmoji("0%")
        }else if(data == 10){
            setEmoji("10%")
        }else if(data == 20){
            setEmoji("20%")
        }else if(data == 30){
            setEmoji("30%")
        }else if(data == 40){
            setEmoji("40%")
        }else if(data == 50){
            setEmoji("50%")
        }else if(data == 60){
            setEmoji("60%")
        }else if(data == 70){
            setEmoji("70%")
        }else if(data == 80){
            setEmoji("80%")
        }else if(data == 90){
            setEmoji("90%")
        }else if(data == 100){
            setEmoji("100%")
        }
    },[data])
    return(
        <div className="text-center">
            <h1 >{emoji}</h1>
            <input  className={data>50?'heigh':'less'} type="range" min="0" max="100" step="10" value={data} onChange={(e)=>setData(e.target.value)} />
            
        </div>
    );
}
export default Range;