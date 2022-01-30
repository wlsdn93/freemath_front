<template>
  <div class="background" style="flex-direction: column">
    <h1 style="color: white; font-weight: bold; margin-bottom: 50px"> 로그인 중이에오 ! </h1>
    <div class="ghost">
      <div class="face">

        <div class="eyes">
          <span></span>
          <span></span>
        </div>

        <div class="mouth">
        </div>

      </div>

      <div class="hands">
        <span></span>
        <span></span>
      </div>

      <div class="feet">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Callback",
  mounted() {
      this.axios.get("/oauth", {
        params: {
          code: this.$route.query.valueOf().code,
          state: this.$route.query.valueOf().state,
          social: this.$route.params.valueOf().social
        },
      })
          .then((response) => {
            console.log(response)
            localStorage.setItem("access_token", response.data.jwt)
            window.location.replace(response.data.redirectUri)
          })
    },
  data() {
    return {
    }
  },

}
</script>
<style scoped>
.background {
  background-color: #2d2d2d;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.ghost {
  height: 180px;
  width: 140px;
  background-color: #fff;
  border-radius: 75px 75px 0 0;
  position: relative;
  cursor: pointer;
  animation: float 2s infinite ease-in-out;
}

@keyframes float {
  50% {
    transform: translateY(-35px);
  }

}

.face {
  position: absolute;
  width: 100px;
  top: 60px;
  left: calc(50% - 50px);
}

.eyes {
  height: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.eyes span {
  width: 24px;
  height: 24px;
  background-color: #2d2d2d;
  border-radius: 50%;
  margin-bottom: 18px;
}

.ghost:hover .eyes span {
  height: 20px;
}

.mouth {
  width: 40px;
  height: 20px;
  background-color: #2d2d2d;
  margin: auto;
  border-radius: 0 0 20px 20px;
}


.ghost:hover .mouth {
  height: 13px;
}

.hands {
  width: 180px;
  height: 24px;
  position: absolute;
  top: 65px;
  left: -20px;
  display: flex;
  justify-content: space-between;
}

.hands span {
  width: 24px;
  height: 24px;
  background-color: #fff;
}

.hands span:first-child {
  border-radius: 24px 0 0 24px;
}
.hands span:last-child {
  border-radius: 0 24px 24px 0;
}

.feet {
  position: absolute;
  width: 100%;
  height: 24px;
  bottom: -24px;
  display: flex;
}

.feet span {
  background-color: white;
  height: 24px;
  flex: 1;
  margin: auto;
  border-radius: 0 0 24px 24px;
}

.feet span:first-child {
  border-radius: 0 0 24px 12px;
}
.feet span:last-child {
  border-radius: 0 0 12px 24px;
}
</style>