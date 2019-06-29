<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>企业认证流程</label>
      </div>
      <div>
        <el-steps
          :active="step"
          class="con-step"
        >
          <el-step
            title="经办人完成实名认证"
          />
          <el-step
            title="企业基本信息审核"
          />
          <el-step
            title="企业对公账户审核"
          />
          <el-step
            title="账户打款验证"
          />
          <el-step
            title="完成认证"
          />
        </el-steps>
        <div class="con-content">
          <div
            v-if="step === 0"
            class="step-one"
          >
            <el-alert
              type="info"
              :closable="false"
            >
              <slot name="title">
                <p
                  class="warning-txt"
                >
                  提示
                </p>
                <p>您是经办人，但暂未完成实名认证，请先完成实名认证，再进行企业认证。</p>
                <el-button
                  class="btn-authentic"
                  type="primary"
                  @click="$refs.authenticPerson.open()"
                >
                  立即实名认证
                </el-button>
              </slot>
            </el-alert>
          </div>
          <div
            v-if="step === 1"
            class="step-two"
          >
            <el-alert
              type="info"
              :closable="false"
            >
              <slot name="title">
                <p
                  class="warning-txt"
                >
                  提示
                </p>
                <p>企业基本信息暂未提交审核，是否立即提交审核？</p>
                <el-button
                  class="btn-authentic"
                  type="primary"
                  @click="authCompanyCheck"
                >
                  立即提交审核
                </el-button>
              </slot>
            </el-alert>
          </div>
          <div
            v-if="step === 2 || step === 3"
            class="step-three"
          >
            <div
              v-if="step === 2 && authStatus === 1"
            >
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="100px"
                class="ui-form two-col"
              >
                <h3 class="label">
                  请填写对公账户信息，申请企业认证
                </h3>
                <el-form-item
                  label="开户银行"
                  prop="bankName"
                >
                  <el-select
                    v-model="form.bankName"
                    placeholder="请选择开户银行"
                    filterable
                  >
                    <el-option
                      v-for="(item, index) in bankList"
                      :key="index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="银行所在地"
                  prop="city"
                >
                  <el-cascader
                    v-model="form.proCity"
                    placeholder="请选择城市"
                    :options="cityList"
                    filterable
                    :props="propsLabel"
                    @change="handleNodeChange"
                  />
                </el-form-item>
                <el-form-item
                  label="开户行"
                  prop="bankId"
                >
                  <el-select
                    v-model="form.bankId"
                    placeholder="请选择开户行"
                    filterable
                  >
                    <el-option
                      v-for="item in branchList"
                      :key="item.id"
                      :label="item.bankBranch"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="银行卡号"
                  prop="bankAccount"
                >
                  <el-input
                    v-model="form.bankAccount"
                    placeholder="请输入银行卡号"
                  />
                </el-form-item>
                <el-form-item
                  label="服务协议"
                  prop="checked"
                >
                  <el-checkbox v-model="form.checked">
                    <span>
                      同意
                      <a style="color: #356fb8">《电子签约服务协议》</a>
                    </span>
                  </el-checkbox>
                </el-form-item>
              </el-form>
              <div class="bot-menu">
                <el-button
                  v-loading="confirmButtonLoading"
                  type="primary"
                  @click="submit"
                >
                  提交认证
                </el-button>
              </div>
            </div>
            <div
              v-if="step === 2 && authStatus === 2"
              class="step-ing"
            >
              <img src="../../../../assets/icon/ing.png">
              <h3 class="label">
                企业基本信息审核中...请耐心等待
              </h3>
            </div>
          </div>
          <div
            v-if="step === 3"
          >
            <div>
              <el-alert
                type="info"
                :closable="false"
              >
                <slot name="title">
                  <p
                    class="warning-txt"
                  >
                    关于银行打款金额认证说明
                  </p>
                  <p>1、运营方会根据提交的企业认证信息做校验，比对成功后会给您所填写的银行账户打款，整个过程大概需要1-2个工作日；</p>
                  <p>2、认证机构会通过【连连支付】的第三方向企业账户打款，请及时确认；</p>
                  <p>3、从您所在企业账户收到打款的72小时内输入有效，超过时间则认证失败。</p>
                </slot>
              </el-alert>
            </div>
            <div class="step-four">
              <h3 class="label">
                请填写打款金额
              </h3>
              <div class="con-option">
                <el-input
                  v-model="money"
                  placeholder="请输入打款金额"
                  class="input"
                />
                <el-button
                  v-loading="confirmButtonLoading"
                  type="primary"
                  @click="authCompanyPayAuth"
                >
                  确认提交
                </el-button>
              </div>
            </div>
          </div>
          <div
            v-if="step === 4"
            class="step-five"
          >
            <img src="../../../../assets/icon/recharge_succeed.png">
            <h3 class="label">
              恭喜您！企业已完成认证
            </h3>
          </div>
        </div>
        <authentic-person
          ref="authenticPerson"
          @update="handlePersonAuth"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AuthenticPerson from './AuthenticPerson.vue';

export default {
  components: {
    AuthenticPerson,
  },
  data() {
    return {
      rules: {
        bankName: [{
          required: true,
          message: '请选择银行',
          trigger: 'blur',
        }],
        city: [{
          required: true,
          message: '请选择城市',
          trigger: 'blur',
        }],
        bankId: [{
          required: true,
          message: '请选择城市',
          trigger: 'blur',
          type: 'number',
        }],
        bankAccount: [{
          required: true,
          message: '请输入银行卡号',
          trigger: 'blur',
        }],
        checked: [{
          required: true,
          message: '请同意服务协议',
          trigger: 'blur',
          type: 'boolean',
        }],
      },
      form: {
        bankName: null,
        city: null,
        province: null,
        checked: null,
        proCity: [],
        bankAccount: null,
        bankId: null,
      },
      confirmButtonLoading: false,
      companyId: null,
      authStatus: null,
      perAuthStatus: null,
      step: null,
      money: null,
      bankList: [],
      cityList: [],
      branchList: [],
      propsLabel: {
        value: 'label',
      },
    };
  },
  watch: {
    authStatus() {
      this.setStep();
    },
    perAuthStatus() {
      this.setStep();
    },
    'form.bankName': function () {
      this.getCityList();
    },
    'form.city': function () {
      this.getCityBankList();
    },
  },
  created() {
    const { companyId, authStatus } = this.$store.state.fepUserInfo;
    this.companyId = companyId;
    this.getDetail(this.companyId);
    this.perAuthStatus = authStatus;
    this.getBankList();
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          this.$api.authCompanyPay({
            id: this.companyId,
            bankId: this.form.bankId,
            bankAccount: this.form.bankAccount,
          }).then(() => {
            this.$message.success('提交认证成功');
            this.getDetail(this.companyId);
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
        this.authStatus = res.authStatus;
        this.form.bankName = res.bankName;
        this.form.city = res.city;
        this.form.province = res.province;
        this.form.bankAccount = res.bankAccount;
        this.form.bankId = res.bankId;
        this.form.proCity.push(this.form.province);
        this.form.proCity.push(this.form.city);
        this.setStep();
      });
    },
    setStep() {
      if (this.authStatus === 0 && this.perAuthStatus === 0) {
        this.step = 0;
      } else if (this.authStatus === 0 && this.perAuthStatus === 1) {
        this.step = 1;
      } else if (this.authStatus === 1) {
        this.step = this.authStatus + 1;
      } else {
        this.step = this.authStatus;
      }
    },
    handlePersonAuth() {
      this.perAuthStatus = this.$store.state.fepUserInfo.authStatus;
    },
    authCompanyCheck() {
      this.$api.authCompanyCheck({
        id: this.companyId,
      }).then(() => {
        this.$message.success('企业基本信息认证通过');
        this.getDetail(this.companyId);
      });
    },
    getBankList() {
      this.$api.getBankList().then((res) => {
        this.bankList = res;
      });
    },
    getCityList() {
      this.$api.getCityList({
        bankName: this.form.bankName,
      }).then((res) => {
        const temp = res.map((item) => {
          item.label = item.province;
          item.children.map((ele) => {
            ele.label = ele.city;
            delete ele.province;
            delete ele.city;
            return ele;
          });
          delete item.province;
          return item;
        });
        this.cityList = temp;
      });
    },
    getCityBankList() {
      this.$api.getCityBankList({
        bankName: this.form.bankName,
        province: this.form.province,
        city: this.form.city,
      }).then((res) => {
        this.branchList = res;
      });
    },
    handleNodeChange(node) {
      const [first, second] = node;
      this.form.province = first;
      if (node.length === 2) {
        this.form.city = second;
      }
    },
    authCompanyPayAuth() {
      this.confirmButtonLoading = true;
      this.$api.authCompanyPayAuth({
        id: this.companyId,
        cash: this.money,
      }).then(() => {
        this.$message.success('认证成功');
        this.getDetail(this.companyId);
      }).finally(() => {
        this.confirmButtonLoading = false;
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
    height: calc(100vh - 180px);
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
    .con-step {
      margin: 10px 20%;
      /deep/ .el-step__title {
        font-size: 14px;
      }
      /deep/ .el-step__icon {
        width: 50px;
        height: 50px;
        // background-color: #f1f2f4;
        // border: solid 2px #e4e7eb;
      }
      /deep/ .el-step.is-horizontal .el-step__line {
        top: 25px;
      }
      /deep/ .el-step__head.is-finish {
        color: #548dd3;
        border-color: #548dd3;
      }
      /deep/ .el-step__title.is-finish {
        color: #548dd3;
      }
    }
    .con-content {
      margin: 0 15%;
      .btn-authentic {
        position: absolute;
        right: 20px;
        top: 25px;
      }
      .bot-menu {
          margin: 0 10% 20px;
          padding-top: 20px;
          display: flex;
          justify-content: center;
      }
      /deep/ .el-alert--info {
        background-color: #f5f7fc;
        color: #000000;
        border-radius: 3px;
        padding: 20px;
      }
      .warning-txt {
        color: #d2660f;
        padding-bottom: 10px;
      }
      .label {
        padding: 20px;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
      }
      .step-one {
      }
      .step-three {
        background-color: #ffffff;
        box-shadow: 0px 0px 12px 1px rgba(83, 140, 211, 0.48);
        border-radius: 3px;
        border: solid 1px #f0f0f0;
        .step-ing {
          background-color: #f5f7fc;
          text-align: center;
          padding: 40px;
          color: #000000;
          font-size: 18px;
        }
        .label {
          padding: 20px;
          font-weight: normal;
        }
      }
      .step-four {
        background-color: #ffffff;
        box-shadow: 0px 0px 12px 1px rgba(83, 140, 211, 0.48);
        border-radius: 3px;
        border: solid 1px #f0f0f0;
        text-align: center;
        margin-top: 20px;
        padding: 20px;
        .con-option {
          display: flex;
          margin: 0 20%;
          justify-content: center;
          .input {
            max-width: 300px;
            margin-right: 20px;
          }
        }
      }
      .step-five {
        background-color: #ffffff;
        box-shadow: 0px 0px 12px 1px rgba(83, 140, 211, 0.48);
        border-radius: 3px;
        border: solid 1px #f0f0f0;
        text-align: center;
        margin-top: 20px;
        padding: 5%;
      }
    }
  }
}
</style>
