<template>
    <div class="home">
        <HeaderTop title="SFA">
            <router-link to="/user" slot="r" class="icon iconfont icon-user"></router-link>
        </HeaderTop>
        <div class="main_bd">
            <div class="data_warp">{{dataYearMonth}}</div>
            <div class="mp_warp">
                <mp title="当前月季度" :val="getDayOfMonth" :percent="true"></mp>    
                <mp title="月销售完成度" :val="mounthSealsPercent" :percent="true"></mp>    
                <mp title="有效商店数" :val="shops" :percent="false"></mp>    
            </div>
        </div>
        <div id="pie" ref="pie_warp"></div>
    </div>
</template>
<script>
import HeaderTop from "../components/TopHeader"
import progress from "../components/progress"
import { getUserProgress } from "../service/index"

export default {
    name:'Home',
    data() {
        return {
            mounthSealsPercent: 0,
            shops: 0
        }
    },
    components: {
        HeaderTop,
        mp: progress
    },
    created(){
        getUserProgress().then(res=>{
            this.mounthSealsPercent = parseInt(res.data.mouthPrecont * 100);
            this.shops = parseInt(res.data.totalShops * 100);
        }).then(err=>{
            
        })
    },
    computed:{
        dataYearMonth(){
            let t = new Date();
            return `${t.getFullYear()}年${t.getMonth() + 1}月`
        },
        getDayOfMonth(){
            let t = new Date();
            return parseInt((t.getDate() / 30 ) * 100);
        }
    }
}
</script>
<style lang="scss">
   .home{
        #pie{
            width:px2rem(500);
            height: px2rem(400);
        }
        .main_bd{
            background: #FFFFFF;       
            .data_warp{
                text-align: center;
                font-size:$text-size-mid;
                padding: px2rem(40) 0 px2rem(22) 0;
                color: #000000;
            }
        }
        .mp_warp{
            display: flex;
            justify-content: space-around;
        }
   }
</style>

