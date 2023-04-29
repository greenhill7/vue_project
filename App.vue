<template>
  <div>
   <HeaderIndex/>
   <router-view></router-view>
   <FooterIndex/>
  </div>
</template>

<script>
// 引入头部组件
import HeaderIndex from '@/components/MyHeader/HeaderIndex.vue'
// 引入尾部组件
import FooterIndex from '@/components/MyFooter/FooterIndex.vue'
export default {
  name: 'App',
  components:{HeaderIndex, FooterIndex},
  mounted(){
    //派发一个action||获取商品分类中三级列表的数据
     this.$store.dispatch("categoryList");
  }
}
</script>

<style >

</style>
