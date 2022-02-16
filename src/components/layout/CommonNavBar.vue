<template>
  <div class="background">
    <div class="navbar-custom">
      <div class="navbar-container">
        <a class="main-title" @click="toHome()">
         기출 저장소
        </a>
        <ul class="nav justify-content-center" style="font-size: x-large; font-family: BMJUA">
          <li class="nav-item" style="color: crimson; margin: 10px"> 한 문제만 </li>
          <li class="nav-item" style="color: orangered; margin: 10px"> 더 </li>
          <li class="nav-item" style="color: yellow; margin: 10px">  풀자 !! </li>
        </ul>
        <div class="user-info-text">
          <span class="text-item" v-if="!authenticated" > {{ name }} </span>
          <b-button class="b-skeleton-button" v-if="!authenticated" @click="toLoginPage()"> Login </b-button>
          <span class="text-item" v-if="authenticated"> {{ role }} </span>
          <span class="text-item" v-if="authenticated"> {{ name }} </span>
          <b-button class="b-skeleton-button" v-if="authenticated" @click="logout()"> Logout </b-button>
        </div>
      </div>
    </div>
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
      location.href='/problems'
    },
    logout() {
      localStorage.removeItem("access_token")
      location.href='/problems'
    }
  },
  mounted() {
    this.accessToken = this.$store.state.accessToken
    if (this.accessToken === null || this.accessToken === undefined) {
      this.authenticated = false
      this.accessToken = 'guest'
    } else {
      let payload = jwt_decode(this.accessToken);
      this.role = payload.role
      this.name = payload.name
      this.authenticated = true
    }
  },
  data() {
    return {
      authenticated: false,
      name: 'Guest',
      role: 'student',
    }
  },
}
</script>
<style scoped>
.background {
  font-family: BMJUA;
}
.navbar-custom {
  background-color: black;
  height: auto;
}
.navbar-container {
  display: grid;
  grid-template-columns: auto auto auto;
  vertical-align: center;
}
.main-title {
  text-decoration: none;
  color: beige;
  position: relative;
  top: 5px;
  left: 15px;
  font-size: xx-large;
  cursor: hand;
}
.user-info-text {
  font-size: large;
  margin-left: auto;
  position: relative;
  right: 10px;
  padding: 5px;
}
.text-item {
  color: aliceblue;
  margin-right: 10px;
}
.b-skeleton-button {
  color: aliceblue;
  background-color: black;
  border: solid;
  cursor: hand;
}
</style>