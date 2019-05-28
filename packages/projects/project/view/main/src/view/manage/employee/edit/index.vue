<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ !empCompanyId ? '新增灵工' : '编辑灵工' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>{{ !empCompanyId ? '填写基本信息' : '基本信息' }}</label>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="140px"
            style="margin-left: 120px;"
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="姓名"
              prop="empName"
            >
              <el-input
                v-model="form.empName"
                placeholder="请输入姓名"
              />
            </el-form-item>
            <el-form-item
              label="手机号码"
              prop="mobile"
            >
              <el-input
                v-model="form.mobile"
                placeholder="请输入手机号码"
                :maxlength="11"
              />
            </el-form-item>
            <el-form-item
              label="证件类型"
              prop="certificateType"
            >
              <el-select
                v-model="form.certificateType"
                placeholder="请选择证件类型"
              >
                <el-option
                  v-for="item in $opt('DocumentType')"
                  :key="item.id"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="证件号码"
              prop="certificateNum"
            >
              <el-input
                v-model="form.certificateNum"
                placeholder="请输入证件号码"
              />
            </el-form-item>
            <el-form-item
              label="性别"
              prop="sex"
            >
              <el-radio-group
                v-model="form.sex"
              >
                <el-radio
                  v-for="item in $opt('Sex')"
                  :key="item.id"
                  :label="item.dictKey"
                >
                  {{ item.dictValue }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="开户银行名称"
              prop="bankName"
            >
              <el-input
                v-model="form.bankName"
                placeholder="请输入开户银行名称"
              />
            </el-form-item>
            <el-form-item
              label="银行卡号"
              prop="bankAccount"
            >
              <el-input
                v-model="form.bankAccount"
                placeholder="请输入银行卡号"
              />
            </el-form-item>
            <el-form-item
              label="开户支行"
              prop="bankBranch"
            >
              <el-input
                v-model="form.bankBranch"
                placeholder="请输入开户支行"
              />
            </el-form-item>
            <el-form-item
              label="微信号"
              prop="weixinNum"
            >
              <el-input
                v-model="form.weixinNum"
                placeholder="请输入微信号"
              />
            </el-form-item>
            <el-form-item
              label="个人邮箱"
              prop="email"
            >
              <el-input
                v-model="form.email"
                placeholder="请输入个人邮箱"
              />
            </el-form-item>
            <el-form-item
              label="状态"
              prop="status"
            >
              <el-select
                v-model="form.status"
                placeholder="请选择状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
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
              label="现居住地"
              prop="dwellingPlace"
            >
              <el-input
                v-model="form.dwellingPlace"
                placeholder="请输入现居住地"
                type="textarea"
                :rows="2"
              />
            </el-form-item>
            <el-form-item
              label="头像"
              prop="attachment"
              style="width: 100%"
            >
              <div class="file-upload avatar-upload">
                <el-button
                  type="primary"
                  :loading="attachLoading"
                  class="upload-btn"
                  size="small"
                  :disabled="avatarFileList.length ? true : false"
                  @click="upload('avatar')"
                >
                  点击上传
                </el-button>
                <ul class="avatar-items">
                  <li
                    v-for="(item,index) in avatarFileList"
                    :key="item.id"
                    class="file"
                  >
                    <img
                      class="delete-btn"
                      src="../../../../assets/icon/deleteMinus.png"
                      width="16"
                      height="16"
                      @click="deleteAvatarFile(index)"
                    >
                    <div
                      class="avatar-image"
                      @click="downloadFile(item)"
                    >
                      <img
                        :src="item.src"
                        alt="avatar"
                      >
                    </div>
                  </li>
                </ul>
                <span>备注：附件限制小于200KB的 png与JPEG格式图片, 限制1张</span>
              </div>
            </el-form-item>
            <el-form-item
              label="合同附件"
              prop="attachment"
              style="width: 66%"
            >
              <div class="file-upload">
                <el-button
                  type="primary"
                  :loading="attachLoading"
                  class="upload-btn"
                  size="small"
                  :disabled="extraFileList.length >= 5 ? true : false"
                  @click="upload('extra')"
                >
                  点击上传
                </el-button>
                <span>备注：限制上传格式Word 或 PDF文档，  单个附件必须小于5M，最多5个；</span>
                <ul>
                  <li
                    v-for="(item,index) in extraFileList"
                    :key="item.id"
                    class="file"
                  >
                    <img
                      class="delete-btn"
                      src="../../../../assets/icon/deleteMinus.png"
                      width="16"
                      height="16"
                      @click="deleteExtraFile(index)"
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
      <div v-if="empCompanyId">
        <div class="title">
          <label>工作履历</label>
        </div>
        <div class="area">
          <WorkList :employee-id="empId" />
        </div>
        <div class="title">
          <label>任务完成情况</label>
        </div>
        <div class="area">
          <Task :employee-id="empId" />
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
import WorkList from './WorkList';
import Task from './Task';

export default {
  components: {
    WorkList,
    Task,
  },
  data() {
    return {
      rules: {
        empName: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }],
        mobile: [{
          required: true,
          trigger: 'blur',
          validator: async (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入手机号码'));
            } else if (!this.$utils.regExp(value, 'mp')) {
              callback(new Error('手机号格式错误'));
            } else {
              callback();
            }
          },
        }],
        certificateType: [{
          required: true,
          message: '请选择证件类型',
          trigger: 'blur',
        }],
        certificateNum: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            const label = this.$optDicLabel('DocumentType', this.form.certificateType) || '';
            const isIdentity = label.indexOf('身份证') !== -1;
            if (!value) {
              callback(new Error('请输入证件号码'));
            } else if (isIdentity && !this.$utils.regExp(value, 'identity')) {
              callback(new Error('证件号码格式错误'));
            } else {
              callback();
            }
          },
        }],
        sex: [{
          required: true,
          message: '请选择性别',
          trigger: 'blur',
        }],
        bankName: [{
          required: true,
          message: '请输入开户银行',
          trigger: 'blur',
        }],
        bankAccount: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入银行卡号'));
            } else if (value && /\D+/.test(value)) {
              callback(new Error('请输入正确的银行卡账号'));
            } else {
              callback();
            }
          },
        }],
        bankBranch: [{
          required: true,
          message: '请输入开户支行',
          trigger: 'blur',
        }],
        email: [{
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value && !this.$utils.regExp(value, 'em')) {
              callback(new Error('请输入正确的邮箱'));
            } else {
              callback();
            }
          },
        }],
      },
      form: {
        empName: null,
        mobile: null,
        certificateType: null,
        certificateNum: null,
        sex: null,
        bankName: null,
        bankAccount: null,
        bankBranch: null,
        weixinNum: null,
        email: null,
        status: 1,
        remark: null,
        dwellingPlace: null,
        avatar: null,
        annex: null,
      },
      confirmButtonLoading: false,
      certificateTypeList: [],
      sexList: [],
      empId: null,
      empCompanyId: null,
      statusList: [
        {
          key: 0,
          label: '禁用',
        },
        {
          key: 1,
          label: '启用',
        },
      ],
      attachLoading: false,
      avatarLoading: false,
      extraFileList: [],
      avatarFileList: [],
      file: {
        fileName: null,
        path: null,
        userName: null,
        src: null,
      },
    };
  },
  mounted() {
    this.empId = this.$route.query.empId;
    this.empCompanyId = this.$route.query.id;
    if (this.empCompanyId) {
      this.getDetail(this.empCompanyId);
    }
  },
  methods: {
    submit() {
    //   this.form.avatar = JSON.stringify(this.avatarFileList.map(item => item.path));
    //   this.form.annex = JSON.stringify(this.extraFileList.map(item => item.path));
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          let api = '';
          let param = null;
          if (!this.empCompanyId) {
            api = 'addEmployee';
            param = {
              ...this.form,
            };
          } else {
            api = 'updateEmployee';
            param = {
              ...this.form,
              id: this.empCompanyId,
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
    getCustomerList() {
      this.isLoading = true;
      this.$api.getCustomerList({
        pageSize: 1000,
        pageCurrent: 1,
      }).then((res) => {
        this.customerList = res.dataList;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    getDetail(id) {
      this.$api.getEmployeeDetails({ id }).then((res) => {
        this.form = res;
      });
    },

    upload(type) {
      this.$utils.initData.call(this, { include: ['file'] });
      const fileType = type === 'avatar' ? 'image' : '';
      this.$upload({
        multiple: false,
        fileType,
      }).then(([fileObj]) => {
        if (type === 'avatar') {
          this.avatarLoading = true;
        } else {
          this.attachLoading = true;
        }
        this.file.src = window.URL.createObjectURL(fileObj.file);
        this.$api.fileUpload({
          file: fileObj.file,
          type: 'CUS_CONTRACT',
        }).then((res) => {
          this.file.fileName = fileObj.name;
          this.file.path = res;
          this.file.userName = this.$store.state.fepUserInfo.name;
          if (type === 'avatar') {
            this.avatarFileList.push(this.file);
          } else {
            this.extraFileList.push(this.file);
          }
        }).finally(() => {
          if (type === 'avatar') {
            this.avatarLoading = false;
          } else {
            this.attachLoading = false;
          }
        });
      });
    },
    deleteAvatarFile(index) {
      this.avatarFileList.splice(index, 1);
    },
    deleteExtraFile(index) {
      this.extraFileList.splice(index, 1);
    },
    downloadFile(item) {
      this.$api.fileDownloadUpload({
        filePath: item.path,
        type: 'CUS_CONTRACT',
        name: item.fileName,
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
      width: 100%;
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
      /deep/ .label {
        width: 80%;
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
  &.avatar-upload {
    display: flex;
    .fileDesc {
      width: 300px !important;
    }
  }
  .avatar-image {
    width: 40px;
    height: 40px;
    position: relative;
    overflow: hidden;
    padding: 5px;
    border: solid 1px #f0f0f0;
    margin: 0 5px;
    img {
      width: 40px;
      position: absolute;
      cursor: pointer;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
    }
  }
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
