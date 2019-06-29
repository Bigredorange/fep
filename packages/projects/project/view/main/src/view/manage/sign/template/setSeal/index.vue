<template>
  <div>
    <div class="con">
      <div
        class="con-pdf"
        :loading="loading"
        element-loading-text="正在加载"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <c-pdf
          :pdfurl="pdfurl"
          @imgDrop="onDrop"
          @prevPage="handlePrevPage"
          @nextPage="handleNextPage"
        >
          <template
            v-for="(item, index) in sealStore.corpSeal[pageNum - 1]"
          >
            <vue-draggable-resizable
              v-if="item.flag"
              :key="item.key"
              :w="140"
              :h="140"
              :x="item.x"
              :y="item.y"
              :parent="true"
              :resizable="false"
              class-name="con-draggable"
              @dragstop="onDragEnd"
            >
              <div
                ref="corpSeal"
                class="con-seal-left"
              >
                <img
                  :src="require('../../../../../assets/icon/seal1.png')"
                  @click="selectCorpItem(index)"
                >
                <i
                  class="el-icon-close del-btn"
                  @click="deleteCorpSeal(index)"
                />
              </div>
            </vue-draggable-resizable>
          </template>
          <template
            v-for="(item, index) in sealStore.perSeal[pageNum - 1]"
          >
            <vue-draggable-resizable
              v-if="item.flag"
              :key="item.key"
              :w="140"
              :h="140"
              :x="item.x"
              :y="item.y"
              :parent="true"
              :resizable="false"
              class-name="con-draggable"
              @dragstop="onDragEndPer"
            >
              <div
                class="con-seal-left"
              >
                <img
                  width="140"
                  :src="require('../../../../../assets/icon/personWrite.png')"
                  @click="selectPerItem(index)"
                >
                <i
                  class="el-icon-close del-btn"
                  @click="deletePerSeal(index)"
                />
              </div>
            </vue-draggable-resizable>
          </template>
        </c-pdf>
      </div>
      <div class="con-seal">
        <div class="con-seal-btn">
          <div class="item">
            <img
              id="imgCorp"
              class="img-fixed"
              src="../../../../../assets/icon/seal1.png"
              @dragstart="handleDragType"
            >
          </div>
          <div class="item">
            <img
              id="perWrite"
              class="img-fixed"
              src="../../../../../assets/icon/personWrite.png"
              @dragstart="handleDragType"
            >
          </div>
        </div>
      </div>
    </div>
    <affix
      v-show="isShow"
      direction="bottom"
      :offset="0"
    >
      <div class="bot-menu">
        <el-button
          :loading="loading"
          type="primary"
          @click="save"
        >
          保存
        </el-button>
      </div>
    </affix>
  </div>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import CPdf from '../../../../../components/CPdf.vue';

export default {
  components: {
    CPdf,
    VueDraggableResizable,
  },
  data() {
    return {
      // pdfurl: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/freeculture.pdf',
      pdfurl: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
      // pdfurl: 'https://prv-cdn-hro.2haohro.com/contract.pdf?attname=&e=1561551357&token=N7vjJxbsX_Ekgig5O30bs4bTYpOie6GEkh-gJ0JW:muQvZnmxXq5WRCSmitcJXdtZmAI',
      sealStore: {
        corpSeal: [],
        perSeal: [],
      },
      loading: false,
      sealPositions: [],
      pageNum: 1,
      corpIndex: 0,
      perIndex: 0,
      sealType: '',
      isShow: false,
    };
  },
  created() {
    setTimeout(() => {
      this.isShow = true;
    }, 1000);
    this.getContractSeal();
    this.getContractPdfUrl();
  },
  methods: {
    save() {
      const perPosition = this.sealStore.perSeal.map((item) => {
        const arr = [];
        item.forEach((ele) => {
          const temp = {
            posPage: ele.page,
            posX: ele.x,
            posY: ele.y,
            type: 2,
          };
          arr.push(temp);
        });
        return arr;
      });
      const corpPosition = this.sealStore.corpSeal.map((item) => {
        const arr = [];
        item.forEach((ele) => {
          const temp = {
            posPage: ele.page,
            posX: ele.x,
            posY: ele.y,
            type: 1,
          };
          arr.push(temp);
        });
        return arr;
      });
      this.sealPositions = this.sealPositions.concat(...perPosition, ...corpPosition);
      console.log(this.sealPositions);
      this.$api.setContractSeal({
        contractTemplateId: this.$route.query.id,
        sealPositions: this.sealPositions,
      }).then(() => {
        this.$message.success('保存成功');
      });
    },
    getContractSeal() {
      this.$api.getContractSeal({
        contractTemplateId: this.$route.query.id,
      }).then((res) => {
        res.forEach((item) => {
          let prop = '';
          if (item.type === 1) {
            prop = 'corpSeal';
          } else {
            prop = 'perSeal';
          }
          let sealArr = this.sealStore[prop][item.posPage - 1];
          if (!sealArr) {
            sealArr = [];
          }
          const obj = {};
          const num = parseInt(Math.random() * 100, 10);
          obj.key = `${prop}${num}`;
          obj.page = item.posPage;
          obj.x = item.posX;
          obj.y = item.posY;
          obj.type = item.type;
          obj.flag = true;
          sealArr.push(obj);
          this.$set(this.sealStore[prop], item.posPage - 1, sealArr);
        });
      });
    },
    onDragEnd(x, y) {
      this.sealStore.corpSeal[this.pageNum - 1][this.corpIndex].x = x;
      this.sealStore.corpSeal[this.pageNum - 1][this.corpIndex].y = y;
    },
    onDragEndPer(x, y) {
      this.sealStore.perSeal[this.pageNum - 1][this.perIndex].x = x;
      this.sealStore.perSeal[this.pageNum - 1][this.perIndex].y = y;
    },
    onDrop(e) {
      let prop = '';
      if (this.sealType === 'corp') {
        prop = 'corpSeal';
      } else {
        prop = 'perSeal';
      }
      const obj = {};
      const num = parseInt(Math.random() * 100, 10);
      obj.key = `${prop}${num}`;
      obj.flag = true;
      obj.x = e.offsetX - 70;
      obj.y = e.offsetY - 70;
      obj.page = this.pageNum;
      let pageArr = this.sealStore[prop][this.pageNum - 1];
      if (!pageArr) {
        pageArr = [];
      }
      pageArr.push(obj);
      this.$set(this.sealStore[prop], this.pageNum - 1, pageArr);
    },
    handlePrevPage(num) {
      this.pageNum = num;
    },
    handleNextPage(num) {
      this.pageNum = num;
    },
    selectCorpItem(index) {
      this.corpIndex = index;
    },
    selectPerItem(index) {
      this.perIndex = index;
    },
    deleteCorpSeal(index) {
      this.sealStore.corpSeal[this.pageNum - 1].splice(index, 1);
    },
    deletePerSeal(index) {
      this.sealStore.perSeal[this.pageNum - 1].splice(index, 1);
    },
    handleDragType(e) {
      if (e.target.id === 'imgCorp') {
        this.sealType = 'corp';
      } else {
        this.sealType = 'per';
      }
    },
    getContractPdfUrl() {
      this.loading = true;
      this.$api.getContractPdfUrl({
        contractTemplateId: this.$route.query.id,
      }).then((res) => {
        this.pdfurl = res;
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  display: flex;
  .con-pdf {
    // flex: 6;
    width: 60%;
    padding: 10px;
    background: #f3f6fb;
    position: relative;
    .con-seal-left {
      position: relative;
      width: 140px;
      height: 140px;
      .del-btn {
        position: absolute;
        top: 0;
        right: 0;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
  .con-seal {
    // flex: 4;
    width: 40%;
    background: #f3f6fb;
    .con-seal-btn {
      padding: 10px;
      background: #fff;
      margin: 10px;
      border-radius: 10px;
      width: 300px;
      position: absolute;
      height: 100%;
      right: 0;
    }
    .item {
      margin-bottom: 10px;
      text-align: center;
      .img-fixed {
        width: 140px;
        height: 140px;
        border: 1px dashed rgba(0, 0, 0, 0.8);
      }
      // display: flex;
      // justify-content: center;
    }
  }
}
.center {
    left: 50% !important;
    transform: translateX(-50%) !important;
    bottom: 24px !important;
}
.bot-menu {
    background: #fff;
    padding: 10px;
    display: flex;
    justify-content: center;
    margin-right: 224px;
}
.con-draggable {
    cursor: move;
    border: 1px dashed rgba(0, 0, 0, 0.8);
}
</style>
