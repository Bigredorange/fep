<template>
  <div>
    <el-cascader
      v-model="area"
      :options="options"
      :props="props"
      @active-item-change="handleItemChange"
      @change="handleChange"
    />
  </div>
</template>
<script>
import provinces from '../json/provinces.json';
import cities from '../json/cities.json';
import areas from '../json/areas.json';

export default {
  props: {
    workArea: {
      type: String,
      default: '',
    },
  },
  data() {
    const setOptions = () => {
      provinces.forEach((province) => {
        const children = [];
        cities.forEach((city) => {
          if (city.provinceCode === province.code) {
            city.children = [];
            children.push(city);
          }
        });
        province.children = children;
      });
      return provinces;
    };
    return {
      area: [],
      options: setOptions(),
      props: {
        label: 'name',
        value: 'name',
        children: 'children',
      },
      areas,
    };
  },
  watch: {
    workArea(val) {
      if (val) {
        this.area = this.workArea.split('/');
        this.handleItemChange(this.area);
      }
    },
  },
  methods: {
    handleItemChange(val) {
      if (val.length >= 2) {
        const [first, second] = val;
        this.options.forEach((province) => {
          if (province.name === first) {
            province.children.forEach((city) => {
              if (city.name === second) {
                const tempChildren = [];
                this.areas.forEach((area) => {
                  if (area.cityCode === city.code) {
                    tempChildren.push(area);
                  }
                });
                city.children = tempChildren;
              }
            });
          }
        });
      }
    },
    handleChange() {
      this.$emit('input', this.area.join('/'));
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
