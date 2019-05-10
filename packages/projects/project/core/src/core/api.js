import Vue from 'vue';

const {
  get,
  post,
  put,
  postForm,
  del,
  postJson,
  postBlob,
  getBlob,
  putJson,
} = require('./ajax');

const { $config } = Vue.prototype;
const {
  // baseURL,
  cbasBaseURL,
  crmBaseURL,
  financeBaseURL,
  noticeBaseURL,
  userBaseURL,
  socialBaseURL,
  supplierBaseURL,
  yqzlBaseURL,
  companyBaseURL,
} = $config;

const api = {
  // 1.1 登录
  login: args => post(`${userBaseURL}/auth`, args),
  /* 客商模块 */
  // 2.1 查询客服对接的客商 (分页)
  searchCustomerByKf: args => get(`${cbasBaseURL}/customer/searchCustomerByKf`, args),
  customerSearchCustomerByCharge: args => get(`${cbasBaseURL}/customer/searchCustomerByCharge`, args),
  // 2.2 添加或更新客户公司
  addOrUpdate: args => post(`${cbasBaseURL}/customer/addOrUpdate`, args),
  // 2.6 根据id查询客户公司
  findCustomerById: args => get(`${cbasBaseURL}/customer/findById`, args),
  // 2.7 根据id查询客户公司
  deleteAccountId: args => del(`${cbasBaseURL}/customer/deleteAccountId`, args),
  // 根据社保角色查询客户
  searchCustomerBySocial: args => get(`${cbasBaseURL}/customer/searchCustomerBySocial`, args),
  // 2.8 主管查询所有门店（包含禁用）
  searchCustomerByCharge: args => get(`${cbasBaseURL}/customer/searchCustomerByCharge`, args),
  // 2.10 导出全部客户信息
  exportAllCutomer: args => get(`${cbasBaseURL}/customer/exportAllCutomer`, args),
  // 2.11 导出我的客户
  exportMyCutomer: args => get(`${cbasBaseURL}/customer/exportMyCutomer`, args),
  // 2.12 更新客户信息导入
  updateImport: args => postForm(`${cbasBaseURL}/customer/updateImport`, args, { noMessage: true }),
  // 2.15 审核crm开户客户
  checkCrmCompanySign: args => post(`${cbasBaseURL}/customer/checkCrmCompanySign`, args),
  // 2.16 客服审核开户列表
  listAllApplyCompanySign: args => get(`${cbasBaseURL}/customer/listAllApplyCompanySign`, args),
  // 删除开票信息
  deleteTicketHolderId: args => del(`${cbasBaseURL}/customer/deleteTicketHolderId`, args),
  // 获取数据所有数据字典
  getCodeDictionary: args => get(`${cbasBaseURL}/codeDictionary/getCatalog`, args),
  // 根据类型批量获取数据字典
  getCodeDictionaryByType: args => get(`${cbasBaseURL}/codeDictionary/queryCodeDictionary`, args),
  // 查询城市
  getDicCity: args => get(`${cbasBaseURL}/codeDictionary/getCity`, args),
  // 新增城市
  addDicCity: args => post(`${cbasBaseURL}/codeDictionary/addCity`, args),
  // 修改城市
  modifyDicCity: args => put(`${cbasBaseURL}/codeDictionary/updateCity`, args),
  // 删除城市
  deleteDicCity: args => del(`${cbasBaseURL}/codeDictionary/delCity`, args),
  // 查询服务城市
  getDicServiceCity: args => get(`${cbasBaseURL}/codeDictionary/getServiceCity`, args),
  // 新增服务城市
  addDicServiceCity: args => post(`${cbasBaseURL}/codeDictionary/addServiceCity`, args),
  // 修改服务城市
  modifyDicServiceCity: args => put(`${cbasBaseURL}/codeDictionary/updateServiceCity`, args),
  // 删除服务城市
  deleteDicServiceCity: args => del(`${cbasBaseURL}/codeDictionary/delServiceCity`, args),
  // 城市下拉列表
  getDicCityList: args => get(`${cbasBaseURL}/codeDictionary/getCitylist`, args),
  // 新增开票商品
  addDicInvoiceCommodity: args => get(`${cbasBaseURL}/codeDictionary/addInvoiceCommodity`, args),
  // 修改开票商品
  getDicInvoiceCommodity: args => get(`${cbasBaseURL}/codeDictionary/updateInvoiceCommodity`, args),
  /* 员工模块 */
  // 3.1 员工列表
  empGetList: args => postJson(`${cbasBaseURL}/emp/getList`, args),
  // 3.2 获取员工详情
  empGetDetail: args => get(`${cbasBaseURL}/emp/getDetail`, args),
  // 3.3 获取员工附属信息
  empExpansionGetList: args => get(`${cbasBaseURL}/empExpansion/getList`, args),
  // 3.4 新增员工
  empAdd: args => postJson(`${cbasBaseURL}/emp/add`, args),
  // 3.5 更新员工
  empUpdate: args => postJson(`${cbasBaseURL}/emp/update`, args),
  // 3.6 删除员工
  empDeleteId: ({ id, ...args }) => del(`${cbasBaseURL}/emp/delete/${id}`, args),
  // 3.7 更新员工扩充信息
  empExpansionAddOrUpdate: args => postJson(`${cbasBaseURL}/empExpansion/addOrUpdate`, args),
  // 3.8 删除扩充信息
  empExpansionDeleteTypeId: ({ type, id, ...args }) => del(`${cbasBaseURL}/empExpansion/delete/${type}/${id}`, args),
  // 3.9 获取附属信息详情
  empAuxiliaryGetDetail: args => get(`${cbasBaseURL}/empAuxiliary/getDetail`, args),
  // 3.10 员工附属信息新增或者修改
  empAuxiliaryAddOrUpdate: args => postJson(`${cbasBaseURL}/empAuxiliary/addOrUpdate`, args),
  // 3.11 员工薪资信息新增或者修改
  empAuxiliaryAddOrUpdateSalary: args => postJson(`${cbasBaseURL}/empAuxiliary/addOrUpdateSalary`, args),
  // 3.12 上传文件
  empExpansionUpload: args => postForm(`${cbasBaseURL}/empExpansion/upload`, args),
  // 3.13 下载员工附件
  empExpansionDownload: args => getBlob(`${cbasBaseURL}/empExpansion/download`, args),
  // 3.14 下载员工导入模板
  empDownloadTemplate: args => postBlob(`${cbasBaseURL}/emp/downloadTemplate`, args),
  // 3.15 导入员工
  empImport: args => postForm(`${cbasBaseURL}/emp/import`, args, { noMessage: true }),
  // 3.16 导出员工
  empExport: args => post(`${cbasBaseURL}/emp/export`, args),
  // 3.18 获取合同列表
  empAuxiliaryGetContractList: args => get(`${cbasBaseURL}/empAuxiliary/getContractList`, args),
  // 3.18 获取(供应商)合同列表
  getPartBPurchaseContract: args => get(`${cbasBaseURL}/contract/getPartBPurchaseContract`, args),
  // 3.19 更新合同
  empAuxiliaryUpdateContract: args => postJson(`${cbasBaseURL}/empAuxiliary/updateContract`, args),
  // 3.20 新增合同
  empAuxiliaryAdd: args => postJson(`${cbasBaseURL}/empAuxiliary/addContract`, args),
  // 3.21 下载员工导入错误数据
  empDownloadErrorData: args => getBlob(`${cbasBaseURL}/emp/downloadErrorData`, args),
  // 3.22 修改或者新增员工商保信息
  empAuxiliaryAddOrUpdateCommercial: args => postJson(`${cbasBaseURL}/empAuxiliary/addOrUpdateCommercial`, args),
  // 3.23 获取员工信息操作记录
  empExpansionGetOperateRecord: args => get(`${cbasBaseURL}/empExpansion/getOperateRecord`, args),
  // 3.24 批量入离职
  empEntryOrLeave: args => post(`${cbasBaseURL}/emp/entryOrLeave`, args),
  // 3.25 批量启动或者停止服务(也可单个员工)
  empServiceOperate: args => post(`${cbasBaseURL}/emp/serviceOperate`, args),
  // 3.26 新增档案
  empAuxiliaryAddEmpArchive: args => postJson(`${cbasBaseURL}/empAuxiliary/addEmpArchive`, args),
  // 3.27 更新档案
  empAuxiliaryUpdateEmpArchive: args => postJson(`${cbasBaseURL}/empAuxiliary/updateEmpArchive`, args),
  // 3.29 获取合同详情
  empAuxiliaryGetContractInfo: args => get(`${cbasBaseURL}/empAuxiliary/getContractInfo`, args),
  // 3.30 添加员工自定义属性
  empAddCustomAttribute: args => post(`${cbasBaseURL}/emp/addCustomAttribute`, args),
  // 3.31 修改自定义属性
  empUpdateCustomAttribute: args => post(`${cbasBaseURL}/emp/updateCustomAttribute`, args),
  // 3.32 删除自定义属性
  empDeleteCustomAttributeId: ({ id, ...args }) => del(`${cbasBaseURL}/emp/deleteCustomAttribute/${id}`, args),
  // 3.33 获取自定义属性列表
  empGetCustomAttributes: args => get(`${cbasBaseURL}/emp/getCustomAttributes`, args),
  // 3.34 新增或者更新员工个税专项扣除
  empTaxDeductAddOrUpdate: args => postJson(`${cbasBaseURL}/empTaxDeduct/addOrUpdate`, args),
  // 3.35 删除扣除信息
  empTaxDeductDelete: args => post(`${cbasBaseURL}/empTaxDeduct/delete`, args),
  // 3.36 查询专项扣除
  empTaxDeductGetDetail: args => get(`${cbasBaseURL}/empTaxDeduct/getDetail`, args),
  // 3.37 导入员工税务专项扣除
  empImportTax: args => postForm(`${cbasBaseURL}/empTaxDeduct/importEmpTaxDeduct`, args),
  // 3.38 导出员工税务专项扣除
  empExportTax: args => get(`${cbasBaseURL}/empTaxDeduct/exportEmpTaxDeduct`, args),
  // 3.40 查询员工工资历史
  empAuxiliaryGetHisWages: args => get(`${cbasBaseURL}/empAuxiliary/getHisWages`, args),
  // 3.41 导出员工其它信息
  empExportOther: args => post(`${cbasBaseURL}/emp/exportOther`, args),
  // 导入员工其它信息
  empImportOther: args => postForm(`${cbasBaseURL}/emp/importOther`, args),
  // 3.43 查询员工是否存在多家公司
  empSelectBySignCompanyIdCard: args => get(`${cbasBaseURL}/emp/selectBySignCompanyIdCard`, args),

  /* 商保模块 */
  // 获取险种
  getInsuranceList: args => get(`${cbasBaseURL}/businessInsurance/getInsuranceList`, args),
  // 查询险种详情
  getInsuranceDetail: args => get(`${cbasBaseURL}/businessInsurance/getInsuranceDetail`, args),
  // 新增或修改险种
  addOrUpdateInsurance: args => postJson(`${cbasBaseURL}/businessInsurance/addOrUpdateInsurance`, args),
  // 获取商保方案
  getInsuranceSchemeList: args => get(`${cbasBaseURL}/businessInsurance/getSchemeList`, args),
  // 查询商保方案
  getInsuranceSchemeDetail: args => get(`${cbasBaseURL}/businessInsurance/getSchemeDetail`, args),
  // 新增或修改商保方案
  addOrUpdateInsuranceScheme: args => postJson(`${cbasBaseURL}/businessInsurance/addOrUpdateScheme`, args),

  /* 工资单模块 */
  // 4.1 通过id获取业务类型
  wagesBusinessType: args => get(`${cbasBaseURL}/wages/businessType`, args),
  // 4.3 通过id删除方案
  delScheme: args => del(`${cbasBaseURL}/wages/scheme`, args),
  // 4.4 新增或修改方案
  submitScheme: args => postJson(`${cbasBaseURL}/wages/scheme`, args, { noMessage: true }),
  // 4.5 通过id获取方案信息
  getScheme: args => get(`${cbasBaseURL}/wages/scheme`, args),
  // 4.9 导入工资单
  wagesExcelPost: args => postForm(`${cbasBaseURL}/wages/excel`, args, { noMessage: true }),
  // 4.10 通过id删除工资单
  delExcel: args => del(`${cbasBaseURL}/wages/excel`, args),
  // 4.11 工资单详细
  wagesListAll: args => get(`${cbasBaseURL}/wages/listAll`, args),
  // 4.12 导出工资单
  wagesExcel: args => get(`${cbasBaseURL}/wages/excel`, args),
  // 4.14 员工工资暂扣
  withHold: args => post(`${cbasBaseURL}/wages/withHold`, args),
  // 4.19 补充客户信息地址电话和银行账号
  completeCustomer: args => post(`${cbasBaseURL}/wages/scheme/completeCustomer`, args),
  // 4.20 更新工资表
  modifyWages: args => postJson(`${cbasBaseURL}/wages/modifyWages`, args),
  // 4.22 工资调整
  wagesChange: args => post(`${cbasBaseURL}/wages/change`, args),
  // 4.141 批量工资暂扣
  wagesWithHolds: args => post(`${cbasBaseURL}/wages/withHolds`, args),
  // 4.11 删除支出账单
  wagesDelChargePayItem: args => del(`${cbasBaseURL}/wages/delChargePayItem`, args),
  // 4.05 获取该业务所有的可以开票的项目
  wagesBusinessTypeInvoiceItem: args => get(`${cbasBaseURL}/wages/businessType/invoiceItem`, args),
  // 4.1 导出账单工资和累计项
  empAuxiliaryExportCSWagesAndTotal: args => get(`${cbasBaseURL}/empAuxiliary/exportCSWagesAndTotal`, args),
  // 零星项目申请批次列表
  wagesSporadicSelectKF: args => get(`${cbasBaseURL}/wagesSporadic/selectKF`, args),
  // 零星项目申请批次详细
  wagesSporadicGetSporadicDetail: args => get(`${cbasBaseURL}/wagesSporadic/getSporadicDetail`, args),
  // 导入零星项目
  wagesSporadicImportWagesSporadic: args => postForm(`${cbasBaseURL}/wagesSporadic/importWagesSporadic`, args),
  // 提交零星项目
  wagesSporadicSubmmit: args => post(`${cbasBaseURL}/wagesSporadic/submmit`, args),
  // 删除零星项目
  wagesSporadicDelete: args => del(`${cbasBaseURL}/wagesSporadic/delete`, args),

  // 4.3、薪资记录查询
  wagesGetWagesBySomeCon: args => get(`${cbasBaseURL}/wages/getWagesBySomeCon`, args),
  // 4.3、薪资记录总览查询
  wagesGetWagesBySomeConAll: args => get(`${cbasBaseURL}/wages/getWagesBySomeConAll`, args),
  // 4.4、薪资记录导出
  wagesExportWagesBySomeCon: args => get(`${cbasBaseURL}/wages/exportWagesBySomeCon`, args),
  // 4.4、薪资记录总览导出
  wagesExportWagesBySomeConAll: args => get(`${cbasBaseURL}/wages/exportWagesBySomeConAll`, args),
  // 4.10 导入支出账单
  wagesPayExcel: args => post(`${cbasBaseURL}/wages/payExcel`, args, { noMessage: true }),

  /* 审核模块 */
  // 5.1 费用单列表
  listChargeStatistic: args => get(`${cbasBaseURL}/chargeConfirm/listChargeStatistic`, args),
  // 5.2 社保/财务/开票/可发/发工资等确认
  confirmSocialFinance: args => post(`${cbasBaseURL}/chargeConfirm/confirmSocialFinance`, args),
  // 5.3 社保组/财务组等驳回工资单
  refuseSocialFinance: args => post(`${cbasBaseURL}/chargeConfirm/refuseSocialFinance`, args),
  // 5.5 查询支出账单
  chargeConfirmListChargePay: args => get(`${cbasBaseURL}/chargeConfirm/listChargePay`, args),
  // 5.4 封账
  chargeConfirmSeal: args => post(`${cbasBaseURL}/chargeConfirm/seal`, args, { noMessage: true }),
  // 5.3 申请实发
  chargeConfirmApplyActual: args => post(`${cbasBaseURL}/chargeConfirm/applyActual`, args, { noMessage: true }),
  // 5.6 申请实发驳回
  chargeConfirmRejectApplyActual: args => post(`${cbasBaseURL}/chargeConfirm/rejectApplyActual`, args),

  /* 流水匹配模块 */
  // 6.3 查看银行流水
  getBankbill: args => get(`${cbasBaseURL}/bankbill/getBankbill`, args),
  // 6.4 查看认领或者已匹配流水
  getConfirmBill: args => get(`${cbasBaseURL}/bankbill/getConfirmBill`, args),
  // 6.5 认领流水-收费单
  confirmBillCharge: args => post(`${cbasBaseURL}/bankbill/confirmBillCharge`, args),
  // 6.7 退回流水-收费单
  refuseBillCharge: args => post(`${cbasBaseURL}/bankbill/refuseBillCharge`, args),
  // 6.6 认领流水-垫付单
  confirmBillAdvance: args => post(`${cbasBaseURL}/bankbill/confirmBillAdvance`, args),
  // 6.8 退回流水-垫付单
  refuseBillAdvance: args => post(`${cbasBaseURL}/bankbill/refuseBillAdvance`, args),
  // 6.10 流水认领客户
  confirmBillCustomer: args => post(`${cbasBaseURL}/bankbill/confirmBillCustomer`, args),

  /* 垫付模块 */
  // 7.1 垫付该笔收费单
  advanceCharge: args => post(`${cbasBaseURL}/advance/advanceCharge`, args),
  // 7.2 获取垫付单-我的
  getAdvanceMy: args => get(`${cbasBaseURL}/advance/getAdvanceMy`, args),
  // 7.3 获取垫付的-所有
  getAdvanceAll: args => get(`${cbasBaseURL}/advance/getAdvanceAll`, args),
  // 7.4 取消垫付
  advanceChargeCancle: args => post(`${cbasBaseURL}/advance/advanceChargeCancle`, args),
  // 7.5 获取申请垫付资料
  getAdvanceInfo: args => get(`${cbasBaseURL}/advance/getAdvanceInfo`, args),
  // 7.6 导出垫付单
  exportAdvance: args => post(`${cbasBaseURL}/advance/exportAdvance`, args),
  // 7.7 获取某客户某方案下的所有的垫付未还清的总金额和里面最早一笔产生垫付的日期
  advanceGetAmountDate: args => get(`${cbasBaseURL}/advance/getAmountDate`, args),

  /* 角色模块 */
  // 8.1 添加资源
  saveResources: args => post(`${cbasBaseURL}/roles/saveResources`, args),
  // 8.2 查看资源
  getResourcesByPage: args => get(`${cbasBaseURL}/roles/getResourcesByPage`, args),
  // 8.3 删除资源
  delResources: args => del(`${cbasBaseURL}/roles/delResources`, args),
  // 8.4 保存角色
  saveRole: args => post(`${cbasBaseURL}/roles/saveRole`, args),
  // 8.5 删除角色
  delRole: args => del(`${cbasBaseURL}/roles/delRole`, args),
  // 8.7 查看角色资源
  getRoleResources: args => get(`${cbasBaseURL}/roles/getRoleResources`, args),
  // 8.8 保存角色资源
  saveRoleResources: args => post(`${cbasBaseURL}/roles/saveRoleResources`, args),
  // 8.9 获取用户角色
  getUserRole: args => get(`${cbasBaseURL}/roles/getUserRole`, args),
  // 8.10 保存用户角色
  saveUserRole: args => post(`${cbasBaseURL}/roles/saveUserRole`, args),
  // 8.12 获取所有部门和用户
  getUserDepartment: args => get(`${cbasBaseURL}/roles/getUserDepartment`, args),
  // 8.16 修改用户签约公司权限
  saveUserSignCompany: args => post(`${cbasBaseURL}/roles/saveUserSignCompany`, args),
  // 8.18 查询我下级及现负责的部门组织
  rolesMyAdminDepartmentTree: args => get(`${cbasBaseURL}/roles/myAdminDepartmentTree`, args),
  // 8.19 查询我可以指派的组织部门
  rolesMyDesignateDepartmentTree: args => get(`${cbasBaseURL}/roles/myDesignateDepartmentTree`, args),

  /* 开票信息 */
  // 9.4 查看待申请开票客户列表
  listWaitInvoiceCustomer: args => get(`${cbasBaseURL}/invoice/listWaitInvoiceCustomer`, args),
  // 9.5 查看客户未开票收费单
  listWaitInvoiceChargeStatistic: args => get(`${cbasBaseURL}/invoice/listWaitInvoiceChargeStatistic`, args),
  // 9.6 开票-单客户-合票补票超开
  applyInvoice: args => post(`${cbasBaseURL}/invoice/applyInvoice`, args),
  // 9.7 查看开票申请历史
  listInvoiceMy: args => get(`${cbasBaseURL}/invoice/listInvoiceMy`, args),
  // 9.8 查看开票详情
  getInvoiceDetail: args => get(`${cbasBaseURL}/invoice/getInvoiceDetail`, args),
  // 9.10 开票申请-批量正常开票
  confirmInvoiceBatchNor: args => post(`${cbasBaseURL}/invoice/applyInvoiceBatchNor`, args),
  // 9.17 开票预览接口，一张或者多张合并开票预览
  invoicePreview: args => get(`${cbasBaseURL}/invoice/preview`, args),
  // 9.18 删除申请开票单
  invoiceDeleteInvoice: args => del(`${cbasBaseURL}/invoice/deleteInvoice`, args),
  // 9.20 拆票预览开票结果
  invoiceSplitPreview: args => postJson(`${cbasBaseURL}/invoice/splitPreview`, args),
  // 9.21 获取该账单可用于拆分的金额列表
  invoiceSplitList: args => get(`${cbasBaseURL}/invoice/splitList`, args),
  // 9.22 拆分账单开票
  invoiceSplit: args => postJson(`${cbasBaseURL}/invoice/split`, args),
  // 9.23 合并开票接口
  invoiceMerge: args => post(`${cbasBaseURL}/invoice/merge`, args),

  /* 系统 */
  // 10.1 反馈建议
  submitAdvice: args => post(`${cbasBaseURL}/sys/submitAdvice`, args),
  // 系统版本日志
  sysGetVersionLog: args => get(`${cbasBaseURL}/sys/getVersionLog`, args),
  // 新增更新日志
  sysAddVersionLog: args => post(`${cbasBaseURL}/sys/addVersionLog`, args),
  // 更改系统日志
  sysUpdateVersionLog: args => post(`${cbasBaseURL}/sys/updateVersionLog`, args),
  // 删除系统日志
  sysDelVersionLog: args => del(`${cbasBaseURL}/sys/delVersionLog`, args),

  /* 文件管理 */
  // 11.3 上传文件
  filesUploadFile: args => postForm(`${cbasBaseURL}/files/uploadFile`, args),

  /* 工作台 */
  // 14.1 提醒消息数量
  notifyCount: args => get(`${cbasBaseURL}/workBench/notifyCount`, args),

  /* 收费通知单 */
  // 15.7 新增特殊账单-招聘、培训以及滞纳金
  chargeStatisticAddSpecialCharge: args => post(`${cbasBaseURL}/chargeStatistic/addSpecialCharge`, args),
  // 15.9 导出生成账单界面列表
  chargeStatisticExportBillList: args => post(`${cbasBaseURL}/chargeStatistic/exportBillList`, args),
  // 导出打单
  chargeStatisticExportChargeBill: args => post(`${cbasBaseURL}/chargeStatistic/exportChargeBill`, args),

  // 16.1 导出费用单对应的财务报表
  exportFinance: args => get(`${cbasBaseURL}/wagepay/exportFinance`, args),

  /* 方案管理 */
  // 方案列表
  querySchemeList: args => get(`${cbasBaseURL}/wages/scheme/query`, args),
  // 提交方案
  schemeSubmit: args => post(`${cbasBaseURL}/wages/scheme/submit`, args),
  // 作废方案
  schemeDisable: args => post(`${cbasBaseURL}/wages/scheme/disable`, args),
  // 上传工资单模板
  schemeTemplate: args => postForm(`${cbasBaseURL}/wages/scheme/template`, args),

  // 搜索补发数据
  getWageReissue: args => get(`${cbasBaseURL}/wageReissue/search`, args),
  // 搜索补发数据
  confirmReissue: args => post(`${cbasBaseURL}/wageReissue/confirmReissue`, args),
  // 更新补发记录
  updateReissue: args => post(`${cbasBaseURL}/wageReissue/updateReissue`, args),
  // 修改手工账单统计项
  updateCharge: args => post(`${cbasBaseURL}/chargeStatistic/updateCharge`, args),
  // 手工账单统计项获取
  getStaticManual: args => get(`${cbasBaseURL}/chargeStatistic/getStaticManual`, args),

  getChargeStatisticList: args => get(`${cbasBaseURL}/chargeStatistic/list`, args),
  // 获取账户信息修改日志
  getLogRecordInRow: args => get(`${cbasBaseURL}/workBench/getLogRecordInRow`, args),
  // 个税申报
  // 个税列表
  perIncomeTaxList: args => get(`${cbasBaseURL}/perIncomeTax/search`, args),
  // 导出个税申报excel
  exportPerIncomeTax: args => post(`${cbasBaseURL}/perIncomeTax/export`, args),
  // 15.8 指派账单
  chargeConfirmDesignateChargeStatistic: args => post(`${cbasBaseURL}/chargeConfirm/designateChargeStatistic`, args),

  // 下载文件
  filesDownLoadFile: args => getBlob(`${cbasBaseURL}/files/downLoadFile`, args),
  // 下载上传的文件
  filesDownLoadUpFile: args => getBlob(`${cbasBaseURL}/files/downLoadUpFile`, args),
  // 下载模板
  filesDownLoadTemplateCbas: args => getBlob(`${cbasBaseURL}/files/downLoadTemplate`, args),

  /* 工单 */
  // 20.1 查看工单
  workOrderSearch: args => get(`${cbasBaseURL}/workOrder/search`, args),

  /* 员工税局附加扣除 */
  // 24.1 查询附加扣除人员信息
  empAddDeductionGetList: args => get(`${cbasBaseURL}/empAddDeduction/getList`, args),
  // 24.2 导入附加扣除人员信息
  empAddDeductionImport: args => postForm(`${cbasBaseURL}/empAddDeduction/import`, args),
  // 导出附加扣除人员信息
  empAddDeductionExport: args => get(`${cbasBaseURL}/empAddDeduction/export`, args),
  // 24.1 查询日志记录
  empAddDeductionGetRecordList: args => get(`${cbasBaseURL}/empAddDeduction/getRecordList`, args),
  // 24.4 导入个税0申报记录
  perIncomeTaxImportTaxDeclara: args => postForm(`${cbasBaseURL}/perIncomeTax/importTaxDeclara`, args),
  // 24.5 删除个税0申报记录
  perIncomeTaxDeleteTaxDeclara: args => del(`${cbasBaseURL}/perIncomeTax/deleteTaxDeclara`, args),

  /* 系统字典管理 */
  // 25.1 批量获取系统字典
  codeDictionaryGetCodeDictionary: args => get(`${cbasBaseURL}/codeDictionary/getCodeDictionary`, args),
  // 25.12 城市下拉列表
  codeDictionaryGetCitylist: args => get(`${cbasBaseURL}/codeDictionary/getCitylist`, args),
  // 25.16 获取服务城市
  codeDictionaryGetServiceCity: args => get(`${cbasBaseURL}/codeDictionary/getServiceCity`, args),
  // 25.17 数据统计
  codeDictionaryDataStatistics: args => get(`${cbasBaseURL}/codeDictionary/dataStatistics`, args),
  // 25.18 导出数据统计表
  codeDictionaryExportDataStatistics: args => get(`${cbasBaseURL}/codeDictionary/exportDataStatistics`, args),


  // 27.1.1 根据客户ID查看客户基本信息
  customerBaseInfo: args => get(`${cbasBaseURL}/customer/baseInfo`, args),
  // 27.1.2 新增/更新 客户基本信息
  customerAddOrUpdateBaseInfo: args => post(`${cbasBaseURL}/customer/addOrUpdateBaseInfo`, args),
  // 27.1.3 删除客户营业执照附件
  customerDeleteCusBizLicenseAnnex: args => del(`${cbasBaseURL}/customer/deleteCusBizLicenseAnnex`, args),
  // 27.2.1 查看客户所有合同
  customerContractInfo: args => get(`${cbasBaseURL}/customer/contractInfo`, args),
  // 27.2.2 查看合同详情(包含合同附件)
  customerContractDetail: args => get(`${cbasBaseURL}/customer/contractDetail`, args),
  // 27.2.3 删除合同附件
  customerDeleteCusContractAnnex: args => del(`${cbasBaseURL}/customer/deleteCusContractAnnex`, args),
  // 27.2.4 新增/更新 合同信息
  customerAddOrUpdateContractInfo: args => post(`${cbasBaseURL}/customer/addOrUpdateContractInfo`, args),
  // 27.4.1 查询客户地址-联系人信息
  customerAddressAndContact: args => get(`${cbasBaseURL}/customer/addressAndContact`, args),
  // 27.4.2 新增客户地址
  customerAddCusAddress: args => post(`${cbasBaseURL}/customer/addCusAddress`, args),
  // 27.4.3 新增客户联系人信息
  customerAddCustomerContact: args => post(`${cbasBaseURL}/customer/addCustomerContact`, args),
  // 27.4.4 删除客户地址
  customerDeleteCusAddress: args => del(`${cbasBaseURL}/customer/deleteCusAddress`, args),
  // 27.4.5 删除客户联系人
  customerDeleteCusContact: args => del(`${cbasBaseURL}/customer/deleteCusContact`, args),
  // 27.5.1 查询客户-服务城市
  customerServiceCity: args => get(`${cbasBaseURL}/customer/serviceCity`, args),
  // 27.5.2 新增或者更新-服务城市
  customerAddOrUpdateServiceCity: args => post(`${cbasBaseURL}/customer/addOrUpdateServiceCity`, args),
  // 27.6.1 查询客户组织-客户成本中心
  customerOrgAndCostCenter: args => get(`${cbasBaseURL}/customer/orgAndCostCenter`, args),
  // 27.6.2 新增或者更新-客户组织
  customerAddOrUpdateCusOrg: args => post(`${cbasBaseURL}/customer/addOrUpdateCusOrg`, args),
  // 27.6.3 新增或者更新-成本中心
  customerAddOrUpdateCostCenter: args => post(`${cbasBaseURL}/customer/addOrUpdateCostCenter`, args),
  // 27.6.4 删除客户组织
  customerDeleteCusOrg: args => del(`${cbasBaseURL}/customer/deleteCusOrg`, args),
  // 27.6.5 删除客户成本中心
  customerDeleteCusCostCenter: args => del(`${cbasBaseURL}/customer/deleteCusCostCenter`, args),
  // 27.9.1 查看客户信息改动日志
  customerChangeLog: args => get(`${cbasBaseURL}/customer/changeLog`, args),
  // 27.10.1 客户信息导入
  customerImportCenterCus: args => postForm(`${cbasBaseURL}/customer/importCenterCus`, args, { noMessage: true }),
  // 客户开票信息导入
  customerImportTicketHolder: args => postForm(`${cbasBaseURL}/customer/importTicketHolder`, args),
  customerCompanyResourceImportTicketHolder: args => postForm(`${companyBaseURL}/ticketHolder/importTicketHolder`, args),
  // 客户银行信息导入
  customerImportCustomerAccount: args => postForm(`${cbasBaseURL}/customer/importCustomerAccount`, args),
  customerCompanyResourceImportCustomerAccount: args => postForm(`${companyBaseURL}/payAccount/importPayAccount`, args),
  // 客户服务城市导入
  customerImportCusServiceCity: args => postForm(`${cbasBaseURL}/customer/importCusServiceCity`, args),

  // 28、商保管理
  // 28.2 查询险种
  businessInsuranceGetInsuranceList: args => get(`${cbasBaseURL}/businessInsurance/getInsuranceList`, args),

  // 29.1 新增、修改采购合同
  contractAddOrUpdatePurchaseContract: args => postJson(`${cbasBaseURL}/contract/addOrUpdatePurchaseContract`, args),
  // 29.2 查询采购合同详情
  contractGetPurchaseContractDetail: args => get(`${cbasBaseURL}/contract/getPurchaseContractDetail`, args),
  // 29.3 查询合同列表
  contractContractList: args => get(`${cbasBaseURL}/contract/contractList`, args),

  // 多抬头开票
  invoiceMultiTitle: args => postJson(`${cbasBaseURL}/invoice/multiTitle`, args),
  // 导入多个开票抬头
  invoiceMultiTitleImport: args => postForm(`${cbasBaseURL}/invoice/multiTitleImport`, args),
  // 获取账单多抬头开票模板
  invoiceMultiTitleModel: args => get(`${cbasBaseURL}/invoice/multiTitleModel`, args),
  // 获取多开票抬头预览
  invoiceMultiTitlePreview: args => get(`${cbasBaseURL}/invoice/multiTitlePreview`, args),
  // 账单不开票
  invoiceInvalid: args => post(`${cbasBaseURL}/invoice/invalid`, args),
  // 账务中心查询发票汇总信息
  invoiceInfoQuery: args => get(`${cbasBaseURL}/invoice/infoQuery`, args),
  // 账单中心发票查询导出
  invoiceExportInfoQuery: args => get(`${cbasBaseURL}/invoice/exportInfoQuery`, args),
  // 工资单明细列表
  getSalaryDetailList: args => post(`${cbasBaseURL}/wages/getCustomerWages`, args),
  // 导出工资明细
  exportSalaryDetail: args => getBlob(`${cbasBaseURL}/wages/getCustomerWagesExport`, args),

  // 财务系统
  // 定时任务列表
  jobList: args => get(`${financeBaseURL}/job/list`, args),
  // 新增定时任务
  jobAdd: args => post(`${financeBaseURL}/job/add`, args),
  // 暂停定时任务
  jobPause: args => post(`${financeBaseURL}/job/pause`, args),
  // 重置定时任务表达式
  jobReschedule: args => post(`${financeBaseURL}/job/reschedule`, args),
  // 恢复暂停的定时任务
  jobResume: args => post(`${financeBaseURL}/job/resume`, args),
  // 删除定时任务
  jobDelete: args => post(`${financeBaseURL}/job/delete`, args),
  // 立即执行一次任务
  jobExecute: args => post(`${financeBaseURL}/job/execute`, args),
  // 通过业务类型名称获取财务规则
  getRuleByFinanceCode: args => get(`${financeBaseURL}/rule/getRuleByFinanceCode`, args),
  // 签约公司
  // 查询签约公司
  ncGetNcDeptTree: args => get(`${financeBaseURL}/nc/getNcDeptTree`, args),
  // 获取所有签约公司
  signCompanyFindAll: args => get(`${financeBaseURL}/signCompany/findAll`, args),
  // 获取签约公司银行账号信息
  signCompanyAccountInfoGet: args => get(`${financeBaseURL}/signCompany/accountInfo`, args),
  // 6.1.6 查询未分配的流水
  bankBillGetNotAssignTypeBill: args => get(`${financeBaseURL}/bankBill/getNotAssignTypeBill`, args),
  // 批量更新签约公司开票项目列表
  invoiceItemBatchUpdate: args => post(`${financeBaseURL}/invoiceItem/batchUpdate`, args),
  // 10.3 查询用户签约公司权限
  signCompanyGetUserSignCompany: args => get(`${financeBaseURL}/signCompany/getUserSignCompany`, args),
  // 10.4 修改用户签约公司权限
  signCompanySaveUserSignCompany: args => post(`${financeBaseURL}/signCompany/saveUserSignCompany`, args),
  // 获取签约公司业务类型列表
  financeType: args => get(`${financeBaseURL}/financeType`, args),
  // 通过签约公司id和业务类型名称，获取默认的开票项目
  invoiceItemDefaultItem: args => get(`${financeBaseURL}/invoiceItem/defaultItem`, args),
  // 通过签约公司id和业务类型名称获取所有的开票项目
  invoiceItemOptional: args => get(`${financeBaseURL}/invoiceItem/optional`, args),
  // 查询签约公司开票项目
  invoiceItemList: args => get(`${financeBaseURL}/invoiceItem/list`, args),

  // CMS
  // 10.8 总监通过申请开户信息
  companySignLeaderPassCompanySign: args => post(`${crmBaseURL}/companySign/leaderPassCompanySign`, args),
  // 10.9 总监驳回申请开户信息
  companySignLeaderRefuseCompanySign: args => post(`${crmBaseURL}/companySign/leaderRefuseCompanySign`, args),
  // 下载已上传文件
  crmFilesDownLoadUpFile: args => getBlob(`${crmBaseURL}/files/downLoadUpFile`, args),

  // 消息提醒
  // 1.2 分页显示消息提醒
  pageReminds: args => get(`${noticeBaseURL}/pageReminds`, args),
  // 1.3 获取用户未读提醒数量
  remindUnReadNum: args => get(`${noticeBaseURL}/remind/unReadNum`, args, { noMessage: true }),
  // 1.4 读提醒
  readRemind: args => put(`${noticeBaseURL}/readRemind`, args, { noMessage: true }),
  // 1.5 删除提醒
  delRemind: args => del(`${noticeBaseURL}/delRemind`, args),

  // 社保系统
  // 获取社保服务商
  getServiceSupplier: args => post(`${socialBaseURL}/api/supplierBasic/pageList`, args),
  // 导出社保服务商
  exportServiceSocity: args => postBlob(`${socialBaseURL}/api/supplierBasic/exportExcelBasic`, args),
  // 保存供应商信息
  saveSupplierInfor: args => postJson(`${socialBaseURL}/api/supplierBasic/saveEntity`, args),
  // 根据ID查询供应商
  getSupplierByIdEntity: args => post(`${socialBaseURL}/api/supplierBasic/getByIdEntity`, args),
  // 供应商是否已经存在
  isSupplierExists: args => post(`${socialBaseURL}/api/supplierBasic/isExists`, args),
  // 获取服务商城市
  getSupplierDetail: args => post(`${socialBaseURL}/supplierDetail/pageList`, args),
  // 获取供应商日志操作列表
  getSupplierLog: args => post(`${socialBaseURL}/supplierLog/pageList`, args),
  // 获取供应商账款情况列表
  getBillSiteList: args => post(`${socialBaseURL}/supplierCredit/pageList`, args),
  // 获取供应商账款情况
  getSupplierBillSite: args => post(`${socialBaseURL}/supplierCredit/selectBySbId`, args),
  // 获取供应商账单配置详情
  getSupplierBillConfig: args => post(`${socialBaseURL}/supplierBillConfig/selectBySbId`, args),
  // 账单配置新增
  addOrUpdateBillConfig: args => postJson(`${socialBaseURL}/supplierBillConfig/saveOrEdit`, args),
  // 保存服务城市
  saveServiceCity: args => postJson(`${socialBaseURL}/supplierDetail/saveEntity`, args),
  // 获取福利套信息
  fulitaoInfon: args => post(`${socialBaseURL}/api/fulitao/findAll`, args),
  // 根据ID查询福利套
  getByIdfltEntity: args => post(`${socialBaseURL}/api/fulitao/toEdit`, args),
  // 福利套更新
  updatefltEntity: args => postJson(`${socialBaseURL}/api/fulitao/addOrUpdate`, args),
  // 福利套删除
  deletefltEntity: args => del(`${socialBaseURL}/api/fulitao/delete`, args),
  // 福利套导出
  exportFulitao: args => postBlob(`${socialBaseURL}/api/fulitao/exportFulitao`, args),
  // 福利套导入
  importFulitao: args => postForm(`${socialBaseURL}/api/fulitao/importFulitao`, args),
  // 福利套供应商选择
  getSupplierByCityFulitao: args => post(`${socialBaseURL}/api/supplierDetail/getSupplierByCity`, args),
  // 获取字典基础数据
  getDictionary: args => post(`${socialBaseURL}/api/baseDictionary/getDictionary`, args),
  // 根据城市返回供应商
  getsupplierBycity: args => post(`${socialBaseURL}/api/supplierDetail/getSupplierByCity`, args),
  // 请款单列表
  requestPayList: args => get(`${socialBaseURL}/api/requestPay/list`, args),
  // 导入请款单
  importPaymentRequest: args => postForm(`${socialBaseURL}/api/requestPay/import`, args),
  // 导出请款单模板
  exportPaymentTemplate: args => getBlob(`${socialBaseURL}/api/requestPay/downTemplate`, args),
  // 数据校验并生成请款单
  checkEmployeeInfo: args => post(`${socialBaseURL}/api/requestPay/checkEmployeeInfo`, args),
  // 垫付
  paymentToAdvancePayment: args => post(`${socialBaseURL}/api/requestPay/paymentToAdvancePayment`, args),
  // 取消垫付
  advancePaymentToPayment: args => post(`${socialBaseURL}/api/requestPay/advancePaymentToPayment`, args),
  // 设置请款单所属部门
  setDepartmentPay: args => post(`${socialBaseURL}/api/requestPay/updateDept`, args),
  // 同步员工类型
  setBusinessType: args => post(`${socialBaseURL}/api/requestPay/syncBuinessType`, args),
  // 导出异常数据
  exportErrorDataReq: args => getBlob(`${socialBaseURL}/api/requestPay/exportErrorData`, args),
  // 导入更新数据
  importUpdateReq: args => postForm(`${socialBaseURL}/api/requestPay/importUpdate`, args),
  // 请款单提交
  commitPaymentRequest: args => post(`${socialBaseURL}/api/requestPay/submit`, args),
  // 请款单删除
  deletePaymentRequest: args => del(`${socialBaseURL}/api/requestPay/delete`, args),
  // 请款单查看
  getPaymentRequest: args => get(`${socialBaseURL}/api/requestPay/view`, args),
  // 供应商开票
  getSupplierInoviceList: args => post(`${socialBaseURL}/api/supplierInvoice/pageList`, args),
  // 开票信息导入
  importInvoice: args => postForm(`${socialBaseURL}/api/supplierInvoice/importExcel`, args),
  // 开票信息删除
  deleteInvoice: args => post(`${socialBaseURL}/api/supplierInvoice/delete`, args),
  // 保存开票信息
  saveInvoice: args => post(`${socialBaseURL}/api/supplierInvoice/saveOrEdit`, args),
  // 提交开票消息
  commitInvoice: args => post(`${socialBaseURL}/api/supplierInvoice/submit`, args),
  // 签约公司列表(付款单位)
  getCompanyList: args => post(`${socialBaseURL}/api/supplierInvoice/payEntList`, args),
  // 服务商城市-新增时查询数据
  selectSaveInfo: args => post(`${socialBaseURL}/api/supplierDetail/selectSaveInfo`, args),
  // 供应商下拉表 有参数限定 城市Id和服务项目
  getSupplierList: args => post(`${socialBaseURL}/api/supplierBasic/getAllSupplierBasic`, args),
  // 供应商下拉表 无参数限定
  getSupplierAll: args => post(`${socialBaseURL}/api/supplierBasic/superiorUnit`, args),
  // 上传文件
  socialUpload: args => postForm(`${socialBaseURL}/attachment/upload`, args),
  // 下载文件
  socialDownload: args => getBlob(`${socialBaseURL}/attachment/download`, args),
  // 删除文件
  socialDeleteFile: args => post(`${socialBaseURL}/attachment/delete`, args),
  // 文件列表
  socialFileList: args => post(`${socialBaseURL}/attachment/pageList`, args),
  // 根据城市选择福利套（客戶管理选择默认福利套）
  fulitaoGetFulitaoByCity: args => post(`${socialBaseURL}/api/fulitao/getFulitaoByCity`, args),
  // 福利套获取险种明细
  fulitaoGetWelfarePackageDetail: args => post(`${socialBaseURL}/api/fulitao/getWelfarePackageDetail`, args),
  // 获取险种列表
  getSocialInsuranceList: args => post(`${socialBaseURL}/insuranctType/pageList`, args),
  // 获取险种下拉列表
  getInsuranceAll: args => post(`${socialBaseURL}/insuranctType/getAll`, args),
  // 新增或编辑险种
  addSocialInsurance: args => postJson(`${socialBaseURL}/insuranctType/saveOrEdit`, args),
  // 删除险种
  deleteSocialInsurance: args => post(`${socialBaseURL}/insuranctType/delete`, args),
  // 获取政策信息列表
  getPolicyInfo: args => post(`${socialBaseURL}/guidance/pageList`, args),
  // 根据城市id获取详情
  getPolicyInfoByIdEntity: args => post(`${socialBaseURL}/guidance/getGuidanceById`, args),
  // 删除政策信息
  deletePolicyInfo: args => post(`${socialBaseURL}/guidance/delete`, args),
  // 保存政策信息
  savePolicyInfo: args => postJson(`${socialBaseURL}/guidance/saveGuidance`, args),

  // 政策信息 deletePolicyItem
  // 导入政策信息
  importPolicyInfo: args => postForm(`${socialBaseURL}/guidance/importExcel`, args),
  // 导出政策信息
  exportPolicyInfo: args => postBlob(`${socialBaseURL}/guidance/exportExcel`, args),
  // 获取政策信息
  getPolicyListByTab: args => post(`${socialBaseURL}/guidance/pageList`, args),
  // 政策信息详情
  viewPolicyDetail: args => post(`${socialBaseURL}/guidance/view`, args),
  // 删除政策信息
  deletePolicyItem: args => post(`${socialBaseURL}/guidance/delete`, args),
  // 保存供应商专员信息
  saveSupplierAttache: args => post(`${socialBaseURL}/guidance/saveGuidance`, args),
  // 保存增减员截点
  savePolicySection: args => post(`${socialBaseURL}/guidance/savePolicySection`, args),
  // 保存社保所需材料
  savePolicySocialDatum: args => post(`${socialBaseURL}/guidance/savePolicySocialDatum`, args),
  // 保存公积金所需材料
  savePolicyAccfundDatum: args => post(`${socialBaseURL}/guidance/savePolicyAccfundDatum`, args),
  // 保存基数调整
  savePolicyCardinalAdjustment: args => post(`${socialBaseURL}/guidance/savePolicyCardinalAdjustment`, args),
  // 公积金待遇
  savePolicyAccfundTreatment: args => post(`${socialBaseURL}/guidance/savePolicyAccfundTreatment`, args),
  // 保存养老申报
  savePolicyPensionDeclare: args => post(`${socialBaseURL}/guidance/savePolicyPensionDeclare`, args),
  // 保存医疗申报
  savePolicyMedicalDeclare: args => post(`${socialBaseURL}/guidance/savePolicyMedicalDeclare`, args),
  // 保存工伤申报
  savePolicyInjuryDeclare: args => post(`${socialBaseURL}/guidance/savePolicyInjuryDeclare`, args),
  // 保存生育申报
  savePolicyProcreateDeclare: args => post(`${socialBaseURL}/guidance/savePolicyProcreateDeclare`, args),
  // 保存失业申报
  savePolicyUnemployedDeclare: args => post(`${socialBaseURL}/guidance/savePolicyUnemployedDeclare`, args),
  // 用户微服务
  // 1.2 修改密码
  userUpdatePasswd: args => post(`${userBaseURL}/user/updatePasswd`, args),
  // 1.3 统一获取权限
  userGetUserInfo: args => get(`${userBaseURL}/user/getUserInfo`, args),
  // 1.4 统一注册
  userRegisterUser: args => post(`${userBaseURL}/user/registerUser`, args),
  // 1.5 开通、关闭某系统
  updapteSysEnable: args => post(`${userBaseURL}/user/updapteSysEnable`, args),
  // 1.6 启用、禁用用户
  userUpdapteUserEnable: args => post(`${userBaseURL}/user/updapteUserEnable`, args),
  // 1.7 查询用户
  userGetUserByPage: args => get(`${userBaseURL}/user/getUserByPage`, args),
  // 1.8 修改用户
  userUpdateUser: args => post(`${userBaseURL}/user/updateUser`, args),
  // 1.9 精准检索存在用户
  userSelectExistUser: args => get(`${userBaseURL}/user/selectExistUser`, args),
  // 1.10获取用户权限
  userGetUserResourceList: args => get(`${userBaseURL}/user/getUserResourceList`, args),
  // 2.1 查询组织架构
  organizationDepartmentTree: args => get(`${userBaseURL}/organization/departmentTree`, args),
  // 2.2 添加、修改部门
  organizationDepartmentPost: args => post(`${userBaseURL}/organization/department`, args),
  // 2.3 删除部门
  organizationDepartmentDel: args => del(`${userBaseURL}/organization/department`, args),
  // 2.4 查看部门下用户
  organizationDepartmentUserGet: args => get(`${userBaseURL}/organization/departmentUser`, args),
  // 2.5 部门下添加用户
  organizationDepartmentAddUser: args => post(`${userBaseURL}/organization/departmentAddUser`, args),
  // 2.6 获取部门外所有人员
  organizationExternalAllUser: args => get(`${userBaseURL}/organization/externalAllUser`, args),
  // 2.7 添加、修改资源
  organizationResourcesPost: args => post(`${userBaseURL}/organization/resources`, args),
  // 2.8 删除资源
  organizationResourcesDel: args => del(`${userBaseURL}/organization/resources`, args),
  // 2.9 查看资源
  organizationResourcesGet: args => get(`${userBaseURL}/organization/resources`, args),
  // 2.10 查看角色
  organizationRoleGet: args => get(`${userBaseURL}/organization/role`, args),
  // 2.11 添加、修改角色
  organizationRolePost: args => post(`${userBaseURL}/organization/role`, args),
  // 2.12 删除角色
  organizationRoleDel: args => del(`${userBaseURL}/organization/role`, args),
  // 2.13 查看角色资源
  organizationRoleResourcesGet: args => get(`${userBaseURL}/organization/roleResources`, args),
  // 2.14 添加、修改角色对应资源权限
  organizationRoleResourcesPost: args => post(`${userBaseURL}/organization/roleResources`, args),
  // 2.15 部门下多选删除用户
  organizationDepartmentDelUser: args => del(`${userBaseURL}/organization/departmentDelUser`, args),
  // 2.16 查询我下级及现负责的部门组织
  organizationMyAdminDepartmentTree: args => get(`${userBaseURL}/organization/myAdminDepartmentTree`, args),
  // 2.17 部门下修改用户
  organizationDepartmentUserPost: args => post(`${userBaseURL}/organization/departmentUser`, args),
  // 1.2 修改个人信息
  userUpdateInformation: args => post(`${userBaseURL}/user/updateInformation`, args),
  /* company-server */
  // 开票方信息
  customerFindTicketHolders: args => get(`${companyBaseURL}/ticketHolder/getTicketHolder`, args),
  companyResourceFilesDownLoadFile: args => getBlob(`${companyBaseURL}/files/downLoadFile`, args),
  // 27.3.1 查询客户付款信息
  customerPayInfo: args => get(`${companyBaseURL}/payAccount/getPayAccount`, args),
  // 27.3.2 新增/更新开票信息
  customerAddOrUpdateTicketHolder: args => post(`${companyBaseURL}/ticketHolder/addOrUpdateTicketHolder`, args),
  // 27.3.3 新增/修改 付款信息
  customerAddOrUpdateCusAccount: args => post(`${companyBaseURL}/payAccount/addOrUpdatePayAccount`, args),
  // 27.3.4 删除开票信息
  customerDeleteTicketHolder: args => del(`${companyBaseURL}/ticketHolder/deleteTicketHolder`, args),
  // 27.3.5 删除付款信息
  customerDeleteCustomerAccount: args => del(`${companyBaseURL}/payAccount/deleteCustomerAccount`, args),
  // 27.3.6 导出开票方信息
  customerExportTicketHolder: args => post(`${companyBaseURL}/ticketHolder/exportTicketHolder`, args),
  // 27.3.7 搜索开票方信息
  customerSearchTicketHolder: args => get(`${companyBaseURL}/ticketHolder/getTicketHolder`, args),
  // 查询客户付款信息
  payAccountGetPayAccountInfo: args => get(`${companyBaseURL}/payAccount/getPayAccountInfo`, args),
  // 查询客户开票信息
  ticketHolderGetTicketHoldeInfo: args => get(`${companyBaseURL}/ticketHolder/getTicketHoldeInfo`, args),

  // 一、开票公司信息维护
  // 8.同步至NC
  syncCustomer: args => post(`${financeBaseURL}/customer/syncCustomer`, args),
  // 客户开票信息导入
  importCusInvoice: args => postForm(`${financeBaseURL}/cusInvoice/importCusInvoice`, args),
  // 二、商品税率信息维护
  // 1.新增商品税率信息
  addGoodsTax: args => post(`${financeBaseURL}/tradeInfo/addComInvoice`, args, { noMessage: true }),
  // 2.根据商品税率信息ID删除
  delTax: args => post(`${financeBaseURL}/tradeInfo/delTradeInfo`, args),
  // 4.提交商品税率信息修改
  goodsTaxModify: args => post(`${financeBaseURL}/tradeInfo/submitComInvoiceModify`, args),
  // 5.获取所有的商品税率信息
  getAllGoodsTax: args => get(`${financeBaseURL}/tradeInfo/tradeInfoAll`, args),
  // 三、开票管理
  // 1.根据月份查询开票数据
  billingInfo: args => get(`${financeBaseURL}/invoice/billingInfo`, args),
  // 2.删除开票原始资料文件
  delOriginalFile: args => post(`${financeBaseURL}/invoice/delOriginalFile`, args),
  // 3.导出开票所需的xml文件
  exportXml: args => getBlob(`${financeBaseURL}/invoice/exportXmlByFileId`, args),
  // 4.根据文件id查询票数据
  searchTiketsByFileId: args => get(`${financeBaseURL}/invoice/searchTiketsByFileId`, args),
  // 发票导出
  exportTicket: args => post(`${financeBaseURL}/invoice/exportTicket`, args),
  // 搜索发票数据
  invoiceSearch: args => get(`${financeBaseURL}/invoice/search`, args),
  // 导入发票数据(返导)
  importReturnImport: args => postForm(`${financeBaseURL}/import/returnImport`, args),
  // 四、客户开票信息
  // 1.查询客户开票信息数据
  queryCusInvoice: args => post(`${financeBaseURL}/cusInvoice/searchCusInvoice`, args),
  // 五、发票资料导入
  // 1.发票资料导入
  importInvoiceData: args => postForm(`${financeBaseURL}/import/data`, args, { noMessage: true }),
  // 六、凭证申请
  // 1. 列出所有收费单
  chargeStatisticList: args => get(`${financeBaseURL}/chargeStatistic/list`, args),
  // 2. 获取对应账单各个凭证详细信息
  voucherDetail: args => get(`${financeBaseURL}/chargeStatistic/voucherDetail`, args),
  // 开票信息详细
  ticketDetail: args => get(`${financeBaseURL}/chargeStatistic/ticketDetail`, args),
  // 3. 应收单列表
  f0List: args => get(`${financeBaseURL}/nc/F0/list`, args),
  // 应收明细
  f0Detail: args => get(`${financeBaseURL}/nc/F0/detail`, args),
  // 获取实收凭证列表
  f2List: args => get(`${financeBaseURL}/nc/F2/list`, args),
  // 实收明细
  f2Detail: args => get(`${financeBaseURL}/nc/F2/detail`, args),
  // 获取实发凭证列表
  f3List: args => get(`${financeBaseURL}/nc/F3/list`, args),
  // 实发明细
  f3Detail: args => get(`${financeBaseURL}/nc/F3/detail`, args),
  // 九、银行流水
  // 确认银行流水类型
  confirmBillType: args => post(`${financeBaseURL}/bankBill/confirmBillType`, args),
  // 导出银行流水
  exportBankBill: args => post(`${financeBaseURL}/bankBill/exportBankBill`, args),
  // 查询分配方案
  getSolution: args => get(`${financeBaseURL}/bankBill/sortSolution`, args),
  // 修改分配方案
  // 查看银行流水
  getBankBill: args => get(`${financeBaseURL}/bankBill/getBankbill`, args),
  // 导入银行流水
  importBankBillCommon: args => postForm(`${financeBaseURL}/bankBill/importBankbillM`, args),
  // 忽略导入银行流水
  importIgnorebankbillCommon: args => postForm(`${financeBaseURL}/bankBill/importIgnorebankbillM`, args),
  // 导出银行流水
  exportBankBillCommon: args => post(`${financeBaseURL}/bankBill/exportBankBillM`, args),
  // 获取银行列表
  getBankList: args => get(`${financeBaseURL}//bankBill/getDicBank`, args),
  // 更新方案
  updateSolution: args => post(`${financeBaseURL}/bankBill/sortSolution`, args),
  // 认领退票流水
  confirmBillRefuse: args => post(`${financeBaseURL}/bankBill/confirmBillRefuse`, args),
  // 查询退票
  getRefuse: args => get(`${financeBaseURL}/bankBill/getRefuse`, args),
  // 导入退票
  importRefuse: args => postForm(`${financeBaseURL}/bankBill/importRefuse`, args, { noMessage: true }),
  // 查询可用于退票明细导入的收款银行流水
  bankBillAvailableRefuseBill: args => get(`${financeBaseURL}/bankBill/availableRefuseBill`, args),
  // 获取退票认领时工资发放批次选项
  bankBillBatchList: args => get(`${financeBaseURL}/bankBill/batchList`, args),
  // 17.8 生成付供应商批次
  ssRequisitionGenerateBatch: args => post(`${financeBaseURL}/SsRequisition/generateBatch`, args),
  // 17.9 导出供应商付款批次
  ssRequisitionExportSsReqBatch: args => post(`${financeBaseURL}/SsRequisition/exportSsReqBatch`, args),
  // 17.10 根据供应商请款单发放批次查看明细
  ssRequisitionSearchByBatchNo: args => get(`${financeBaseURL}/SsRequisition/searchByBatchNo`, args),
  // 实发工资
  // 获取没有发工资的收费统计单
  payoffChargeStatistic: args => get(`${financeBaseURL}/payoff/chargeStatistic`, args),
  // 合并收费统计单生成一批
  payoffGeneratedBatch: args => post(`${financeBaseURL}/payoff/generatedBatch`, args, { noMessage: true }),
  // 获取所有实发收费统计合并批次
  payoffBatchList: args => get(`${financeBaseURL}/payoff/batchList`, args),
  // 认领实发银行流水
  payoffConfirmBill: args => post(`${financeBaseURL}/payoff/confirmBill`, args),
  // 导出银行版数据
  exportPayoff: args => post(`${financeBaseURL}/payoff/exportPayoff`, args),
  // 发工资-平安跨行快付
  payoffByKhkf: args => post(`${financeBaseURL}/payoff/payoffByKhkf`, args),
  // 财务发工资-客户的工资明细
  chargeFWages: args => get(`${financeBaseURL}/payoff/chargeFWages`, args),
  // 导出实发明细
  exportPayFwage: args => post(`${financeBaseURL}/payoff/exportPayFwage`, args),
  // 驳回客服封账数据
  rejectHROPay: args => post(`${financeBaseURL}/payoff/rejectHROPay`, args),
  // 工资批次-查看认领或者已匹配的流水
  getPayoffConfirmBill: args => get(`${financeBaseURL}/payoff/getPayoffConfirmBill`, args),
  // 工资批次-查看发放明细
  getPayoffDetail: args => get(`${financeBaseURL}/payoff/findByBatchItemId`, args),
  // 调整最终发放银行
  changePayoffBank: args => post(`${financeBaseURL}/payoff/changePayoffBank`, args),
  // 获取签约公司开户名列表
  getBankNameByPurpose: args => get(`${financeBaseURL}/signCompany/getBankNameByPurpose`, args),
  // 统计不同银行版发工资情况
  statisticsByBank: args => get(`${financeBaseURL}/payoff/statisticsByBank`, args),
  // 查看待发待付客户明细
  findFsByBatchNo: args => get(`${financeBaseURL}/payoff/findFsByBatchNo`, args),
  // 导出财务账单
  exportFChargeStatistic: args => post(`${financeBaseURL}/payoff/exportFChargeStatistic`, args),
  // 搜索补发数据
  wageReissueSearch: args => get(`${financeBaseURL}/wageReissue/search`, args),
  // 财务补发
  financeReissue: args => post(`${financeBaseURL}/wageReissue/financeReissue`, args),
  // 查询社保请款单
  paymentRequestList: args => get(`${financeBaseURL}/SsRequisition/list`, args),
  // 作废社保请款单
  invalidPaymentReq: args => post(`${financeBaseURL}/SsRequisition/invalid`, args),
  // 通过社保请款单
  passPaymentReq: args => post(`${financeBaseURL}/SsRequisition/pass`, args),
  // 财务确认付款
  cofirmPaymentReq: args => post(`${financeBaseURL}/SsRequisition/pay`, args),
  // 请款单详情
  paymentReqDetail: args => get(`${socialBaseURL}/api/requestPay/view`, args),
  // 待付供应商列表
  paymentReqSupplierList: args => get(`${financeBaseURL}/SsRequisition/searchWaitPay`, args),
  // 待付商保列表
  paymentBusinessList: args => get(`${financeBaseURL}/comInsurance/list`, args),
  // 待付商保审核
  paymentBusinessReview: args => post(`${financeBaseURL}/comInsurance/review`, args),
  // 待付请款客户明细
  paymentBusinessDetail: args => get(`${financeBaseURL}/comInsurance/detail`, args),
  // 商保请款生成批次
  generateBusinessBatch: args => post(`${financeBaseURL}/comInsurance/generateBatch`, args),
  // 商保发票列表
  getSbInvoiceList: args => get(`${financeBaseURL}/comInsurance/invoice/list`, args),
  // 商保发票审核
  sbInvoiceReview: args => post(`${financeBaseURL}/comInsurance/invoice/review`, args),
  // 签约公司
  // 签约公司列表
  signCompanyList: args => get(`${financeBaseURL}/signCompany`, args),
  // 添加签约公司
  addSignCompany: args => postJson(`${financeBaseURL}/signCompany`, args, { noMessage: true }),
  // 删除签约公司
  deleteSignCompany: ({ id, ...arg }) => del(`${financeBaseURL}/signCompany/${id}`, arg),
  // 查询签约公司
  // getSignCompanyById: ({ id, ...arg }) => get(`signCompany/${id}`, arg),
  // 获取全部开票公司
  signCompanyListAll: args => get(`${financeBaseURL}/signCompany/listAll`, args),
  // 获取签约公司业务类型列表
  signCompanyFinanceType: args => get(`${financeBaseURL}/financeType`, args),
  // 新增业务类型
  addFinanceType: args => postJson(`${financeBaseURL}/financeType`, args),
  // 修改业务类型
  modifyFinanceType: args => putJson(`${financeBaseURL}/financeType`, args),
  // 删除业务类型
  delFinanceType: ({ id, ...arg }) => del(`${financeBaseURL}/financeType/${id}`, arg),
  // 获取开票项所有的可选账单金额名称
  getOptionalAmountName: args => get(`${financeBaseURL}/invoiceItem/optionalAmountName`, args),
  // 查询签约公司开票项目
  signComInvoiceItem: args => get(`${financeBaseURL}/invoiceItem/list`, args),
  // 批量更新签约公司开票项目
  batchInvoiceItem: args => postJson(`${financeBaseURL}/invoiceItem/updateList`, args),
  // 导入签约公司开票项目
  invoiceItemUpload: args => postForm(`${financeBaseURL}/invoiceItem/upload`, args),
  // 下载签约公司开票项目
  invoiceItemDownload: args => get(`${financeBaseURL}/invoiceItem/download`, args),
  // 修改签约公司基本信息
  signCompanyBaseInfoPut: args => putJson(`${financeBaseURL}/signCompany/baseInfo`, args),
  // 新增签约公司基本信息
  signCompanyBaseInfoAdd: args => postJson(`${financeBaseURL}/signCompany/baseInfo`, args),
  // 获取签约公司基本信息
  signCompanyBaseInfoGet: args => get(`${financeBaseURL}/signCompany/baseInfo`, args),
  // 获取签约公司开票信息
  signCompanyInvoiceInfoGet: args => get(`${financeBaseURL}/signCompany/invoiceInfo`, args),
  // 修改签约公司开票信息
  signCompanyInvoiceInfoPut: args => putJson(`${financeBaseURL}/signCompany/invoiceInfo`, args),
  // 查询签约公司操作日志
  signCompanyGetSignOperateRecord: args => get(`${financeBaseURL}/signCompany/getSignOperateRecord`, args),
  // 新增或者修改签约公司银行账号信息
  signCompanyAccountInfoPut: args => postJson(`${financeBaseURL}/signCompany/accountInfo`, args),
  // 供应商发票
  // 供应商驳回或者通过
  returnOrPassSupInvoice: args => post(`${financeBaseURL}/supplierInvoice/invalidOrPass`, args),
  getSupplierInvoiceList: args => get(`${financeBaseURL}/supplierInvoice/list`, args),
  // 更新凭证详细
  ncUpdateDetail: args => putJson(`${financeBaseURL}/nc/updateDetail`, args),
  // 修改凭证表头信息
  ncUpdateVoucher: args => putJson(`${financeBaseURL}/nc/updateVoucher`, args),
  // 真实NC凭证查询
  ncQueryRealVoucher: args => get(`${financeBaseURL}/nc/queryRealVoucher`, args),

  // 导入发票数据
  quickInvoiceImportData: args => postForm(`${financeBaseURL}/quick/invoice/importData`, args),
  // 快捷开票导出xml文件zip包
  quickInvoiceExportXml: args => postBlob(`${financeBaseURL}/quick/invoice/exportXml`, args),
  // 获取导入批次列表
  quickInvoiceBatchList: args => get(`${financeBaseURL}/quick/invoice/batchList`, args),

  // 待办统计
  getTodoCount: args => get(`${financeBaseURL}/todo/view`, args),

  // 发工资-发放查询
  payoffHistory: args => get(`${financeBaseURL}/payoff/searchPayroll`, args),
  /*
    跨行快付
  */
  // 1. 导入待发工资表
  importPayroll: args => postForm(`${yqzlBaseURL}/payoff/importPayroll`, args, { noMessage: true }),
  // 2. 搜索工资发放批次
  searchWageBatch: args => get(`${yqzlBaseURL}/payoff/searchWageBatch`, args),
  // 3. 执行发工资(跨行快付)
  khkf: args => post(`${yqzlBaseURL}/payoff/khkf`, args),
  // 6. 导出回盘文件
  exportHuipan: args => get(`${yqzlBaseURL}/payoff/exportHuipan`, args),
  // 7. 导出对账、差错文件
  exportDzCc: args => get(`${yqzlBaseURL}/payoff/exportDzCc`, args),
  // 10.1 银企直联签约公司信息
  corps: args => get(`${yqzlBaseURL}/corps`, args),
  // 10.2 查询企业账户余额（平安）
  queryBalance: args => get(`${yqzlBaseURL}/payoff/queryBalance`, args),
  // 查询批次处理日志
  batchLog: args => get(`${yqzlBaseURL}/payoff/batchLog`, args),
  // 查询批次处理日志
  sendSms: args => post(`${yqzlBaseURL}/payoff/sendSms`, args),
  // 根据银行名获取签约公司列表
  corpSignCompany: args => get(`${yqzlBaseURL}/corp/signCompany`, args),

  /*
    供应商
   */
  // 获取分页供应商基础信息列表
  supplierBasicGet: args => get(`${supplierBaseURL}/supplier/basic`, args),
  // 更新供应商NC编码
  supplierBasicUpdateNcNo: args => put(`${supplierBaseURL}/supplier/basic/updateNcNo`, args),
  // 上传供应商至NC
  supplierBasicTransfer: args => post(`${supplierBaseURL}/supplier/basic/transfer`, args),

  /*
    客服系统
  */
  // 1.1 CBAS信息+权限
  userGetUserCbasInfo: args => get(`${cbasBaseURL}/user/getUserCbasInfo`, args),
  // 1.2 修改用户密码
  changePassword: args => post(`${cbasBaseURL}/user/changePassword`, args),
  // 1.4 修改用户
  updateUser: args => post(`${cbasBaseURL}/user/updateUser`, args),
  // 1.7.修改NC编码
  updateNcCode: args => post(`${cbasBaseURL}/customer/updateNcCode`, args),
  // 7.1 获取方案审核列表
  schemeCheckList: args => get(`${cbasBaseURL}/wages/scheme/check`, args),
  // 通过业务类型名称获取财务规则
  getRuleByBusinessTypeName: args => get(`${cbasBaseURL}/wages/scheme/invoiceItem`, args),
  // 11.3 确认开票
  confirmInvoice: args => post(`${cbasBaseURL}/invoice/confirmInvoice`, args),
  // 11.4 查看所有的开票单
  listInvoiceAll: args => get(`${cbasBaseURL}/invoice/listInvoiceAll`, args),
  // 11.5 驳回开票单
  refuseInvoice: args => post(`${cbasBaseURL}/invoice/refuseInvoice`, args),
  // 11.6 根据城市确认开票
  confirmInvoiceByPlace: args => post(`${cbasBaseURL}/invoice/confirmInvoiceByPlace`, args),
  // 11.7 根据票据id查询查询财务系统生成的票据情况
  queryInvoiceState: args => get(`${cbasBaseURL}/invoice/queryInvoiceState`, args),
  // 15.6 根据账单id导出打单数据
  exportChargeBill: args => post(`${cbasBaseURL}/chargeStatistic/exportChargeBill`, args),
  // 零星项目列表
  littlePayment: args => get(`${cbasBaseURL}/wagesSporadic/selectFinance`, args),
  // 驳回零星项目
  rejectLittlePayment: args => post(`${cbasBaseURL}/wagesSporadic/reject`, args),
  // 零星项目是生成批次
  generateLittleBatch: args => postForm(`${cbasBaseURL}/wagesSporadic/confirmPay`, args),
  // 零星项目申请批次详细
  littlePaymentDetail: args => get(`${cbasBaseURL}/wagesSporadic/getSporadicDetail`, args),
  // 获取所有业务类型
  businessTypeList: args => get(`${cbasBaseURL}/wages/businessType/listAll`, args),
  // 通过id获取业务类型
  businessTypeDetail: args => get(`${cbasBaseURL}/wages/businessType`, args),
  // 7.8 查看垫付详情
  advanceGetAdvanceDetail: args => get(`${cbasBaseURL}/advance/getAdvanceDetail`, args),
  // 7.2 方案生效确认
  schemeConfirm: args => post(`${cbasBaseURL}/wages/scheme/confirm`, args),
  // 客户信息列表
  searchCustomerByFinance: args => get(`${cbasBaseURL}/customer/searchCustomerByFinance`, args),
  // 获取账单信息
  getBillDetailByInvoice: args => get(`${cbasBaseURL}/invoice/getInvoiceCS`, args),
  // 8.17 查询组织架构
  rolesDepartmentTree: args => get(`${userBaseURL}/organization/departmentTree`, args),
  // 下载模板
  filesDownLoadTemplate: args => getBlob(`${financeBaseURL}/files/downLoadTemplate`, args),
  filesDownLoadFileCbas: args => getBlob(`${cbasBaseURL}/files/downLoadFile`, args),
  filesDownLoadFileFinance: args => getBlob(`${financeBaseURL}/files/downLoadFile`, args),
  // 社保服务
  // 付供应商款导出
  exportSupplierAmount: args => postBlob(`${socialBaseURL}/api/requestPay/export`, args),
  // 检查客户产品是否多次开户
  companySignSelectProjectCustomNo: args => post(`${crmBaseURL}/companySign/selectProjectCustomNo`, args),
  // 根据客服 返回 客户产品
  customerSelectCustomerProduct: args => get(`${cbasBaseURL}/customer/selectCustomerProduct`, args),
  // 31.1 查询异步执行结果
  asyncResultGetAsyncResult: args => get(`${cbasBaseURL}/asyncResult/getAsyncResult`, args),
  // 31.2 确认异步-工资表导入
  asyncResultConfirmAsyncWagesImport: args => post(`${cbasBaseURL}/asyncResult/confirmAsyncWagesImport`, args),
  // 31.3 确认异步-支出账单
  asyncResultConfirmAsyncPay: args => post(`${cbasBaseURL}/asyncResult/confirmAsyncPay`, args),
  // 2.3 转移客户
  migrateCustomer: args => put(`${cbasBaseURL}/customer/migrateCustomer`, args),
  // 归属客户全称列表
  companyList: args => get(`${companyBaseURL}/company/list`, args),
  // 31.3 确认确认异步-支出申请可发
  asyncResultConfirmAsyncApplyPay: args => post(`${cbasBaseURL}/asyncResult/confirmAsyncApplyPay`, args),
  // 31.5 确认异步-支出封账
  asyncResultConfirmAsyncSeal: args => post(`${cbasBaseURL}/asyncResult/confirmAsyncSeal`, args),
  // 多组织开票抬头预览
  invoiceMultiOrganizationTicket: args => get(`${cbasBaseURL}/invoice/multiOrganizationTicket`, args),
};

module.exports = api;
