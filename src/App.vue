<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="left">
      <ol>
        <li
          v-for="(article, index) in articles"
          :key="index"
          @click="showArticle(article.url)"
        >
          {{ article.name.replace(/\.md/, "") }} - {{ article.size }} bytes
        </li>
      </ol>
    </div>

    <div class="right">
      <div v-html="markdownToHtml"></div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import marked from "marked";
import "highlight.js/styles/default.css";
import hljs from "highlight.js";

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      articles: null,
      markdown: "",
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
    showArticle(url) {
      this.axios.get(url).then((response) => {
        // console.log(response.data.download_url)
        this.axios
          .get(response.data.download_url)
          .then((response) => (this.markdown = response.data));
      });
    },
  },
  mounted() {
    this.axios
      .get("https://api.github.com/repos/v012345/notebook/contents")
      .then((response) => {
        this.articles = response.data;
        if (this.articles) {
          this.axios.get(this.articles[0].url).then((response) => {
            this.axios
              .get(response.data.download_url)
              .then((response) => (this.markdown = response.data));
          });
        }
      });
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


