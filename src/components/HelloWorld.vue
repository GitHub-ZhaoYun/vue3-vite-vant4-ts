<script setup lang="ts">
	import { ref } from 'vue';

	defineProps<{ msg: string }>();
	let process = import.meta.env.VITE_APP_BASE_API;
	const count = ref(0);
	count.value = 2;
	count.value = 3;
	const date = ref('');
	const show = ref(false);

	const formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
	const onConfirm = (value: Date) => {
		show.value = false;
		date.value = formatDate(value);
	};
</script>

<template>
	<div class="card">
		<div>测试的代码01</div>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="primary">主要按钮</van-button>
		<van-cell title="单元格" value="内容" label="描述信息" />
		<button type="button" @click="count++">count is {{ count }}</button>
		<p>
			{{ process }}
			{{ process }}
		</p>
	</div>
	<van-cell title="选择单个日期" :value="date" @click="show = true" />
	<van-calendar v-model:show="show" @confirm="onConfirm" />
</template>

<style scoped lang="less">
	.read-the-docs {
		color: #888;
	}
	.font_class {
		width: 30px;
		height: 30px;
		background-color: aquamarine;
	}
</style>
