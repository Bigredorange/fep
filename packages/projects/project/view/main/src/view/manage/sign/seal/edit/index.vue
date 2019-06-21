<template>
  <div class="con">
    <div class="title">
      <label>创建印章</label>
    </div>
    <div class="con-base">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <div class="area">
          <div class="label">
            <i class="line" />
            <label>印章信息</label>
          </div>
          <el-form-item
            label="企业名称"
            prop="companyName"
          >
            <el-input
              v-model="form.companyName"
              placeholder="请输入企业名称"
            />
          </el-form-item>
          <el-form-item
            label="印章名称"
            prop="sealName"
          >
            <el-input
              v-model="form.sealName"
              placeholder="请输入印章名称"
            />
          </el-form-item>
          <el-form-item
            label="印章类型"
            prop="type"
          >
            <div>
              <img
                :class="{'active': form.type === 1}"
                src="../../../../../assets/icon/seal1.png"
                class="item-seal"
                @click="form.type = 1"
              >
              <img
                :class="{'active': form.type === 2}"
                src="../../../../../assets/icon/seal2.png"
                class="item-seal"
                @click="form.type = 2"
              >
            </div>
          </el-form-item>
          <el-form-item
            label="颜色"
            prop="color"
          >
            <div class="con-color">
              <div
                class="item-color red"
                @click="form.color = 1"
              >
                <i
                  v-if="form.color === 1"
                  class="el-icon-check icon"
                />
              </div>
              <div
                :class="{'active': form.color === 2}"
                class="item-color blue"
                @click="form.color = 2"
              >
                <i
                  v-if="form.color === 2"
                  class="el-icon-check icon"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="横向文"
            prop="hText"
          >
            <el-input
              v-model="form.hText"
              placeholder="请输入横向文"
            />
          </el-form-item>
          <el-form-item
            label="下弦文"
            prop="qText"
          >
            <el-input
              v-model="form.qText"
              placeholder="请输入下弦文"
            />
          </el-form-item>
        </div>
      </el-form>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>示例图</label>
        </div>
        <img src="../../../../../assets/icon/sealExample.png">
      </div>
    </div>
    <div class="bot-menu">
      <el-button
        v-loading="confirmButtonLoading"
        type="primary"
        @click="submit"
      >
        提交
      </el-button>
      <el-button>
        取消
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        companyName: [{
          required: true,
          message: '请输入企业名称',
          trigger: 'blur',
        }],
        sealName: [{
          required: true,
          message: '请输入印章名称',
          trigger: 'blur',
        }],
        type: [{
          required: true,
          message: '请选择印章样式',
          trigger: 'blur',
          type: 'number',
        }],
        color: [{
          required: true,
          message: '请选择印章颜色',
          trigger: 'blur',
          type: 'number',
        }],
        hText: [{
          required: true,
          message: '请输入横向文',
          trigger: 'blur',
        }],
        qText: [{
          required: true,
          message: '请输入下弦文',
          trigger: 'blur',
        }],
      },
      form: {
        companyId: null,
        companyName: null,
        sealName: null,
        type: 1,
        color: 1,
        hText: null,
        qText: null,
      },
      confirmButtonLoading: false,
      companyId: null,
    };
  },
  created() {
    const { companyId, companyName } = this.$store.state.fepUserInfo;
    this.form.companyName = companyName;
    this.form.companyId = companyId;
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          this.$api.addSeal(this.form).then(() => {
            this.$message.success('保存成功');
            this.$router.push('list');
          }).finally(() => {
            this.confirmButtonLoading = false;
          });
        } else {
          this.$message.info('请按提示填写');
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  padding: 8px;
  border-radius: 10px;
  .title {
    color: #70829a;
    background-color: #fff;
    border-radius: 10px 0;
    padding: 18px;
  }
  .con-base {
    background: #fff;
    border-radius: 10px 0;
    display: flex;
    justify-content: center;
    .area {
      margin: 10px;
      padding: 10px 40px;
      i.line {
        margin-right: 7px;
        vertical-align: middle;
        display: inline-block;
        width: 4px;
        height: 14px;
        border-radius: 2px;
        background-color: #ffc000;
      }
      .label {
        vertical-align: middle;
        line-height: 16px;
        font-size: 14px;
        margin-bottom: 10px;
      }
      /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background-color: #356fb8;
        border-color: #356fb8;
      }
      .grey {
        color: #999999;
      }
      .item-seal {
        margin: 0 10px;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
        &.active {
          border: 1px solid #356fb8;
        }
      }
      .con-color {
        display: flex;
        .item-color {
          margin: 0 10px;
          width: 50px;
          height: 50px;
          text-align: center;
          &.red {
            background-color: #EA021E;
          }
          &.blue {
            background-color: #0082FF;
          }
          .icon {
            color: #fff;
            margin-top: 20px;
          }
        }
      }
    }
    .area:nth-child(2n + 1) {
      border-right: dashed 1px #ebf0f9;;
    }
  }
  .bot-menu {
      margin-top: 20px;
      display: flex;
      justify-content: center;
  }
}
</style>
