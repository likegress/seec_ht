<template>
  <div class="header">
    <div class="header-l">
      <el-button size="medium" @click="clickFn" class="header-button">
        <i
          :class="$store.state.isCollapse ? 'el-icon-right' : 'el-icon-back'"
        ></i>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a v-bind:href="pathData.path">{{pathData.pathName}}</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-r">
      <el-dropdown @command="handleCommand">
        <img src="../assets/user.png" alt="" class="avatar" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      this.$store.commit("changeCollapse");
    },
    // 退出登录
    handleCommand(cmd) {
      console.log(cmd);
      if (cmd == "logout") {
        localStorage.removeItem("token");
        this.$router.push("/login");
      }
    },
  },
  data() {
    return {
      pathData: {},
    };
  },
  // beforeRouteUpdate(to,from,next){
  //     console.log(to);
  //     // this.pathData = {
  //     //     pathName:to.meta.pathName,
  //     //     path:to.path
  //     // }
  // }
  watch: {
    $route(to, form) {
      console.log(to);
      this.pathData = {
        pathName: to.meta.pathName,
        path: to.path,
      };
    },
  },
};
/* 
    如果是真正上线的项目,则不用配置publicPath. 如果是自己做的作业,或是想要本地服务器环境测试,
    则需要配置publicPath 
    publicPath默认值是"/",本地测试可以改为""或"./"
*/ 
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .header-l {
    display: flex;
    align-items: center;
    gap: 20px;
    .header-button {
      margin-right: 10px;
    }
  }
  .header-r {
    .avatar {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
