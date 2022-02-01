<template>
  <div>
    <input type="image" src="http://localhost:8080/naverBtnImage" @click="NaverLogin">
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {

      NAVER_client_id: "NK0288EkGrDIjENufyxP",
      NAVER_callbackUrl: 'http://localhost:8081/callback/naver',
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