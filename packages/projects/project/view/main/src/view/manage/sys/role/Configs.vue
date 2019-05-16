<template>
  <section
    v-loading="isLoading"
    class="con"
  >
    <div class="con-base">
      <div class="title">
        <label>{{ !roleId ? '新增角色' : '设置角色' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>{{ !roleId ? '填写基本信息' : '基本信息' }}</label>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
            style="margin-left: 120px;"
          >
            <el-form-item
              label="角色状态"
              prop="status"
            >
              <el-radio-group
                v-model="form.status"
              >
                <el-radio-button
                  label="1"
                >
                  启用
                </el-radio-button>
                <el-radio-button
                  label="0"
                >
                  禁用
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="创建时间"
            >
              <span>{{ form.createTime }}</span>
            </el-form-item>
            <el-form-item
              label="角色名称"
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="请输入角色名称"
              />
            </el-form-item>
            <el-form-item
              label="角色描述"
              prop="remark"
            >
              <el-input
                v-model="form.remark"
                placeholder="请输入角色描述"
                type="textarea"
                :rows="3"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="con-tree">
        <el-tree
          ref="tree"
          :props="{
            children: 'children',
            label: 'name',
          }"
          node-key="id"
          show-checkbox
          :default-expanded-keys="expandNodes"
          :data="list"
          @node-expand="expandNode"
          @node-collapse="collapseNode"
        >
          <span
            slot-scope="{ node, data }"
            class="title"
          >
            <i :class="data.type === 0 ? 'icon-menu' : 'icon-btn'" />
            <span
              class="node-name"
              @click.stop="edit(data, node)"
            >{{ data.name }}</span>
          </span>
        </el-tree>
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
  </section>
</template>

<script>
export default {
  props: {
    roleId: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
      list: [],
      expandNodes: [], // 树的展开情况
      roleTypes: [],
      roleSettings: [],
      settingType: null,
      roleSettingId: null,
      cotent: null,
      contentRole: null,
      form: {
        status: 1,
        name: '',
        remark: '',
        permIds: [],
      },
      rules: {
        status: [{
          required: true,
          message: '请选择角色状态',
          trigger: 'blur',
        }],
        name: [{
          required: true,
          message: '请输入角色名',
          trigger: 'blur',
        }],
      },
      confirmButtonLoading: false,
      permIds: [],
    };
  },
  watch: {
    roleId(value) {
      // this.getList();
      if (!value) {
        this.form = {
          status: 1,
          name: '',
          remark: '',
          permIds: [],
        };
      } else {
        this.getRoleSettingsById();
      }
    },
  },
  methods: {
    getList() {
      this.isLoading = true;
      const { fepUserInfo } = this.$store.state;
      this.$api.getRolePermission({
        userLevel: fepUserInfo.level,
        userId: fepUserInfo.id,
      }).then((res) => {
        // this.list = res;
        const keys = [];
        const getKey = (list) => {
          list.forEach((item) => {
            if (item.children && item.children.length) {
              getKey(item.children);
            } else if (item.checked) {
              keys.push(item.id);
            }
          });
        };
        getKey(res);
        this.$refs.tree.setCheckedKeys(keys);
      }).finally(() => {
        this.isLoading = false;
      });
    },
    submit() {
      const halfIds = this.$refs.tree.getHalfCheckedKeys();
      const checkedIds = this.$refs.tree.getCheckedKeys();
      const resourcesIds = halfIds.concat(checkedIds);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$dialogs.confirm({
            title: '提示',
            content: '确定要保存角色信息和对应资源权限吗？',
            onOk: () => {
              this.confirmButtonLoading = true;
              let api = '';
              let param = null;
              this.form.permIds = resourcesIds;
              if (!this.roleId) {
                api = 'addRole';
                param = this.form;
              } else {
                api = 'updateRole';
                param = {
                  ...this.form,
                  id: this.roleId,
                };
              }
              this.$api[api](param).then(() => {
                this.$message.success('修改成功');
                this.getRoleSettingsById();
              }).finally(() => {
                this.confirmButtonLoading = false;
              });
            },
          });
        } else {
          this.$message.info('请按提示填写');
        }
      });
    },
    expandNode(data, node) {
      this.expandSwitch(true, data, node);
    },
    collapseNode(data, node) {
      this.expandSwitch(false, data, node);
    },
    expandSwitch(isExpand, { id }, node) {
      // 控制节点展开关闭
      const idx = this.expandNodes.indexOf(id);
      if (isExpand) {
        if (idx === -1) {
          this.expandNodes.push(id);
        }
        node.expanded = true;
      } else {
        if (idx > -1) {
          this.expandNodes.splice(idx, 1);
        }
        node.expanded = false;
      }
    },
    getRoleSettingsById() {
      this.$api.getRole({ id: this.roleId }).then((res) => {
        const { permTrees, ...form } = res;
        this.form = form;
        this.list = permTrees;
        const keys = [];
        const getKey = (list) => {
          list.forEach((item) => {
            if (item.children && item.children.length) {
              getKey(item.children);
            } else if (item.checked) {
              keys.push(item.id);
            }
          });
        };
        getKey(permTrees);
        this.$refs.tree.setCheckedKeys(keys);
      });
    },
    addRolSetting() {
      this.$api.addRolSetting({
        roleId: this.roleId,
        settingType: this.settingType,
        content: this.content,
      }).then(() => {
        this.$message.success('新增成功');
      });
    },
    updateRolSetting(roleSettingId, content) {
      this.$prompt('请输入内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: content,
        inputPattern: /.+/,
        inputErrorMessage: '不能为空',
      }).then(({ value }) => {
        this.$message('修改中');
        this.$api.updateRolSetting({
          roleSettingId,
          content: value,
        }).then(() => {
          this.$message.success('保存成功');
          this.getRoleSettingsById();
        });
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
      border: solid 1px #e2e2e2;
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
        width: 60%;
      }
      /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background-color: #356fb8;
        border-color: #356fb8;
      }
    }
    .con-tree {
      border: solid 1px #e2e2e2;
      border-top: none;
      padding: 10px;
    }
    .bot-menu {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
}
.topbar {
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px;
  border-radius: 10px;
  background-color: #fff;
  .left {
    padding: 9px 0;
    i.line {
      margin-right: 7px;
      vertical-align: middle;
      display: inline-block;
      width: 4px;
      height: 16px;
      border-radius: 2px;
      background-color: #ffc000;
    }
    label {
      vertical-align: middle;
      line-height: 16px;
      font-size: 14px;
    }
  }
}
.el-tree {
  padding: 10px 0;
  border-radius: 10px;
}
.title {
  [class^=icon-] {
    margin-right: 8px;
    vertical-align: middle;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .icon-menu {
    background-image: url('../../../../assets/icon/menu.png');
  }
  .icon-btn {
    background-image: url('../../../../assets/icon/btn.png');
  }
  .node-name {
    vertical-align: middle;
  }
}
.base {
  margin-top: 20px;
}
</style>
