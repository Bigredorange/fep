<template>
  <div class="monthClass">
    <ul>
      <li
        v-for="item in dayArr"
        :key="item.id"
        @click="getNumber(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dayArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    };
  },
  methods: {
    getNumber(day) {
      this.$emit('input', day);
      this.$emit('select', day);
    },
  },
};
</script>

 <style lang="scss" scoped>
    .monthClass {
      width: 200px;
      border: 1px solid #ccc;
      position: absolute;
      left:0;
      top:35px;
      z-index: 777;
      background-color: #fff;
      ul {
        display: flex;
        flex-wrap: wrap;
        height: 120px;
      }
      li {
        width: 10%;
        height:30px;
        line-height: 30px;
        text-align: center;
        &:hover {
          background-color: #2d8cf0;
          cursor: pointer;
          color:#fff;
        }
      }
    }
</style>
