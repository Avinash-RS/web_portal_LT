var texts =["../retest/retest0.html","../retest/retest1.html","../retest/retest2.html","../retest/retest3.html","../retest/retest4.html","../retest/retest5.html",] 
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