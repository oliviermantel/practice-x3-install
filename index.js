const fs = require('fs');
const process = require('process');
//const rmrf = require('rmrf');
const { exec, execSync } = require('child_process');
const path = require('path');
const config=require('./config.json')

let dir=""
let dirExecInstall=""
let dirSetInstall=""
function changeDir(dir) {
  console.log("<-- Start :","Change directory",dir)
  console.log("Current directory",dir)  
  process.chdir(dir);
  console.log("success");
  console.log("Current directory",dir)
  console.log("<-- End :","Change directory",dir)
}

function createDir(dir){
  console.log("<-- Start :","Creation directory",dir)
  fs.mkdirSync(dir, function(err){
    
    if (err) { console.error(err)}
    else
     console.log("success");
});
console.log("<-- End :","Creation directory",dir)
}

function execCmd(cmd) {
  console.log("<-- Start :","Execution command",cmd)
  exec(cmd, (error, stdout, stderr) => {
    
    if (error) {
        console.error("error",error);
        return;
    }
    if (stderr) {
      console.log("success",stderr);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
console.log("<-- End :","Execution command",cmd)
}

function execCmdSync(cmd) {
  console.log("<-- Start :","Execution command",cmd)
  execSync(cmd, (error, stdout, stderr) => {
    
    if (error) {
        console.error("error",error);
        return;
    }
    if (stderr) {
      console.log("success",stderr);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
console.log("<-- End :","Execution command",cmd)
}



try {
    
  console.log("<-- Start :","Installation practice-x3")
  dirExecInstall=process.cwd()
  console.log("-- Directory : execution",dirExecInstall)
  dirSetInstall=config.dir.dir_install
  console.log("-- Directory : installation",dirSetInstall)
  
  
  //dir=path.join(dirExecInstall,"..")
    //changeDir(dir) 
    dir=dirSetInstall
    /*rmrf(dir, function(err) {
      done();
    });
    */
    createDir(dir)
    changeDir(dir)
    //dir=path.join(dirSetInstall,"practice-x3-jwt")
    //createDir(dir)
    //changeDir(dir)
    execCmdSync("git clone "+config.git.practice_x3_jwt)
    //dir=path.join(dirSetInstall,"practice-x3-graphql-server")
    //createDir(dir)
    //changeDir(dir)
   
    execCmdSync("git clone "+config.git.practice_x3_graphql_server)
    //createDirBeforeExecCmd(dir,"git clone https://github.com/oliviermantel/practice-x3-graphql-server.git")
    dir=path.join(dirSetInstall,"practice-x3-jwt")
    changeDir(dir)
    execCmdSync("npm install")
    execCmdSync("npm run test ")
    dir=path.join(dirSetInstall,"practice-x3-graphql-server")
    changeDir(dir)
    execCmdSync("npm install")
    //
    //console.log("---> End installation practice-x3");
    
  } catch (err) {
    // Printing error if occurs
    console.error("error",err);
  } finally {
    console.log("<-- End :","Installation practice-x3")
  }
  

 


