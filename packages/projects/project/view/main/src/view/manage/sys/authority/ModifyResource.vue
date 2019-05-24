<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="isShow"
    :title="`${form.id ? '修改' : '新增'}资源`"
    width="500px"
    class="dialog"
    @close="reset"
  >
    <el-form
      ref="form"
      class="form"
      :rules="rules"
      :model="form"
      label-width="120px"
    >
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-radio-group
          v-model="form.type"
          @change="typeChange"
        >
          <el-radio
            :disabled="!routes.length"
            :label="0"
          >
            菜单
          </el-radio>
          <el-radio
            :label="1"
          >
            按钮
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="路径"
        prop="code"
      >
        <el-select
          v-if="form.type === 0"
          v-model="form.code"
          placeholder="请选择菜单"
          @change="pathChange"
        >
          <el-option
            v-for="(item, index) in routes"
            :key="index"
            :label="item.title"
            :value="item.path"
          />
        </el-select>
        <el-input
          v-else-if="form.type === 1"
          v-model="form.code"
          placeholder="请输入唯一码"
        />
      </el-form-item>
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item
        label="企业可见"
        prop="coVisible"
      >
        <el-radio-group
          v-model="form.coVisible"
        >
          <el-radio
            :label="1"
          >
            是
          </el-radio>
          <el-radio
            :label="0"
          >
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="客户可见"
        prop="cusVisible"
      >
        <el-radio-group
          v-model="form.cusVisible"
        >
          <el-radio
            :label="1"
          >
            是
          </el-radio>
          <el-radio
            :label="0"
          >
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="平台管理员可见"
        prop="cusVisible"
      >
        <el-radio-group
          v-model="form.platformVisible"
        >
          <el-radio
            :label="1"
          >
            是
          </el-radio>
          <el-radio
            :label="0"
          >
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="排序"
        prop="sort"
      >
        <el-input-number
          v-model="form.sort"
          placeholder="请输入排序"
          :min="1"
        />
      </el-form-item>
    </el-form>
    <div style="textAlign: center;">
      <el-button
        type="primary"
        :loading="isLoading"
        @click="submit"
      >
        {{ form.id ? '修改' : '新增' }}
      </el-button>
      <el-button
        type="ghost"
        @click="isShow = false"
      >
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { asyncRoutes } from '../../../../router/routes';

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
      isShow: false,
      asyncRoutes: [],
      allRoutes: [],
      routes: [], // init函数获得
      selectedList: [], // 已选路由，用于筛选
      parentPath: '', // 父级路径
      form: {
        pid: null,
        type: 0, // 0 菜单 1 按钮
        name: null,
        code: null,
        sort: null,
        coVisible: 1,
        cusVisible: 1,
        platformVisible: 1,
        remark: '',
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur',
        }],
        // sort: [{
        //   required: true,
        //   message: '请输入排序',
        //   trigger: 'blur',
        //   type: 'number',
        // }],
        code: [{
          required: true,
          trigger: ['change', 'blur'],
          validator: (rule, value, callback) => {
            if (!value) {
              if (this.type === 0) {
                callback(new Error('请选择路径'));
              } else {
                callback(new Error('请输入唯一码'));
              }
            } else {
              callback();
            }
          },
        }],
      },
    };
  },
  watch: {
    asyncRoutes(val) {
      this.setParentPath(val);
      // this.allRoutes = this.getRoutes(this.asyncRoutes);
    },
  },
  mounted() {
    this.asyncRoutes = asyncRoutes[0].children;
  },
  methods: {
    reset() {
      this.$utils.initData.call(this);
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    open(initValue = {}) {
      const {
        form,
        selectedList,
      } = initValue;
      this.form = {
        ...this.form,
        ...form,
        pid: form ? form.pid : 0,
      };
      this.selectedList = selectedList || [];
      this.isShow = true;
      this.init();
    },
    init() {
      // 获取可选项列表
      // 初始化路由列表,必须将所有路由展示到列表中,以至于可以根据路由路径进行权限判断
      this.asyncRoutes = asyncRoutes[0].children;
      let allRoutes = this.asyncRoutes;
      const getRoutes = routes => routes.map((route) => {
        if (!route.children || !route.children.length) {
          return {
            title: route.meta ? route.meta.title : null,
            path: `${route.parentPath}/${route.path}`,
          };
        }
        return {
          title: route.meta ? route.meta.title : null,
          path: `${route.parentPath}/${route.path}`,
          children: getRoutes(route.children),
        };
      });
      allRoutes = getRoutes(allRoutes);
      // 根据当前父级id,找到当前父级id的完整url
      const { pid } = this.form;
      let parentPath = '';
      const takeParentPath = (children, url = '') => children.some((route) => {
        if (route.id === pid) {
          parentPath = (`${url},${route.code}`).slice(1);
          return true;
        }
        if (!route.children) return false;
        return takeParentPath(route.children, `${url},${route.code}`);
      });
      if (pid) {
        takeParentPath(this.list);
      }
      this.parentPath = parentPath.replace(/,/g, '/');
      // 根据完整url,获取当前可选url
      let options = [];
      const parentPathArr = parentPath ? parentPath.split(',') : [];
      console.log(parentPathArr);
      const takeRoutes = (children, level) => children.some((route) => {
        console.log(`${route.path}`);
        if (`${route.path}` === parentPathArr[level]) {
          if (parentPathArr.length === (level + 1)) {
            if (route.children) {
              options = [...route.children].filter(child => !this.selectedList.includes(child.path));
            }
            return true;
          }
          level += 1;
          return takeRoutes(route.children, level);
        }
        return false;
      });
      if (parentPathArr.length) {
        takeRoutes(allRoutes, 0);
      } else {
        options = allRoutes.filter(route => !this.selectedList.includes(route.path));
      }
      // 当无选项时,只能添加按钮
      if (!options.length && this.form.type === 0) {
        this.form.type = 1;
        this.form.code = this.parentPath;
      }
      this.routes = options;
    },
    pathChange() {
      const target = this.routes.find(route => route.path === this.form.code);
      this.form.name = target ? target.title : null;
    },
    typeChange(value) {
      if (value === 1) {
        this.form.code = this.parentPath;
      } else {
        this.form.code = null;
      }
      this.form.name = null;
      this.$refs.form.clearValidate();
    },
    async submit() {
      await this.$refs.form.validate();
      this.isLoading = true;
      let api = '';
      if (!this.form.id) {
        api = 'addPermission';
      } else {
        api = 'updatePermission';
      }
      this.$api[api]({
        ...this.form,
      }).then(() => {
        this.$emit('update');
        this.isShow = false;
        this.$message.success(!this.form.id ? '新增成功' : '修改成功');
      }).finally(() => {
        this.isLoading = false;
      });
    },
    setParentPath(arr) {
      arr.forEach((element) => {
        element.parentPath = '/manage';
        if (element.children) {
          element.children.map((ele) => {
            ele.parentPath = `${element.parentPath}/${element.path}`;
            // todo  改成递归方式
            if (ele.children) {
              ele.children.forEach((e) => {
                e.parentPath = `${ele.parentPath}/${ele.path}`;
              });
            }
            return ele;
          });
        }
      });
    },
    getRoutes(routes) {
      routes.map((route) => {
        if (!route.children || !route.children.length) {
          return {
            title: route.meta ? route.meta.title : null,
            path: `${route.parentPath}/${route.path}`,
          };
        }
        return {
          title: route.meta ? route.meta.title : null,
          path: `${route.parentPath}/${route.path}`,
          children: this.getRoutes(route.children),
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-input-number__decrease, .el-input-number__increase {
    top: 3px;
    height: 33px;
  }
  /deep/ .el-input-number__increase {
    top: 3px;
    height: 33px;
  }
}
</style>
