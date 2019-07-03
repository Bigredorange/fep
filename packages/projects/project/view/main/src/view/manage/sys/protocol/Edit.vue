<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ form.id ? '编辑协议' : '新增协议' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
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
              class="top-direction"
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
          type="primary"
          icon="el-icon-mobile-phone"
          @click="perview"
        >
          预览效果
        </el-button>
        <el-button
          v-loading="isLoading"
          type="primary"
          @click="submit"
        >
          {{ form.id ? '保存' : '新增' }}
        </el-button>
        <el-button>
          取消
        </el-button>
      </div>
    </div>
    <Perview
      ref="Perview"
      :value="form.content"
    />
  </div>
</template>
<script>
import Perview from './Perview.vue';

export default {
  components: {
    Perview,
  },
  props: {
    protocolId: {
      type: [Number, String],
      default: null,
    },
  },
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
  watch: {
    protocolId(value) {
      this.$refs.form.clearValidate();
      if (!value) {
        this.reset();
      } else {
        this.getProtocolDetail(value);
      }
    },
  },
  methods: {
    reset() {
      this.form = {
        id: null,
        name: null,
        content: '',
      };
      this.$refs.Editor.setHtml('');
    },
    async submit() {
      this.form.content = this.$refs.Editor.getContent(); // 手动获取富文本编辑器的内容
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
        this.$emit('getList');
        if (!this.form.id) this.reset();
      }).finally(() => {
        this.isLoading = false;
      });
    },
    getProtocolDetail(protocolId) {
      this.$api.getProtocolDetails({
        id: protocolId,
      }).then((res) => {
        const { name, content, id } = res;
        this.form.name = name;
        this.form.id = id;
        this.form.content = content;
        this.$refs.Editor.setHtml(content);
      });
    },
    perview() {
      if (!this.form.content) {
        this.$message.warning('请输入协议内容');
        return;
      }
      this.$refs.Perview.open();
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
    .top-direction {
      align-items: inherit;
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
