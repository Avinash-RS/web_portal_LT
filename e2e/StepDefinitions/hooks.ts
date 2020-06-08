
import {After,Before, Status} from "cucumber";
import { browser } from "protractor";

Before(async ()=> {
  await browser.manage().deleteAllCookies();
  await browser.manage().window().maximize();
  console.log("Test Started")
  });

After(async function(scenario) {
  // This hook will be executed before scenarios tagged with @foo
  console.log("Test is completed");
  if (scenario.result.status=== Status.FAILED)
  {
    //code to take screesnhot
   const screenshot= await browser.takeScreenshot(); 
   this.attach(screenshot,"image/png");
  }
});





