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
			style="display: flex; align-item: center; box-sizing: border-box"
		>
			<n-card
				content-style="padding:0"
				class="layout-aside m-tb-8 m-l-8 m-r-6 border-radius-4"
				style="height: calc(100% - 16px)"
			>
				<div
					class="
						p-lr-12 p-tb-9
						border-bottom-1
						flex flex-row-center flex-col-between
					"
				>
					<span class="text-primary text-link">笔记列表</span>
					<n-icon
						@click="addFile"
						class="text-primary text-link"
						size="18"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 20 20"
						>
							<g fill="none">
								<path
									d="M6 10a.5.5 0 0 1 .5-.5h3v-3a.5.5 0 0 1 1 0v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3A.5.5 0 0 1 6 10z"
									fill="currentColor"
								></path>
								<path
									d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-1a7 7 0 1 1 0-14a7 7 0 0 1 0 14z"
									fill="currentColor"
								></path>
							</g></svg
					></n-icon>
				</div>
				<div
					class="file-list layout-scroll flex flex-wrap"
					style="
						overflow-y: auto;
						height: calc(100% - 170px);
						background-color: #f8f8f8;
					"
				>
					<div
						class="
							flex flex-wrap flex-col-center
							file-item
							font-line-1
							text-link text-333
							p-tb-8 p-lr-8
							m-l-8 m-t-8
							bg-white
						"
						@click="
							() => {
								getFileData(file, idx)
							}
						"
						:style="
							idx === currentFileIndex
								? 'box-shadow:1px 1px 8px #80d0ff;width: 104px;height:140px;border-radius:14px'
								: 'box-shadow:1px 1px 8px #ddd;width: 104px;height:140px;border-radius:14px'
						"
						v-for="(file, idx) in fileList"
						:key="idx"
					>
						<div>
							<n-image
								:preview-disabled="true"
								width="100"
								src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
							/>
						</div>
						<div class="flex">
							<n-input
								style="--border: none"
								maxlength="10"
								size="small"
								:default-value="
									fileList[idx].replace(/\..*$/, '')
								"
								:placeholder="fileList[idx]"
								@blur="
									(e) => {
										handlerFileRename(idx, e.target.value)
									}
								"
							></n-input>
							<n-popconfirm
								@positive-click="handleDelPositiveClick(file)"
								negative-text="取消"
								positive-text="确定"
							>
								<template #trigger>
									<n-button text class="m-l-2">
										<n-icon size="16">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												xmlns:xlink="http://www.w3.org/1999/xlink"
												viewBox="0 0 512 512"
											>
												<path
													d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z"
													fill="currentColor"
												></path>
											</svg>
										</n-icon>
									</n-button>
								</template>
								确定删除该文件吗？
							</n-popconfirm>
						</div>
					</div>
				</div>
			</n-card>
			<n-card
				class="layout-sec m-tb-8 m-r-8 width-full"
				content-style="padding:0"
			>
				<v-md-editor
					v-model="fileData"
					height="100%"
					@save="
						(text) => {
							saveFile(fileList[currentFileIndex], text)
						}
					"
				></v-md-editor>
			</n-card>
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
import { ref, defineComponent, watch, reactive } from 'vue'
import { zhCN, dateZhCN, useMessage } from 'naive-ui'
import useFileCtrl from '../api/file'
export default defineComponent({
	name: 'Layout',
	setup(props, ctx) {
		const newFileIndex = ref(0)
		const firstLoad = ref(true)
		const text = ref('')
		const theme = ref(),
			message = useMessage(),
			locale = ref(),
			dateLocale = ref(),
			lang = ref('中文(CN)'),
			title = ref('test'),
			fileData = ref('')
		const handleUpdateLang = (lang: '中文(CN)' | '英文(EN)') => {
			message.info(lang)
			locale.value = lang == '中文(CN)' ? zhCN : null
			dateLocale.value = lang == '中文(CN)' ? dateZhCN : null
		}
		const handleThemeChange = (theme: boolean) => {
			message.info(theme ? 'Dark' : 'Light')
			ctx.emit('handleThemeChange', theme)
		}
		const handleDelPositiveClick = async (name: string) => {
			const res = await File.remove(name)
			if (res.data === 'ok') {
				message.success('删除成功')
				getFileList()
			}
		}
		const handlerFileRename = async (idx: number, newName: string) => {
			if (!newName) return message.warning('文件名不能为空')
			if (fileList.value[idx] === newName) return
			const res = await File.rename(fileList.value[idx], newName)
			console.log(res)
			fileList.value[idx] = newName
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
		const fileList = ref()
		const currentFileIndex = ref(-1)

		const File = new useFileCtrl()
		// ipcRenderer.on('writeFile-res', (event, msg: string) => {
		// 	if (!state.shouldRefreshFileList) return
		// 	return getFileList()
		// })
		// ipcRenderer.on(
		// 	'readFileList-res',
		// 	(event, res: { msg: string; list: string[] }) => {
		// 		fileList.value = res.list
		// 		if (firstLoad.value) {
		// 			getFileData(fileList.value[currentFileIndex.value])
		// 			firstLoad.value = false
		// 		}
		// 	}
		// )
		// ipcRenderer.on(
		// 	'readFileData-res',
		// 	(event, res: { msg: string; data: any }) => {
		// 		fileData.value = res.data
		// 			.replace(/"/g, '')
		// 			.replace(/\\n/g, '\n')
		// 	}
		// )
		const getFileList = async () => {
			const res = await File.list()
			console.log(res)
			fileList.value = res.data
			if (firstLoad.value) {
				getFileData(fileList.value[0], 0)
				firstLoad.value = false
			}
		}
		const getFileData = async (name: string, idx: number) => {
			//if (idx !== currentFileIndex.value) saveFile(fileData.value)
			if (idx === currentFileIndex.value) return
			currentFileIndex.value = idx
			const res = await File.read(name)
			fileData.value = res.data
		}

		getFileList()
		const saveFile = async (
			name: string,
			text: string,
			isCreate?: boolean
		) => {
			if (!text && !isCreate) return message.warning('无保存内容')
			await File.write(name, text)
			if (!isCreate) return message.success('保存成功')
			getFileList()
		}
		const addFile = () => {
			saveFile(`新建笔记${++newFileIndex.value}.md`, '', true)
		}
		return {
			lang,
			zhCN,
			dateZhCN,
			handleUpdateLang,
			theme,
			handleThemeChange,
			railStyle,
			saveFile,
			fileList,
			getFileData,
			text,
			fileData,
			currentFileIndex,
			handleDelPositiveClick,
			handlerFileRename,
			addFile,
		}
	},
})
</script>

<style scoped>
</style>
