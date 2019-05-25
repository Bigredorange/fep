<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ !companyId ? '新增企业' : '编辑企业' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>{{ !companyId ? '填写基本信息' : '基本信息' }}</label>
          <el-form
            ref="formUser"
            :model="form"
            :rules="rules"
            label-width="140px"
            style="margin-left: 120px;"
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="HRO企业编号"
              prop="enterpriseNum"
            >
              <p
                :class="{'grey': !form.enterpriseNum}"
              >
                {{ form.enterpriseNum || '此编号系统自动生成' }}
              </p>
            </el-form-item>
            <el-form-item
              label="HRO名称"
              prop="companyName"
            >
              <el-input
                v-model="form.companyName"
                placeholder="请输入HRO名称"
              />
            </el-form-item>
            <el-form-item
              label="行业"
              prop="industry"
            >
              <el-select
                v-model="form.industry"
                placeholder="请选择行业"
              >
                <el-option
                  v-for="item in $opt('hroIndustry')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="企业性质"
            >
              <el-select
                v-model="form.enterpriseNature"
                placeholder="请选择企业性质"
              >
                <el-option
                  v-for="item in $opt('Enterprise')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="状态"
              prop="status"
            >
              <el-radio-group
                v-model="form.status"
              >
                <el-radio-button
                  :label="1"
                >
                  启用
                </el-radio-button>
                <el-radio-button
                  :label="0"
                >
                  禁用
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="企业法人"
              prop="legalRepresentative"
            >
              <el-input
                v-model="form.legalRepresentative"
                placeholder="请输入企业法人"
              />
            </el-form-item>
            <el-form-item
              label="统一社会信用代码"
              prop="uscc"
            >
              <el-input
                v-model="form.uscc"
                placeholder="请输入统一社会信用代码"
              />
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="contactPhone"
            >
              <el-input
                v-model="form.contactPhone"
                placeholder="请输入联系电话"
              />
            </el-form-item>
            <el-form-item
              label="座机"
              prop="landline"
            >
              <el-input
                v-model="form.landline"
                placeholder="请输入座机"
              />
            </el-form-item>
            <el-form-item
              label="区域"
              prop="area"
            >
              <el-input
                v-model="form.companyArea"
                placeholder="请输入区域"
              />
            </el-form-item>
            <el-form-item
              label="详细地址"
              prop="companyAddress"
            >
              <el-input
                v-model="form.companyAddress"
                placeholder="请输入详细地址"
                type="textarea"
                :rows="2"
              />
            </el-form-item>
            <el-form-item
              label="备注"
              prop="remark"
            >
              <el-input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="2"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div
        v-if="companyId"
        class="con-code"
      >
        <i class="line" />
        <label>企业二维码</label>
        <el-button
          type="primary"
          text="企业二维码"
          class="btn"
          @click="createCode"
        >
          企业二维码
        </el-button>
        <mask-code
          v-if="qrcodeFlag"
          :img="qrcodeSrc"
          @click.native="qrcodeFlag=false"
        >
          <img
            ref="qrcode"
            :src="qrcodeSrc"
            width="290"
          >
        </mask-code>
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
  </div>
</template>
<script>
import MaskCode from './Mask.vue';

export default {
  components: {
    MaskCode,
  },
  data() {
    return {
      rules: {
        companyName: [{
          required: true,
          message: '请输入HRO名称',
          trigger: 'blur',
        }],
        legalRepresentative: [{
          required: true,
          message: '请输入企业法人',
          trigger: 'blur',
        }],
        industry: [{
          required: true,
          message: '请选择行业',
          trigger: 'blur',
        }],
        contactPhone: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value && !this.$utils.regExp(value, 'mp')) {
              callback(new Error('请输入正确的联系电话'));
            } else {
              callback();
            }
          },
        }],
      },
      form: {
        enterpriseNum: null,
        companyName: null,
        industry: null,
        enterpriseNature: null,
        status: 1,
        legalRepresentative: null,
        remark: null,
        uscc: null,
        contactPhone: null,
        landline: null,
        companyArea: null,
        companyAddress: null,
      },
      confirmButtonLoading: false,
      rolesList: [],
      companyId: null,
      qrcodeSrc: '',
      qrcodeFlag: false,
    };
  },
  mounted() {
    this.getRolesList();
    this.companyId = this.$route.query.id;
    if (this.companyId) {
      this.getDetail(this.companyId);
    }
  },
  methods: {
    submit() {
      this.$refs.formUser.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          let api = '';
          let param = null;
          if (!this.companyId) {
            api = 'addCompany';
            param = this.form;
          } else {
            api = 'updateCompany';
            param = {
              ...this.form,
              id: this.companyId,
            };
          }
          this.$api[api](param).then(() => {
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
    getRolesList() {
      this.isLoading = true;
      this.$api.getAllRole({
        name: '',
        status: 1,
      }).then((res) => {
        this.rolesList = res;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    getDetail(id) {
      this.$api.getCompany({ id }).then((res) => {
        this.form = res;
      });
    },
    createCode() {
      this.$api.createCompany({
        id: this.companyId,
      }).then((res) => {
        this.qrcodeSrc = window.URL.createObjectURL(res);
        this.qrcodeFlag = true;
        // this.$refs.qrcode.src = this.qrcodeSrc;
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
      .grey {
        color: #999999;
      }
    }
    .con-code {
      padding: 10px 0;
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
        .btn {
          margin-left: 20px;
        }
    }
  }
  .bot-menu {
      margin-top: 20px;
      display: flex;
      justify-content: center;
  }
}
</style>
