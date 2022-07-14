<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="24" :md="10">
                <div class="user panel">
                    <div class="user-avatar">
                        <img src="../assets/user.png" alt="">
                        <dl>
                            <dt>王力宏</dt>
                            <dd>尊贵的超级Vip</dd>
                        </dl>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间: <span>{{ lastLoginTime }}</span></p>
                        <p>上次登录地点: <span>{{ lastLoginCity }}</span></p>

                    </div>
                </div>
                <div class="worker panel">
                    <template>
                        <el-table :data="workerData">
                            <el-table-column prop="name" label="员工姓名">
                            </el-table-column>
                            <el-table-column prop="totalNum" label="总数量">
                            </el-table-column>
                            <el-table-column prop="num" label="本月数量">
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </el-col>
            <el-col :span="24" :md="14">
                <div class="chart1 panel" ref="chart1">

                </div>
                <el-row :gutter="10">
                    <el-col :span="24" :md="12">
                        <div class="chart2 panel" ref="chart2">

                        </div>
                    </el-col>
                    <el-col :span="24" :md="12">
                        <div class="chart3 panel" ref="chart3"></div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    const Mock = require("mockjs");
    import * as echarts from 'echarts';
    export default {
        data() {
            return {
                lastLoginTime:'',
                lastLoginCity:'',
                workerData:[],
                lineGraph:[],
                barGraph:[],
                pieGraph:[],
                chart1: '', //3个图表的元素
                chart2: '',
                chart3: '',
            }
        },
        created() {
            let res = Mock.mock({
                time:Mock.Random.date("yyyy-MM-dd"),
                city:Mock.Random.county(true),
                "workerData|10":[
                    {
                        name:()=>Mock.Random.cname(),
                        totalNum: () => Mock.Random.integer(10000,50000),
                        num:()=>Mock.Random.integer(1000,9000)
                    }
                ],
                "lineGraph|4":[
                    {
                        name: ()=>Mock.Random.cname(),
                        type: 'line',
                        "data|4": [() => Mock.Random.integer(3000,7000)],
                    }
                ],
                "pieGraph|10":[
                    {
                        value: ()=>Mock.Random.integer(300,1000),
                        name:()=>Mock.Random.cname()
                    }
                ],
                "barGraph|10":[
                    {
                        num: () => Mock.Random.integer(300, 1000),
                        name: () => Mock.Random.cname(),
                        color: () => Mock.Random.color()
                    }
                ]
            })
            
            this.lastLoginTime = res.time
            this.lastLoginCity = res.city
            this.workerData = res.workerData
            this.lineGraph = res.lineGraph
            this.pieGraph = res.pieGraph
            this.barGraph = res.barGraph
            // console.log(this.workerData);
            // console.log(this.lineGraph.map(item => item.name));
      

        },
        mounted() {
            this.chart1 = echarts.init(this.$refs.chart1)
            let option1 = {
                title: {
                    text: 'Stacked Line',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.lineGraph.map(item=>item.name)
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: ['一季度','二季度','三季度','四季度'],
                },
                yAxis: {
                    type: 'value',
                    min:3000,   //设置Y轴最小起始值
                    interval:500  //设置Y轴间隔
                },
                series: this.lineGraph
            };
            this.chart1.setOption(option1);

            this.chart2 = echarts.init(this.$refs.chart2)
            let option2 = {
                title: {
                    text: '工人生产数量',
                    subtext: '大家加油一起干',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: this.pieGraph,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.chart2.setOption(option2)

            this.chart3 = echarts.init(this.$refs.chart3)
            let option3 =  {
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: this.barGraph.map(item => item.name),
                    interval:0,
                    axisLabel:{
                        rotate:-45
                    }
                },
                color: {
                    type: 'linear',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0, color: 'yellowgreen' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'orange' // 100% 处的颜色
                    }],
              
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: this.barGraph.map(item=>item.num),
                        type: 'bar'
                    }
                ]
            };
            this.chart3.setOption(option3)
            window.onresize = ()=>{
                this.chart1.resize(),
                this.chart2.resize(),
                this.chart3.resize()
            }
        },
        computed: {
            btnState(){
                return this.$store.state.isCollapse
            },
        },
        watch:{
            btnState(){
                this.chart1.resize(),
                this.chart2.resize(),
                this.chart3.resize()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .panel {
        background: #fff;
        box-shadow: 0 0 5px #ddd;
        padding: 10px;
        margin-bottom: 10px;
    }
    .user {
        .user-avatar {
            display: flex;
            border-bottom: 1px solid #666;
            padding-bottom: 20px;
            align-items: center;
            margin-bottom: 20px;
            img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin-right: 15px;
            }
            dl{
                dt{
                    font-size: 18px;
                }
                dd {
                    color: #999;
                    font-size: 14px;
                }
            }
        }
    }
    .login-info {
        font-size: 14px;
        padding-bottom: 10px;
    }
    .chart1 {
        height: 300px;
    }
    .chart2,.chart3 {
        height: 400px;
    }
    [class ^= chart]{
        width: 100%;
    }
</style>