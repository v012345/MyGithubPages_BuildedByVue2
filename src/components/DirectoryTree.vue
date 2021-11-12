<template>
  <div class="DirectoryTree">
    <transition name="el-zoom-in-top">
      <div>
        <el-input
          class="filter"
          placeholder="Filter keyword"
          v-model="filterText"
          prefix-icon="el-icon-search"
        >
        </el-input>
        <el-tree
          class="tree"
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
  beforeMount() {
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
    generateDirectoryTree(this.url, this.tree, this.axios);
  },
  mounted() {
    this.$emit("done");
  },
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