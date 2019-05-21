<template>
  <div class="page">
    <div class="container">
      <div class="left">
        <list
          ref="list"
          @select="$event => protocolId = $event"
          @resetEdit="resetEdit"
        />
      </div>
      <div class="right">
        <edit
          ref="edit"
          :protocol-id="protocolId"
          @getList="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Edit from './Edit.vue';
import List from './List.vue';

export default {
  components: {
    List,
    Edit,
  },
  data() {
    return {
      protocolId: null,
    };
  },
  methods: {
    getList() {
      this.$refs.list.getList();
    },
    resetEdit() {
      this.$refs.edit.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  overflow: auto;
  > .topbar {
    margin-bottom: 15px;
    padding: 18px 30px 16px;
    background-color: #fff;
    span {
      font-size: 16px;
      line-height: 1;
      color: #666;
    }
    .second {
      color: #000;
    }
  }
}
.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1890px;
  margin-top: 10px;
  > .left {
    flex-shrink: 0;
    margin-right: 36px;
    width: 602px;
  }
  > .right {
    flex: 1 0 0;
  }
}
</style>
