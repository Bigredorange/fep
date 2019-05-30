<template>
  <div>
    company
  </div>
</template>
<script>
// import Echarts from 'vue-echarts';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/title';

export default {
  // components: {
  //   'v-chart': Echarts,
  // },
  // data() {
  //   return {
  //     list: [],
  //     listLoading: false,
  //     form: {
  //       valid: false,
  //       startTime: null,
  //       endTime: null,
  //     },
  //     companyEnterTotal: 0,
  //     customerEnterTotal: 0,
  //     companyNum: 0,
  //     customerNum: 0,
  //     chartOption: {
  //       title: {
  //         text: '入驻统计表',
  //         textStyle: {
  //           fontSize: 18,
  //           color: '#999',
  //         },
  //         x: 'center',
  //         padding: 10,
  //       },
  //       legend: {
  //         data: ['入驻hro数量', '入驻客户数量'],
  //         icon: 'rect',
  //         itemWidth: 15,
  //         itemHeight: 3,
  //         bottom: 10,
  //       },
  //       tooltip: {
  //         trigger: 'axis',
  //         axisPointer: {
  //           type: 'cross',
  //         },
  //       },
  //       backgroundColor: '#fff',
  //       color: ['#ED7E33', '#5C9BD5'],
  //       xAxis: {
  //         type: 'category',
  //         data: [],
  //         axisLine: {
  //           lineStyle: {
  //             color: '#E3E3E3',
  //           },
  //         },
  //         axisLabel: {
  //           color: '#999',
  //         },
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           color: '#E3E3E3',
  //         },
  //       },
  //       yAxis: {
  //         type: 'value',
  //         axisLine: {
  //           lineStyle: {
  //             color: '#E3E3E3',
  //           },
  //         },
  //         axisLabel: {
  //           color: '#999',
  //         },
  //       },
  //       series: [
  //         {
  //           name: '入驻hro数量',
  //           type: 'line',
  //           showSymbol: false,
  //           data: [],
  //         },
  //         {
  //           name: '入驻客户数量',
  //           type: 'line',
  //           showSymbol: false,
  //           data: [],
  //         },
  //       ],
  //       animationDuration: 2000,
  //     },
  //   };
  // },
  // created() {
  //   this.form.startTime = this.$utils.formatDate(new Date(), 'yyyy-MM-dd');
  //   this.form.endTime = this.$utils.formatDate(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
  //   this.getList();
  // },
  // methods: {
  //   getList() {
  //     this.listLoading = true;
  //     this.$api.getCompanyReportList({
  //       ...this.form,
  //     }).then((res) => {
  //       this.list = res.dailyStatistics;
  //       this.companyEnterTotal = res.companyEnterTotal;
  //       this.customerEnterTotal = res.customerEnterTotal;
  //       const dateArr = res.dailyStatistics.map(item => item.date);
  //       const comData = res.dailyStatistics.map(item => item.comDailyQuantity);
  //       const cusData = res.dailyStatistics.map(item => item.cusDailyQuantity);
  //       if (comData.length > 0) {
  //         comData.forEach((com) => {
  //           this.companyNum += com;
  //         });
  //       }
  //       if (cusData.length > 0) {
  //         cusData.forEach((cus) => {
  //           this.customerNum += cus;
  //         });
  //       }
  //       this.chartOption.series[0].data = comData;
  //       this.chartOption.series[1].data = cusData;
  //       this.chartOption.xAxis.data = dateArr;
  //     }).finally(() => {
  //       this.listLoading = false;
  //     });
  //   },
  //   sizeChange(n) {
  //     this.form.pageSize = n;
  //     this.getList();
  //   },
  //   edit(row) {
  //     this.$router.push({ path: 'edit', query: { id: row.id } });
  //   },
  //   selectDate(val) {
  //     const [start, end] = val;
  //     this.form.startTime = start;
  //     this.form.endTime = end;
  //   },
  //   add() {
  //     this.$router.push('edit');
  //   },
  //   disable(item) {
  //     this.$dialogs.confirm({
  //       title: '提示',
  //       content: `确定要${item.status === 1 ? '禁用' : '启用'}吗？`,
  //       onOk: () => {
  //         this.$api.disableCustomer({
  //           id: item.id,
  //           status: Number(!item.status),
  //         }).then(() => {
  //           this.$message.success(`${item.status === 1 ? '禁用' : '启用'}成功`);
  //           this.getList();
  //         });
  //       },
  //     });
  //   },
  //   selectedChildTree(selection) {
  //     const userIdList = [];
  //     selection.forEach((item) => {
  //       if (item.userId) {
  //         userIdList.push(item.userId);
  //       }
  //     });
  //     this.form = Object.assign({}, this.form, {
  //       userIdList,
  //     });
  //     this.getList();
  //   },
  // },
};
</script>
<style lang="scss" scoped>
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
