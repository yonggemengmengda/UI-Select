import { createApp } from 'vue'
import { create, NButton, NSpace, NConfigProvider, NCard, NMessageProvider, NSwitch, NEmpty, NIcon } from 'naive-ui'
import App from './App.vue'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import Prism from 'prismjs';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
VueMarkdownEditor.use(createLineNumbertPlugin())
VueMarkdownEditor.use(createCopyCodePlugin())
VueMarkdownEditor.use(createHighlightLinesPlugin())
const naive = create({
    components: [NButton, NSpace, NConfigProvider, NCard, NMessageProvider, NSwitch, NEmpty, NIcon]
})

createApp(App)
    .use(naive)
    .use(VueMarkdownEditor)
    .mount('#app')
