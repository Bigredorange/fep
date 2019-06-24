<template>
  <div>
    <div class="con">
      <div class="con-pdf">
        <c-pdf :pdfurl="pdfurl">
          <template
            slot="drag"
          >
            <drag
              :absolute="true"
            >
              <transition
                name="fade"
              >
                <drag-item
                  v-model="sealStore.corpSeal.position"
                >
                  <div class="con-seal-left">
                    <img src="../../../../../assets/icon/seal1.png">
                    <i class="el-icon-close del-btn" />
                  </div>
                </drag-item>
              </transition>
            </drag>
          </template>
        </c-pdf>
      </div>
      <div class="con-seal">
        <div class="con-seal-btn">
          <div class="item">
            <img src="../../../../../assets/icon/seal1.png">
            <p>xx专用章</p>
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
import CPdf from '../../../../../components/CPdf.vue';
import Drag from '../../../../../components/Drag.vue';
import DragItem from '../../../../../components/DragItem.vue';

export default {
  components: {
    CPdf,
    Drag,
    DragItem,
  },
  data() {
    return {
      // pdfurl: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/freeculture.pdf',
      pdfurl: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
      // pdfurl: '../view/main/src/view/manage/sign/template/setSeal/contract.pdf',
      sealStore: {
        corpSeal: {
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
</style>
