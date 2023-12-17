import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import postCssPxToRem from 'postcss-pxtorem';
import AutoImport from 'unplugin-auto-import/vite';
const resolve = (dir) => path.resolve(__dirname, dir);
export default ({ mode }) => {
	// 获取环境变量
	const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
	console.log('envdev', env);
	return defineConfig({
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
			vue(),
			// 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
			// 还可配置entry入口文件， inject自定义注入数据等
			createHtmlPlugin(),
			Components({
				resolvers: [VantResolver()],
			}),
		],
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					additionalData: `@import "${resolve('src/assets/styles/index.less')}";`,
				},
			},
			postcss: {
				plugins: [
					postCssPxToRem({
						rootValue({ file }) {
							return file.indexOf('vant') !== -1 ? 37.5 : 75;
						},
						propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
					}),
				],
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
