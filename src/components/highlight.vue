<template>
  <div id="highlight_menu">
    <div
    v-show="showTools"
    class="tools"
    v-bind:style="{
    left: `${x}px`,
    top: `${y}px`
  }"
  @mousedown.prevent=""
  >
  <span
  class="item"
  @mousedown.prevent="handleAction('display')"
  style="backgorund-color:white;"
  >
  <img style="width:24px;height:24px;color: white;" href="../assets/view.png"/>
</span>
<span
class="item"
@mousedown.prevent="handleAction('highlight')"
>
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="#000000" d="M18.5,1.15C17.97,1.15 17.46,1.34 17.07,1.73L11.26,7.55L16.91,13.2L22.73,7.39C23.5,6.61 23.5,5.35 22.73,4.56L19.89,1.73C19.5,1.34 19,1.15 18.5,1.15M10.3,8.5L4.34,14.46C3.56,15.24 3.56,16.5 4.36,17.31C3.14,18.54 1.9,19.77 0.67,21H6.33L7.19,20.14C7.97,20.9 9.22,20.89 10,20.12L15.95,14.16" />
</svg>
</span>
</div>
<slot/>
</div>
</template>

<script>

import Jquery from 'jquery'

export default {
  name: 'HighlightComponent',
  data () {
    return {
      x: 0,
      y: 0,
      showTools: false,
      selectedText: ''
    }
  },

  computed: {
    highlightableEl () {
      return this.$slots.default[0].elm
    }
  },

  mounted () {
    window.addEventListener('mouseup', this.onMouseup)
  },

  beforeDestroy () {
    window.removeEventListener('mouseup', this.onMouseup)
  },

  methods: {
    onMouseup () {
      const selection = window.getSelection()
      const startNode = selection.getRangeAt(0).startContainer.parentNode
      const endNode = selection.getRangeAt(0).endContainer.parentNode
      if (!startNode.isSameNode(this.highlightableEl) || !startNode.isSameNode(endNode)) {
        this.showTools = false
        return
      }

      const { x, y, width } = selection.getRangeAt(0).getBoundingClientRect()
      if (!width) {
        this.showTools = false
        return
      }
      if(!(/^[a-zA-Z0-9]+$/.test(selection.toString()))){
        this.showTools = false
        alert('You can only highlight a word with no special charecters!')
        return
      }
      this.x =  -100 + x + (width / 2) - Jquery('#highlight_menu').width()/2
      this.y = -500 + y + Jquery('#highlight_menu').height() + 10
      this.showTools = true
      this.selectedText = selection.toString()
    },

    handleAction (action) {
      this.$emit(action, this.selectedText)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.tools {
  height: 30px;
  padding: 5px 10px;
  background: #333;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
}
  

.tools:after{
  content: '';
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
}
  

.item{
  color: #FFF;
  cursor: pointer;
}
  

.item path{
  fill: #FFF;
}

.item:hover path{
  fill: #1199ff;
}

.item:hover{
  color: #1199ff;
}

.item + .item{
  margin-left: 10px;
}

</style>