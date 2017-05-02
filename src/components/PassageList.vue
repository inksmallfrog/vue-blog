<template>
  <section>
    <div class="blogTitle">
      <h1>墨小蛙</h1>
      <p>热爱生活，不懈追求技术与艺术的前端小白</p>
    </div>
    <section v-for="yearPassages in passageListParsed">
      <h1 class="yearTitle">{{ yearPassages.year }}年({{ caculatePassagesInYear(yearPassages) }})</h1>
      <section v-for="monthPassages in yearPassages.passages">
        <h2 class="monthTitle">{{ monthPassages.month }}月({{ monthPassages.passages.length }})</h2>
        <ul v-for="passage in monthPassages.passages">
          <li>
            <span class="iconfont" v-bind:class="category2Icon(passage.category)"></span>
            {{ passage.date }}日
            <router-link v-bind:to="`/passages/${passage.src}`">{{ passage.title }}</router-link>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<script>
  import { parsePassageList } from '@/lib/PassageListModel'
  import bus from '@/components/bus'

  export default {
    name: 'passageList',
    data(){
      return {
        categories: {
          '生活': true,
          '技术': true,
          '艺术': true
        }
      }
    },
    computed: {
      passageListParsed: function(){
        return parsePassageList(this.categories);
      }
    },
    created(){
      window.scrollTo(0, 0);
      bus.$on('category-change', (category, isShow)=>{
        this.categories[category] = isShow;
      })
    },
    methods: {
      category2Icon(category){
        switch(category){
          case '技术':
            return 'icon-tech';
          case '艺术':
            return 'icon-art';
          default:
            return 'icon-life';
        }
      },
      caculatePassagesInYear(yearPassages){
        let count = 0;
        yearPassages.passages.forEach((monthPassages)=>{
          count += monthPassages.passages.length;
        })
        return count;
      }
    }
  }
</script>

<style scoped>
  .blogTitle{
    margin-bottom: .5rem;
  }
  .blogTitle h1{
    display: inline-block;
    margin: 0;
    font-size: 3rem;
  }
  .blogTitle p{
    margin: 0 0 0 2rem;
    display: inline-block;
    color: var(--descColor);
  }
  .yearTitle{
    font-size: 2rem;
    margin: 0;
    border-bottom: var(--borderColor) 1px solid;
  }
  .monthTitle{
    margin: 0.8rem 0;
  }
  ul{
    list-style: none;
  }
</style>
