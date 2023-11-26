<template>
	<div>
		<div v-for="item in items" :key="item.id">
			{{ item }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const items = ref([{ id: 1 }]);
</script>

<style scoped></style>
