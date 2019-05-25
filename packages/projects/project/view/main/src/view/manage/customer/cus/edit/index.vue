<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ !customerId ? '新增客户' : '编辑客户' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>{{ !customerId ? '填写基本信息' : '基本信息' }}</label>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="140px"
            style="margin-left: 120px;"
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="客户编号"
              prop="customerNo"
            >
              <p
                :class="{'grey': !form.customerNo}"
              >
                {{ form.customerNo || '此编号系统自动生成' }}
              </p>
            </el-form-item>
            <el-form-item
              label="客户名称"
              prop="customerName"
            >
              <el-input
                v-model="form.customerName"
                placeholder="请输入客户名称"
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
                  v-for="item in $opt('Industry')"
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
              label="联系人"
              prop="contactName"
            >
              <el-input
                v-model="form.contactName"
                placeholder="请输入联系人"
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
              label="传真"
              prop="fax"
            >
              <el-input
                v-model="form.fax"
                placeholder="请输入传真"
              />
            </el-form-item>
            <el-form-item
              label="区域"
              prop="area"
            >
              <el-input
                v-model="form.area"
                placeholder="请输入区域"
              />
            </el-form-item>
            <el-form-item
              label="是否启用余额控制"
              prop="balanceLimit"
            >
              <el-radio-group
                v-model="form.balanceLimit"
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
              label="详细地址"
              prop="address"
            >
              <el-input
                v-model="form.address"
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
      <div class="con-tab">
        <div>
          <el-tabs
            v-model="tabName"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              label="注册信息"
              name="register"
            >
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="140px"
                inline
                class="ui-form three-col"
                style="margin-left: 120px;width: 80%;"
              >
                <el-form-item
                  label="成立日期"
                >
                  <!-- <el-date-picker
                    v-model="form.establishmentDate"
                    placeholder="请选择成立日期"
                    value-format="yyyy-MM-dd"
                  /> -->
                  <el-date-picker
                    v-model="form.establishmentDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
                <el-form-item
                  label="法人代表"
                >
                  <el-input
                    v-model="form.legalRepresentative"
                    placeholder="请输入法人代表"
                  />
                </el-form-item>
                <el-form-item
                  label="注册城市"
                >
                  <el-input
                    v-model="form.registeredCity"
                    placeholder="请输入注册城市"
                  />
                </el-form-item>
                <el-form-item
                  label="注册地址"
                >
                  <el-input
                    v-model="form.registeredAddress"
                    :rows="2"
                    placeholder="请输入注册地址"
                    type="textarea"
                  />
                </el-form-item>
                <el-form-item
                  label="注册资金"
                  prop="registeredCapital"
                >
                  <el-input
                    v-model="form.registeredCapital"
                    placeholder="请输入注册资金"
                  />
                </el-form-item>
                <el-form-item
                  label="工商局注册号"
                >
                  <el-input
                    v-model="form.gsgRegisterNo"
                    placeholder="请输入工商局注册号"
                  />
                </el-form-item>
                <el-form-item
                  label="统一社会信用代码"
                >
                  <el-input
                    v-model="form.uscc"
                    placeholder="请输入统一社会信用代码"
                  />
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              label="开票信息"
              name="invoice"
            >
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="140px"
                inline
                class="ui-form three-col"
                style="margin-left: 120px;width: 80%;"
              >
                <el-form-item
                  label="开票类型"
                >
                  <el-select
                    v-model="form.invoiceAptitude"
                    placeholder="请选择开票类型"
                  >
                    <el-option
                      v-for="item in inoviceTypeList"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="开票名称"
                >
                  <el-input
                    v-model="form.invoiceName"
                    placeholder="请输入开票名称"
                  />
                </el-form-item>
                <el-form-item
                  label="购方税号"
                >
                  <el-input
                    v-model="form.buyerTaxNum"
                    placeholder="请输入购方税号"
                  />
                </el-form-item>
                <el-form-item
                  label="开户行名称"
                >
                  <el-input
                    v-model="form.openBankName"
                    :rows="2"
                    placeholder="请输入开户行名称"
                    type="textarea"
                  />
                </el-form-item>
                <el-form-item
                  label="开户行账号"
                  prop="openBankAccount"
                >
                  <el-input
                    v-model="form.openBankAccount"
                    placeholder="请输入开户行账号"
                  />
                </el-form-item>
                <el-form-item
                  label="地址"
                >
                  <el-input
                    v-model="form.invoiceAddress"
                    placeholder="请输入地址"
                  />
                </el-form-item>
                <el-form-item
                  label="电话"
                >
                  <el-input
                    v-model="form.tel"
                    placeholder="电话"
                  />
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              label="公司介绍"
              name="company"
            >
              <div>
                <!-- <p>公司介绍</p> -->
                <el-input
                  v-model="form.introduction"
                  :rows="5"
                  placeholder="请输入公司详情"
                  type="textarea"
                  style="width: 60%;margin-left:120px"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
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
  </div>
</template>
<script>

export default {
  data() {
    return {
      rules: {
        customerName: [{
          required: true,
          message: '请输入客户名称',
          trigger: 'blur',
        }],
        contactName: [{
          required: true,
          message: '请输入联系人',
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
        customerNo: null,
        customerName: null,
        industry: null,
        status: 1,
        contactName: null,
        remark: null,
        fax: null,
        contactPhone: null,
        landline: null,
        area: null,
        address: null,
        establishmentDate: null,
        legalRepresentative: null,
        registeredCity: null,
        registeredAddress: null,
        registeredCapital: null,
        gsgRegisterNo: null,
        uscc: null,
        invoiceAptitude: 1,
        invoiceName: null,
        buyerTaxNum: null,
        openBankName: null,
        openBankAccount: null,
        invoiceAddress: null,
        tel: null,
        introduction: null,
        balanceLimit: 1,
      },
      confirmButtonLoading: false,
      rolesList: [],
      customerId: null,
      tabName: 'register',
      inoviceTypeList: [
        {
          key: 0,
          label: '一般纳税人',
        },
        {
          key: 1,
          label: '小规模纳税人',
        },
      ],
    };
  },
  mounted() {
    this.getRolesList();
    this.customerId = this.$route.query.id;
    if (this.customerId) {
      this.getDetail(this.customerId);
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          let api = '';
          let param = null;
          this.form.companyId = this.$store.state.fepUserInfo.companyId;
          if (!this.customerId) {
            api = 'addCustomer';
            param = {
              ...this.form,
            };
          } else {
            api = 'updateCustomer';
            param = {
              ...this.form,
              id: this.customerId,
            };
          }
          this.$api[api](param).then((res) => {
            this.$message.success('保存成功');
            // this.$router.push('list');
            this.customerId = res;
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
      this.$api.getCustomer({ id }).then((res) => {
        this.form = res;
      });
    },
    handleTabClick() {

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
  }
  .bot-menu {
      margin-top: 20px;
      display: flex;
      justify-content: center;
  }
}
</style>
