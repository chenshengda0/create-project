### 链上钱包私钥跨多设备使用的问题( 其它问题大部分应该是UI需要做调整，功能基本不用怎么做了 )
```
在导入私钥或助记词之前，判断了服务端返回的地址有没有被绑定，在这里在获取一下账户绑定的所有地址，如果有当前添加的地址移除前面的判断即可
```

### 多签项目技术栈

```
react + tsx + web3
```

### 包管理命令

```
这里使用的yarn 
yarn                                                                    更新包
yarn start                                                              启动项目
yarn build                                                              编译成js页面
```


### 多签项目目录结构

```
├── public                                                              项目入口
│   └── mui                                                             直接在项目index.html 引入的移动端mui库
│       ├── css
│       ├── fonts
│       └── js
└── src                                                                 项目目录
    ├── @Types                                                          全局类型定义
    ├── Common                                                          通用函数（aes加解密、节流函数、休眠函数）
    ├── Components                                                      全局组件
    │   ├── Header                                                      页面头部组件(带返回按钮与不带返回按钮)
    │   │   └── static
    │   ├── Popover                                                     通用弹出层( 提交失、提交成功、等待提交中组件 )
    │   │   └── static
    │   └── Routers                                                     自定义路由（每条链一个路由，使用不同的链注入不同的参数用于后续页面实例化web3参数，或其它需要根据不同的链定制的参数）
    │       └── static
    ├── Config                                                          通用配置（比如通用的配置，菜单啥的，目前是写死在页面app.tsx）
    ├── Pages                                                           页面组件( 在app.tsx调用 )
    │   ├── Home                                                        项目初始页面
    │   │   └── static
    │   ├── ImportPrivate                                               导入私钥（目前只对接了tron私钥导入，其它的链原理相同）
    │   │   └── static
    │   ├── MoneyInfo                                                   链首页
    │   │   └── static
    │   ├── Sign                                                        多签页面
    │   │   └── static
    │   └── Transfer                                                    转出（提交多签交易页面）
    │       ├── Drawer
    │       └── static
    └── Redux                                                           状态管理库
        ├── Actions
        │   └── PrivateStructActions                                    调用store方法修改store
        └── Reduces
            ├── PrivateStructReducer                                    store存储私钥信息（做了本地化localStorage，其它视情况而定，基本不需要额外本地化处理）
            └── RandomKeyReducer                                        store存储AES密钥、盐值（做了本地化localStorage，其它视情况而定，基本不需要额外本地化处理）

```

### 多签项目主要的几个文件说明

```
/src/index.tsx                                                              项目入口
/src/App.tsx                                                                路由入口
/src/init-config                                                            此项目未使用，可以做些环境配置的初始化工作，使用ts-node调用

.env                                                                        项目环境变量

/config-overrides.js                                                        覆盖react框架内置配置(此处是因为高版本react没有nodeJS的部分库)

tsconfig                                                                    ts配置

package.json                                                                包管理
```

### package说明

```
antd                                                                        
inquirer                                                                    命令行参数
js-base64、js-cookie、jsonwebtoken                                           访问后端接口相关的库
qrcode.react                                                                二维码生成
react-copy-to-clipboard                                                     复制
react-router-dom                                                            路由管理
react-typist                                                                流式打字
styled-components                                                           内嵌css库
tronweb                                                                     波场web3库(TRON) 
web3                                                                        web3库(BSC、ETH) 
```

### 风格

```
基本都是使用类组件(好像没使用页面函数组件风格，看着清晰点)，高阶组件嵌套组件的方式( 在高阶组件中做些初始化工作，加载图，初始化参数，初始化请求之类的工作，做完判断状态是否显示页面或加载图)
基本上一个文件对应一个页面（css 通过styled-components以组件的方式写入）
UI素材啥的都是在文件夹下创建static
引入方式大概是使用每个文件夹下创建一个index.tsx，导入文件夹即可
弹出层样式是使用antd drawer，使用一个数字做状态管理，比如 2^0, 2^1， 2^2 分别管理三个弹出层
```

### react 学习视频

1. [decloud mui 文档](https://dev.dcloud.net.cn/mui/ui/)
2. [UI组件文档](https://ant.design/components/overview)
3. [tronWeb](https://cn.developers.tron.network/reference/isaddress)
4. [web3](https://learnblockchain.cn/docs/web3.js/index.html)
5. [REACT框架](https://www.bilibili.com/video/BV1wy4y1D7JT/?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click&vd_source=bc7276ac46120ca2832695c9d18e89ad)

