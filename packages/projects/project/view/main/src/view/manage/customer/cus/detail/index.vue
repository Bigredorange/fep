<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>客户详情</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>基本信息</label>
          <el-form
            ref="form"
            :model="form"
            label-width="140px"
            style="margin-left: 120px;"
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="客户编号"
              prop="customerNo"
            >
              <p>
                {{ form.customerNo }}
              </p>
            </el-form-item>
            <el-form-item
              label="客户名称"
              prop="customerName"
            >
              <p>
                {{ form.customerName }}
              </p>
            </el-form-item>
            <el-form-item
              label="行业"
              prop="industry"
            >
              <p>
                {{ $optDicLabel('Industry', form.industry) }}
              </p>
            </el-form-item>
            <el-form-item
              label="状态"
              prop="status"
            >
              <p>
                {{ form.status === 1 ? '启用' : '禁用' }}
              </p>
            </el-form-item>
            <el-form-item
              label="联系人"
              prop="contactName"
            >
              <p>
                {{ form.contactName }}
              </p>
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="contactPhone"
            >
              <p>
                {{ form.contactPhone }}
              </p>
            </el-form-item>
            <el-form-item
              label="座机"
              prop="landline"
            >
              <p>
                {{ form.landline }}
              </p>
            </el-form-item>
            <el-form-item
              label="传真"
              prop="fax"
            >
              <p>
                {{ form.fax }}
              </p>
            </el-form-item>
            <el-form-item
              label="区域"
              prop="area"
            >
              <p>
                {{ form.area }}
              </p>
            </el-form-item>
            <el-form-item
              label="是否启用余额控制"
              prop="balanceLimit"
            >
              <p>
                {{ form.balanceLimit === 1 ? '启用' : '禁用' }}
              </p>
            </el-form-item>
            <el-form-item
              label="详细地址"
              prop="address"
            >
              <p>
                {{ form.address }}
              </p>
            </el-form-item>
            <el-form-item
              label="备注"
              prop="remark"
            >
              <p>
                {{ form.remark }}
              </p>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="con-tab">
        <div>
          <el-tabs
            v-model="tabName"
          >
            <el-tab-pane
              label="注册信息"
              name="register"
            >
              <el-form
                ref="form"
                :model="form"
                label-width="140px"
                inline
                class="ui-form three-col"
                style="margin-left: 120px;width: 80%;"
              >
                <el-form-item
                  label="成立日期"
                >
                  <p>
                    {{ form.establishmentDate }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="法人代表"
                >
                  <p>
                    {{ form.legalRepresentative }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="注册城市"
                >
                  <p>
                    {{ form.registeredCity }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="注册地址"
                >
                  <p>
                    {{ form.registeredAddress }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="注册资金"
                  prop="registeredCapital"
                >
                  <p>
                    {{ form.registeredCapital }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="工商局注册号"
                >
                  <p>
                    {{ form.gsgRegisterNo }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="统一社会信用代码"
                >
                  <p>
                    {{ form.uscc }}
                  </p>
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
                label-width="140px"
                inline
                class="ui-form three-col"
                style="margin-left: 120px;width: 80%;"
              >
                <el-form-item
                  label="开票类型"
                >
                  <p>
                    {{ form.invoiceAptitude === 0 ? '一般纳税人' : '小规模纳税人' }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="开票名称"
                >
                  <p>
                    {{ form.invoiceName }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="购方税号"
                >
                  <p>
                    {{ form.buyerTaxNum }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="开户行名称"
                >
                  <p>
                    {{ form.openBankName }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="开户行账号"
                  prop="openBankAccount"
                >
                  <p>
                    {{ form.openBankAccount }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="地址"
                >
                  <p>
                    {{ form.invoiceAddress }}
                  </p>
                </el-form-item>
                <el-form-item
                  label="电话"
                >
                  <p>
                    {{ form.tel }}
                  </p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              label="公司介绍"
              name="company"
            >
              <div>
                <p
                  style="width: 60%;margin-left:120px"
                >
                  {{ form.introduction }}
                </p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
        customerId: null,
      },
      tabName: 'register',
    };
  },
  created() {
    this.customerId = this.$route.query.id;
    if (this.customerId) {
      this.getDetail(this.customerId);
    }
  },
  methods: {
    getDetail(id) {
      this.$api.getCustomer({ id }).then((res) => {
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
