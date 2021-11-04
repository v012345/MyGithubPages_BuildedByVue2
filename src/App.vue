<template>
  <div id="app">
    <div>
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        </el-aside>
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <span></span>
          </el-header>
          <el-main> </el-main>
        </el-container>
      </el-container>
    </div>
    {{d}}
    <!-- 手机 -->
    <div v-if="false">
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        </el-aside>
        <el-container>
          
          <el-header style="text-align: right; font-size: 12px">
            <span></span>
          </el-header>
          <el-main> </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    console.log(process.env);
  },
  data() {
    return {
      d:process.env.NODE_ENV
    };
  },
};
</script>
<style lang="less" scoped>
</style>


