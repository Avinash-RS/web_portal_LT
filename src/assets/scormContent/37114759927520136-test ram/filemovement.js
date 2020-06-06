var texts =["../ram test/ramttest topic0.html","../ram test/ramttest topic1.html","../ram test/ramttest topic2.html","../ram test/ramttest topic3.html","../ram test/ramttest topic4.html","../ram test/ramttest topic5.html",] 
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