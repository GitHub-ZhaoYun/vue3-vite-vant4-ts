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
