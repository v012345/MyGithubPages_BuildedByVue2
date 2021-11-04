<template>
  <div class="DirectoryTree">
    <transition name="el-zoom-in-top">
      <div v-show="show">
        <el-input
          placeholder="Filter keyword"
          v-model="filterText"
          prefix-icon="el-icon-search"
        >
        </el-input>

        <el-tree
          class="filter-tree"
          :data="tree"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree"
          @node-click="emitUrl"
        >
        </el-tree>
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
  mounted() {
    function generateDirectoryTree(url, DirectoryTree, axios) {
      axios.get(url).then((response) => {
        for (const data of response.data) {
          let node = {};
          node.id = data.sha;
          node.label = data.name.replace(/\.md/, "");
          node.type = data.type;
          if (data.type == "file") {
            node.download_url = data.download_url;
            DirectoryTree.push(node);
          }
          if (data.type == "dir") {
            node.children = [];
            generateDirectoryTree(data.url, node.children, axios);
            DirectoryTree.push(node);
          }
        }
      });
    }
    let DirectoryTree = [];
    generateDirectoryTree(this.url, DirectoryTree, this.axios);
    this.tree = DirectoryTree;
    this.$emit("done");
    this.show = true;
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    emitUrl(node) {
      if (node.type == "file")
        this.$bus.$emit("download_url", node.download_url);
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
  /deep/ .el-tree-node:focus {
    color: rgb(92, 103, 197);
  }
}
</style>