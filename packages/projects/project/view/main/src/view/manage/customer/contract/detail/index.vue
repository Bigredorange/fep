<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>合同详情</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>基本信息</label>
          <el-form
            ref="form"
            :model="form"
            label-width="140px"
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="客户"
              prop="customerId"
            >
              <p>
                {{ form.customerName }}
              </p>
            </el-form-item>
            <el-form-item
              label="合同编号"
              prop="contractNo"
            >
              <p>
                {{ form.contractNo }}
              </p>
            </el-form-item>
            <el-form-item
              label="合同名称"
              prop="contractName"
            >
              <p>
                {{ form.contractName }}
              </p>
            </el-form-item>
            <el-form-item
              label="合同状态"
              prop="contractState"
            >
              <p>
                {{ getStatusName(form.contractState) }}
              </p>
            </el-form-item>
            <el-form-item
              label="详细地址"
              prop="address"
            >
              <p>
                {{ form.address }}
              </p>
            </el-form-item>
            <el-form-item
              label="签约时间"
              prop="signingDate"
            >
              <p>
                {{ form.signingDate }}
              </p>
            </el-form-item>
            <el-form-item
              label="合作开始时间"
              prop="contractStartDate"
            >
              <p>
                {{ form.contractStartDate }}
              </p>
            </el-form-item>
            <el-form-item
              label="合作截止时间"
              prop="contractEndDate"
            >
              <p>
                {{ form.contractEndDate }}
              </p>
            </el-form-item>

            <el-form-item
              label="备注"
              prop="remark"
            >
              <p>
                {{ form.remark }}
              </p>
            </el-form-item>
            <el-form-item
              label="合同附件"
              prop="attachment"
              style="width: 66%"
            >
              <div class="file-upload">
                <ul>
                  <li
                    v-for="(item) in fileList"
                    :key="item.id"
                    class="file"
                  >
                    <div
                      class="fileDesc"
                      @click="downloadFile(item)"
                    >
                      <p
                        class="name"
                      >
                        {{ item.fileName }}
                      </p>
                      <p
                        class="action"
                      >
                        <span>操作人: {{ item.userName }} </span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-form>
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
        customerId: null,
        contractNo: null,
        contractState: 1,
        contractName: null,
        customerName: null,
        remark: null,
        signingDate: null,
        contractStartDate: null,
        contractEndDate: null,
        attachment: null,
      },
      contractId: null,
      statusList: [
        {
          key: 0,
          label: '终止',
        },
        {
          key: 1,
          label: '正常',
        },
        {
          key: 2,
          label: '异常',
        },
      ],
      fileList: [],
    };
  },
  created() {
    this.contractId = this.$route.query.id;
    if (this.contractId) {
      this.getDetail(this.contractId);
    }
  },
  methods: {
    getDetail(id) {
      this.$api.getCusContract({ id }).then((res) => {
        this.form = res;
        const fileList = JSON.parse(res.attachment) || [];
        this.fileList = fileList.map((item) => {
          const obj = {};
          obj.fileName = item;
          return obj;
        });
      });
    },
    downloadFile(item) {
      return item;
      // this.$api.fileDownloadUpload({
      //   filePath: item.path,
      //   type: 'CUS_CONTRACT',
      // }, item.fileName);
    },
    getCustomerAll() {
      this.isLoading = true;
      this.$api.getCustomerAll().then((res) => {
        this.customerList = res;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    getStatusName(status) {
      const temp = this.statusList.find(item => item.key === status);
      return temp.label;
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
  .file-upload {
  .upload-btn {
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .file {
    .delete-btn {
      margin: auto 0;
      &:hover {
        cursor: pointer;
      }
    }
    display: flex;
    color: #7b848e;
    margin-bottom: 5px;
    .fileDesc {
      display: flex;
      justify-content: space-around;
      &:hover {
        cursor: pointer;
      }
      width: 60%;
      background-color: #ffffff;
      border: solid 1px #f0f0f0;
      height: 41px;
      margin: 0 10px;
      line-height: 41px;
      font-size: 12px;
      padding: 0 10px;
      .name {
        color: #000000;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 150px;
      }
      .action {
        color: #7b848e;
        float:right;
      }
    }
  }
  .width66 {
    width: 66%;
  }
}
}
</style>
