<template>
  <div>
    <div
      v-if="selection.length"
      class="selection"
    >
      <h3
        class="bar"
        @click="isFold = !isFold"
      >
        <b>已选中</b>
        <span v-if="typeName">({{ typeName }})</span>
        <i class="el-icon-d-arrow-left" />
      </h3>
      <ul
        v-if="!isFold"
        class="list"
      >
        <li
          v-for="(name, index) in selection"
          :key="index"
          @click="select(index)"
        >
          <i class="el-icon-check" />
          <span>{{ name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 用于展示已选中的文件
 * type Selection : string[] = ['name'];
 * type TypeName : string = '';
 */
export default {
  props: {
    selection: {
      type: Array,
      default: () => [],
    },
    typeName: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isFold: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@mixin clamp($n) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: $n;
    overflow: hidden;
    text-overflow: ellipsis;
}

.selection {
  background-color: #f5f5f5;
}
.bar {
  padding: 16px 26px;
  cursor: pointer;
  .el-icon-d-arrow-left {
    margin-left: 23px;
    transform: rotate(90deg);
    font-size: 12px;
    color: #a1a1a1;
  }
  span {
    font-size: 12px;
    color: #666;
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px 16px;
  li {
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 20px;
  }
  i {
    margin-right: 4px;
    font-size: 12px;
    color: #2d8cf0;
  }
  span {
    width: 130px;
    @include clamp(1);
    font-size: 12px;
    color: #000;
  }
}
</style>
