<template>
  <div class="con">
    <Editor
      ref="editor"
      :tribute-config="tributeConfig"
      class="editor"
    />
    <div class="con-right">
      <div class="con-btn">
        <el-button
          v-for="item in tributeConfig.values"
          :key="item.key"
          class="item-btn"
          @click="onInsertVar(item)"
        >
          {{ item.value }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tributeConfig: {
        trigger: '#',
        allowSpaces: true,
        lookup: 'value',
        fillAttr: 'value',
        values: [
          {
            key: 'name',
            value: '姓名',
          },
          {
            key: 'company',
            value: '公司',
          },
        ],
      },
    };
  },
  methods: {
    async onInsertVar(item) {
      // console.log(this.$refs.editor);
      this.$refs.editor.insertVarsIntoHtml(item);
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  background: #fff;
  display: flex;
  padding: 10px;
  .editor {
    flex: 8;
  }
  .con-right {
    flex: 2;
    .con-btn {
      margin-left: 5%;
      .item-btn {
        width: 45%;
      }
    }
  }
}
</style>
