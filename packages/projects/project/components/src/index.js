/**
 * 组件
 */
// import Checkbox from './components/Checkbox/index.vue';
// import Confirm from './components/Confirm/index.vue';
// import DayMonth from './components/DayMonth/index.vue';
// import KmEditTable from './components/KmEditTable/index.vue';
// import MembDialog from './components/MembDialog/index.vue';
import Organization from './components/Organization/index.vue';
// import Prompt from './components/Prompt/index.vue';
// import SelectCustomer from './components/SelectCustomer/index.vue';
// import SelectEmployee from './components/SelectEmployee/index.vue';
// import Selection from './components/Selection/index.vue';
// import SelectSupplier from './components/SelectSupplier/index.vue';
import Tabs from './components/Tabs/index.vue';
import TipButton from './components/TipButton/index.vue';
import TopBar from './components/TopBar/index.vue';
// import TopTab from './components/TopTab/index.vue';
import UploadDetail from './components/UploadDetail/index.vue';
import Affix from './components/Affix';
import SelfInfo from './components/SelfInfo';
import ModifyPassword from './components/ModifyPassword';
// import Editor from './components/Editor';

/**
 * 指令
 */
import confirm from './directive/confirm';
import prompt from './directive/prompt';
import preview from './directive/preview';

const components = {
  // Checkbox,
  // Confirm,
  // DayMonth,
  // KmEditTable,
  // MembDialog,
  Organization,
  // Prompt,
  // SelectCustomer,
  // SelectEmployee,
  // Selection,
  // SelectSupplier,
  Tabs,
  TipButton,
  TopBar,
  // TopTab,
  UploadDetail,
  Affix,
  ModifyPassword,
  SelfInfo,
  // Editor,
};

module.exports = {
  install(Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key]);
    });
    Vue.prototype.$dialogs = {
      confirm,
      prompt,
    };
    Vue.prototype.$preview = preview;
  },
};
