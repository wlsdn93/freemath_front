<template>
<div class="background">
  <div class="title">
    <img class="logo" src="../assets/freemath.svg">
    <div style="margin: auto; display: block">
      <b-button class="b-skeleton-button" @click="toProblems()"> 기출문제 풀러 가기 </b-button>
    </div>
  </div>
  <div class="text">
    <p @click="toEBS" style="cursor: pointer; color: blue"> 문제 및 해설의 출처는 EBS입니다. </p>
    <p> 본 사이트는 "평가원, 수능" 수학 기출 문제들을 난이도, 과목 별로 한 문제씩 정리해둔 저장소입니다 </p>
    <p> 모든 문제는 누구나 확인할 수 있고, 풀어볼 수 있습니다. 단 로그인이 안 돼 있는 경우 결과는 저장되지 않습니다. </p>
  </div>
</div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
    toProblems() {
      this.$router.push("/problems")
    },
    toEBS() {
      window.open("https://www.ebsi.co.kr/ebs/xip/xipc/previousPaperList.ebs?targetCd=D300")
    }
  }
}
</script>

<style scoped>
.background {
  display: grid;
  height: 100vh;
  grid-template-rows: 50% 50%;
  font-family: BMJUA;
  min-height: 800px;
}
.title {
  display: grid;
  grid-template-rows: 60% 40%;
  background-color: #2d2d2d;
  justify-content: center;
}
.b-skeleton-button {
  color: aliceblue;
  background-color: #2d2d2d;
  border: solid;
  cursor: hand;
  width: 250px;
  height: 60px;
  font-size: x-large;
}
.text {
  font-size: larger;
  font-family: BMJUA;
  text-align: center;
  margin-top: 50px;
}
.logo {
  margin-top: 30px;
}
</style>