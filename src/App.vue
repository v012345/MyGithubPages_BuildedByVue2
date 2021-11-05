<template>
  <div id="app">
    <div class="PCContainer" v-if="$device == 'PC'">
      <el-container class="container">
        <el-aside class="aside">
          <DirectoryTree
            url="https://api.github.com/repos/v012345/notebook/contents"
            @done="getReady"
          ></DirectoryTree>
        </el-aside>

        <el-main
          element-loading-background="rgba(255, 255, 255, 0.1)"
          v-loading="loading"
          class="main"
        >
          <Markdown @done="closeLoading"></Markdown>
        </el-main>
      </el-container>
    </div>

    <!-- mobile -->
    <div class="mobileContainer" v-if="$device == 'mobile'">
      <el-container class="container">
        <el-header class="header" height="auto">
          <DirectoryTree
            url="https://api.github.com/repos/v012345/notebook/contents"
            @done="getReady"
          ></DirectoryTree>
        </el-header>

        <el-main
          element-loading-background="rgba(255, 255, 255, 0.1)"
          v-loading="loading"
          class="main"
        >
          <Markdown @done="closeLoading"></Markdown>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import DirectoryTree from "./components/DirectoryTree.vue";
import Markdown from "./components/Markdown.vue";
export default {
  name: "App",
  components: { DirectoryTree, Markdown },
  beforeMount() {
    this.fullLoading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0)",
    });
  },
  mounted() {
    this.$bus.$on("download_url", () => {
      this.loading = true;
    });
  },
  methods: {
    getReady() {
      this.fullLoading.close();
    },
    closeLoading() {
      this.loading = false;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>
<style lang="less" scoped>
.PCContainer {
  .container {
    height: 100vh;
    // border: 1px green solid;
    .aside {
      // border: 1px blue solid;
      // margin-right: 10px;
      margin-left: 10px;
      padding-top: 10px;
      padding-right: 10px;
      overflow-y: overlay;
    }
    .main {
      overflow: scroll;
      // border: 1px red solid;
      padding-top: 0;
    }
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
    background-color: #e7e7e7;
    border-radius: 10px;
    border: 2px solid #ffffff;
  }
}
.mobileContainer {
  width: 100vw;
  /deep/ img {
    max-width: 100%;
  }
  .main {
    max-width: 100%;
    //  overflow-x: hidden;
    .Markdown {
      /deep/ * {
        //  white-space: nowrap;
        word-break: break-all;
      }
    }
  }
}
</style>


