'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const exec = require('child_process').exec;

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the doozie ' + chalk.red('generator-aaa') + ' generator!')
    );

    const prompts = [
      {
        type: 'input',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      },
      {
        type: 'input',
        name: 'templateName',
        message: 'Which of below  do you like to create? \n noframe/vue: \n',
        default: 'vue'
      }
      // {
      //   name: 'projectAssets',
      //   type: 'checkbox',
      //   message: '请选择模板:',
      //   choices: [
      //     {
      //       name: '无框架模板',
      //       value: 'noframe'
      //     },{
      //       name: 'VUE模板',
      //       value: 'vue',
      //       checked: true   // 默认选中
      //     }
      //   ]
      // },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  createVue() {
    if (this.props.templateName == 'vue') {
      exec('vue init loveyoghurt/vue-temp', function(err, stdout, stderr) {
        if (err) {
          this.log(yosay('create vue error:' + stderr));
        } else {
          this.log(yosay('create vue right'));
        }
      });
    }
  }

  writing() {
    if (this.props.templateName == 'noframe') {
      this.fs.copy(this.templatePath('./noframe'), this.destinationPath('./'));
    }
  }

  install() {
    this.installDependencies();
  }
};
