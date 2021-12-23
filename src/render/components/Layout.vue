<template>
	<div class="layout-wrap">
		<div class="layout-header">
			<n-space justify="end">
				<n-switch
					checked-value="英文(EN)"
					unchecked-value="中文(CN)"
					v-model:value="lang"
					:round="false"
					:rail-style="railStyle"
					@update:value="handleUpdateLang"
				>
					<template #checked>EN</template>
					<template #unchecked>CN</template>
				</n-switch>
				<n-switch
					v-model:value="theme"
					:round="false"
					:rail-style="railStyle"
					:unchecked-value="null"
					@update:value="handleThemeChange"
				>
					<template #checked>Dark</template>
					<template #unchecked>Light</template>
				</n-switch>
			</n-space>
		</div>
		<div
			class="layout-content"
			style="
				align-item: center;
				padding: 120px 20px 0;

				box-sizing: border-box;
			"
		>
			<v-md-editor v-model="text" height="400px"></v-md-editor>
			<n-card v-if="false">
				<n-empty description="做什么还没想好，先搭个骨架">
					<template #icon>
						<n-icon>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 16 16"
							>
								<g fill="none">
									<path
										d="M2.001 4.001a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6.13l-1-1.695V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.307l-.04.067c-.168.284-.26.604-.267.932H4a2 2 0 0 1-2-2V4.001z"
										fill="currentColor"
									></path>
									<path
										d="M7.192 11.5l.59-1h-.779a.5.5 0 0 0 0 1h.19z"
										fill="currentColor"
									></path>
									<path
										d="M8.962 8.5l.308-.522a1.96 1.96 0 0 1 .395-.477H7.003a.5.5 0 0 0 0 1h1.959z"
										fill="currentColor"
									></path>
									<path
										d="M5.5 5A.75.75 0 1 1 4 5a.75.75 0 0 1 1.5 0z"
										fill="currentColor"
									></path>
									<path
										d="M4.75 8.752a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5z"
										fill="currentColor"
									></path>
									<path
										d="M5.5 11A.75.75 0 1 1 4 11a.75.75 0 0 1 1.5 0z"
										fill="currentColor"
									></path>
									<path
										d="M7.003 4.5a.5.5 0 0 0 0 1h4.474a.5.5 0 1 0 0-1H7.003z"
										fill="currentColor"
									></path>
									<path
										d="M10.735 8.035c.25-.066.525-.04.766.095c.155.086.281.21.368.356l3.002 5.09c.134.228.16.483.095.716a.957.957 0 0 1-.462.579c-.152.084-.325.13-.502.13H7.998c-.28 0-.531-.11-.711-.286a.93.93 0 0 1-.158-1.139l3.002-5.09a.988.988 0 0 1 .604-.451zm.765 1.467a.5.5 0 0 0-1 0v1.996a.5.5 0 0 0 1 0V9.502zM11 14.5a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5z"
										fill="currentColor"
									></path>
								</g>
							</svg>
						</n-icon>
					</template>
					<template #extra>
						<n-button size="small">了解</n-button>
					</template>
				</n-empty>
			</n-card>
		</div>
		<div class="layout-footer"></div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { zhCN, dateZhCN, useMessage } from 'naive-ui'
export default defineComponent({
	name: 'Layout',
	setup(props, ctx) {
		const theme = ref(),
			message = useMessage(),
			locale = ref(),
			dateLocale = ref(),
			lang = ref('中文(CN)')
		const handleUpdateLang = (lang: '中文(CN)' | '英文(EN)') => {
			message.info(lang)
			locale.value = lang == '中文(CN)' ? zhCN : null
			dateLocale.value = lang == '中文(CN)' ? dateZhCN : null
		}
		const handleThemeChange = (theme: boolean) => {
			message.info(theme ? 'Dark' : 'Light')
			ctx.emit('handleThemeChange', theme)
		}
		const railStyle = ({
			focused,
			checked,
		}: {
			focused: boolean
			checked: boolean
		}) => {
			const style: { background?: string; boxShadow?: string } = {}
			if (checked) {
				style.background = '#999'
				if (focused) {
					style.boxShadow = '0 0 0 2px #d0305040'
				}
			} else {
				style.background = '#dbdbdb'
				if (focused) {
					style.boxShadow = '0 0 0 2px #2080f040'
				}
			}
			return style
		}
		return {
			lang,
			zhCN,
			dateZhCN,
			handleUpdateLang,
			theme,
			handleThemeChange,
			railStyle,
		}
	},
})
</script>

<style scoped>
</style>
