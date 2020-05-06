var texts =["../kljlkKJLKJL/LKJLKJLK0.html",] 
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
 document.getElementById("contentFrame").src = texts[i];  
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