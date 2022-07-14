<template>
  <div class="admin">
    <el-container>
      <el-aside v-bind:width="$store.state.isCollapse?'64px':'200px'">
        <AsideCom class="AsideCom" />
      </el-aside>
      <el-container>
        <el-header>
          <HeaderCom />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import AsideCom from "@/components/AsideCom"
  import HeaderCom from "@/components/HeaderCom"
  export default {
    name:'AdminView',
    components:{
      AsideCom,
      HeaderCom
    }
  }
</script>

<style lang="scss" scoped>
  .admin {
    min-height: 100vh;
    
  }
  ::v-deep .el-container {
    min-height: 100vh;
  }

  ::v-deep .el-menu {
    min-height: 100%;
  }
  ::v-deep .el-header {
    background: #409EFF;
  }
  ::v-deep .el-aside {
    overflow: hidden;
  }
  ::v-deep .el-main {
    background: #f5f5f5;
  }
</style>
