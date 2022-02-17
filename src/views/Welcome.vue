<template>
<div class="background">
  <div class="title">
    <img src="../assets/freemath.svg" style="margin-top: 50px">
    <div style="margin: auto; display: block">
      <b-button class="b-skeleton-button" @click="toProblems()"> 기출문제 풀러 가기 </b-button>
    </div>
  </div>
  <div class="text">
    <a href="https://www.ebsi.co.kr/ebs/xip/xipc/previousPaperList.ebs?targetCd=D300">
      <p> 문제및 해설의 출처는 EBS 입니다. </p>
    </a>
    <p> 본 사이트는 "평가원, 수능" 수학 기출문제들을 난이도, 과목별로 한 문제씩 정리해둔 저장소 입니다. </p>
    <p> 모든 문제는 누구나 무료로 확인할 수 있고, 문제를 풀어볼 수 있습니다. 단 로그인이 안되있는 경우 결과는 저장되지 않습니다. </p>
  </div>
</div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
    toProblems() {
      window.location.replace("/problems")
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
}
.title {
  display: grid;
  grid-template-rows: 60% 40%;
  background-color: black;
  justify-content: center;
}
.b-skeleton-button {
  color: aliceblue;
  background-color: black;
  border: solid;
  cursor: hand;
  width: 250px;
  height: 60px;
  font-size: x-large;
}
.text {
  font-size: larger;
  font-family: BMHANNAAir;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
}
</style>