<template>
  <div class="Markdown">
    <transition name="el-fade-in-linear">
      <div v-show="show" v-html="markdownToHtml"></div>
    </transition>
  </div>
</template>

<script>
import marked from "marked";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default {
  name: "Markdown",
  components: {
    // HelloWorld
  },
  beforeMount() {
    this.$bus.$on("download_url", (url) => {
      this.loading = true;
      this.show = false;
      setTimeout(() => {
        this.axios.get(url).then((response) => {
          this.markdown = response.data;
          this.loading = false;
          this.show = true;
          this.$emit("done");
        });
      }, 300);
    });
  },
  data() {
    return {
      loading: false,
      markdown: "# v012345.github.io",
      show: true,
    };
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
  watch: {},
  computed: {
    markdownToHtml() {
      return marked(this.markdown);
    },
  },
};
</script>

<style lang="less" scoped>
.Markdown {
  /deep/ pre {
    background-color: #e0e0e075;
    padding: 0.5rem;
    border-radius: 0.1rem;
  }
}
</style>