import { Given,When,Then } from "cucumber";
import { browser, element, by } from "protractor";
import { CompleteKnowledgeCheckPage } from "../PageObject/CompleteKnowledgeCheckPage";
       
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let ckc=new CompleteKnowledgeCheckPage ();

    
Given(': I have navigated to the quiz section in my course to check knowledge', async ()=> {
            
});

When(': I am viewing the questions for knowledge check', async ()=> {
           
});

          
Then(': I should be able to select and submit the answers for it', async ()=> {
           
});
 