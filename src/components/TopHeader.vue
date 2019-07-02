<template>
    <div class="top_head">
        <div class="th-l" @click="backAction"><i class="icon iconfont icon-back"></i></div>
        <div class="th-title">{{title}}</div>
        <div class="th-r">
            <slot name="r"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'topHead',
    props: ["title","backurl"],
    data() {
        return{
        }
    },
    methods:{
        backAction(){
            if(this.backurl){
                this.$router.push(this.backurl)
            }else{
                this.$router.go(-1)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .top_head {
        display:flex;
        justify-content: space-between;
        height:$th;
        line-height:$th;
        color:#FFFFFF;
        font-size:$text-size-imp;
        background-color: $act-color;
        .th-l{
            padding-left: px2rem(25);
        }
        .th-title{
            text-align: center;
        }
        .th-r{
            padding-right: px2rem(25);
        }
        .icon::before{
            font-size: $text-size-imp;
        }
    }
</style>

