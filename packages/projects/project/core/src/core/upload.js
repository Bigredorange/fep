/**
 * 返回数据格式: {
 *  {
 *      name,
 *      size,
 *      file,
 *      blob
 *  }
 * }
 */

import { Message } from 'element-ui';

export default (options) => {
  const {
    fileType,
    whLimit,
    sizeLimit,
    multiple = true,
  } = options;
  const extract = async (file) => {
    // 提取文件名、blob对象、文件
    if (!file) return false;
    // 获取blob对象
    window.URL = window.URL || window.webkitURL;
    const blob = window.URL.createObjectURL(file);
    const { name, size } = file;
    // 文件大小判断
    if (sizeLimit && ((size / 1024 / 1024) > sizeLimit)) {
      Message.error(`文件上传失败，因为文件大小大于 ${sizeLimit}M`);
      return Promise.reject();
    }
    // 图片宽高判断
    let width;
    let height;
    if (whLimit) {
      await new Promise((resolve, reject) => {
        const [maxWidth, maxHeight] = whLimit;
        const img = document.createElement('img');
        img.src = blob;
        img.onload = () => {
          const { width: w, height: h } = img;
          width = w;
          height = h;
          if (width < maxWidth && height < maxHeight) {
            resolve();
          } else {
            Message.error(`图片宽高大于 ${maxWidth}×${maxHeight}px`);
            reject();
          }
        };
        img.onerror = () => {
          Message.error('图片读取失败');
          reject();
        };
      });
    }

    const result = {
      name,
      size,
      file,
      blob,
    };
    if (whLimit) Object.assign(result, { width, height });
    return result;
  };

  const upload = async (e) => {
    // 获取上传的文件
    let files = e.target.files || e.dataTransfer.files;
    files = [...files];
    // 从事件对象中提取文件名、blob对象、文件、路径
    const list = await Promise.all(files.map(file => extract(file)));
    return Promise.resolve(list);
  };

  return new Promise((resolve) => {
    let elm = document.createElement('input');
    elm.setAttribute('type', 'file');
    // 根据文件类型设置可接收文件类别
    switch (fileType) {
      case 'image':
        elm.setAttribute('accept', 'image/gif,image/jpeg,image/jpg,image/png,image/svg');
        break;
      case 'excel':
        elm.setAttribute('accept', '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel');
        break;
    }
    if (multiple) {
      elm.setAttribute('multiple', 'multiple');
    }
    elm.style.display = 'none';
    elm.addEventListener('change', async (e) => {
      const list = await upload(e);
      document.body.removeChild(elm);
      elm = null;
      resolve(list);
    });
    document.body.appendChild(elm);
    elm.click();
  });
};
