<template>
  <div>
    <div>
      <div
        id="cpdf"
        class="cpdf"
      >
        <div class="center">
          <div class="contor">
            <el-button
              icon="el-icon-arrow-left"
              @click="prev"
            >
              上一页
            </el-button>
            <span class="page">Page: <span v-text="page_num" /> / <span v-text="page_count" /></span>
            <el-button
              icon="el-icon-arrow-right"
              @click="next"
            >
              下一页
            </el-button>

            <!-- <button @click="addscale">
              加
            </button>
            <button @click="minus">
              减
            </button>
            <button
              id="prev"
              @click="closepdf"
            >
              关闭
            </button> -->
          </div>
          <div
            class="con-canvas"
            @drop="onDrop"
            @dragover="allowDrop"
          >
            <slot />
            <canvas
              id="the-canvas"
              class="canvasstyle"
            />
          </div>
        </div>
      </div>
    </div>
    <div />
  </div>
</template>
<script>
import PDFJS from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min';

export default {
  name: 'CPdf',
  props: {
    pdfurl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pdfDoc: null, // pdfjs 生成的对象
      pageNum: 1, //
      pageRendering: false,
      pageNumPending: null,
      scale: 1, // 放大倍数
      page_num: 0, // 当前页数
      page_count: 0, // 总页数
      maxscale: 2, // 最大放大倍数
      minscale: 0.8, // 最小放大倍数
    };
  },
  computed: {
    ctx() {
      const id = document.getElementById('the-canvas');
      return id.getContext('2d');
    },
  },
  mounted() {
    const vm = this;
    // PDFJS.disableWorker = true;
    // console.log(PDFJS);
    // PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';
    // PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjsWorker';
    // PDFJS.GlobalWorkerOptions.workerSrc = './pdf.worker.min.js';
    const pdfjsWorkerBlob = new Blob([pdfjsWorker]);
    const pdfjsWorkerBlobURL = URL.createObjectURL(pdfjsWorkerBlob);
    PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorkerBlobURL;
    PDFJS.getDocument(vm.pdfurl).then((pdfDoc_) => { // 初始化pdf
      vm.pdfDoc = pdfDoc_;
      vm.page_count = vm.pdfDoc.numPages;
      vm.renderPage(vm.pageNum);
    });
  },
  methods: {
    renderPage(num) { // 渲染pdf
      const vm = this;
      this.pageRendering = true;
      const canvas = document.getElementById('the-canvas');
      // Using promise to fetch the page
      this.pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport(vm.scale);
        // alert(vm.canvas.height)
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: vm.ctx,
          viewport,
        };
        const renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(() => {
          vm.pageRendering = false;
          if (vm.pageNumPending !== null) {
            // New page rendering is pending
            vm.renderPage(vm.pageNumPending);
            vm.pageNumPending = null;
          }
        });
      });
      vm.page_num = vm.pageNum;
    },
    getPageNum() {
      return this.page_num;
    },
    addscale() { // 放大
      if (this.scale >= this.maxscale) {
        return;
      }
      this.scale += 0.1;
      this.queueRenderPage(this.pageNum);
    },
    minus() { // 缩小
      if (this.scale <= this.minscale) {
        return;
      }
      this.scale -= 0.1;
      this.queueRenderPage(this.pageNum);
    },
    prev() { // 上一页
      const vm = this;
      if (vm.pageNum <= 1) {
        return;
      }
      vm.pageNum -= 1;
      vm.queueRenderPage(vm.pageNum);
      this.$emit('prevPage', vm.pageNum);
    },
    next() { // 下一页
      const vm = this;
      if (vm.pageNum >= vm.page_count) {
        return;
      }
      vm.pageNum += 1;
      vm.queueRenderPage(vm.pageNum);
      this.$emit('nextPage', vm.pageNum);
    },
    closepdf() { // 关闭PDF
      this.$emit('closepdf');
    },
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    },
    onDrop(e) {
      this.$emit('imgDrop', e);
      // console.log(e);
    },
    allowDrop(event) {
      event.preventDefault();
    },
  },
};
</script>
<style lang="scss" scoped>
.cpdf {
    display: flex;
    justify-content: center;
    // position: fixed;
    // top: 0;
    // left: 0;
    // background-color: rgba(0, 0, 0, .5);
    // width: 100%;
    // height: 100%;
    // z-index: 99999;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // .center {
    //   text-align: center;
    //   height: 100%;
    //   overflow: auto;
    //   padding-top: 110px;
    .page {
      margin: 0 10px;
    }
    .contor {
      padding: 10px;
      text-align: center;
    }
    #the-canvas {
      // width: 842px;
      height: 842px;
    }
    .con-canvas {
      position: relative;
    }
  }
</style>
