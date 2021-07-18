// packages
const fs = require('fs');
const process = require('process');
const {execSync } = require('child_process');
const path = require('path');
const config=require('./config.json');

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


function execCmdSync(cmd) {
  console.log("<-- Start :","Execution command",cmd)
  execSync(cmd)
  console.log("<-- End   :","Execution command",cmd)
  console.log("")
}


// Main script
function main() {
  const git=config.git
  const testNotValid="echo \"Error: no test specified\" && exit 1"
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
    createDir(dirSetInstall)
    for (const key in git) {
      if (git.hasOwnProperty.call(git, key)) {
        changeDir(dirSetInstall)
        execCmdSync("git clone "+config.git[key])
        changeDir(key)
        let fullpathPackage=path.join(dirSetInstall,key,"package")
        //console.log("fullpathPackage",fullpathPackage)
        let packageJson=require(fullpathPackage+".json");
        //console.log("package.json",packageJson)
        let scripts = packageJson.scripts
        execCmdSync("npm install")
        for (const key in scripts) {
          if (Object.hasOwnProperty.call(scripts, key)) {
            if (key==="test" && scripts[key]!==testNotValid) {
              execCmdSync("npm run test")
              break
            }
          }
        }
      }
    }
    
    
  } catch (err) {
    console.error("error",err);
  } finally {
    console.log("<-- End   :","Installation practice-x3")
    
    
  }

}

// Execution script
console.time("Duration script")
main()
console.timeEnd("Duration script")
