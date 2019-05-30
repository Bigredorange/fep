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
              <p>{{ $optDicLabel('paySettlement', form.paySettlement) }}</p>
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
              <p>{{ $optDicLabel('orderUnit', form.unit) }}</p>
            </el-form-item>
            <el-form-item
              label="有效期限"
              prop="validityPeriod"
            >
              <p>{{ $optDicLabel('orderUnit', form.validityPeriod) }}</p>
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
              <p>{{ $optDicLabel('LGsex', form.genderRequirement) }}</p>
            </el-form-item>
            <el-form-item
              label="学历要求"
              prop="academicRequirement"
            >
              <p>{{ $optDicLabel('Education', form.academicRequirement) }}</p>
            </el-form-item>
            <el-form-item
              label="经验"
              prop="expr"
            >
              <p>{{ $optDicLabel('Experience', form.expr) }}</p>
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
              <p>{{ $optDicLabel('typeofwork', form.workType) }}</p>
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
        this.woSchedules = res.woSchedules;
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
