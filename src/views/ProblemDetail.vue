<template>
  <div class="outer-container">
    <div class="item-problem-image">
      <img v-if="!showSolution" :src=problemImageUrl alt="no image" class="problem-image" />
      <img v-if="showSolution" :src=solutionImageUrl alt="no image" class="problem-image" />
    </div>
      <div class="problem-detail">
        <p> {{ title }} </p>
      </div>
    <div class="inner-container">
      <div class="inner-item-form">
        <b-form @submit.prevent="onSubmit" style="display: grid; grid-template-columns: 80% 20%">
          <b-form-group v-if="authenticated" id="input-group-1">
            <b-form-input
                v-model="answer" id="answer" type="text"
                placeholder="정답을 입력하세요" required
                name="title" style="width: 300px">
            </b-form-input>
          </b-form-group>
            <b-button v-if="authenticated" type="submit" variant="primary" style="width: 100px; margin-left: 20px">제출</b-button>
       </b-form>
      </div>
    </div>
      <div class="button-container">
        <b-button
            class="item-button"
            variant="danger" v-if="role==='ADMIN'"
            @click="updateProblem">문제수정</b-button>
        <b-button
            class="item-button"
            variant="danger" v-if="role==='ADMIN'"
            @click="deleteProblem">문제삭제</b-button>
        <b-button
            class="item-button"
            variant="primary" @click="toBoard">목록으로</b-button>
        <b-button
            class="item-button" v-if="!showSolution"
            variant="primary" @click="solution">해설 확인</b-button>
        <b-button
            class="item-button" v-if="showSolution"
            variant="primary" @click="solution">문제 확인</b-button>
      </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "ProblemDetail",
  data() {
    return {
      title: '',
      difficulty: '',
      subject: '',
      status: this.$store.state.status,
      problemId: this.$route.params.valueOf().problemId,
      answer: '',
      problemImageUrl: '',
      solutionImageUrl: '',
      role: '',
      authenticated: '',
      accessToken: '',
      showSolution: false,
    }
  },
  beforeMount() {
    this.accessToken = this.$store.state.accessToken
    if (this.accessToken === null || this.accessToken === 'undefined') {
      this.authenticated = false
      this.accessToken = 'guest'
    } else {
      let payload = jwt_decode(this.accessToken);
      this.role = payload.role
      this.authenticated = true
    }
  },
  mounted() {
    const uri = "/user/problems/" + this.problemId
    this.axios.get(uri, {
      params: {
        accessToken: this.accessToken
      }
    })
    .then((response)=>{
      this.title = response.data.title
      this.difficulty = response.data.difficulty
      this.subject = response.data.subject
    })
  },
  created() {
    this.problemImageUrl = "http://localhost:8080/problem-image/" + this.problemId
    this.solutionImageUrl = "http://localhost:8080/soultion-image/" + this.problemId
  },
  methods: {
    onSubmit() {
      const uri = "/user/problems/" + this.problemId
      this.axios.post(uri, '', {
        params: {
          answer: this.answer,
          accessToken: this.accessToken
        }
      })
    },
    toBoard() {
      this.$router.push("/problems")
    },
    deleteProblem() {
      const uri = "/admin/delete/" + this.problemId
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.axios.delete(uri, {
          params: {
            accessToken: this.accessToken
          }
        })
        .then(() => {
          window.location.replace("/problems")
        })
      }
    },
    updateProblem() {
      console.log("update")
    },
    solution() {
      this.showSolution = !this.showSolution
    }
  }
}
</script>

<style scoped>
.outer-container {
  display: grid;
  grid-template-rows: 75% 5% 10% 10%;
  font-family: BMJUA;
  width: 800px;
  margin: 30px;
}
.inner-container {
}
.problem-detail {
  font-size: larger;
}
.button-container {
}
.problem-image {
  max-width:100%;
  max-height:100%;
}
.item-problem-image {
  border: solid;
  border: #2d2d2d;
}
.item-button {
  position: relative;
  top: 10px;
  margin-left: 20px;
}
</style>