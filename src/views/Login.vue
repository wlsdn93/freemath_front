<template>
  <div class="login-background">
    <div class="login-container">
      <div style="display: flex">
        <img class="logo" src="../assets/freemath_black.svg">
      </div>
      <div>
        <hr class="hr-line">
      </div>
      <div class="login-button-box">
        <input class="login-button" type="image" src="https://freemath.online:8090/naverBtnImage" @click="NaverLogin" alt="">
        <input v-show="false" class="login-button" type="image" src="https://freemath.online:8090/kakaoBtnImage" @click="NaverLogin" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {

      NAVER_client_id: "NK0288EkGrDIjENufyxP",
      NAVER_callbackUrl: 'http://freemath.online/callback/naver',
      NAVER_LOGIN_URL: 'https://nid.naver.com/oauth2.0/authorize?response_type=code',

      state: '',
    }
  },
  computed: {

  },
  methods: {
    NaverLogin() {
      this.axios.get("/oauth/state")
          .then((response) => {
            this.state = response.data
            console.log(this.state)
            let url = this.NAVER_LOGIN_URL + `&client_id=` + this.NAVER_client_id
                + `&redirect_uri=` + this.NAVER_callbackUrl
                + '&state=' + this.state
            window.location.replace(url)
          })
    },
  }
}
</script>
<style scoped>
.login-button {
  margin: auto;
}
.login-container {
  border: solid dimgrey 5px;
  border-radius: 15px 15px 15px 15px;
  width: 500px;
  height: 700px;
  margin-top: auto;
  margin-bottom: auto;
  display: grid;
  grid-template-rows: 30% 10% 40%;
  background-color: ghostwhite;
}
.login-background {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.logo {
  margin: auto;
}
.login-button-box {
  display: grid;
  grid-template-rows: 50% 50%;
}
</style>