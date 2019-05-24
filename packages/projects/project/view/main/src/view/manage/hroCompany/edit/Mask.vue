<template>
  <div class="mask">
    <slot />
    <a
      class="download"
      :href="img"
      download="企业二维码.png"
    >下载二维码</a>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '',
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.mask{
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    position:fixed;
    z-index:10000;
    top:0;
    left:0;
    text-align:center;
    img{
       position:absolute;
       left:50%;
       top:45%;
       margin-left:-150px;
       margin-top:-150px;
   }
}

.download {
    display: block;
    padding: 6px 10px;
    border-radius: 10px;
    color: #fff;
    position:absolute;
    left:50%;
    top:50%;
    margin-top: 160px;
    transform: translateX(-50%);
    border: 1px solid #fff;
    font-size: 14px;
    &:hover {
        color: #356fb8;
        border-color:  #356fb8;
    }
    &:before {
      background: none;
      width: 0;
    }
}
</style>
