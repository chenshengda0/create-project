# create-project

## git
```
    查看git 配置：
        git config -l

    设置git库地址：
        git remote set-url origin git@github.com:chenshengda0/create-project.git
        
    创建并切换分支：
        git checkout -b create-full-app
    查看分支:
        git branch

    删除本地分支
    git branch -d localbranchName
    删除远程分支
    git push origin --delete remoteBranchName

    合并分支
    git merge localbranchName

    不监听文件权限变化
    git config --add core.filemode false
```

## npm(cli)
```
    # 环境配置: nodejs yarn

    #获取安装脚本
    npm install -g dream-cli
```

## 前端app项目(前端)

```
    # 环境配置: nodejs yarn

    #使用安装脚本安装react模版
    cli --bin create-react-app
```

## npm项目(前端)

```
    # 环境配置: nodejs yarn
    #使用安装脚本安装ESModule模版
    cli --bin create-npm-app
```

## SSE项目(前端、后端、sse)

```
    # 环境配置: nodejs yarn

    #使用安装脚本安装react、 sse模版
    cli --bin create-sse-app
```

## docker-compose项目(docker)
```
    # 环境配置: docker docker-compose

    #使用安装脚本安装docker
    cli --bin create-docker-server
```

## full项目(前端、后端、sse、docker)
```
    # 环境配置: nodejs yarn docker docker-compose

    # 安装docker-compose 
        docker-compose up -d --build

    # 安装项目
    cli --bin create-full-app
```