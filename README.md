# Tool for installation of packages practice-x3

## Install local repo
```bash
$ cd practice-x3-install
$ npm i 
```

## Config
You can change the setiings in the file config.json.

 * __git__: Local git packages _practice-x3_ to install 
 * __dir__: Location to install packages
  
```json
{ 
    "git": 
    {
    "practice_x3_jwt": "...\\practice-x3-jwt\\.git",
    "practice_x3_graphql_server":"...\\practice-x3-graphql-server\\.git"
    },
    "dir":{
        "dir_install":"...\\x3-practice"
    }
}
```

## To start the Graphql server
```bash
$ npm start

```
