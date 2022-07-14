<template>
    <el-menu default-active="0" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
      v-bind:collapse="$store.state.isCollapse" active-text-color="yellowgreen" :router="true">
      <el-menu-item index="/admin/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/admin/product">
        <i class="el-icon-platform-eleme"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">其他</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
