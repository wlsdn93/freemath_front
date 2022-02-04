<template>
  <div style="display: flex">
    <img :src=problemImageUrl alt="no image" class="problem-image" />
    <b-form @submit.prevent="onSubmit" style="font-family: BMJUA">
      <b-form-group id="input-group-1" label="정답:" label-for="answer" style="margin: 20px; font-size: 25px">
        <b-form-input
            v-model="answer" id="answer" type="text"
            placeholder="정답을 입력하세요" required
            name="title"
            style="font-size: 25px"> </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="margin: 20px; font-size: x-large">정답 제출</b-button>
      <b-button
          variant="danger" v-if="role==='ADMIN'"
          @click="deleteProblem"
          style="margin: 20px; font-size: x-large">문제 삭제</b-button>
    </b-form>
  </div>
</template>

<script>
import {getAccessToken} from "@/utils";
import jwt_decode from "jwt-decode";
export default {
  name: "ProblemDetail",
  data() {
    return {
      problemId: this.$route.params.valueOf().problemId,
      answer: '',
      problemImageUrl: '',
      role: '',
    }
  },
  mounted() {
    this.problemImageUrl = "http://localhost:8080/problem-image/" + this.problemId
  },
  beforeMount() {
    try {
      const jwt = localStorage.getItem("access_token")
      let payload = jwt_decode(jwt);
      this.role = payload.role
    } catch (e) {
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
    }
  }
}
</script>

<style scoped>
.problem-image {
  max-width:100%;
  max-height:100%;
  border: #2d2d2d;
  border: solid;
  border-radius: 15px 15px 15px 15px;
  padding: 10px;
}
</style>