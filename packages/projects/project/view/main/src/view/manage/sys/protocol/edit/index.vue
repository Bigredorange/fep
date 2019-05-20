<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ form.id ? '修改协议' : '新增协议' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
            style="margin-left: 120px;"
            inline
            class="ui-form one-col"
          >
            <el-form-item
              label="协议名称"
              prop="name"
            >
              <el-input
                v-model="form.name"
                type="text"
                placeholder="请输入协议名称"
              />
            </el-form-item>
            <el-form-item
              label="协议内容"
              prop="content"
            >
              <Editor
                ref="Editor"
                :value.sync="form.content"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="bot-menu">
        <el-button
          v-loading="isLoading"
          type="primary"
          @click="submit"
        >
          保存
        </el-button>
        <el-button>
          取消
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        name: [{
          required: true,
          message: '请输入协议名称',
          trigger: 'blur',
        }],
        content: [{
          required: true,
          message: '请输入协议内容',
        }],
      },
      form: {
        id: null,
        name: null,
        content: '',
      },
      isLoading: false,
    };
  },
  mounted() {
    const { id } = this.$route.query;
    this.form.id = id;
    if (!id) {
      this.$utils.initData.call(this, { include: ['form'] });
    } else {
      this.getProtocolDetail(id);
    }
  },
  methods: {
    async submit() {
      if (!this.form.content) {
        this.$message.warning('请输入协议内容');
      }
      await this.$refs.form.validate();

      const api = this.form.id ? 'updateProtocol' : 'addProtocol';
      this.isLoading = true;
      this.$api[api]({
        ...this.form,
      }).then(() => {
        this.$message.success(this.form.id ? '修改成功' : '新增成功');
        this.$router.go(-1);
      }).finally(() => {
        this.isLoading = false;
      });
    },
    getProtocolDetail(id) {
      this.$api.getProtocolDetails({
        id,
      }).then((res) => {
        const { name, content } = res;
        this.form.name = name;
        this.form.content = content;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  padding: 8px;
  border-radius: 10px;
  .con-base {
    padding: 18px;
    background: #fff;
    border-radius: 10px;
    .one-col .el-form-item{
      width: 100% !important;
    }
    .title {
      color: #70829a;
    }
    .area {
      margin-top: 10px;
      display: flex;
      border-top: dashed 1px #ebf0f9;;
      border-bottom: dashed 1px #ebf0f9;;
      padding: 10px;
      i.line {
        margin-right: 7px;
        vertical-align: middle;
        display: inline-block;
        width: 4px;
        height: 14px;
        border-radius: 2px;
        background-color: #ffc000;
      }
      label {
        vertical-align: middle;
        line-height: 16px;
        font-size: 14px;
      }
      /deep/ .label {
        width: 80%;
      }
      /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background-color: #356fb8;
        border-color: #356fb8;
      }
    }
  }
}
.bot-menu {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
