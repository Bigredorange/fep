/**
 * 相当于是git commit -m 'xxxx'
 * @参考: https://github.com/commitizen/cz-conventional-changelog
 */

function wrap(str, options) {
  options = options || {};
  if (str == null) {
    return str;
  }

  var width = options.width || 50;
  var indent = (typeof options.indent === 'string')
    ? options.indent
    : '  ';

  var newline = options.newline || '\n' + indent;
  var escape = typeof options.escape === 'function'
    ? options.escape
    : identity;

  var regexString = '.{1,' + width + '}';
  if (options.cut !== true) {
    regexString += '([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)';
  }

  var re = new RegExp(regexString, 'g');
  var lines = str.match(re) || [];
  var result = indent + lines.map(function(line) {
    if (line.slice(-1) === '\n') {
      line = line.slice(0, line.length - 1);
    }
    return escape(line);
  }).join(newline);

  if (options.trim === true) {
    result = result.replace(/[ \t]*$/gm, '');
  }
  return result;
};

function identity(str) {
  return str;
}

module.exports = {
  prompter: (cz, commit) => {
    cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: '请选择提交的类型：',
        choices: [
          {
            name: '问题修复',
            value: 'fix',
          },
          {
            name: '新特性',
            value: 'feat',
          },
          {
            name: '性能优化',
            value: 'perf',
          },
          {
            name: '其它（不记录在版本日志，如刚添加的新特性样式调整等情况下使用）',
            value: 'revert',
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'system',
        message: '请选择当前修改的地方：',
        choices: [
          '客服系统',
          '财务系统',
          'CRM系统',
          '登陆页',
          '其它',
        ],
        validate: (system) => {
          if (system.length) return true;
          return '至少选择一项';
        },
      },
      {
        type: 'input',
        name: 'scope',
        message: '请输入已修改的模块（如客户管理）：',
        validate: (scope) => {
          if (scope) return true;
          return '此项是必填的';
        },
      },
      {
        type: 'input',
        name: 'subject',
        message: '请简述提交的内容（如新增编辑客户按钮）：',
        validate: (subject) => {
          if (subject) return true;
          return '此项是必填的';
        },
      },
      {
        type: 'input',
        name: 'body',
        message: '请具体描述提交的内容(可不填，以“|”换行)：',
      },
    ]).then((answers) => {

      var maxLineWidth = 100;

      var wrapOptions = {
        trim: true,
        newline: '\n',
        indent:'',
        width: maxLineWidth
      };

      // parentheses are only needed when a scope is present
      var scope = `(【${answers.system.join('、')}】${answers.scope.trim()})`;

      // Hard limit this line
      var head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth);

      // Wrap these lines at 100 characters
      var body = wrap(answers.body.replace(/\|/g, '\n'), wrapOptions);

      // Apply breaking change prefix, removing it if already present
      var breaking = answers.breaking ? answers.breaking.trim() : '';
      breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : '';
      breaking = wrap(breaking, wrapOptions);

      var issues = answers.issues ? wrap(answers.issues, wrapOptions) : '';

      var footer = [ breaking, issues ].filter(item => !!item).join('\n\n');

      commit(head + '\n\n' + body + '\n\n' + footer);
    })
  }
}
