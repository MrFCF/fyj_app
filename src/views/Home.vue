<template>
    <div class="home">
        <header-top title="SFA">
            <router-link to="/user" slot="r" class="icon iconfont icon-user"></router-link>
        </header-top>
        <div class="main_bd">
            <div class="data_warp">{{dataYearMonth}}</div>
            <div class="mp_warp">
                <mp title="当前月季度" :val="getDayOfMonth" :percent="true"></mp>    
                <mp title="月销售完成度" :val="mounthSealsPercent" :percent="true"></mp>    
                <mp title="有效商店数" :val="shops" :percent="false"></mp>    
            </div>
        </div>
        <div class="main_nav">
            <div class="nav-cell" v-for="i in 9" :key="i">
                <template v-if="i <= menuList.length">
                    <menu-cell :url="menuList[i-1].url" :img-url="menuList[i-1].imgUrl" :menuName="menuList[i-1].menuName"></menu-cell>
                </template>            
            </div>
        </div>
    </div>
</template>
<script>
import HeaderTop from "../components/TopHeader"
import progress from "../components/progress"
import MenuCell from "../components/MenuCell"
import { getUserProgress } from "../service/index"
import menuList from "../static/indexMenu.json"

const menuLsit = [
    { "menuName": "公司通告", "imgUrl": require("@/assets/img/gstg.png"), "url": "/notice" },
    { "menuName": "进店拜访", "imgUrl": require("@/assets/img/jdbf.png"), "url": "/visitshop" },
    { "menuName": "电话订单", "imgUrl": require("@/assets/img/dhdd.png"), "url": "/phoneorder" },
    { "menuName": "订单状态", "imgUrl": require("@/assets/img/ddzt.png"), "url": "/orders" },
    { "menuName": "培训资料", "imgUrl": require("@/assets/img/pxzl.png"), "url": "/training" },
    { "menuName": "消息中心", "imgUrl": require("@/assets/img/xxzx.png"), "url": "/message" },
    { "menuName": "新增门店", "imgUrl": require("@/assets/img/xzmd.png"), "url": "/addedshop" },
    { "menuName": "同步数据", "imgUrl": require("@/assets/img/sjtb.png"), "url": "/asyncdata" }
]


export default {
    name:'Home',
    data() {
        return {
            mounthSealsPercent: 0,
            shops: 0,
            menuList: menuLsit
        }
    },
    components: {
        headerTop: HeaderTop,
        mp: progress,
        menuCell: MenuCell
    },
    created(){
        getUserProgress().then(res=>{
            this.mounthSealsPercent = parseInt(res.data.mouthPrecont * 100);
            this.shops = parseInt(res.data.totalShops * 100);
        }).catch(err=>{
            
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
       height: 100%;
       display: flex; 
       flex-direction: column;
        #pie{
            width:px2rem(500);
            height: px2rem(400);
        }
        .main_bd{
            background: #FFFFFF;
            .data_warp{
                text-align: center;
                font-size:$text-size-mid;
                padding: px2rem(40) 0 0 0;
                color: #000000;
            }
            .mp_warp{
                padding: px2rem(20) 0;
                display: flex;
                justify-content: space-around;
            }
        }
        .main_nav{
            background: #FFFFFF;
            flex: 1;
            padding: 0 px2rem(30);
            display: flex;
            flex-flow: row wrap;
            align-content: stretch;
            align-items: stretch;
            border-top:1px solid #CCC;
            .nav-cell{
                border-bottom: 1px solid #CCC;
                border-right: 1px solid #CCC;
                flex:1 1 30%;
            }
            .nav-cell:nth-child(3n){
                border-right: none;
            }
        }
   }
</style>

