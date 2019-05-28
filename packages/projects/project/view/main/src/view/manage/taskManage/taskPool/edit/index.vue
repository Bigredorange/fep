<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>工单详情</label>
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
              label="客户名称"
              prop="customerId"
            >
              <p>{{ form.customerName }}</p>
            </el-form-item>
            <el-form-item
              label="工单编号"
              prop="customerNo"
            >
              <p>{{ form.customerNo }}</p>
            </el-form-item>
            <el-form-item
              label="工单名称"
              prop="workOrderName"
            >
              <p>{{ form.workOrderName }}</p>
            </el-form-item>
            <el-form-item
              label="薪资结算"
              prop="paySettlement"
            >
              <p>{{ form.paySettlement }}</p>
            </el-form-item>
            <el-form-item
              label="金额(元)"
              prop="amount"
            >
              <p>{{ form.amount }}</p>
            </el-form-item>
            <el-form-item
              label="单位"
              prop="unit"
            >
              <p>{{ form.unit }}</p>
            </el-form-item>
            <el-form-item
              label="有效期限"
              prop="validityPeriod"
            >
              <p>{{ form.validityPeriod }}</p>
            </el-form-item>
            <el-form-item
              label="有效开始日期"
              prop="startDate"
            >
              <p>{{ form.startDate }}</p>
            </el-form-item>
            <el-form-item
              label="有效结束日期"
              prop="endDate"
            >
              <p>{{ form.endDate }}</p>
            </el-form-item>
            <el-form-item
              label="工作区域"
              prop="workArea"
            >
              <p>{{ form.workArea }}</p>
            </el-form-item>
            <el-form-item
              label="工作地址"
              prop="workAddress"
            >
              <p>{{ form.workAddress }}</p>
            </el-form-item>
            <el-form-item
              label="工作计划日期"
              prop="workPlanDate"
            >
              <p>{{ form.workPlanDate }}</p>
            </el-form-item>
            <el-form-item
              label="性别要求"
              prop="genderRequirement"
            >
              <p>{{ form.genderRequirement }}</p>
            </el-form-item>
            <el-form-item
              label="学历要求"
              prop="academicRequirement"
            >
              <p>{{ form.academicRequirement }}</p>
            </el-form-item>
            <el-form-item
              label="经验"
              prop="expr"
            >
              <p>{{ form.expr }}</p>
            </el-form-item>
            <el-form-item
              label="招聘人数"
              prop="recruitsNumber"
            >
              <p>{{ form.recruitsNumber }}</p>
            </el-form-item>
            <el-form-item
              label="工种"
              prop="workType"
            >
              <p>{{ form.workType }}</p>
            </el-form-item>
            <el-form-item
              label="工单费用"
              prop="workOrderFee"
            >
              <p>{{ form.workOrderFee }}</p>
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
                  label="星期日"
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
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
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
      workOrderId: null,
      tabName: 'jobDetail',
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
    this.workOrderId = this.$route.query.id;
    if (this.workOrderId) {
      this.getDetail(this.workOrderId);
    }
  },
  methods: {
    getDetail(id) {
      this.$api.getWorkOrder({ id }).then((res) => {
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
