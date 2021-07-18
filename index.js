// packages
const fs = require('fs');
const process = require('process');
//const rmrf = require('rmrf');
const { exec, execSync } = require('child_process');
const path = require('path');
const config=require('./config.json');
//const { spawn } = require('child_process');

// Functions
function changeDir(dir) {
  console.log("<-- Start :","Change directory",dir)
  process.chdir(dir);
  console.log("success");
  console.log("<-- End   :","Change directory",dir)
  console.log("")
}

function createDir(dir){
  console.log("<-- Start :","Creation directory",dir)
  fs.mkdirSync(dir, function(err){
    
    if (err) { console.error(err)}
    else
     console.log("success");
});
console.log("<-- End   :","Creation directory",dir)
console.log("")
}

function execCmd(cmd) {
  
  exec(cmd, (error, stdout, stderr) => {
    console.log("<-- Start :","Execution command",cmd)
    if (error) {
        console.error("error",error);
        return;
    }
    if (stderr) {
      console.log("success",stderr);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log("<-- End   :","Execution command",cmd)
    console.log("")
});

}

function execCmdSync(cmd) {
  console.log("<-- Start :","Execution command",cmd)
  execSync(cmd)
  console.log("<-- End   :","Execution command",cmd)
  console.log("")
}

function transformMsToSMMS(ms_s) {
 //console.log("ms_s",ms_s)
 const  s_dec = ms_s/1000
 //console.log("s_dec",s_dec)
 const  s = Math.trunc(ms_s/1000)
 //console.log("s",s)
 const  ms_d= Math.round((s_dec-s)*1000)
 //console.log("ms_d",ms_d)
 const mn = Math.trunc(s/60)
 //console.log("mn",mn)
 const s_r = s-mn*60
 //console.log("s_r",s_r)
 //console.log(mn,s_r,ms_d)
 return mn+":"+s_r+":"+ms_d
}

// Main script
function main() {
const git=config.git

let dir=""
let dirExecInstall=""
let dirSetInstall=""
let cmds=""


try {
  
  console.log("<-- Start :","Installation practice-x3")
  dirExecInstall=process.cwd()
  console.log("-- Directory : execution",dirExecInstall)
  dirSetInstall=config.dir["dir-install"]
  console.log("-- Directory : installation",dirSetInstall)
  
  
    /*rmrf(dir, function(err) {
      done();
    });
    */
    createDir(dirSetInstall)
    

    for (const key in git) {
      if (git.hasOwnProperty.call(git, key)) {
        //const element = git[key];
        //console.log(key,element)
        changeDir(dirSetInstall)
        //cmds = "git clone "+config.git[key]
        //cmds += " &&"
        //cmds += " cd "+ key
        //cmds += " &&"
        //cmds += " npm install || true "
  //      cmds += " &&"
  //      cmds += " npm run test"
  //performance.mark(key+' execCmd-start')
         execCmdSync("git clone "+config.git[key])
         changeDir(key)
         execCmdSync("npm install")
        //performance.mark(key+' execCmd-end')
        //performance.measure(key+' execCmd', key+' execCmd-start', key+' execCmd-end')
      }
    }
    
  } catch (err) {
    console.error("error",err);
  } finally {
    console.log("<-- End   :","Installation practice-x3")
    
	//performance.measure('install', 'execCmd-start', 'execCmd-end')
    
  }
  
}
 
//const startTime = new Date().getTime();
//performance.mark("start-script")
//const { performance, PerformanceObserver } = require("perf_hooks");
//const { NOTIMP } = require('dns');
//const { debug } = require('console');
//const axios = require('axios')
//const customLogger = require('our-custom-logging-solution')

//const perfObserver = new PerformanceObserver((items) => {
//  console.log(items.getEntries()[0].duration);
//  performance.clearMarks();
//})

//perfObserver.observe({ entryTypes: ["measure"], buffer: true })
//let dateStart = new Date()
//let hrStart = process.hrtime()
//var simulateTime = 5
console.time("Duration script")
main()
console.timeEnd("Duration script")
//let dateEnd = new Date() - dateStart
//hrEnd = process.hrtime(hrStart)

//console.log('Execution time: %dms', dateEnd)
//console.log('Execution time (hr): %ds %dms', hrEnd[0], hrEnd[1] / 1000000)
//const elapsedTime = new Date().getTime() - startTime;
//console.log("ElapsedTime (mn:s:ms)="+transformMsToSMMS(elapsedTime));

