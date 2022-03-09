<template>
  <div
    class="DirectoryTree"
    element-loading-background="rgba(255, 255, 255, 0.1)"
    v-loading="false"
  >
    <transition name="el-zoom-in-top">
      <div>
        <el-input
          class="filter"
          placeholder="Filter keyword"
          v-model="filterText"
          prefix-icon="el-icon-search"
        ></el-input>
        <el-tree
          v-show="show"
          class="tree"
          :data="tree"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree"
          @node-click="emitUrl"
        ></el-tree>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  beforeMount() {
    function generateDirectoryTree(url, DirectoryTree, axios, callback) {
      axios.get(url).then((response) => {
        for (const [index, data] of response.data.entries()) {
          let node = {};
          node.id = data.sha;
          node.label = data.name.replace(/\.md/, "");
          node.type = data.type;
          if (data.type == "file") {
            node.download_url = data.download_url;
            DirectoryTree.push(node);
          }
          if (data.type == "dir" && data.name != "assets") {
            node.children = [];
            generateDirectoryTree(data.url, node.children, axios, () => { });
            DirectoryTree.push(node);
          }
          if (index == response.data.length - 1) {
            callback();
          }
        }
      });
    }
    new Promise((resolve) => {
      generateDirectoryTree(this.url, this.tree, this.axios, resolve);
    }).then(() => {
      this.$emit("done");
      this.show = true;
    });
  },
  mounted() { },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    emitUrl(node) {
      if (node.type == "file") {
        this.$bus.$emit("download_url", node.download_url);
        this.$emit("title", node.label);
      }
    },
  },
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filterText: "",
      tree: [],
      show: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.DirectoryTree {
  /deep/ .el-input__inner {
    background-color: rgb(233, 233, 233);
  }
  .tree {
    background-color: rgb(233, 233, 233);
  }

  /deep/ .el-tree-node:focus {
    color: rgb(92, 103, 197);
  }
}
</style>