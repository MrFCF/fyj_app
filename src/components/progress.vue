<template>
    <div class="progress">
        <div class="progress_warp">
            <div class="label">{{val}}<span v-show="percent">%</span></div>
            <div class="pie_warp" ref="pie"></div>
        </div>
        <h3>{{title}}</h3>
    </div>
</template>

<script>
import echarts from "echarts/lib/echarts"
// 引入柱状图
import "echarts/lib/chart/pie"
// 引入提示框和标题组件
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"
export default {
    name:'my_progress',
    props:{
        title:{type: String, required: true},
        val: {type: Number, required: true},
        percent: {type: Boolean, required: true,dafault: false}
    },
    data() {
        return {
        }
    },
    mounted(){
        this.initCircle();
    },
    watch:{
        val:function () {
            this.initCircle();
        }
    },
    methods:{
        initCircle(){
            let data = [];
            if(this.percent){
                data.push({value: this.val, name: ''})
                data.push({value: 100 - this.val, name: ''})
            }else{
                data.push({value: 0, name: ''})
                data.push({value: 100, name: ''})
            }
            let myChart = echarts.init(this.$refs.pie);
                // 绘制图表
                myChart.setOption({
                    color:['rgb(102,208,113)','rgb(223,223,223)'],
                    series: [{
                        name: this.title,
                        type: 'pie',
                        radius:['95%','100%'],
                        avoidLabelOverlap: false,
                        label:{
                            normal:{
                                show:true,
                                position:'center',
                                textStyle:{
                                    fontSize:'48',
                                    fontWeight:'bold'
                                }
                            },
                            emphasis:{
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data
                    }]
            });
        }
    }
}
</script>

<style lang='scss'>
    .progress{
        .progress_warp{
            position: relative;
            .label{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                font-size: $text-size-imp;
                font-weight: bold;
                span{
                    font-weight: 100;
                }
            }
            .pie_warp{
                width: px2rem(175);
                height: px2rem(175);
            }
        }
        h3{
            text-align: center;
            font-size: px2rem(24);
            margin-top: px2rem(20);
        }
    }
    
</style>