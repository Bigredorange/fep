import Vue from 'vue';
import Preview from '../components/Preview/index.vue';

const showPreview = (e) => {
  const { src } = e.target;
  if (!src) return '';
  return new Vue({
    render: h => h(Preview, {
      props: {
        src,
      },
    }),
  }).$mount();
};

export default {
  inserted(el) {
    el.addEventListener('click', showPreview);
  },
  update(el) {
    el.removeEventListener('click', showPreview);
    el.addEventListener('click', showPreview);
  },
  unbind(el) {
    el.removeEventListener('click', showPreview);
  },
};
