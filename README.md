# vue3Music
Mock NeteaseCloudMusic by vite+vue3+typescript


## 目录结构

``` TODO:
.
│───commands 	    // 命令工具
│───config            // 配置文件
│───node_modules   // 依赖
│───dist    	   // 打包目录
│───postcss.config.js  // postcss-loader配置
│───.babelrc       // babel配置  
│───.editorconfig  // 格式化代码设置   
│───.eslintrc.json // 代码风格设置
│───.gitignore     // 提交文件过滤
│───package.json   // 包文件
│───config
│   │───config.js          // 所有活动公用配置
│   │───createMock.js      // 自动创建mock
│   │───env.js             // 执行路径解析
│   │───alias.js           // 模块路径简化
│   │───rules.js           // 文件处理规则
│   │───pbjs.js            // proto文件处理规则
│   │───webpack.common.js  // 公用配置
│   │───webpack.dev.js     // 开发环境配置
│   │───webpack.prod.js    // 生产环境配置
│   └───webpack.server.js  // 热更新环境配置
│───assets
│   │───style      // 公用scss和css
│   │───img        // 公用图片
│   └───utils      // 公用工具代码
│
│───static
│   │───plugins    // 公用插件
│   │   └───文件夹  // 可能包含插件图片样式等
│   └───libs       // 公用库
│       └───zepto.min.js     // 操作库
│
└───entry(mizhua|xiaohuxi|miya)
    │───init       // 初始模板项目,拷贝一份修改名字使用
    └───项目文件夹  // 页面部分公用组件
        │───pb         // 项目proto文件
        │───style      // 项目scss和css
        │───img        // 项目图片
        │───pages      // 项目页面
        └───js         // 项目业务代码
```


## sciprts

### dev 热更新  
```
yarn dev
```

### beta 打包，保留一些debug
```
yarn beta
```

### prod 线上打包
```
yarn prod
```

### tiny 图片压缩
```
yarn tiny
```

### mock 接口模拟
```
yarn mock (apiFile)
```
可指定生成某一具体接口文件的模拟数据, 否则模拟全部数据

### api 生成接口
```
yarn api
```
根据api/apiConf.json, 自动生成接口定义, 包含接口interaface 