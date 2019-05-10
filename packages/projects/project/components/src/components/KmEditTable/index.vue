<template>
  <div
    ref="wrapper"
    class="km-table-wrapper"
    :class="{scrollX: tableWidth > wrapperWidth}"
    :style="{maxWidth: `${tableWidth + 18}px`}"
  >
    <div
      ref="theader"
      class="km-table-header"
    >
      <table
        cellspacing="0"
        cellpadding="0"
        :style="{width: `${tableWidth}px`}"
      >
        <colgroup>
          <col
            v-for="(columnWidth, index) in columnsWidth"
            :key="index"
            :width="columnWidth"
          >
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="(th, index) in columns"
              :key="index"
              :style="{width: `${th.width}px`}"
            >
              <p :style="{width: `${th.width - 2}px`}">
                {{ th.title }}
              </p>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      ref="tbody"
      class="km-table-body"
      :class="{isDown: isDown}"
      :style="{maxHeight: `${maxHeight}px`}"
    >
      <table
        cellspacing="0"
        cellpadding="0"
        :style="{width: `${tableWidth}px`}"
      >
        <colgroup>
          <col
            v-for="(columnWidth, index) in columnsWidth"
            :key="index"
            :width="columnWidth"
          >
        </colgroup>
        <tbody>
          <tr
            v-for="(tr, rIndex) in data"
            :key="rIndex"
          >
            <td
              v-for="(th, dIndex) in columns"
              :key="dIndex"
              :title="tr[th.key]"
              :style="{width: `${th.width}px`}"
              :data-key="th.key"
              @mouseenter="multiSelect($event, th.key, rIndex, 'tbody')"
            >
              <el-select
                v-if="th.key==='entRule'"
                v-model="tr['entRule']"
                :placement="getPlacement(rIndex)"
                @change="endNumberRule(tr)"
              >
                <el-option
                  v-for="item in ruleOption"
                  :key="item.key"
                  :value="item.key"
                  :label="item.label"
                />
              </el-select>
              <el-select
                v-else-if="th.key==='perRule'"
                v-model="tr['perRule']"
                :placement="getPlacement(rIndex)"
                @change="endNumberRule1(tr)"
              >
                <el-option
                  v-for="item in ruleOption"
                  :key="item.key"
                  :value="item.key"
                  :label="item.label"
                />
              </el-select>
              <input
                v-else
                v-model="tr[th.key]"
                type="text"
                :disabled="getNumberRule(tr,th)"
                @input="formatNumInput1(tr[th.key], tr, th.key)"
                @focus="focusInput($event, rIndex, dIndex)"
              >
              <div
                class="corner"
                @mousedown="cornerDown($event, tr[th.key], th.key, rIndex)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="data.length === 0"
        class="empty-block"
        :style="{width: `${tableWidth}px`}"
      >
        暂无数据
      </div>
    </div>
    <!-- 左侧固定- -->
    <div
      ref="fixedWrapper"
      class="km-table-fixed-rt"
    >
      <div
        ref="fixedTheader"
        class="km-table-fixed-header"
      >
        <table
          cellspacing="0"
          cellpadding="0"
        >
          <colgroup>
            <col
              v-for="(columnWidth, index) in columnsWidth"
              :key="index"
              :width="columnWidth"
            >
          </colgroup>
          <thead>
            <tr>
              <th
                v-for="(th, index) in columns"
                v-show="th.fixed"
                :key="index"
                :style="{width: `${th.width}px`}"
              >
                <p :style="{width: `${th.width - 2}px`}">
                  {{ th.title }}
                </p>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div
        ref="fixedTbody"
        class="km-table-fixed-body"
        :class="{isDown: isDown}"
      >
        <table
          cellspacing="0"
          cellpadding="0"
        >
          <colgroup>
            <col
              v-for="(columnWidth, index) in columnsWidth"
              :key="index"
              :width="columnWidth"
            >
          </colgroup>
          <tbody>
            <tr
              v-for="(tr, rIndex) in data"
              :key="rIndex"
            >
              <td v-if="data">
                <div
                  class="cursor"
                  @click="data.splice(rIndex,1)"
                >
                  删除
                </div>
                <!-- <Button type="ghost"   size="small">删除</Button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: [String, Number],
    },
    fixedEdit: {
      type: Boolean,
      default: false,
    },
    minNum: {
      type: Number,
      default: 0,
    },
    maxNum: {
      type: Number,
      default: 100000,
    },
  },
  data() {
    return {
      wrapperWidth: null,
      tableWidth: null,
      theaderHeight: null,
      columnsWidth: [],
      currentTd: null, // 当前单元格
      isDown: false, // 是否按下

      currentValue: '', // 选中的当前值
      currentType: '', // 选中的当前表头类型
      currentIndex: null, // 当前选择索引
      endIndex: null, // 结尾索引
      multiSelectArr: [], // 当前多选中的数组

      // 聚焦的输入框属性
      focusRIndex: null,
      focusDIndex: null,

      // 编辑光标可移动范围
      editRange: {},
      ruleOption: [
        {
          key: '2',
          label: '四舍五入到角',
        },
        {
          key: '3',
          label: '四舍五入到分',
        },
        {
          key: '4',
          label: '见角分进元',
        },
        {
          key: '5',
          label: '见分进角',
        },
        {
          key: '6',
          label: '进分',
        },

        {
          key: '7',
          label: '舍弃角分',
        },
        {
          key: '8',
          label: '舍弃到角',
        },
        {
          key: '9',
          label: '舍弃到分',
        },
        {
          key: '0',
          label: '无',
        },
      ],
    };
  },
  watch: {
    data: {
      handler() {
        this.handleResize();
      },
      deep: true,

    },
  },
  mounted() {
    this.init();
    // 绑定按键操作
    window.addEventListener('keydown', this.keySubmit);
  },
  beforeDestroy() {
    // 组件销毁前移除按键操作
    window.removeEventListener('keydown', this.keySubmit);
  },
  methods: {
    init() {
      // 增加表头顺表格内容滚动
      this.$refs.tbody.addEventListener('scroll', () => {
        this.$refs.theader.scrollLeft = this.$refs.tbody.scrollLeft;
        this.$refs.fixedTbody.scrollTop = this.$refs.tbody.scrollTop;
      });
      this.handleResize();
    },
    handleResize() {
      // 获取编辑框可移动范围, R是竖轴, D是横轴
      this.editRange = {
        minR: 0,
        maxR: this.data.length - 1,
        minD: this.columns.filter(item => item.fixed).length,
        maxD: this.columns.length - 1,
      };
      // 计算表格宽高
      this.wrapperWidth = this.$refs.wrapper.offsetWidth;
      const thArr = this.$refs.theader.querySelector('tr').querySelectorAll('th');
      // 设置单元格宽度
      this.columns.forEach((column, index) => {
        if (column.width) {
          this.$set(this.columnsWidth, index, column.width);
        } else {
          if (thArr[index].offsetWidth) {
            // 设置单元格最小宽度
            this.$set(this.columnsWidth, index, 60);
          } else {
            this.$set(this.columnsWidth, index, thArr[index].offsetWidth);
          }
        }
      });

      // 如果每列均设置了宽度
      const allWidth = !this.columns.some(cell => !cell.width);
      if (allWidth) {
        this.tableWidth = this.columns.map(cell => cell.width).reduce((a, b) => a + b);
      } else {
        this.tableWidth = this.columnsWidth.reduce((total, cur) => total + cur);
        if (this.tableWidth < this.wrapperWidth) {
          this.tableWidth = this.wrapperWidth;
        }
      }

      this.$nextTick(() => {
        // 设置左侧theader高度与tbody距离顶部距离
        this.theaderHeight = this.$refs.theader.querySelector('thead').offsetHeight;

        // 设置左侧定位高度
        if (this.tableWidth > this.wrapperWidth) {
          this.$refs.fixedWrapper.style.height = `${this.$refs.wrapper.offsetHeight}px`;
          this.$refs.fixedTbody.style.height = `${this.$refs.wrapper.offsetHeight - this.theaderHeight}px`;
        } else {
          this.$refs.fixedWrapper.style.height = `${this.$refs.wrapper.offsetHeight}px`;
          this.$refs.fixedTbody.style.height = `${this.$refs.wrapper.offsetHeight - this.theaderHeight}px`;
        }
        // 计算左侧定位宽度
        const arr = this.columns.filter(cell => cell.fixed);
        if (arr.length > 0 && this.data.length > 0) {
          this.$refs.fixedWrapper.style.width = `${arr.map(item => this.$refs.tbody.querySelector(`td[data-key=${item.key}]`).offsetWidth).reduce((a, b) => a + b)}px`;
        }

        // 当出现竖向滚动条时处理17px滚动条
        if (this.$refs.tbody.querySelector('table').offsetHeight > this.maxHeight) {
          this.$nextTick(() => {
            const colgroup = this.$refs.theader.querySelector('colgroup');
            const tr = this.$refs.theader.querySelector('tr');
            // 如果已存在17pxCol，删除组中17px重新在末尾添加
            for (let i = 0; i < colgroup.children.length; i += 1) {
              if (colgroup.children[i].width === 17) {
                colgroup.removeChild(colgroup.children[i]);
                tr.removeChild(tr.children[i]);
              }
            }
            const col = document.createElement('col');
            col.width = 17;
            colgroup.appendChild(col);

            const th = document.createElement('th');
            th.style.width = '17px';
            th.style.borderTop = '1px solid #e0e0e0';
            tr.appendChild(th);
          });
        }
      });
    },
    focusInput(e, rIndex, dIndex) {
      this.focusRIndex = rIndex;
      this.focusDIndex = dIndex;
      e.target.parentElement.classList.add('current');
      if (this.currentTd) {
        this.currentTd.classList.remove('current');
      }
      this.currentTd = e.target.parentElement;
    },
    cornerDown(e, value, type, index) {
      this.currentValue = value;
      this.currentType = type;
      this.currentIndex = index;
      this.isDown = true;
      window.addEventListener('mouseup', this.cornerUp);
    },
    cornerUp() {
      // 判断是启动多选后触发数据改变
      if (this.isDown) {
        let start;
        let end;
        if (this.currentIndex <= this.endIndex) {
          start = this.currentIndex;
          end = this.endIndex;
        } else {
          start = this.endIndex;
          end = this.currentIndex;
        }
        const obj = {
          start,
          end,
          key: this.currentType,
          value: this.currentValue,
        };
        // 触发改变数据
        this.$emit('multiSelectChange', obj);
        // 添加监听点击去除上次多选中的样式
        window.addEventListener('mousedown', () => {
          this.multiSelectArr.forEach((item) => {
            item.querySelector('input').style.backgroundColor = '#ffffff';
          });
        });
      }
      this.isDown = false;
    },
    // 多选
    multiSelect(e, type, index, bodyType) {
      if (this.isDown) {
        if (this.currentType === type) {
          this.endIndex = index;
          const arr = Array.from(this.$refs[bodyType].querySelectorAll(`td[data-key=${type}]`));
          // 清除样式
          arr.forEach((item) => {
            item.querySelector('input').style.backgroundColor = '#ffffff';
          });
          if (this.currentIndex < this.endIndex) {
            this.multiSelectArr = arr.slice(this.currentIndex, this.endIndex + 1);
          } else {
            this.multiSelectArr = arr.slice(this.endIndex, this.currentIndex + 1);
          }
          // 添加样式
          this.multiSelectArr.forEach((item) => {
            item.querySelector('input').style.backgroundColor = '#E6EFFF';
          });
        } else {
          //   移到其他类型时移除批量修改
          this.multiSelectArr.forEach((item) => {
            item.querySelector('input').style.backgroundColor = '#ffffff';
          });
          this.endIndex = this.currentIndex;
        }
      }
    },
    // 格式化number输入框
    formatNumInput(val, index, key) {
      let nVal;
      try {
        nVal = val.replace(/[^\d.]/g, '');
      } catch (err) {
        return;
      }
      if (/^0\d+/.test(nVal)) {
        nVal = nVal.replace(/0/, '');
      }
      if (Number.isNaN(Number(val))) {
        nVal = 0;
      } else {
        if (nVal > this.maxNum) {
          nVal = this.maxNum;
        }
        if (nVal < this.minNum) {
          nVal = this.minNum;
        }
      }
      this.$emit('formatNumInput', nVal, index, key);
    },
    // 格式化number输入框
    formatNumInput1(val, tr, key) {
      if (key === 'remark' || key === 'executionDate') {
        return;
      }
      let nVal;
      try {
        nVal = val.replace(/[^\d.]/g, '');
      } catch (err) {
        return;
      }
      if (/^0\d+/.test(nVal)) {
        nVal = nVal.replace(/0/, '');
      }
      if (Number.isNaN(Number(val))) {
        nVal = 0;
      } else {
        if (nVal > this.maxNum) {
          nVal = this.maxNum;
        }
        if (nVal < this.minNum) {
          nVal = this.minNum;
        }
      }
      tr[key] = nVal;
      this.changeOther(key, tr);
    },
    keySubmit(e) {
      if (!this.focusRIndex && !this.focusDIndex) {
        return;
      }
      // 下一个光标的横(d)竖(r)轴
      let nextR = this.focusRIndex;
      let nextD = this.focusDIndex;
      // 上下左右键切换光标位置
      switch (e.keyCode) {
        case 37:
          // 左
          if (this.focusDIndex === this.editRange.minD && this.focusRIndex === this.editRange.minR) {
            nextD = this.editRange.maxD;
            nextR = this.editRange.maxR;
          } else if (this.focusDIndex === this.editRange.minD) {
            nextD = this.editRange.maxD;
            nextR = this.focusRIndex - 1;
          } else {
            nextD = this.focusDIndex - 1;
          }
          break;
        case 38:
          // 上
          if (this.focusRIndex === this.editRange.minR) {
            nextR = this.editRange.maxR;
          } else {
            nextR = this.focusRIndex - 1;
          }
          break;
        case 39:
          // 右
          if (this.focusDIndex === this.editRange.maxD && this.focusRIndex === this.editRange.maxR) {
            nextD = this.editRange.minD;
            nextR = this.editRange.minR;
          } else if (this.focusDIndex === this.editRange.maxD) {
            nextD = this.editRange.minD;
            nextR = this.focusRIndex + 1;
          } else {
            nextD = this.focusDIndex + 1;
          }
          break;
        case 40:
          // 下
          if (this.focusRIndex === this.editRange.maxR) {
            nextR = this.editRange.minR;
          } else {
            nextR = this.focusRIndex + 1;
          }
          break;
      }
      if ([37, 38, 39, 40].includes(e.keyCode)) {
        this.$refs.tbody.querySelector('tbody').children[nextR].children[nextD].querySelector('input').focus();
      }
    },
    changeOther(key, tr) { // 更改比例值或者最低基数修改最低缴费
      const companyNumRule = Number(tr.entRule);
      const personalNumRule = Number(tr.perRule);
      if (key === 'perRatio') {
        if (tr.minBase && tr[key]) {
          tr.perMinpay = this.endNumberValue(personalNumRule, (tr[key] * tr.minBase));
        } else {
          tr.perMinpay = 0;
        }
      } else if (key === 'entRatio') {
        if (tr.minBase && tr[key]) {
          tr.entMinPay = this.endNumberValue(companyNumRule, (tr[key] * tr.minBase));
        }
      } else if (key === 'minBase') {
        if (tr.minBase && tr[key]) {
          tr.perMinpay = this.endNumberValue(personalNumRule, (tr[key] * tr.perRatio));

          tr.entMinPay = this.endNumberValue(companyNumRule, (tr[key] * tr.entRatio));
        }
      } else if (key === 'entRule') {
        tr.entMinPay = this.endNumberValue(companyNumRule, (tr.minBase * tr.entRatio));
      } else if (key === 'perRule') {
        tr.perMinpay = this.endNumberValue(personalNumRule, (tr.minBase * tr.perRatio));
      }
    },
    // 缴费基数尾数规则计算
    endNumberValue(key, num) {
      if (key === 0) {
        num = num.toFixed(5);
      } else if (key === 1) {
        num = num.toFixed();
      } else if (key === 2) {
        num = num.toFixed(1);
      } else if (key === 3) {
        num = num.toFixed(2);
      } else if (key === 4) {
        num = num.toFixed(2);
        num = Math.ceil(num);
      } else if (key === 5) {
        num = num.toFixed(2);
        num = Math.ceil(num * 10) / 10;
      } else if (key === 6) {
        num = num.toFixed(3);
        num = Math.ceil(num * 100) / 100;
      } else if (key === 7) {
        num = num.toFixed(2);
        num = Math.floor(num);
      } else if (key === 8) {
        num = num.toFixed(2);
        num = Math.floor(num * 10) / 10;
      } else if (key === 9) {
        num = num.toFixed(3);
        num = Math.floor(num * 100) / 100;
      }
      return num;
    },
    endNumberRule(tr) {
      this.changeOther('entRule', tr);
    },
    endNumberRule1(tr) {
      this.changeOther('perRule', tr);
    },
    getNumberRule(tr, th) {
      if (th.key === 'entMinPay') {
        return tr.entRule !== '0';
      }
      if (th.key === 'perMinpay') {
        return tr.perRule !== '0';
      }
      return false;
    },
    getPlacement(rIndex) {
      return rIndex > 5 ? 'top' : 'bottom';
    },
  },
};
</script>

<style lang="scss" scoped>
.km-table-wrapper {
  position: relative;
  overflow: hidden;
  &.scrollX {
    border-right: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    th,
    td {
      &:first-child {
        border-left: 0;
      }
      &:last-child {
        border-right: 0;
      }
    }
  }
}

.km-table-header {
  overflow: hidden;
  table {
    border-bottom: 1px solid #ddd;
  }
}

.km-table-body {
  overflow: auto;
  user-select: none;
  border-bottom: 1px solid #ddd;
  &.isDown {
    input {
      cursor: crosshair;
    }
  }
}

.km-table-fixed {
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 1px 0 8px #d3d4d6;
  overflow-x: hidden;
  background: #fff;
  .km-table-fixed-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .km-table-fixed-body {
    position: absolute;
    top: 24px;
    left: 0;
    z-index: 3;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
  }
}
.km-table-fixed-rt {
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 1px 0 8px #d3d4d6;
  //   overflow-x: hidden;
  overflow: hidden;
  background: #fff;
  .km-table-fixed-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    table {
      border-bottom: 1px solid #ddd;
    }
  }
  .km-table-fixed-body {
    position: absolute;
    top: 26px;
    left: 0;
    z-index: 3;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
  }
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 12px;
  table-layout: fixed;
  thead {
    tr {
      background-color: #eef1f6;
    }
  }
  th {
    text-align: left;
    text-indent: 4px;
    border: 1px solid #e0e0e0;
    border-bottom: none;
    min-width: 0;
    height: 24px;
  }
  td {
    position: relative;
    text-align: center;
    border: none;
    border: 1px solid #e0e0e0;
    min-width: 0;
    height: 45px;
    padding: 1px;

    &.current {
      input {
        border: 1px solid #57a3f3;
        box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
      }
      .corner {
        display: block;
      }
    }
    .cursor {
      cursor: pointer;
      height: 100%;
      padding-top: 15px;
    }
    .cursor:hover {
      background-color: crimson;
      color: #fff;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  input {
    width: 100%;
    height: 100%;
    text-indent: 4px;
    border: 1px solid #fff;
    &:hover {
      border: 1px solid #57a3f3;
    }
  }
}

// 角落按钮
.corner {
  position: absolute;
  right: 0;
  bottom: 0;
  display: none;
  height: 11px;
  width: 11px;
  border: 2px solid rgb(255, 255, 255);
  background-color: rgb(82, 146, 247);
  cursor: crosshair;
}

// 数据为空
.empty-block {
  padding: 30px;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
}
</style>
