<template>
    <div class="menu-cell">
        <router-link :to="url">
            <div class="img-warp"><img :src="imgUrl" :alt="menuName"></div>
            <div class="title-warp">{{menuName}}</div>
        </router-link>
    </div>
</template>

<script>
export default {
    name:'menu-cell',
    props:["menuName","imgUrl","url"],
    data() {
        return {

        }
    }
}
</script>

<style lang='scss' scoped>
    .menu-cell{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: $text-size;
        color: #000;
        text-align: center;
        .img-warp{
            width: px2rem(62);
            height: px2rem(62);
            display: inline-block;
            margin-bottom: px2rem(36);
        }
    }
</style>