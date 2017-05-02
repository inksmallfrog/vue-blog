<template>
  <section>
    <header>
      <h1 class="passageTitle">{{ markdown.metadata.title }}</h1>
      <p class="passageMetadata">分类：{{ markdown.metadata.category }}</p>
      <p class="passageMetadata">发表于：{{ markdown.metadata.date }}</p>
    </header>
    <article v-html="htmlOutput"></article>
    <router-link v-bind:to="`/passages/${last.src}`" v-if="last" class="last">上一篇：{{ last.title }}</router-link>
    <p v-else class="last">上一篇：已经到头了～感谢阅读！</p>
    <router-link v-bind:to="`/passages/${next.src}`" v-if="next">下一篇：{{ next.title }}</router-link>
    <p v-else>下一篇：敬请期待</p>
  </section>
</template>

<script>
  import { getNeighbor } from '@/lib/PassageListModel'
  import parsePassage from '@/lib/parsePassage'
  import marked from 'marked'
  import highlight from 'highlight.js'
  console.log(highlight);
  marked.setOptions({
    highlight: function (code) {
      console.log(highlight.highlightAuto(code));
      return highlight.highlightAuto(code).value;
    },
    breaks: true
  });

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

<style>
@import '../styles/monokai-sublime.css';
</style>

<style scope>
@import '../styles/_styleVariables.css';

header{
  text-align: center;
}
.passageTitle{
  margin: 0;
  font-size: 3rem;
  border: none;
}
.passageMetadata{
  display: inline-block;
  margin: 0;
  font-size: 1rem;
}
h1 + .passageMetadata{
  margin-right: 2em;
}

article{
  font-size: 1.2rem;
  margin-bottom: 2em;
}
h1{
  font-size: 2.5rem;
  border-bottom: var(--borderColor) 1px solid;
  margin: 0;
  margin-bottom: .5em;
}
h2{
  font-size: 1.8rem;
  margin: 0;
}
h3{
  font-size: 1.3rem;
  margin: 0;
  margin-bottom: .5em;
}
h4{
  font-size: 1rem;
  margin: 0;
}
article > p{
  text-indent: 2em;
}
ol{
  list-style-position: inside;
  padding: 0;
  margin-left: 2em;
  font-size: 1.2rem;
}
ol pre{
  margin-left: 0;
}
pre{
  margin-left: 2em;
  background-color: #222;
  color: white;
  padding: 1em;
  line-height: 1.5em;
  border-radius: 4px;
  font-size: 1.2rem;
}
blockquote{
  background: #f3f3f3;
  padding: 1em;
  border-left: .4em #555 solid;
}
blockquote p{
  margin: 0;
}

.last{
  margin-right: 2em;
}
</style>
