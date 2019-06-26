<template>
  <div>
    <div class="con">
      <div
        class="con-pdf"
      >
        <c-pdf
          :pdfurl="pdfurl"
        >
          <vue-draggable-resizable
            v-if="sealStore.corpSeal.flag"
            :w="140"
            :h="140"
            parent=".con-canvas"
            :resizable="false"
            class-name="con-draggable"
            @dragging="onDrag"
          >
            <div
              ref="corpSeal"
              class="con-seal-left"
            >
              <img src="../../../../../assets/icon/seal1.png">
              <i class="el-icon-close del-btn" />
            </div>
          </vue-draggable-resizable>
        </c-pdf>
      </div>
      <div class="con-seal">
        <div class="con-seal-btn">
          <div class="item">
            <img
              class="img-fixed"
              src="../../../../../assets/icon/seal1.png"
            >
            <!-- <p>xx专用章</p> -->
            <vue-draggable-resizable
              v-if="sealStore.corpSeal.flag"
              :w="140"
              :h="140"
              :resizable="false"
              class-name="con-draggable"
              @dragging="onDragRight"
            >
              <div
                ref="corpSeal"
                class="con-seal-left"
              >
                <img
                  src="../../../../../assets/icon/seal1.png"
                >
              </div>
            </vue-draggable-resizable>
          </div>
        </div>
      </div>
    </div>
    <affix
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
      // pdfurl: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
      pdfurl: 'https://prv-cdn-hro.2haohro.com/contract.pdf?attname=&e=1561551357&token=N7vjJxbsX_Ekgig5O30bs4bTYpOie6GEkh-gJ0JW:muQvZnmxXq5WRCSmitcJXdtZmAI',
      sealStore: {
        corpSeal: {
          flag: true,
          position: {
            x: 400 / 0.75,
            y: 100 / 0.75,
            ptX: 400,
            ptY: 100,
          },
        },
      },
      loading: false,
      sealPositions: [],
    };
  },
  mounted() {

  },
  methods: {
    save() {
      this.sealPositions.push({
        posPage: 1,
        posX: this.sealStore.corpSeal.position.ptX,
        posY: this.sealStore.corpSeal.position.ptY,
        type: 1,
      });
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
        this.sealPositions = res;
        this.sealStore.corpSeal.position.ptX = '';
      });
    },
    onDrag(x, y) {
      this.sealStore.corpSeal.position.x = x;
      this.sealStore.corpSeal.position.y = y;
      // console.log(x, y);
    },
    onDragRight(x, y) {
      // this.sealStore.corpSeal.position.x = x;
      // this.sealStore.corpSeal.position.y = y;
      console.log(x, y);
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
    background: #fff;
    margin: 10px;
    border-radius: 10px;
    position: relative;
    .con-seal-left {
      position: relative;
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
      text-align: center;
      .img-fixed {
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
