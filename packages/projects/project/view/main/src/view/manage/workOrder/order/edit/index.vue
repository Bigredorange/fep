<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ !workOrderId ? '新增工单' : '编辑工单' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>{{ !workOrderId ? '填写基本信息' : '基本信息' }}</label>
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
              label="客户名称"
              prop="customerId"
            >
              <el-select
                v-model="form.customerId"
                placeholder="请选择客户"
              >
                <el-option
                  v-for="item in customerList"
                  :key="item.id"
                  :label="item.customerName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="工单编号"
              prop="customerNo"
            >
              <p
                :class="{'grey': !form.customerNo}"
              >
                {{ form.customerNo || '此编号系统自动生成' }}
              </p>
            </el-form-item>
            <el-form-item
              label="工单名称"
              prop="workOrderName"
            >
              <el-input
                v-model="form.workOrderName"
                placeholder="请输入工单名称"
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
              label="金额(元)"
              prop="amount"
            >
              <el-input
                v-model="form.amount"
                placeholder="请输入金额"
              />
            </el-form-item>
            <el-form-item
              label="单位"
              prop="unit"
            >
              <el-select
                v-model="form.unit"
                placeholder="请选择单位"
              >
                <el-option
                  v-for="item in $opt('orderUnit')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="有效期限"
              prop="validityPeriod"
            >
              <el-select
                v-model="form.validityPeriod"
                placeholder="请选择有效期限"
              >
                <el-option
                  v-for="item in $opt('Expirydate')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.validityPeriod === '2'"
              label="有效开始日期"
              prop="startDate"
            >
              <el-date-picker
                v-model="form.startDate"
                type="date"
                placeholder="选择有效开始日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item
              v-if="form.validityPeriod === '2'"
              label="有效结束日期"
              prop="endDate"
            >
              <el-date-picker
                v-model="form.endDate"
                type="date"
                placeholder="选择有效结束日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item
              label="工作区域"
              prop="workArea"
            >
              <el-input
                v-model="form.workArea"
                placeholder="请输入工作区域"
              />
            </el-form-item>
            <el-form-item
              label="工作地址"
              prop="workAddress"
            >
              <el-input
                v-model="form.workAddress"
                placeholder="请输入工作地址"
                type="textarea"
                :rows="2"
              />
            </el-form-item>
            <el-form-item
              label="工作计划日期"
              prop="workPlanDate"
            >
              <el-date-picker
                v-model="form.workPlanDate"
                type="date"
                placeholder="选择工作计划日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item
              label="性别要求"
              prop="genderRequirement"
            >
              <el-select
                v-model="form.genderRequirement"
                placeholder="请选择性别要求"
              >
                <el-option
                  v-for="item in $opt('LGsex')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="学历要求"
              prop="academicRequirement"
            >
              <el-select
                v-model="form.academicRequirement"
                placeholder="请选择学历要求"
              >
                <el-option
                  v-for="item in $opt('Education')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="经验"
              prop="expr"
            >
              <el-select
                v-model="form.expr"
                placeholder="请选择经验"
              >
                <el-option
                  v-for="item in $opt('Experience')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="招聘人数"
              prop="recruitsNumber"
            >
              <el-input
                v-model="form.recruitsNumber"
                placeholder="请输入招聘人数"
              />
            </el-form-item>
            <el-form-item
              label="工种"
              prop="workType"
            >
              <el-select
                v-model="form.workType"
                placeholder="请选择工种"
              >
                <el-option
                  v-for="item in $opt('typeofwork')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="工单费用"
              prop="workOrderFee"
            >
              <el-input
                v-model="form.workOrderFee"
                placeholder="请输入工单费用"
              />
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
              label="职位详情"
              name="jobDetail"
            >
              <div>
                <!-- <p>公司介绍</p> -->
                <el-input
                  v-model="form.jobDetail"
                  :rows="5"
                  placeholder="请输入职位详情"
                  type="textarea"
                  style="width: 60%;margin-left:120px"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="工作时间"
              name="workTime"
            >
              <el-table
                :data="woSchedules"
              >
                <el-table-column
                  label="时间段"
                  prop="period"
                />
                <el-table-column
                  label="星期一"
                  prop="monChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.monChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期二"
                  prop="tueChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.tueChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期三"
                  prop="webChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.webChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期四"
                  prop="thurChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.thurChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期五"
                  prop="friChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.friChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期六"
                  prop="satChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.satChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期日"
                  prop="sunChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.sunChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="全选"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <div>
                      <el-checkbox
                        v-model="row.flag"
                        @change.native="handleCheck(row)"
                      />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="bot-menu">
        <el-button
          v-if="workOrderId"
          v-loading="submitLoading"
          type="primary"
          @click="submitToCheck"
        >
          提交审核
        </el-button>
        <el-button
          v-loading="confirmButtonLoading"
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
        workOrderName: [{
          required: true,
          message: '请输入工单名称',
          trigger: 'blur',
        }],
        amount: [{
          required: true,
          message: '请输入金额',
          trigger: 'blur',
        }],
        customerId: [{
          required: true,
          message: '请输入联系人',
          trigger: 'blur',
        }],
        workArea: [{
          required: true,
          message: '请输入工作区域',
          trigger: 'blur',
        }],
        workAddress: [{
          required: true,
          message: '请输入工作地址',
          trigger: 'blur',
        }],
        recruitsNumber: [{
          required: true,
          message: '请选择招聘人数',
          trigger: 'blur',
        }],
        validityPeriod: [{
          required: true,
          message: '请选择有效期限',
          trigger: 'blur',
        }],
        paySettlement: [{
          required: true,
          message: '请选择薪资结算',
          trigger: 'blur',
        }],
        unit: [{
          required: true,
          message: '请选择单位',
          trigger: 'blur',
        }],
        workType: [{
          required: true,
          message: '请选择工种',
          trigger: 'blur',
        }],
        workPlanDate: [{
          required: true,
          message: '请选择工作计划日期',
          trigger: 'blur',
        }],
        startDate: [{
          required: true,
          message: '请选择有效日期',
          trigger: 'blur',
        }],
        endDate: [{
          required: true,
          message: '请选择截止日期',
          trigger: 'blur',
        }],
      },
      form: {
        customerNo: null,
        workOrderName: null,
        customerId: null,
        paySettlement: null,
        contactName: null,
        amount: null,
        unit: null,
        startDate: null,
        endDate: null,
        workArea: null,
        workAddress: null,
        workPlanDate: null,
        genderRequirement: '1',
        academicRequirement: '1',
        expr: '1',
        recruitsNumber: null,
        workType: null,
        workOrderFee: null,
        jobDetail: null,
      },
      confirmButtonLoading: false,
      submitLoading: false,
      customerList: [],
      workOrderId: null,
      tabName: 'jobDetail',
      createTime: null,
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
      woSchedules: [
        {
          period: '上午',
          monChecked: false,
          tueChecked: false,
          webChecked: false,
          thurChecked: false,
          friChecked: false,
          satChecked: false,
          sunChecked: false,
          flag: false,
        },
        {
          period: '下午',
          monChecked: false,
          tueChecked: false,
          webChecked: false,
          thurChecked: false,
          friChecked: false,
          satChecked: false,
          sunChecked: false,
          flag: false,
        },
        {
          period: '晚上',
          monChecked: false,
          tueChecked: false,
          webChecked: false,
          thurChecked: false,
          friChecked: false,
          satChecked: false,
          sunChecked: false,
          flag: false,
        },
      ],
    };
  },
  mounted() {
    this.getCustomerAll();
    this.workOrderId = this.$route.query.id;
    if (this.workOrderId) {
      this.getDetail(this.workOrderId);
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.jobDetail) {
            this.$message.info('请输入职位详情');
            return;
          }
          this.confirmButtonLoading = true;
          let api = '';
          let param = null;
          this.form.companyId = this.$store.state.fepUserInfo.companyId;
          this.form.woSchedules = this.woSchedules;
          if (!this.workOrderId) {
            api = 'addWorkOrder';
            param = {
              ...this.form,
            };
          } else {
            api = 'updateWorkOrder';
            param = {
              ...this.form,
              id: this.workOrderId,
            };
          }
          this.$api[api](param).then(() => {
            this.$message.success('保存成功');
            // this.$router.push('list');
          }).finally(() => {
            this.confirmButtonLoading = false;
          });
        } else {
          this.$message.info('请按提示填写');
        }
      });
    },
    getCustomerAll() {
      this.isLoading = true;
      this.$api.getCustomerAll().then((res) => {
        this.customerList = res;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    getDetail(id) {
      this.$api.getWorkOrder({ id }).then((res) => {
        this.form = res;
        this.woSchedules = res.woSchedules;
        this.setAllCheck(this.woSchedules);
      });
    },
    setAllCheck(arr) {
      arr.forEach((item) => {
        const keys = Object.keys(item);
        item.flag = true;
        keys.forEach((key) => {
          if (key.includes('Checked')) {
            if (!item[key] && key !== 'id') {
              item.flag = false;
            }
          }
        });
      });
      // return arr;
    },
    handleCheck(row) {
      const keys = Object.keys(row);
      keys.forEach((key) => {
        if (key !== 'period') {
          row[key] = row.flag;
        }
      });
    },
    submitToCheck() {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要提交审核吗？',
        onOk: () => {
          this.changeWorkOrder(this.workOrderId, 1);
        },
      });
    },
    changeWorkOrder(id, status) {
      this.submitLoading = true;
      this.$api.changeWorkOrder({
        id,
        status,
      }).then(() => {
        this.$message.success('提交成功');
        this.getList();
      }).finally(() => {
        this.submitLoading = false;
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
