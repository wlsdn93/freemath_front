<template>
  <div>
    <input class="login-button" type="image" src="https://3.39.4.23:8090/naverBtnImage" @click="NaverLogin" alt="">
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
  margin: 50px;
}
</style>