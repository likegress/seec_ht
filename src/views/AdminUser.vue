<template>
    <div>
        <!-- 
        prop: 数据列表中的键名
        label: 表头内容
     -->
        <template>
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="num" label="本月数量">
                </el-table-column>
                <el-table-column prop="totalNum" label="总数量"> </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="50" :page-size="5" @current-change="change">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
     this.getList()
  },
  methods: {
      change(currentPage){
        //参数表示当前页
        console.log(currentPage);
        this.getList()
      },
      getList(){
          const res = Mock.mock({
              "list|10": [
                  {
                      name: () => Mock.Random.cname(),
                      num: () => Mock.Random.integer(2000, 6000),
                      totalNum: () => Mock.Random.integer(40000, 80000),
                  },
              ],
          });
          this.list = res.list;
      }
  },
};
</script>

<style lang="scss" scoped></style>
