import fs from "fs"
const inquirer = require("inquirer");
const readline = require("readline");
const os = require("os")

interface IInitScript{
    //编译本地菜单
    setLocalMenu():any;
}

class InitScript implements IInitScript{

    private static Instance:any;

    private constructor(){
        
    }

    static getInstance(){
        if( !InitScript.Instance ){
            InitScript.Instance = new InitScript();
        }
        return InitScript.Instance;
    }

    async setLocalMenu(){
        const writer = fs.createWriteStream(".env",{
            encoding: "utf8"
        });
        try{
            const reader =  fs.createReadStream(".env.dev",{
                encoding: "utf8"
            });
            const ReadLine = readline.createInterface({
                input: reader,
            })
            const ReactBuildPathRe = new RegExp(/^(?=BUILD_PATH).*$/);
            for await (const line of ReadLine){
                switch(true){
                    case ReactBuildPathRe.test(line):
                        writer.write( `BUILD_PATH = "./build"${os.EOL}` );
                        break;
                    default:
                        writer.write( `${line}${os.EOL}` );
                        break;
                }
            }
        }catch(err){
            console.log(err)
        }finally{
            writer.end();
            console.log("配置环境变量！")
        }
    }

}


(async()=>{
    console.log( "/*****************************************************START**********************************************************/" )
    const InitScriptObj = InitScript.getInstance();
    const compileType = await inquirer.prompt([
        {
          name: "CompileType",
          message: `请选择编译类型？`,
          type: "list",
          choices: ["setLocalMenu"],
        },
    ]);
    await InitScriptObj[compileType["CompileType"]]();
    //eval(`${InitScriptObj}.${compileType}()`)
    console.log( "/*******************************************************END********************************************************/" )
})()