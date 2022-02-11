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
          class="article"
        >
          <Markdown @done="closeLoading"></Markdown>
        </el-main>
      </el-container>
    </div>

    <!-- mobile -->
    <div class="mobileContainer" v-if="$device == 'mobile'">
      <div class="container">
        <div class="aside" :class="{ hidden: !showSummary }">
          <DirectoryTree
            url="https://api.github.com/repos/v012345/notebook/contents"
            @done="getReady"
            @title="setTitle"
          ></DirectoryTree>
        </div>

        <el-container class="main" :class="{ show: !showSummary }">
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
              <el-col :span="19">
                <h1 class="title">{{ title }}</h1>
              </el-col>
              <el-col :span="2">
                <el-avatar class="avatar">
                  <img src="./assets/no.jpg" alt />
                </el-avatar>
              </el-col>
            </el-row>
          </el-header>
          <div @touchstart="touchstart" @touchend="touchend" class="articleContainer">
            <el-main
              class="article"
              element-loading-background="rgba(255, 255, 255, 0.1)"
              v-loading="loading"
            >
              <Markdown @done="closeLoading"></Markdown>
            </el-main>
          </div>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import DirectoryTree from "./components/DirectoryTree.vue";
import Markdown from "./components/Markdown.vue";
export default {
  name: "App",
  components: { DirectoryTree, Markdown },
  data() {
    return {
      loading: false,
      showSummary: true,
      title: "",
      startPoint: {
        x: null,
        y: null,
      },
    };
  },
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
    this.$Echo.channel(`broadcast-test`)
      .listen('Test', (e) => {
        console.log(e);
      });
  },
  watch: {},
  methods: {
    touchstart($event) {
      this.showSummary = false;
      this.startPoint.x = $event.changedTouches[0].screenX;
      this.startPoint.y = $event.changedTouches[0].screenY;
    },
    touchend($event) {
      $event.changedTouches[0].screenY;
      let offsetX = $event.changedTouches[0].screenX - this.startPoint.x;

      let offsetY = Math.abs(
        $event.changedTouches[0].screenY - this.startPoint.y
      );
      if (offsetY > 30) {
        return;
      }
      if (offsetX < 60) {
        return;
      }
      this.showSummary = true;
    },

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
};
</script>
<style lang="less" scoped>
.PCContainer {
  .container {
    height: 100vh;
    .aside {
      padding-left: 10px;
      padding-top: 10px;
      padding-right: 10px;
      overflow-y: overlay;
      background-color: rgb(233, 233, 233);
    }
    .article {
      overflow: scroll;
      padding-top: 0;
      /deep/ img {
        max-width: 100%;
      }
    }
  }
}

.mobileContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .container {
    display: flex;
    width: 180vw;
    .aside {
      box-sizing: border-box;
      height: 100vh;
      width: 80vw;
      padding-left: 10px;
      padding-top: 10px;
      padding-right: 10px;
      overflow-y: overlay;
      background-color: rgb(233, 233, 233);
      position: relative;
      transition: left 0.5s;
      left: 0vw;
      &.hidden {
        left: -80vw;
      }
    }
    .main {
      height: 100vh;
      position: relative;
      width: 100vw;
      left: 0vw;
      transition: left 0.5s;
      &.show {
        left: -80vw;
      }
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
          /deep/ .el-avatar {
            width: 2.2rem;
            height: 2.2rem;
          }
          .icon {
            font-size: 2.2rem;
            color: #cccccc;
          }
        }
      }
      .articleContainer {
        .article {
          word-break: break-all;
          height: 100vh;
          overflow: scroll;
          padding-top: 0;
          /deep/ img {
            max-width: 100%;
          }
        }
      }
    }
  }
}

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


