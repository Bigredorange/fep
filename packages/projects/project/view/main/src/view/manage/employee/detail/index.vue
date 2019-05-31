<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>灵工详情</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>基本信息</label>
          <el-form
            ref="form"
            :model="form"
            label-width="140px"
            style="margin-left: 120px;"
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="姓名"
              prop="empName"
            >
              <p>
                {{ form.empName }}
              </p>
            </el-form-item>
            <el-form-item
              label="手机号码"
              prop="mobile"
            >
              <p>
                {{ form.mobile }}
              </p>
            </el-form-item>
            <el-form-item
              label="证件类型"
              prop="certificateType"
            >
              <p>
                {{ $optDicLabel('DocumentType', form.certificateType) }}
              </p>
            </el-form-item>
            <el-form-item
              label="证件号码"
              prop="certificateNum"
            >
              <p>
                {{ form.certificateNum }}
              </p>
            </el-form-item>
            <el-form-item
              label="性别"
              prop="sex"
            >
              <p>
                {{ $optDicLabel('Sex', form.sex) }}
              </p>
            </el-form-item>
            <el-form-item
              label="开户银行名称"
              prop="bankName"
            >
              <p>
                {{ form.bankName }}
              </p>
            </el-form-item>
            <el-form-item
              label="银行卡号"
              prop="bankAccount"
            >
              <p>
                {{ form.bankAccount }}
              </p>
            </el-form-item>
            <el-form-item
              label="开户支行"
              prop="bankBranch"
            >
              <p>
                {{ form.bankBranch }}
              </p>
            </el-form-item>
            <el-form-item
              label="微信号"
              prop="weixinNum"
            >
              <p>
                {{ form.weixinNum }}
              </p>
            </el-form-item>
            <el-form-item
              label="个人邮箱"
              prop="email"
            >
              <p>
                {{ form.email }}
              </p>
            </el-form-item>
            <el-form-item
              label="状态"
              prop="status"
            >
              <p>
                {{ form.status === 1 ? '启用' : '禁用' }}
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
              label="现居住地"
              prop="dwellingPlace"
            >
              <p>
                {{ form.dwellingPlace }}
              </p>
            </el-form-item>
            <el-form-item
              label="头像"
              prop="attachment"
              style="width: 100%"
            >
              <div class="file-upload avatar-upload">
                <ul class="avatar-items">
                  <li
                    v-for="(item) in avatarFileList"
                    :key="item.id"
                    class="file"
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
              </div>
            </el-form-item>
            <el-form-item
              label="合同附件"
              prop="attachment"
              style="width: 66%"
            >
              <div class="file-upload">
                <ul>
                  <li
                    v-for="(item) in extraFileList"
                    :key="item.id"
                    class="file"
                  >
                    <div
                      class="fileDesc"
                      @click="downloadFile(item)"
                    >
                      <span class="name">{{ item.fileName }}</span>
                      <span class="action">
                        <span>操作人: {{ item.userName }} </span>
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
  created() {
    this.empId = this.$route.query.empId;
    this.empCompanyId = this.$route.query.id;
    if (this.empCompanyId) {
      this.getDetail(this.empCompanyId);
    }
  },
  methods: {
    getDetail(id) {
      this.$api.getEmployeeDetails({ id }).then((res) => {
        this.form = res;
      });
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
