<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ !contractId ? '新增合同' : '编辑合同' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>{{ !contractId ? '填写基本信息' : '基本信息' }}</label>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="140px"
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="客户"
              prop="customerId"
            >
              <el-select
                v-model="form.customerId"
                placeholder="请选择客户"
              >
                <el-option
                  v-for="item in customerList"
                  :key="item.id"
                  :label="item.customerName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="合同编号"
              prop="contractNo"
            >
              <el-input
                v-model="form.contractNo"
                placeholder="请输入合同编号"
              />
            </el-form-item>
            <el-form-item
              label="合同名称"
              prop="contractName"
            >
              <el-input
                v-model="form.contractName"
                placeholder="请输入合同名称"
              />
            </el-form-item>
            <el-form-item
              label="合同状态"
              prop="contractState"
            >
              <el-select
                v-model="form.contractState"
                placeholder="请选择状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="签约时间"
              prop="signingDate"
            >
              <el-date-picker
                v-model="form.signingDate"
                type="date"
                placeholder="选择签约时间"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item
              label="合作开始时间"
              prop="contractStartDate"
            >
              <el-date-picker
                v-model="form.contractStartDate"
                type="date"
                placeholder="选择合作开始时间"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item
              label="合作截止时间"
              prop="contractEndDate"
            >
              <el-date-picker
                v-model="form.contractEndDate"
                type="date"
                placeholder="选择合作截止时间"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>

            <el-form-item
              label="备注"
              prop="remark"
            >
              <el-input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="2"
              />
            </el-form-item>
            <el-form-item
              label="合同附件"
              style="width: 66%"
            >
              <div class="file-upload">
                <el-button
                  type="primary"
                  :loading="attachLoading"
                  class="upload-btn"
                  size="small"
                  @click="upload"
                >
                  点击上传
                </el-button>
                <span>备注：限制上传格式Word 或 PDF文档，  单个附件必须小于5M，最多5个；</span>
                <ul>
                  <li
                    v-for="(item,index) in fileList"
                    :key="item.id"
                    class="file"
                  >
                    <img
                      class="delete-btn"
                      src="../../../../../assets/icon/deleteMinus.png"
                      width="16"
                      height="16"
                      @click="deleteFile(index)"
                    >
                    <div
                      class="fileDesc"
                      @click="downloadFile(item)"
                    >
                      <span class="name">{{ item.fileName }}</span>
                      <span class="action">
                        <span>操作人: {{ item.userName }} </span>
                      <!-- <span v-if="item.insertTime">| 操作时间: {{item.insertTime}}</span> -->
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="bot-menu">
        <el-button
          v-loading="confirmButtonLoading"
          type="primary"
          @click="submit"
        >
          提交
        </el-button>
        <el-button>
          取消
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      rules: {
        contractName: [{
          required: true,
          message: '请输入合同名称',
          trigger: 'blur',
        }],
        contractNo: [{
          required: true,
          message: '请输入合同编号',
          trigger: 'blur',
        }],
        customerId: [{
          required: true,
          message: '请选择客户',
          trigger: 'blur',
        }],
        signingDate: [{
          required: true,
          message: '请选择签约时间',
          trigger: 'blur',
        }],
        contractStartDate: [{
          required: true,
          message: '请选择合作开始时间',
          trigger: 'blur',
        }],
        contractEndDate: [{
          required: true,
          message: '请选择合作结束时间',
          trigger: 'blur',
        }],
      },
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
      confirmButtonLoading: false,
      customerList: [],
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
      attachLoading: false,
      fileList: [],
      file: {
        fileName: null,
        path: null,
        userName: null,
      },
    };
  },
  created() {
    this.getCustomerAll();
    this.contractId = this.$route.query.id;
    if (this.contractId) {
      this.getDetail(this.contractId);
    }
  },
  methods: {
    submit() {
      this.form.attachment = JSON.stringify(this.fileList.map(item => item.id));
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          let api = '';
          let param = null;
          this.form.companyId = this.$store.state.fepUserInfo.companyId;
          if (!this.contractId) {
            api = 'addCusContract';
            param = {
              ...this.form,
            };
          } else {
            api = 'updateCusContract';
            param = {
              ...this.form,
              id: this.contractId,
            };
          }
          this.$api[api](param).then(() => {
            this.$message.success('保存成功');
            this.$router.push('list');
          }).finally(() => {
            this.confirmButtonLoading = false;
          });
        } else {
          this.$message.info('请按提示填写');
        }
      });
    },
    getDetail(id) {
      this.$api.getCusContract({ id }).then((res) => {
        this.form = res;
        const fileList = res.attachmentFiles || [];
        this.fileList = fileList.map((item) => {
          const { filePath: path, oprName: userName } = item;
          return {
            ...item,
            userName,
            path,
          };
        });
      });
    },
    async upload() {
      this.$utils.initData.call(this, { include: ['file'] });
      this.$upload({
        multiple: false,
      }).then(([fileObj]) => {
        this.attachLoading = true;
        console.log(fileObj);
        this.$api.fileUpload({
          file: fileObj.file,
          type: 'CUS_CONTRACT',
        }).then((res) => {
          this.file.fileName = fileObj.name;
          this.file.id = res;
          this.file.userName = this.$store.state.fepUserInfo.name;
          this.fileList.push(this.file);
        }).finally(() => {
          this.attachLoading = false;
        });
      });
    },
    deleteFile(index) {
      this.fileList.splice(index, 1);
    },
    downloadFile(item) {
      this.$api.downloadFileById({
        fileId: item.id,
      }).then(blob => this.$utils.autoLoad(new Blob([blob]), item.fileName));
    },
    getCustomerAll() {
      this.isLoading = true;
      this.$api.getCustomerAll().then((res) => {
        this.customerList = res;
      }).finally(() => {
        this.isLoading = false;
      });
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
