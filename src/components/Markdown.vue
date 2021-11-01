<template>
  <div>
    <loading
      :active="isLoading"
      :can-cancel="true"
      
      :is-full-page="false"
      backgroundColor="rgba(0,0,0,0.2)"
    />
    <div v-html="markdownToHtml"></div>
  </div>
</template>

<script>
import marked from "marked";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Markdown",
  components: {
    // HelloWorld,
    Loading,
  },
  props: ["isLoading", "markdown"],

  data() {
    return {};
  },
  created() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
  },

  computed: {
    markdownToHtml() {
      return marked(this.markdown);
    },
  },
};
</script>

<style>
</style>