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
            :clearable="false"
            @change="getList"
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
            :clearable="false"
            @change="getList"
          />
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
      <v-chart
        :options="chartOption"
        style="width: 100%"
      />
    </div>
  </div>
</template>
<script>
import Echarts from 'vue-echarts/dist/vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
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
        startTime: null,
        endTime: null,
      },
      empEnterTotal: 0,
      customerEnterTotal: 0,
      empNum: 0,
      customerNum: 0,
      chartOption: {
        title: {
          text: '日流水报表',
          textStyle: {
            fontSize: 18,
            color: '#999',
          },
          x: 'center',
          padding: 10,
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
          },
          axisLabel: {
            color: '#999',
          },
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
          },
          axisLabel: {
            color: '#999',
          },
        },
        series: [
          {
            name: '日流水',
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
      this.$api.getBillReportList({
        ...this.form,
      }).then((res) => {
        this.list = res;
        const dateArr = res.map(item => item.date);
        const yData = res.map(item => item.quantity);
        this.chartOption.series[0].data = yData;
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
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-date-editor--date .el-input__prefix {
  top: 45%;
}
.con-report {
  margin: 8px;
  background: #fff;
  .total {
    padding-left: 20px;
    background: #fff;
    padding-bottom: 10px;
  }
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
