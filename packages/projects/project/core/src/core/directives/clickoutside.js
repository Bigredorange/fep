export default {
  bind(el, binding) {
    function documentHandler(e) {
      if (el.contains(e.target)) return;
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.handleClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {

  },
  unbind(el) {
    document.removeEventListener('click', el.handleClickOutside);
    delete el.handleClickOutside;
  },
};
