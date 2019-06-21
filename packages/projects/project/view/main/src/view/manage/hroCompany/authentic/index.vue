<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>企业认证</label>
      </div>
      <el-form
        ref="formUser"
        :model="form"
        :rules="rules"
        label-width="140px"
        inline
        class="ui-form three-col"
      >
        <div class="area">
          <div class="label">
            <i class="line" />
            <label>企业基本信息</label>
          </div>
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
            label="法人代表"
            prop="legalRepresentative"
          >
            <el-input
              v-model="form.legalRepresentative"
              placeholder="请输入法人代表"
            />
          </el-form-item>
          <el-form-item
            label="公司地址"
            prop="companyAddress"
          >
            <el-input
              v-model="form.companyAddress"
              placeholder="请输入公司地址"
              type="textarea"
              :rows="2"
            />
          </el-form-item>
          <el-form-item
            label="薪资结算"
            prop="paySettlement"
          >
            <el-select
              v-model="form.paySettlement"
              placeholder="请选择薪资结算"
            >
              <el-option
                v-for="item in $opt('paySettlement')"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="注册日期"
            prop="startDate"
          >
            <el-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="选择注册日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item
            label="证件号码"
            prop="landline"
          >
            <el-input
              v-model="form.landline"
              placeholder="请输入证件号码"
            />
          </el-form-item>
          <el-form-item
            label="注册地址"
            prop="companyAddress"
          >
            <el-input
              v-model="form.companyAddress"
              placeholder="请输入注册地址"
              type="textarea"
              :rows="2"
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
            label="统一社会信用代码"
            prop="uscc"
          >
            <el-input
              v-model="form.uscc"
              placeholder="请输入统一社会信用代码"
            />
          </el-form-item>
        </div>
        <div class="area">
          <div class="label">
            <i class="line" />
            <label>对公账户信息</label>
          </div>
          <el-form-item
            label="开户银行"
            prop="contactPhone"
          >
            <el-input
              v-model="form.contactPhone"
              placeholder="请输入开户银行"
            />
          </el-form-item>
          <el-form-item
            label="银行所在地"
            prop="area"
          >
            <areas
              v-model="form.companyArea"
              :work-area="form.companyArea"
            />
          </el-form-item>
          <el-form-item
            label="开户行"
            prop="contactPhone"
          >
            <el-input
              v-model="form.contactPhone"
              placeholder="请输入开户行"
            />
          </el-form-item>
          <el-form-item
            label="银行卡号"
            prop="contactPhone"
          >
            <el-input
              v-model="form.contactPhone"
              placeholder="请输入银行卡号"
            />
          </el-form-item>
        </div>
        <div class="area">
          <div class="label">
            <i class="line" />
            <label>申请授权</label>
            <el-form-item
              label="申请授权书"
              prop="name"
              style="width:100%"
            >
              <div class="authentic">
                <div class="item upload">
                  <el-button
                    icon="el-icon-plus"
                    type="primary"
                  >
                    上传授权书
                  </el-button>
                  <p>未上传，请点击上传授权书</p>
                </div>
                <div class="item downloadFile">
                  <el-button
                    icon="el-icon-download"
                    type="primary"
                  >
                    下载授权书
                  </el-button>
                  <p>授权人签名和盖章后，可拍照或者扫描后上传</p>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              label="服务协议"
              prop="contactPhone"
            >
              <el-checkbox v-model="form.checked">
                <span>
                  同意
                  <a style="color: #356fb8">《电子签约服务协议》</a>
                </span>
              </el-checkbox>
            </el-form-item>
          </div>
        </div>
      </el-form>
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
import Areas from '../../../../components/Area.vue';

export default {
  components: {
    Areas,
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
      companyId: null,
      qrcodeSrc: '',
      qrcodeFlag: false,
    };
  },
  created() {
    this.companyId = this.$route.query.id;
    const { level, companyId } = this.$store.state.fepUserInfo;
    if (level === 3) {
      this.companyId = companyId;
    }
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
            if (this.$store.state.fepUserInfo.level !== 3) {
              this.$router.push('list');
            }
          }).finally(() => {
            this.confirmButtonLoading = false;
          });
        } else {
          this.$message.info('请按提示填写');
        }
      });
    },
    getDetail(id) {
      this.$api.getCompany({ id }).then((res) => {
        this.form = res;
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
      // border-top: dashed 1px #ebf0f9;
      border-bottom: dashed 1px #ebf0f9;
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
      .grey {
        color: #999999;
      }
    }
    .area:nth-child(0n + 1) {
      border-top: dashed 1px #ebf0f9;;
    }
    .authentic {
      display: flex;
      .item {
        border: 1px solid #E7EDF6;
        padding: 10px;
        border-radius: 5px;
        width: 30%;
        text-align: center;
      }
      .item:nth-child(2n + 0) {
        margin-left: 20px;
      }
    }
    .con-code {
      padding: 10px 0;
      border-bottom: dashed 1px #ebf0f9;;
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
        .amount {
          float: right;
          margin-top: 10px;
        }
      .authentication {
        padding: 10px;
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
