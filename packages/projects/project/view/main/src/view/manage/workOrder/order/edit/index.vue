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
                  v-for="item in rolesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
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
                  :value="item.dictValue"
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
                  v-for="item in $opt('paySettlement')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
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
                  v-for="item in $opt('paySettlement')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="有效日期"
              prop="contactPhone"
            >
              <el-date-picker
                v-model="createTime"
                style="width: 260px;"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="selectDate"
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
                  v-for="item in $opt('paySettlement')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
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
                  v-for="item in $opt('paySettlement')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
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
                  v-for="item in $opt('paySettlement')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
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
                  v-for="item in $opt('paySettlement')"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
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
            @tab-click="handleTabClick"
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
                  prop="woSchedulesmonChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.woSchedulesmonChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期二"
                  prop="woSchedulestueChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.woSchedulestueChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期三"
                  prop="woScheduleswebChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.woScheduleswebChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期四"
                  prop="woSchedulesthurChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.woSchedulesthurChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期五"
                  prop="woSchedulesfriChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.woSchedulesfriChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期六"
                  prop="woSchedulessatChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.woSchedulessatChecked"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="星期七"
                  prop="woSchedulessunChecked"
                >
                  <template
                    slot-scope="{ row }"
                  >
                    <el-checkbox
                      v-model="row.woSchedulessunChecked"
                    />
                  </template>
                </el-table-column>
              </el-table>
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
        paySettlement: 1,
        contactName: null,
        unit: null,
        startDate: null,
        endDate: null,
        workArea: null,
        workAddress: null,
        workPlanDate: null,
        genderRequirement: null,
        academicRequirement: null,
        expr: null,
        recruitsNumber: null,
        workType: null,
        workOrderFee: null,
        jobDetail: null,
      },
      confirmButtonLoading: false,
      rolesList: [],
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
          woSchedulesmonChecked: 0,
          woSchedulestueChecked: 0,
          woScheduleswebChecked: 0,
          woSchedulesthurChecked: 0,
          woSchedulesfriChecked: 0,
          woSchedulessatChecked: 0,
          woSchedulessunChecked: 0,
        },
        {
          period: '下午',
          woSchedulesmonChecked: 0,
          woSchedulestueChecked: 0,
          woScheduleswebChecked: 0,
          woSchedulesthurChecked: 0,
          woSchedulesfriChecked: 0,
          woSchedulessatChecked: 0,
          woSchedulessunChecked: 0,
        },
        {
          period: '晚上',
          woSchedulesmonChecked: 0,
          woSchedulestueChecked: 0,
          woScheduleswebChecked: 0,
          woSchedulesthurChecked: 0,
          woSchedulesfriChecked: 0,
          woSchedulessatChecked: 0,
          woSchedulessunChecked: 0,
        },
      ],
    };
  },
  mounted() {
    this.getRolesList();
    this.workOrderId = this.$route.query.id;
    if (this.workOrderId) {
      this.getDetail(this.workOrderId);
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
      this.$api.getWorkOrder({ id }).then((res) => {
        this.form = res;
      });
    },
    handleTabClick() {

    },
    selectDate(val) {
      const [start, end] = val;
      this.form.startDate = start;
      this.form.endDate = end;
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
