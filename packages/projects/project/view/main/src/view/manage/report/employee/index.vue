<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>开始日期：</span>
          <el-date-picker
            v-model="form.startTime"
            style="width: 200px;"
            placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :default-value="form.startTime"
          />
        </div>
        <div class="item">
          <span>结束日期：</span>
          <el-date-picker
            v-model="form.endTime"
            style="width: 200px;"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :default-value="form.endTime"
          />
        </div>
        <div class="item">
          <span>企业状态：</span>
          <el-checkbox
            v-model="form.valid"
            style="line-height: 35px;"
          >
            只看有效
          </el-checkbox>
        </div>
        <div
          class="item"
        >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getList"
          >
            查询
          </el-button>
        </div>
      </section>
    </top-bar>
    <div class="con-report">
      <v-chart :options="chartOption" />
    </div>
    <div class="con-table">
      <div class="buttons">
        <span>
          当前日期范围下，入驻hro总数为{{ companyNum }}家, 入驻客户总数为{{ customerNum }}家。
        </span>
      </div>
      <el-table
        :data="list"
        :loading="listLoading"
        style="max-height: 500px;overflow-y: auto"
      >
        <el-table-column
          prop="date"
          align="center"
          label="创建日期"
        />
        <el-table-column
          prop="comDailyQuantity"
          align="center"
          label="入驻hro数量"
        />
        <el-table-column
          prop="cusDailyQuantity"
          align="center"
          label="入驻客户数量"
        />
      </el-table>
    </div>
  </div>
</template>
<script>
import Echarts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

export default {
  components: {
    'v-chart': Echarts,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        valid: false,
        startTime: null,
        endTime: null,
      },
      companyNum: 0,
      customerNum: 0,
      chartOption: {
        title: {
          text: '入驻灵工数量',
          textStyle: {
            fontSize: 18,
            color: '#999',
          },
          x: 'center',
          padding: 10,
        },
        legend: {
          data: ['入驻hro数量', '入驻客户数量'],
          icon: "rect",
          itemWidth: 15,
          itemHeight: 3,
          bottom: 10,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        backgroundColor: '#fff',
        color: ['#5C9BD5'],
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#E3E3E3',
            },
          }
        },
        axisLine: {
          lineStyle: {
            color: '#E3E3E3',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#E3E3E3',
            },
          }
        },
        series: [
          {
            name: '入驻hro数量',
            type: 'line',
            showSymbol: false,
            data: [],
          },
          {
            name: '入驻客户数量',
            type: 'line',
            showSymbol: false,
            data: [],
          },
        ],
        animationDuration: 2000,
      },
    };
  },
  created() {
    this.form.startTime = this.$utils.formatDate(new Date(), 'yyyy-MM-dd');
    this.form.endTime = this.$utils.formatDate(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$api.getCompanyReportList({
        ...this.form,
      }).then((res) => {
        this.list = res.dailyStatistics;
        const dateArr = res.dailyStatistics.map(item => item.date)
        const comData = res.dailyStatistics.map(item => item.comDailyQuantity);
        const cusData = res.dailyStatistics.map(item => item.cusDailyQuantity);
        this.chartOption.series[0].data = comData;
        this.chartOption.series[1].data = cusData;
        this.chartOption.xAxis.data = dateArr;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
    edit(row) {
      this.$router.push({ path: 'edit', query: { id: row.id } });
    },
    selectDate(val) {
      const [start, end] = val;
      this.form.startTime = start;
      this.form.endTime = end;
    },
    add() {
      this.$router.push('edit');
    },
    disable(item) {
      this.$dialogs.confirm({
        title: '提示',
        content: `确定要${item.status === 1 ? '禁用' : '启用'}吗？`,
        onOk: () => {
          this.$api.disableCustomer({
            id: item.id,
            status: Number(!item.status),
          }).then(() => {
            this.$message.success(`${item.status === 1 ? '禁用' : '启用'}成功`);
            this.getList();
          });
        },
      });
    },
    selectedChildTree(selection) {
      const userIdList = [];
      selection.forEach((item) => {
        if (item.userId) {
          userIdList.push(item.userId);
        }
      });
      this.form = Object.assign({}, this.form, {
        userIdList,
      });
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.con-report {
  padding: 8px;
}
.con-table {
  background: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 0px 8px 8px;
  .buttons {
    display: flex;
    margin-bottom: 16px;
  }
  .grey {
    color: #999999;
  }
  .mouse {
    cursor: pointer;
  }
}
</style>
