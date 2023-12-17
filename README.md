# Vue 3 + TypeScript + Vite + typescript

## Vite 创建项目

交互式：

```
$ npm create vite@latest
Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) y
✔ Project name: … vue3-vant-mobile
✔ Select a framework: › vue
✔ Select a variant: › vue-ts
```

或者一步到位式：

```
# npm 7+, extra double-dash is needed:
npm create vite@latest vue3-vant-mobile -- --template vue-ts
```

> 注意：Vite2 需要 Node.js 版本 >= 12.0.0；Vite3 需要 Node.js 版本 14.18+，16+。

> package.json 添加了 "type": "module" 根目录下的 .js 配置文件一般都是commonjs模块，需要命名为
> .cjs。如：下面会讲到的eslintrc

# 代码规范 (格式化、提示)

## eslint

---

```
# 自动生成配置文件并安装下面四个依赖
npx eslint --init

# 或者手动创建文件
# npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue -D
```

```
$ npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
✔ How would you like to use ESLint? · problems (选第二个)
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ What format do you want your config file to be in? · JavaScript
```

## prettier 需要安装 vscode prettier插件

---

> npm i prettier eslint-config-prettier eslint-plugin-prettier -D

-   创建 .prettierrc.cjs 文件

```
module.exports = {
	// 一行最多多少字符
	printWidth: 80,
	// 使用2个空格缩进
	tabWidth: 4,
	// 使用tab缩进，不使用空格
	useTabs: true,
	// 行尾需要分号
	semi: true,
	// 使用单引号
	singleQuote: true,
	// 对象的key仅在必要时使用引号
	quoteProps: "as-needed",
	// jsx不使用单引号，而使用双引号
	jsxSingleQuote: false,
	// 尾随逗号
	trailingComma: "es5",
	// 大括号内的收尾需要空格
	bracketSpacing: true,
	// 箭头函数，只有一个参数的时候，也需要括号
	arrowParens: "always",
	// 每个文件格式化的范围是文件的全部内容
	rangeStart: 0,
	rangeEnd: Infinity,
	// 不需要写文件开头的@prettier
	requirePragma: false,
	// 不需要自动在文件开头插入@prettier
	insertPragma: false,
	// 使用默认的折行标准
	proseWrap: "always",
	// 根据显示样式决定html要不要折行
	htmlWhitespaceSensitivity: "css",
	// 换行符使用lf
	endOfLine: "lf",
}

```

## 修改 .eslintrc.cjs 文件

```
// .eslintrc.cjs

module.exports = {
  root: true, // 停止向上查找父级目录中的配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier', // eslint-config-prettier 的缩写
  ],
  parser: 'vue-eslint-parser', // 指定要使用的解析器
  // 给解析器传入一些其他的配置参数
  parserOptions: {
    ecmaVersion: 'latest', // 支持的es版本
    parser: '@typescript-eslint/parser',
    sourceType: 'module', // 模块类型，默认为script，我们设置为module
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'], // eslint-plugin- 可以省略
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
```

## 保存文件自动格式化

```
// .vscode/settings.json

{
  // 保存时eslint自动修复错误
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  //保存自动格式化
  "editor.formatOnSave": true,
  //VS Code 将使用制表符·‘↹’进行缩进，而不是4个空格。
  "editor.insertSpaces": false,
  "editor.tabSize": 4
}
```

## Volar

> 使用vscode的小伙伴请注意，vue3项目就不要使用Vetur插件了，它不支持很多vue3特性，会有很多红线警告。
> 请使用官方推荐插件Volar，现已更名为Vue Language Features，再搭配TypeScript Vue Plugin

## Vue VSCode Snippets

> Vue VSCode Snippets 插件旨在为开发者提供最简单快速的生成 Vue 代码片段的方法，通过各种快捷键就可以
> 在 .vue 文件中快速生成各种代码片段。简直是 Vue3 开发必备神器。

-   新建一个.vue 文件，输入vbase 会提示生成的模版内容；
-   输入vfor 快速生成v-for 指令模版；
-   输入v3onmounted 快速生成onMounted 生命周期函数；

## 配置 tsconfig

### 文件 tsconfig.json

> 安装 types/node npm i @types/node -D // @types/node 就是Node.js的类型提示模块，安装之后TS就可以识
> 别Node.js中的API和数据类型了。然后我们需要创建一个 tsconfig.json 文件，用来告诉TS如何编译我们的代
> 码

```
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "src/vite-env.d.tsd.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

### 文件 tsconfig.node.json

```
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
  },
  "include": ["vite.config.ts", "src/vite-env.d.ts"]
}

```

### 文件 src下创建 vite-env.d.ts

```
/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_ENV: string;
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_BASE_API: string;
	readonly VITE_BUILD_SOURCEMAP: string;
	readonly VITE_BUILD_DROP_CONSOLE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

```

### 根目录下创建 .env.development

```
VITE_ENV = 'DEV'
VITE_APP_TITLE = '测试title' // index.html中展示title显示
VITE_BUILD_SOURCEMAP = 'false' // 打包是否生成sourcemap文件
VITE_BUILD_DROP_CONSOLE = 'false' // 打包后是否去除掉 console.log
VITE_APP_BASE_API=https://apiqlw.t.nxin.com
```

### 根目录下创建 .env.production

```
VITE_ENV = 'PROD'
VITE_APP_TITLE = '测试title' // index.html中展示title显示
VITE_BUILD_SOURCEMAP = 'true' // 打包是否生成sourcemap文件
VITE_BUILD_DROP_CONSOLE = 'true' // 打包后是否去除掉 console.log
VITE_APP_BASE_API=https://apiqlw.nxin.com
```

### 根目录下创建 .env.uat

```
VITE_ENV = 'UAT'
VITE_APP_TITLE = '测试title' // index.html中展示title显示
VITE_BUILD_SOURCEMAP = 'false' // 打包是否生成sourcemap文件
VITE_BUILD_DROP_CONSOLE = 'false' // 打包后是否去除掉 console.log
VITE_APP_BASE_API=https://apiqlw.t.nxin.com
```

### 配置 package.json

```
"dev": "vite --mode development",
"prod": "vite --mode production",
"build:dev": "vue-tsc && vite build --mode uat",
"build": "vue-tsc && vite build --mode production",
```

### 定义process.env

> 完整的vite.config.ts 如下

```
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';
const resolve = (dir) => path.resolve(__dirname, dir);
export default ({ mode }) => {
	// 获取环境变量
	const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
	console.log('envdev', env);
	return defineConfig({
		plugins: [
			vue(),
			// 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
			// 还可配置entry入口文件， inject自定义注入数据等
			createHtmlPlugin(),
		],
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					additionalData: `@import "${resolve('src/assets/styles/index.less')}";`,
				},
			},
		},
		define: {
			'process.env': env,
		},
		// 配置别名
		resolve: {
			alias: {
				'@': resolve('src'),
			},
			// 导入时想要省略的扩展名列表
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		},
		build: {
			outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
			sourcemap: env.VITE_BUILD_SOURCEMAP === 'true', // 是否产生sourcemap文件
			// minify默认esbuild，esbuild模式下terserOptions将失效
			// vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
			minify: 'terser',
			terserOptions: {
				compress: {
					keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
					drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
					drop_debugger: true, // 去除 debugger
				},
			},
			chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
		},
	});
};

```

### index.html 中通过vite-plugin-html加载 其他js,ts,vue文件中可使用import.meta.env获取环境变量

> npm i vite-plugin-html -D

```
// vite.config.ts

import { createHtmlPlugin } from 'vite-plugin-html';

plugins: [
  // 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
  // 还可配置entry入口文件， inject自定义注入数据等
  createHtmlPlugin(),
]
```

```
<!-- index.html -->

<title><%- VITE_APP_TITLE %></title>
```

## CSS 预处理器

> npm i less -D创建src/styles文件夹 index.less 全局引入样式 在src/main.ts import
> '@/styles/index.less'; 创建 reset.css 格式化统一样式 详情见项目 在src/main.ts import
> '@/styles/reset.css全局使用自定义变量

```
// vite.config.ts

css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
      additionalData: `@import "${resolve(__dirname,'src/styles/index.less')}";`,
    },
  },
},

```

## 引入 vant

> npm i vant

### 按需引入组件样式

> 通过 npm 安装 npm i @vant/auto-import-resolver unplugin-vue-components -D

### 配置插件

```
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
// 配置后可在页面中直接引入vant的组件 无需特殊的导入
// 会在 components.d.ts文件中自动的写入使用的组件
// 注意：
// 1.Vant 中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件。在使用函数组件时，unplugin-vue-components 无法解析自动注册组件，导致 @vant/auto-import-resolver 无法解析样式，因此需要手动引入样式。
// 2.可以在项目的入口文件或公共模块中引入以上组件的样式，这样在业务代码中使用组件时，便不再需要重复引入样式了。
// 3.请避免同时使用「全量引入」和「按需引入」这两种引入方式，否则会导致代码重复、样式错乱等问题。
// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';

```

## rem

```
使用的插件是
npm install amfe-flexible --save
npm install postcss-pxtorem --save

配置规则 详情见链接 https://blog.csdn.net/Julylyna/article/details/129498394
import postCssPxToRem from "postcss-pxtorem";
export default defineConfig({
    plugins: [vue()],
    css: {
	    postcss: {
	      	plugins: [
	        	postCssPxToRem({
	          		rootValue({ file }) {
							return file.indexOf('vant') !== -1 ? 37.5 : 75;
						}, // 1rem，vant之外的使用75 vant采用37.5
	          		propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
	        	})
	      	]
	    }
    },
})


```

## 更换主题颜色

新建主题颜色 less 文件 vant-theme.less

```
:root {
  --van-primary-color: red;
}
```

在 vite.config.ts 中应用这个文件

> 注 此引用 还可以解决一个less文件在多个地方应用的 全局使用不用每个使用的地方单独饮用的问题

```
preprocessorOptions: {
	less: {
		javascriptEnabled: true,
		additionalData: `@import "${resolve('src/assets/styles/index.less')}";`,
	},
},

在通过设置不同的css样式 更改 主题色（通过不同的定义设置不同的样式 目前的能想到的）
document.documentElement.style.setProperty('--van-primary-color', 'green');
```

还可以通过vant的组件的方式

```
<van-config-provider
  :theme-vars="{ primaryColor: 'red' }"
  theme-vars-scope="global"
>
  ...
</van-config-provider>
```

## 自动导入API

前面介绍了一个自动按需引入组件的插件 unplugin-auto-import ，秉着能少写一行代码就少写一行代码的精神，
再介绍一个自动导入api的插件 unplugin-auto-import 😌

```
npm i unplugin-auto-import -D

// vite.config.ts

import AutoImport from 'unplugin-auto-import/vite';
```

```
// vite.config.ts
plugins: [
  AutoImport({
    imports: ['vue', 'vue-router'],
    // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
    dts: 'src/auto-import.d.ts',
    // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
    // 'vue-global-api'这个插件仅仅解决vue3 hook报错
    eslintrc: {
      enabled: true,
    },
  }),
]
```

```
// .eslintrc.cjs

extends: [
  // 解决使用自动导入api报错
  './.eslintrc-auto-import.json',
  // 单独解决使用vue api时报错
  // 'vue-global-api',
],
```

接下来就可以全局使用 vue、vue-router 相关 api，不用一个个手动导入了。哪些 api 可用请参考生成的
src/auto-import.d.ts 类型声明文件。
