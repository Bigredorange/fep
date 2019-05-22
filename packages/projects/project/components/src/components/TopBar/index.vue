<template>
  <div class="con">
    <div class="top-con">
      <p class="search-con">
        <b class="search-txt">筛选条件</b>
        <span class="search-txt-grey">SCREENING</span>
      </p>
      <div class="top-bar">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
.con {
  padding: 8px;
  background: #f3f6fb;
  .top-con {
    background: #fff;
    padding: 15px 20px;
    border-radius: 10px;
    .search-con {
      & .search-txt {
        color: #70829a;
        font-size: 16px;
      }
      & .search-txt-grey {
        color: #c2c8d1;
        font-size: 12px;
      }
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      > section {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .item {
          display: flex;
          width: 20%;
          min-width: 260px;
          padding: 8px 0;
          margin-right: 15px;
          span {
            line-height: 35px;
            min-width: 80px;
          }
        }
      }
    }
  }
}
</style>
