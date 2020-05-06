var texts =["../What is a leader ?/Connecting with your team0.html","../What is a leader ?/Connecting with your team1.html","../What is a leader ?/Connecting with your team2.html","../What is a leader ?/Connecting with your team3.html","../What is a leader ?/Connecting with your team4.html","../What is a leader ?/Connecting with your team5.html","../What is a leader ?/Connecting with your team6.html","../What is a leader ?/Connecting with your team7.html","../What is a leader ?/Motivation0.html",] 
var i =-1 
function doNext() 
{ 
if(i==texts.length)
 {
 document.getElementById("contentFrame").src = texts[texts.length-1]; 
} 
else
 { 
i++ 
 if(i==texts.length)
 {
 document.getElementById("contentFrame").src = texts[texts.length-1];  
 }
  else
  {
 document.getElementById("contentFrame").src = texts[i];   
 }  
 }} 
function doPrevious() 
{ 
if(i==-1 | i==0)
 { 
 document.getElementById("contentFrame").src = texts[0]; 
}  
else  
{ 
 i-- 
 document.getElementById("contentFrame").src = texts[i]; 
 } }