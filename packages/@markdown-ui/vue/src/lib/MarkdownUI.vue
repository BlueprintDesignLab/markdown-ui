<template>
  <div ref="container" class="widget-container">
    <div v-html="html"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits, defineProps } from 'vue'
import Widget from './widgets/Widget.vue'

interface MarkdownUIProps {
  html: string
}

interface MarkdownUIEvents {
  widgetEvent: [data: any]
}

defineProps<MarkdownUIProps>()
const emit = defineEmits<MarkdownUIEvents>()

const container = ref<HTMLDivElement>()

let MarkdownUIWidgetElement: typeof HTMLElement | undefined

if (typeof HTMLElement !== 'undefined') {
  MarkdownUIWidgetElement = class extends HTMLElement {
    private vueApp: any = null
    private mountPoint: HTMLElement | null = null

    connectedCallback() {
      const id = this.getAttribute('id') || ''
      const content = this.getAttribute('content') || ''

      this.innerHTML = ''
      const div = document.createElement('div')
      this.appendChild(div)
      this.mountPoint = div
      
      import('vue').then(({ createApp }) => {
        this.vueApp = createApp(Widget, { id, content })
        this.vueApp.mount(div)
      })
    }

    disconnectedCallback() {
      if (this.vueApp && this.mountPoint) {
        this.vueApp.unmount()
        this.vueApp = null
        this.mountPoint = null
      }
    }
  }

  if (typeof window !== 'undefined' && !customElements.get('markdown-ui-widget')) {
    customElements.define('markdown-ui-widget', MarkdownUIWidgetElement)
  }
}

const handleWidgetEvent = (e: Event) => {
  const customEvent = e as CustomEvent<{id: string, value: unknown}>
  emit('widgetEvent', customEvent)
}

onMounted(() => {
  if (container.value) {
    container.value.addEventListener('widget-event', handleWidgetEvent)
  }
})

onUnmounted(() => {
  if (container.value) {
    container.value.removeEventListener('widget-event', handleWidgetEvent)
  }
})
</script>
