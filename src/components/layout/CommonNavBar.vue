<template>
  <div>
    <nav class="navbar navbar-expand-xl navbar-light bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" @click="toHome()">
          <span>
           <b style="color: beige; font-size: xx-large; font-family: BMJUA">기출 저장소</b>
          </span>
        </a>
        <ul class="nav justify-content-center" style="font-size: x-large; font-family: BMJUA">
          <li class="nav-item" style="color: crimson; margin: 10px"> You </li>
          <li class="nav-item" style="color: orangered; margin: 10px"> can </li>
          <li class="nav-item" style="color: yellow; margin: 10px"> make </li>
          <li class="nav-item" style="color: green; margin: 10px"> it </li>
        </ul>

          <div class="text-end" style="font-family: BMHANNAAir">
            <b-button variant="dark" v-if="!authorized" @click="toLoginPage()" style="font-family: BMJUA; font-size: large"> Login </b-button>
            <span class="b-skeleton-button" v-if="authorized" style="color: aliceblue; font-weight: bold"> {{ role }} </span>
            <span class="b-skeleton-button" v-if="authorized" style="color: aliceblue; font-weight: bold"> {{ name }} </span>
            <b-button variant="dark" v-if="authorized" @click="logout()" style="font-family: BMJUA; font-size: large"> Logout </b-button>
          </div>

        </div>
    </nav>
  </div>

</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: 'MainNavBar',
  methods: {
    toLoginPage() {
      location.href='/login'
    },
    toHome() {
      location.href='/'
    },
    logout() {
      localStorage.removeItem("access_token")
      location.href='/'
    }
  },
  mounted() {
    try {
      const jwt = localStorage.getItem("access_token")
      this.authorized = true
      let payload = jwt_decode(jwt);
      this.name = payload.name
      this.role = payload.role
    } catch (e) {
      this.authorized = false
      console.log("token not found")
    }
  },
  data() {
    return {
      authorized: '',
      name: 'Guest',
      role: 'student',
    }
  },
}
</script>
<style scoped>
@font-face {
  font-family: 'BMJUA';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'BMHANNAAir';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>

