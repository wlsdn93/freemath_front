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
    </b-form>
  </div>
</template>

<script>
import {getAccessToken} from "@/utils";
export default {
  name: "ProblemDetail",
  data() {
    return {
      problemId: this.$route.params.valueOf().problemId,
      answer: '',
      problemImageUrl: '',
    }
  },
  mounted() {
    this.problemImageUrl = "http://localhost:8080/problem-image/" + this.problemId
  },
  created() {
    const uri = "user/problems/" + this.problemId
    this.axios.get(uri,{
      params: {
        accessToken: getAccessToken()
      }
    })
  },
  methods: {
    onSubmit() {
      const uri = "user/problems/" + this.problemId
      this.axios.post(uri, '', {
        params: {
          answer: this.answer,
          accessToken: getAccessToken()
        }
      })
    },
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