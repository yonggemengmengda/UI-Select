<template>
	<n-config-provider :theme="theme" style="height: 100%">
		<n-message-provider>
			<Layout @handleThemeChange="handleThemeChange" />
		</n-message-provider>
	</n-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Layout from '@/components/Layout.vue'
import { darkTheme } from 'naive-ui'
export default defineComponent({
	name: 'App',
	components: {
		Layout,
	},
	setup: () => {
		const theme = ref()
		const handleThemeChange = (dark: boolean) => {
			theme.value = dark ? darkTheme : null
		}
		return {
			theme,
			handleThemeChange,
		}
	},
})
</script>

<style>
html,
body,
#app {
	height: 100%;
}
.layout-wrap {
	height: 100%;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	margin: 0 auto;
}
.layout-content {
	background-color: #ececec;
	width: 100%;
	height: 100%;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	position: relative;
	margin-bottom: -1px;
}
.layout-header {
	display: flex;
	padding: 0 12px;
	align-items: center;
	justify-content: end;
	height: 50px;
	border-top: 1px solid rgb(235, 235, 235);
	border-bottom: 1px solid rgb(235, 235, 235);
	box-shadow: 0px 2px 12px #e5e5e5;
	background-color: #fff;
}
.layout-footer {
	height: 50px;
	padding: 0 12px;
	border-top: 1px solid rgb(235, 235, 235);
	box-shadow: 0 -2px 12px #e5e5e5;
	display: flex;
	background-color: #fff;
}
</style>
