<template>
  <div class="page-login">
    <section>
      <div class="bg" />
      <div class="container">
        <div class="form">
          <h1>欢迎，登录<b>{{ $config.system.name }}</b></h1>
          <p class="grey">
            Welcome to Flexible Employment
          </p>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item prop="username">
              <i class="account" />
              <el-input
                ref="account"
                v-model.trim="form.username"
                clearable
                placeholder="账号"
                @keyup.enter.native="submitForm"
              />
            </el-form-item>
            <el-form-item prop="password">
              <i class="password" />
              <el-input
                ref="password"
                v-model.trim="form.password"
                clearable
                placeholder="密码"
                type="password"
                @keyup.enter.native="submitForm"
              />
            </el-form-item>
            <el-form-item prop="captcha">
              <i class="captcha" />
              <el-input
                ref="captcha"
                v-model.trim="form.captcha"
                clearable
                placeholder="验证码"
                @keyup.enter.native="submitForm"
              />
            </el-form-item>
            <el-form-item>
              <div class="verification">
                <img
                  ref="verificationImg"
                  height="40"
                  width="120"
                >
                <el-button
                  @click="getVerificationCode"
                >
                  换一张
                </el-button>
              </div>
            </el-form-item>
            <el-button
              class="confirm"
              type="primary"
              :loading="loading"
              @click="submitForm"
            >
              登录
            </el-button>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    const validName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const validCaptcha = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        username: '',
        password: '',
        captcha: '',
      },
      rules: {
        username: [{
          validator: validName,
          trigger: 'blur',
        }],
        password: [{
          validator: validPass,
          trigger: 'blur',
        }],
        captcha: [{
          validator: validCaptcha,
          trigger: 'blur',
        }],
      },
      checked: false,
      src: '',
    };
  },
  mounted() {
    /**
     * 移除全局加载动画
     */
    document.querySelector('#global-loading').style.display = 'none';

    this.$cookie.remove(sessionStorage.hroTokenName);
    sessionStorage.clear();
    this.getVerificationCode();
  },
  methods: {
    manageToken(token) {
      // 限制最大登录数量
      const maxLoginCount = 5;
      const cookies = this.$cookie.get();
      const tokenNames = Object.keys(cookies).filter(key => /^hroToken/.test(key));
      const orders = tokenNames.map(name => Number(name.replace(/\D+/, '')));
      if (tokenNames.length >= maxLoginCount) {
        // 当token超过5个，就清除第一个
        this.$cookie.remove(`hroToken${orders[0]}`);
      }
      const lastOrder = orders.length ? orders[orders.length - 1] : 0;
      const curOrder = lastOrder + 1;
      const hroTokenName = `hroToken${curOrder}`;
      sessionStorage.setItem('hroTokenName', hroTokenName);
      this.$cookie.set(hroTokenName, token, { expires: 1 });
    },
    async submitForm() {
      await this.$refs.form.validate();
      this.$refs.account.blur();
      this.$refs.password.blur();
      this.$refs.captcha.blur();
      this.loading = true;
      this.$api.login({
        username: this.form.username,
        password: this.$utils.aesEncrypt(this.form.password),
        captcha: this.form.captcha,
      }).then((res) => {
        const { token } = res;
        this.manageToken(token);
        // sessionStorage.setItem('fepUserInfo', JSON.stringify(userInfo));
        // this.$store.commit('setFepUserinfo', userInfo);
        this.$router.push('/manage/sys');
      }).catch(() => {}).finally(() => {
        this.loading = false;
      });
    },
    getVerificationCode() {
      this.$api.verificationCode().then((res) => {
        this.src = window.URL.createObjectURL(res);
        this.$refs.verificationImg.src = this.src;
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.page-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: #538CD3;
  > section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 80px 100px;
    background: #f8f8f8;
    border-radius: 10px;
  }
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
}
.bg {
  margin-right: 157px;
  width: 600px;
  height: 550px;
  background: {
    image: url('../../assets/icon/login_bg.png');
    repeat:  no-repeat;
    size: cover;
  }
}
h1 {
  // margin-bottom: 24px;
  font-size: 22px;
  line-height: 1;
  color: #34495e;
  b {
    color: #2d8cf0;
  }
}
.grey {
  margin-top: 10px;
  color: #d4d7da;
  margin-bottom: 24px;
}
.container {
  padding-top: 36px;
}
.logo-container {
  position: absolute;
  top: -35px;
  left: 44px;
  &::before {
    content: '';
    display: inline-block;
    width: 83px;
    height: 84px;
    border-radius: 50%;
    box-shadow: 0px 0px 4px 4px rgba(153, 153, 153, 0.1);
  }
  &::after {
    position: absolute;
    top: 35px;
    left: -8px;
    content: '';
    display: inline-block;
    width: 100px;
    height: 60px;
    background-color: #fff;
  }
}
.logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 83px;
  height: 84px;
  border: 5px solid #fff;
  border-radius: 50%;
  background-color: #fff;
  z-index: 1;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.logo-dianmi {
    padding: 6px;
  }
}
.env {
  margin-bottom: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  line-height: 1;
  font-size: 20px;
  color: #4a5a6a;
  position: relative;
  &::before, &::after {
    flex: 1;
    content: '';
    display: inline-block;
    height: 1px;
    background-color: #eaeaea;
  }
  &::before {
    margin-right: 8px;
  }
  &::after {
    margin-left: 8px;
  }
}
.form {
  width: 382px;
  padding: 64px 45px 23px;
  box-shadow: 0px 0px 4px 4px rgba(153, 153, 153, 0.1);
  background-color: #fff;
  border-radius: 20px;
  position: relative;
  /deep/ .el-form-item {
    margin-bottom: 25px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .account, .password, .captcha {
    position: absolute;
    top: 8px;
    left: 0px;
    display: inline-block;
    width: 24px;
    height: 24px;
    z-index: 1;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .account {
    background-image: url('../../assets/icon/login_per.png');
  }
  .password {
    background-image: url('../../assets/icon/login_passw.png');
  }
  .captcha {
    background-image: url('../../assets/icon/login_code.png');
  }
  /deep/ .el-input__inner {
    padding-left: 35px;
    border: {
      top: none;
      right: none;
      left: none;
      radius: 0;
    }
  }
}
.remember {
  margin-top: 22px;
  display: flex;
  justify-content: flex-end;
  /deep/ .el-checkbox__inner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    &::after {
      top: 2px;
      left: 5px;
      border-width: 2px;
      width: 5px;
      height: 9px;
    }
  }
}
.confirm {
  margin: 27px 0 0;
  width: 100%;
  border-radius: 24px;
  height: 48px;
  line-height: 24px;
  font-size: 16px;
}
.systems {
  margin-top: 20px;
  text-align: center;
  line-height: 1;
  font-size: 12px;
  color: #b1bac3;
}
.copyright {
  position: fixed;
  bottom: 19px;
  right: 33px;
  line-height: 1;
  font-size: 14px;
  color: #99a2aa;
}
.verification {
  display: flex;
  justify-content: space-between;
}
</style>
