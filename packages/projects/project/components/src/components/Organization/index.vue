<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isShow"
      title="组织架构"
      width="946px"
      class="ui-dialog"
    >
      <el-tree
        ref="orgTree"
        v-loading="deptLoading"
        highlight-current
        render-after-expand
        expand-on-click-node
        lazy
        :load="getMember"
        :props="{
          children: 'childrenList',
          isLeaf: 'isLeaf',
        }"
        :data="list"
      >
        <template slot-scope="{ data }">
          <span
            v-if="data.departmentName"
            :class="[
              'dept',
              highLightList.includes(data.id) ? 'high-light' : ''
            ]"
          >{{ data.departmentName }}</span>
          <span
            v-else
            :class="[
              'member',
              data.id === userId ? 'high-light' : ''
            ]"
          >{{ data.username }}
            <i
              v-if="data.level === 1"
              class="alias"
            >负责人</i>
            <i
              v-if="data.id === userId"
              class="alias"
            >你自己</i>
          </span>
        </template>
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const {
      id,
      departmentIds,
    } = this.$store.state.hroUserinfo;
    return {
      isShow: false,
      deptLoading: false,
      list: [],
      highLightList: [],
      departmentIds: departmentIds ? departmentIds.split(',').map(n => Number(n)) : [],
      userId: id,
    };
  },
  methods: {
    open() {
      this.isShow = true;
      if (this.list.length) return;
      this.getList();
    },
    getList() {
      this.deptLoading = true;
      this.$api.organizationDepartmentTree().then((res) => {
        this.list = res;
        this.getHighLightList();
      }).finally(() => {
        this.deptLoading = false;
      });
    },
    getHighLightList() {
      const highLightList = [];
      const findId = (list) => {
        const existList = list.filter((item) => {
          // 从最里层找起
          let existChild = false;
          if (item.childrenList && item.childrenList.length) {
            existChild = findId(item.childrenList);
          }
          if (existChild || this.departmentIds.includes(item.id)) {
            highLightList.push(item.id);
            existChild = true;
          }
          return existChild;
        });
        return !!existList.length;
      };
      findId(this.list);
      this.highLightList = highLightList;
    },
    getMember({ data }, resolve) {
      if (Array.isArray(data)) {
        resolve([]);
        return;
      }
      this.$api.organizationDepartmentUserGet({
        departmentId: data.id,
      }).then((res) => {
        const members = res.map((member) => {
          member.isLeaf = true;
          member.childrenList = null;
          return member;
        });
        resolve(data.childrenList.concat(members));
      }).catch(() => resolve([]));
    },
  },
};
</script>

<style lang="scss" scoped>
.high-light {
  color: #2d8cf0;
}
.dept, .member {
  display: inline-flex;
  align-items: center;
  &::before {
    content: '';
    display: inline-block;
    margin-right: 4px;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
.dept {
  &::before {
    background-image: url('./assets/dept.png');
  }
  &.high-light {
    &::before {
      background-image: url('./assets/dept_blue.png');
    }
  }
}
.member {
  &::before {
    background-image: url('./assets/member.png');
  }
  &.high-light {
    &::before {
      background-image: url('./assets/member_blue.png');
    }
  }
}
.alias {
  margin-left: 4px;
  display: inline-block;
  padding: 3px;
  background-color: #2d8cf0;
  line-height: 1;
  font-size: 12px;
  color: #fff;
  border-radius: 5px;
}
</style>
