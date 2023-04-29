<template>
  <!-- 商品分类导航 -->

  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">   
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="(c2) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                      <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                    </dt>
                    <dd>
                      <em
                        v-for="(c3) in c2.categoryChild"
                        :key="c3.categoryName"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  //当组件挂载完毕，可以向服务器发送请求
  data() {
    return {
      //储存用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show:true

    };
  },
  //组件挂载完成，可以向服务器发送请求
  mounted() {
    //通知Vuex发送请求，获取数据，存储于仓库中
    this.$store.dispatch("categoryList");
    //当search路由组件时才会执行
    if(this.$route.path!='/home'){
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    changeIndex: throttle(function (index) {
      //index:鼠标移上某一个一级分类的元素的索引值
      this.currentIndex = index;
    }, 20),
    //一级分类鼠标移出的事件回调
    leaveIndex() {
      this.currentIndex = -1;
      //当鼠标移除，商品列表隐藏
      //当search路由组件时才会执行
       if(this.$route.path!='/home'){
        this.show = false
       }
    },
    enterShow() {
       //当鼠标进入，商品列表显示
       this.show = true
    },
    //进行路由跳转
    goSearch(event) {
      //最好的方法：编程式导航 + 事件委派
      //存在一些问题：实际委派会把全部的子节点【h3,dt,dl,em】的事件委派给父亲节点
      //点击a标签时，才会进行路由跳转，【如何确定点击的一定是a标签呢】

      //第一个问题，把子结点中的a标签，加上地定义属性data-categoryName标签,其余节点是没有的
      let element = event.target;
      //获取到当前触发这个事件的节点【h3,a,dt,dl】,需要带有data-categoryName这样的节点【一定是a标签】
      //节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果标签身上拥有categoryname一定时是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一定是a标签，一级目录
        if (category1id) {
          query.category1Id = category1id;
        //一定是a标签，二级目录
        } else if (category2id) {
          query.category2Id = category2id;
        //一定是a标签，三级目录
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带传递过去
       if(this.$route.params){
         //
         location.params = this.$route.params
         //动态给location配置对象，添加query属性
        location.query = query
        this.$router.push(location)
       }
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 460px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过度动画开始状态（进入）
    .sort-enter{
      opacity: 0;
    }
    //过渡动画结束状态（进入）
    .sort-rnter-to{
      opacity: 1;
    }
    //定义动画时间、速率
    .sort-enter-active{
      transition: all .5s linear;
      overflow: hidden;
    }
      .sort-leave-to{
        opacity: 0;
      }
    .sort-leave{
      opacity: 1;
    }
     .sort-enter-active{
      transition: all .5s linear;
     }
  }
}
</style>