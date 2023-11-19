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

> package.json 添加了 "type": "module" 根目录下的 .js 配置文件一般都是commonjs模
> 块，需要命名为 .cjs。如：下面会讲到的eslintrc

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

## prettier

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
  "editor.formatOnSave": true
}
```

## Volar

> 使用vscode的小伙伴请注意，vue3项目就不要使用Vetur插件了，它不支持很多vue3特
> 性，会有很多红线警告。 请使用官方推荐插件Volar，现已更名为Vue Language
> Features，再搭配TypeScript Vue Plugin
