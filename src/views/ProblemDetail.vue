<template>
  <div class="outer-container">
    <div class="item-problem-image">
      <img :src=problemImageUrl alt="no image" class="problem-image" />
    </div>
    <div class="inner-container">
      <div class="inner-item-detail">
        <b-card-text> hi </b-card-text>
      </div>
      <div class="inner-item-form">
        <b-form @submit.prevent="onSubmit" style="display: flex">
          <b-form-group v-if="role==='ADMIN'" id="input-group-1" style="margin: auto; font-size: 25px; width: 70%">
            <b-form-input
                v-model="answer" id="answer" type="text"
                placeholder="정답을 입력하세요" required
                name="title"
                style="font-size: 25px">
            </b-form-input>
          </b-form-group>
            <b-button v-if="role==='ADMIN'" type="submit" variant="primary" style="margin-left: auto; font-size: x-large">제출</b-button>
       </b-form>
      </div>
      <div class="button-container">
        <b-button
            class="item-button"
            variant="danger" v-if="role==='ADMIN'"
            @click="updateProblem"
            style="font-size: x-large">문제수정</b-button>
        <b-button
            class="item-button"
            variant="danger" v-if="role==='ADMIN'"
            @click="deleteProblem"
            style="font-size: x-large">문제삭제</b-button>
        <b-button
            class="item-button"
            variant="primary" @click="toBoard"
            style="font-size: x-large">목록으로</b-button>
      </div>
    </div>

  </div>
</template>

<script>
import {getAccessToken} from "@/utils";
import jwt_decode from "jwt-decode";

export default {
  name: "ProblemDetail",
  data() {
    return {
      status: this.$store.state.status,
      problemId: this.$route.params.valueOf().problemId,
      answer: '',
      problemImageUrl: '',
      role: '',
      authorized: ''
    }
  },
  mounted() {
    this.problemImageUrl = "http://localhost:8080/problem-image/" + this.problemId
    console.log(this.$store.state.status)
  },
  beforeMount() {
    try {
      const jwt = localStorage.getItem("access_token")
      let payload = jwt_decode(jwt);
      this.authorized = true;
      this.role = payload.role
    } catch (e) {
      this.authorized = false;
      console.log("token not found")
    }
  },
  methods: {
    onSubmit() {
      const uri = "/user/problems/" + this.problemId
      this.axios.post(uri, '', {
        params: {
          answer: this.answer,
          accessToken: getAccessToken()
        }
      })
    },
    toBoard() {
      window.location.replace("/problems")
    },
    deleteProblem() {
      const uri = "/admin/delete/" + this.problemId
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.axios.delete(uri, {
          params: {
            accessToken: getAccessToken()
          }
        })
        .then(() => {
          window.location.replace("/problems")
        })
      }
    },
    updateProblem() {
      console.log("update")
    }
  }
}
</script>

<style scoped>
.outer-container {
  display: grid;
  grid-template-columns: 65% 35%;
  font-family: BMJUA;
  width: 1800px;
  margin: 30px;
}
.inner-container {
  display: grid;
  grid-template-rows: 30% 55% 15%;
  font-family: BMJUA;
}
.button-container {
}
.problem-image {
  max-width:100%;
  max-height:100%;
}
.item-problem-image {
  text-align: center;
}
.item-button {
  margin-left: 20px;
}
</style>