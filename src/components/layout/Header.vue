<template>
  <div>
    <nav class="navbar navbar-expand-xl navbar-light bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" @click="toHome()">
          <span>
           <b style="color: beige">기출 저장소</b>
          </span>
        </a>
        <ul class="nav justify-content-center" style="font-size: x-large">
          <li class="nav-item">
            <a class="nav-link" href="#" style="color: crimson">Let's</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" style="color: orangered">Fuck</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" style="color: yellow">The</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" style="color: green">World</a>
          </li>
        </ul>

          <div class="text-end">
            <button class="b-skeleton-button" v-if="!authorized" @click="toLoginPage()"> Login </button>
            <span class="b-skeleton-button" v-if="authorized" style="color: aliceblue; font-weight: bold"> {{ name }} </span>
            <button class="b-skeleton-button" v-if="authorized" @click="logout()"> Logout </button>
          </div>

        </div>
    </nav>
  </div>

</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: 'Header',
  methods: {
    toLoginPage() {
      location.href='/login'
    },
    toHome() {
      location.href='/'
    },
    logout() {
      location.href='/logout'
    }
  },
  mounted() {
    try {
      const jwt = localStorage.getItem("access_token")
      this.authorized = true
      let payload = jwt_decode(jwt);
      this.name = payload.name
    } catch (e) {
      this.authorized = false
      console.log("token not found")
    }
  },
  data() {
    return {
      authorized: '',
      name: 'Guest',
    }
  },
}
</script>

