<template>
  <div class="box" v-html="this.wordFile"></div>
</template>

<script>
import mammoth from "mammoth";
export default {
  data(){
    return{
      wordFile:''
    }
  },
  created(){
    this.getWordText(this.$route.query.url)
  },
  methods:{
    // 预览 word 文件专属
    getWordText(url) {
      console.log(123);
      const xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        if (xhr.status == 200) {
          mammoth.convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) }).then((resultObject) => {
            this.$nextTick(() => {
              this.wordFile = resultObject.value;
            });
          });
        }
      };
      xhr.send();
    },
  }
}
</script>

<style lang="scss" scoped>
  .box{
    width: 50%;
    height: auto;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 15px;
    background-color: rgba(253, 251, 251, 0.6);
    border: 5px solid rgb(194, 190, 190);
    min-height: 937px;
    p{
      text-align: center;
      img{
        text-align: center;
      }
    }
  }
  @media screen and (min-width: 2000px) and (max-width: 3840px) {
    .box{
      min-height: 1300px;
    }
  }
</style>