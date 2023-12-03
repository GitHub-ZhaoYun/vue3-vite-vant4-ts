<script setup lang="ts">
	import { ref } from 'vue';

	defineProps<{ msg: string }>();
	let process = import.meta.env.VITE_APP_BASE_API;
	const count = ref(0);
	count.value = 2;
	count.value = 3;
</script>

<template>
	<div class="card">
		<div>测试的代码</div>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="primary">主要按钮</van-button>
		<van-cell title="单元格" value="内容" label="描述信息" />
		<button type="button" @click="count++">count is {{ count }}</button>
		<p>
			Edit 阿花送达
			<code>components/HelloWorld.vue</code> to test HMR
			<span>阿斯顿撒</span>
			{{ process }}
			{{ process }}
		</p>
		<span></span>
	</div>

	<p>
		Check out
		<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
		official Vue + Vite starter
	</p>
	<p>
		Install
		<a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
		in your IDE for a better DX
	</p>
	<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
	<span>adaw</span>
</template>

<style scoped>
	.read-the-docs {
		color: #888;
	}
</style>
