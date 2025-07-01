//this component is nothing but like the pie chart which shows the percentage of the progress in color vs complete transaction  
//we are using the concept of circumference ,radius to show the circle 
//https://www.xelplus.com/excel-progress-circle-chart/ this is the idea
import React,{useEffect,useState} from 'react'; 
import './CircularProgressBar.css';
//like battery indicator in ur laptop u can see 
const CircularProgressBar=({percentage,color})=>{
    const radius=34;
    const circumference=2*Math.PI*radius;//shows entire length that covers the percentage
    const progress=((100-percentage)/100)*circumference;//shows the remaining part
    const [isAnimating,setIsAnimating]=useState(false);
    useEffect(()=>{
        setIsAnimating(true);//for animations 
    },[]);
    const circleStyle={
        '--circumference':circumference,//
        '--progress':progress,//percentage 76%
        '--color':color,//eg-green,blue etc
    };
     return (
        //form square shaped view box
    <div className="circular-progressbar">
      <svg viewBox="0 0 100 100">
        <circle
          className="circle bg"//background ring
          r={radius}
          cx="50"//middle of the circle
          cy="50"//middle of the center
          strokeDasharray={circumference}//the complete length to be visible
          style={circleStyle}
        />
        <circle
          className={`circle ${isAnimating ? 'animating' : ''}`}
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={progress}//remaining part to be shown
          style={circleStyle}
        />
        
      </svg>
      <div className="percentage">{percentage}%</div>
    </div>
    //remaining part shown as percentage
  );
};

export default CircularProgressBar;
/*
     ------
    /       \
   /         \ 
  /   75%     \
  \           /
   \         /
    \       /
      -----  

*/