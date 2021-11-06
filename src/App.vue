<template>
  <div id="app">
    <div class="PCContainer" v-if="$device == 'PC'">
      <el-container class="container">
        <el-aside class="aside" v-show="showSummary">
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
        <transition name="el-zoom-in-left">
          <el-aside width="80vw" class="aside" v-show="showSummary">
            <DirectoryTree
              url="https://api.github.com/repos/v012345/notebook/contents"
              @done="getReady"
              @title="setTitle"
            ></DirectoryTree>
          </el-aside>
        </transition>
        <el-container>
          <el-header class="header">
            <el-row class="row">
              <el-col :span="3">
                <div class="icon" @click="showSummary = !showSummary">
                  <li
                    :class="
                      showSummary
                        ? 'el-icon-circle-close'
                        : 'el-icon-circle-plus-outline'
                    "
                  ></li>
                </div>
              </el-col>
              <el-col :span="19"
                ><transition name="el-fade-in-linear"
                  ><h1 class="title" v-show="!showSummary">
                    {{ title }}
                  </h1></transition
                >
              </el-col>
              <el-col :span="2">
                <transition name="el-fade-in-linear">
                  <el-avatar
                    class="avatar"
                    v-show="!showSummary"
                  ><img src="./assets/no.jpg" alt=""></el-avatar>
                </transition>
              </el-col>
            </el-row>
          </el-header>
          <el-main
            v-show="!showSummary"
            element-loading-background="rgba(255, 255, 255, 0.1)"
            v-loading="loading"
            class="main"
          >
            <Markdown @done="closeLoading"></Markdown>
          </el-main>
        </el-container>
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
    setTitle(title) {
      this.title = title;
      this.showSummary = false;
    },
    closeLoading() {
      this.loading = false;
    },
  },
  data() {
    return {
      loading: false,
      showSummary: true,
      title: "",
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
  .aside {
    padding-left: 10px;
    padding-top: 10px;
    padding-right: 10px;
    overflow-y: overlay;
    background-color: rgb(233, 233, 233);
  }
  .main {
    overflow: scroll;
    padding-top: 0;
    /deep/ img {
      max-width: 100%;
    }
  }
}
.mobileContainer {
  .container {
    .header {
      padding-top: 10px;
      border-bottom: #e6e6e667 2px solid;
      .row {
        .title {
          text-align: center;
          margin-top: 0.5rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      /deep/ .el-avatar{
        width: 2.2rem;
        height: 2.2rem;
      }
        .icon {
          font-size: 2.2rem;
          color: #cccccc;
        }
      }
    }
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
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgb(233, 233, 233);
}

::-webkit-scrollbar-thumb {
  background-color: #cacaca;
  border-radius: 4px;
  // border: 2px solid #ffffff;
}
</style>


