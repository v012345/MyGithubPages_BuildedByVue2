<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <div class="left">
      <ol>
        <li
          v-for="(article, index) in articles"
          :key="index"
          :class="{ active: article.activated }"
          @click="showArticle(article.url, index)"
        >
          {{ article.name.replace(/\.md/, "") }} - {{ article.size }} bytes
        </li>
      </ol>
    </div>

    <div class="right">
      <Markdown :isLoading="isLoading" :markdown="markdown"></Markdown>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import marked from "marked";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import Markdown from "./components/Markdown.vue";

// import VueSpinners from "vue-spinners";
// import "vue-spinners/dist/vue-spinners.css";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Markdown,
  },

  data() {
    return {
      articles: [],
      markdown: "",
      isLoading: true,
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
  methods: {
    showArticle(url, index) {
      this.isLoading = true;
      this.articles.forEach((item) => {
        item.activated = false;
      });
      this.articles[index].activated = true;
      this.axios.get(url).then((response) => {
        // console.log(response.data.download_url)
        this.axios.get(response.data.download_url).then((response) => {
          this.markdown = response.data;
          this.isLoading = false;
        });
      });
    },
  },
  mounted() {
    this.axios
      .get("https://api.github.com/repos/v012345/notebook/contents")
      .then((response) => {
        if (response.data.length > 0) {
          this.articles = response.data.map((value) => {
            value.activated = false;
            return value;
          });
          this.articles[0].activated = true;
          this.axios.get(this.articles[0].url).then((response) => {
            this.axios
              .get(response.data.download_url)
              .then((response) => (this.markdown = response.data));
          });
        }
      });
    this.isLoading = false;
  },
  computed: {
    markdownToHtml() {
      return marked(this.markdown);
    },
  },
};
</script>
<style lang="less" scoped>
#app {
  display: flex;

  .left {
    background-color: rgb(48, 48, 48);
    color: #ffffff;
    width: 28vw;
    margin-right: 2vw;
    font-size: 1.2rem;

    height: 100vh;
    overflow: auto;
    ol {
      li {
        cursor: pointer;
        margin-bottom: 10px;
        &:hover {
          color: rgb(73, 139, 214);
        }
        &:active {
          color: rgb(194, 23, 23);
        }
        &.active {
          color: greenyellow;
        }
      }
    }
  }
  .right {
    width: 70vw;
    height: 100vh;
    overflow: auto;
  }

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #707070 #ffffff;
  }

  /* Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #707070;
    border-radius: 10px;
    border: 2px solid #ffffff;
  }
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>


