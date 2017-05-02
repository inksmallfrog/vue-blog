<template>
  <nav>
    <div class="navBox" v-bind:class="{passage:!isHome}">
      <div class="navTop">
        <div class="homeTop" v-if="isHome">
          <img src="" alt="favicon">
          <p>
            <button @click="toggleCategory('生活')">
              <span class="iconfont icon-life" v-bind:class="{selected: life}"></span>
            </button>
            =
            <button @click="toggleCategory('技术')">
              <span class="iconfont icon-tech" v-bind:class="{selected: tech}"></span>
            </button>
            +
            <button @click="toggleCategory('艺术')">
              <span class="iconfont icon-art" v-bind:class="{selected: art}"></span>
            </button>
          </p>
        </div>
        <ul class="passageTop" v-if="!isHome">
          <p>顶部</p>
          <p>评论</p>
        </ul>
      </div>
      <div class="navBottom">
        <ul>
          <li><router-link to="/">主页</router-link></li>
          <li><router-link to="/passages/aboutme">关于我</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import bus from '@/components/bus';
  export default {
    name: 'navigator',
    data(){
      return {
        isHome: true,
        life: true,
        tech: true,
        art: true
      }
    },
    created(){
      this.handleRouteChange()
    },
    watch: {
      '$route': 'handleRouteChange'
    },
    methods:{
      handleRouteChange(){
        if(this.$route.path === '/'){
          this.isHome = true;
        }else{
          this.isHome = false;
        }
      },
      toggleCategory(category){
        let isShow;
        switch(category){
          case '生活':
            this.life = !this.life;
            isShow = this.life;
            break;
          case '技术':
            this.tech = !this.tech;
            isShow = this.tech;
            break;
          case '艺术':
            this.art = !this.art;
            isShow = this.art;
            break;
          default:
            return;
        }
        bus.$emit('category-change', category, isShow);
      }
    }
  }
</script>

<style scoped>
  @import '../styles/_styleVariables.css';
  nav{
    position: fixed;
    box-sizing: border-box;
    width: var(--navWidth);
    padding: 0 var(--navPadding);
    height: 100%;
    text-align: right;
  }
  .navBox{
    position: absolute;
    top: var(--mainPadding);
    opacity: .6;
    transition: top var(--transitionTime), opacity var(--transitionTime);
  }
  .navBox.passage{
    top: 50%;
  }
  nav:hover .navBox{
    opacity: 1;
  }
  ul{
    list-style: none;
  }
  button{
    background: none;
    cursor: pointer;
    border: none;
    outline: none;
    color: #999;
  }
  .selected{
    color: black;
  }
  button:hover{
    color: black;
  }
  .selected:hover{
    color: #999;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    text-decoration: underline;
  }
  .navBottom{
    border-top: var(--borderColor) solid 1px;
  }
</style>
