<template>
  <div
    class="con"
    :loading="loading"
  >
    <div class="con-left">
      <Editor
        ref="editor"
        v-model="form.content"
        :tribute-config="tributeConfig"
        class="editor"
        :params="params"
        @updateParams="handleUpdate"
      />
      <div class="bot-menu">
        <el-button
          v-loading="confirmButtonLoading"
          type="primary"
          @click="submit"
        >
          保存
        </el-button>
        <el-button
          :disabled="!contractId"
          @click="gotoSetSeal"
        >
          设置盖章
        </el-button>
      </div>
    </div>
    <div class="con-right">
      <div class="con-label">
        <i class="line" />
        <label>模板属性设置</label>
        <a class="href">查看模板实例</a>
      </div>
      <el-form
        ref="formUser"
        :model="form"
        :rules="rules"
        label-width="140px"
        label-position="top"
      >
        <el-form-item
          label="模板名称"
          prop="templateName"
        >
          <el-input
            v-model="form.templateName"
            placeholder="请输入模板名称"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item
          prop="needSetSeal"
        >
          <label
            slot="label"
          >
            <span>盖章 <span class="grey">是否需要设置企业盖章</span></span>
          </label>
          <el-radio-group
            v-model="form.needSetSeal"
          >
            <el-radio-button
              :label="true"
            >
              需要
            </el-radio-button>
            <el-radio-button
              :label="false"
            >
              不需要
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.needSetSeal"
          label="企业印章"
          prop="companySealId"
        >
          <el-select
            v-model="form.companySealId"
            placeholder="请选择"
            style="width: 300px"
          >
            <el-option
              v-for="item in companySealList"
              :key="item.id"
              :label="item.sealName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="HRO名称"
          prop="effectiveDay"
        >
          <label
            slot="label"
          >
            <span>签署有效期 <span class="grey">自发起签署日起</span></span>
          </label>
          <el-input-number
            v-model="form.effectiveDay"
            placeholder="请输入HRO名称"
            controls-position="right"
            :min="1"
          /> 天内有效
        </el-form-item>
      </el-form>
      <p>动态字段 <span class="grey">新增动态字段并将字段插入合同相应位置，可在合同生成时替换为真实信息</span></p>
      <div class="con-template">
        <el-input
          v-model="templateTxt"
          placeholder="请输入动态字段"
          style="width: 300px"
        >
          <el-button
            slot="append"
            icon="el-icon-plus"
            @click="addTemplateTxt"
          />
        </el-input>
      </div>
      <div class="con-btn">
        <el-button
          v-for="item in tributeConfig.values"
          :key="item.key"
          class="item-btn"
          type="primary"
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
      form: {
        templateName: null,
        needSetSeal: true,
        effectiveDay: null,
        params: [],
        content: '',
        companySealId: null,
      },
      params: [],
      rules: {
        templateName: [{
          required: true,
          message: '请输入模板名称',
          trigger: 'blur',
        }],
        companySealId: [{
          required: true,
          message: '请选择印章',
          trigger: 'blur',
        }],
        needSetSeal: [{
          required: true,
          message: '请选择是否要盖章',
          trigger: 'blur',
        }],
        effectiveDay: [{
          required: true,
          message: '请输入签署有效期',
          trigger: 'blur',
        }],
      },
      confirmButtonLoading: false,
      contractId: null,
      templateTxt: '',
      companySealList: [],
      loading: false,
    };
  },
  created() {
    this.contractId = this.$route.query.id;
    this.getCompanySealList();
    if (this.contractId) {
      this.getDetail(this.contractId);
    }
  },
  methods: {
    async onInsertVar(item) {
      this.$refs.editor.insertVarsIntoHtml(item);
    },
    submit() {
      this.$refs.formUser.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          let api = '';
          let param = null;
          if (this.form.params instanceof Array) {
            this.form.params = JSON.stringify(this.form.params);
          }
          this.form.content = this.$refs.editor.getContent(); // 手动获取富文本编辑器的内容
          if (!this.contractId) {
            api = 'addContract';
            param = this.form;
          } else {
            api = 'updateContract';
            param = {
              ...this.form,
              contractTemplateId: this.contractId,
            };
          }
          this.$api[api](param).then((res) => {
            if (!this.contractId) {
              this.contractId = res;
              this.$router.replace({ path: 'edit', query: { id: res } });
            }
            this.$message.success('保存成功');
          }).finally(() => {
            this.confirmButtonLoading = false;
          });
        } else {
          this.$message.info('请按提示填写');
        }
      });
    },
    handleUpdate(params) {
      this.form.params = params;
    },
    getDetail(contractTemplateId) {
      this.$api.getContract({ contractTemplateId }).then((res) => {
        this.form = res;
        const params = JSON.parse(res.params);
        this.tributeConfig.values = params.map((item, index) => {
          const temp = {};
          temp.key = index;
          temp.value = item;
          return temp;
        });
      });
    },
    addTemplateTxt() {
      if (this.templateTxt) {
        this.tributeConfig.values.push({
          key: this.tributeConfig.values.length,
          value: this.templateTxt,
        });
        this.templateTxt = '';
      }
    },
    gotoSetSeal() {
      this.loading = true;
      this.$api.getContractPdfUrl({
        contractTemplateId: this.$route.query.id,
      }).then((res) => {
        // const time = encodeURI(`&t=${new Date().getTime()}`);
        const time = new Date().getTime();
        const pdfurl = `${res}&t=${time}`;
        this.$router.push({ path: 'setSeal', query: { id: this.contractId, pdfurl } });
      }).finally(() => {
        this.loading = false;
      });
    },
    getCompanySealList() {
      const { companyId } = this.$store.state.fepUserInfo;
      this.$api.getSealList({
        companyId,
      }).then((res) => {
        this.companySealList = res;
      }).finally(() => {
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  display: flex;
  padding: 10px;
  height: calc(100vh - 180px);
  .con-left {
    background: #fff;
    flex: 6;
    .editor {
      background: #fff;
      padding: 20px;
      border-radius: 10px;
    }
    .bot-menu {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
  .con-right {
    flex: 4;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-left: 10px;
    .con-label {
      position: relative;
      margin-bottom: 20px;
      i.line {
        margin-right: 7px;
        vertical-align: middle;
        display: inline-block;
        width: 4px;
        height: 14px;
        border-radius: 2px;
        background-color: #538cd3;
      }
      label {
        font-size: 14px;
      }
      .href {
        float: right;
        text-decoration: underline !important;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18px;
        letter-spacing: 0px;
        color: #ed8d38;
        cursor: pointer;
      }
    }
    /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      background-color: #356fb8;
      border-color: #356fb8;
    }
    /deep/ .el-input-number.is-controls-right .el-input-number__increase {
      line-height: 17px;
    }
    /deep/ .el-input-number {
      line-height: 34px;
    }
    .grey {
      margin-left: 10px;
      color: #b4b6ba;
    }
    .con-template {
      margin-top: 10px;
    }
    .con-btn {
      margin-top: 10px;
      .item-btn {
        // width: 45%;
        border-radius: 16px;
        height: 32px;
        line-height: 0px;
        padding: 10px 30px;
        margin: 10px;
      }
    }
  }
}
</style>
