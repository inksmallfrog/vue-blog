<template>
  <section>
    <h1>{{ markdown.metadata.title }}</h1>
    <p>{{ markdown.metadata.category }}</p>
    <p>{{ markdown.metadata.date }}</p>
    <article v-html="htmlOutput"></article>
    <p v-if="!last">上一篇：已经到头了～感谢阅读！</p>
    <router-link v-bind:to="`/passages/${last.src}`" v-if="last">上一篇：{{ last.title }}</router-link>
    <router-link v-bind:to="`/passages/${next.src}`" v-if="next">下一篇：{{ next.title }}</router-link>
    <p v-if="!next">下一篇：敬请期待</p>
  </section>
</template>

<script>
  import { getNeighbor } from '@/lib/PassageListModel'
  import parsePassage from '@/lib/parsePassage'
  import marked from 'marked'

  export default {
    name: 'passage',
    data(){
      return {
        markdown: {
          metadata: {
            title: "加载中",
            date: "...",
            category: "..."
          },
          body: ''
        },
        last: null,
        next: null
      }
    },
    computed: {
      htmlOutput: function(){
        return marked(this.markdown.body);
      }
    },
    created(){
      this.fetchData();
    },
    watch: {
      '$route': 'fetchData'
    },
    methods:{
      fetchData(){
        const passageSrc = this.$route.params.id;
        //读取上一篇下一篇内容
        let neighbor = getNeighbor(passageSrc);
        this.last = neighbor.last;
        this.next = neighbor.next;
        //加载文章内容
        const githubURL = 'https://raw.githubusercontent.com/inksmallfrog/inksmallfrog.github.io/master/passages/' + passageSrc;
        fetch(githubURL).then((response) => {
            return response.text();
        }).then((rawMarkdown)=>{
            this.markdown = parsePassage(rawMarkdown, passageSrc);
        })
        //回到页面顶部
        window.scrollTo(0, 0);
      }
    }
  }
</script>
