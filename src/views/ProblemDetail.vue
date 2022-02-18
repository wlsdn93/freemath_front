<template>
  <div class="outer-container">
    <div class="problem-detail">
      <p> {{ title }} </p>
    </div>
    <div class="item-problem-image">
      <img :src=problemImageUrl alt="no image" class="problem-image" />
    </div>
    <div class="inner-container">
      <div class="inner-item-form">
        <b-form @submit.prevent="onSubmit" style="display: grid; grid-template-columns: 80% 20%">
           <b-form-group v-if="selectedAnswerType==='choice'" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
                v-model="userAnswer"
                :options="choices"
                :aria-describedby="ariaDescribedby"
                name="userAnswer"
                plain
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group v-if="selectedAnswerType==='shortAnswer'" id="input-group-2" label-for="input-2">
            <b-form-input
                v-model="userAnswer" id="answer" type="text"
                placeholder="정답을 입력하세요" required
                name="userAnswer">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" style="width: 50px; margin-left: 20px; font-size: small;">제출</b-button>
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
        <b-button class="item-button" @click="showModal">해설보기</b-button>
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
      userAnswer: '',
      answer: '',
      problemImageUrl: '',
      solutionImageUrl: '',
      role: '',
      authenticated: '',
      accessToken: '',
      showSolution: false,
      selectedAnswerType: '',
      choices: [
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
        { text: "4", value: "4" },
        { text: "5", value: "5" },
      ],
    }
  },
  beforeMount() {
    this.accessToken = this.$store.state.accessToken
    if (this.accessToken === null || this.accessToken === undefined) {
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
      this.selectedAnswerType = response.data.answerType
      if (this.selectedAnswerType==='choice') {
        this.answer = response.data.answer
      } else {
        this.answer = response.data.answer
      }
    })
  },
  created() {
    this.problemImageUrl = "https://freemath.online:8090/problem-image/" + this.problemId
    this.solutionImageUrl = "https://freemath.online:8090/solution-image/" + this.problemId
  },
  methods: {
    onSubmit() {
      if (this.authenticated === true) {
        const uri = "/user/problems/" + this.problemId
        this.axios.post(uri, '', {
          params: {
            answer: this.userAnswer,
            accessToken: this.accessToken
          }
        }).then(() =>
           this.checkAnswer()
        )
      }
      else {
        alert("로그인시 결과를 저장 할 수 있습니다.")
      }
      this.checkAnswer()
    },
    checkAnswer() {
      if (this.answer === this.userAnswer) {
        alert("정답 !")
        this.$router.push("/problems")
      } else {
        if (confirm("다시 풀어볼까?")) {
          this.userAnswer = '';
          this.$router.push("/problems/"+this.problemId)
        } else {
          this.$router.push("/problems")
        }
      }
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
      const uri = "/admin/update/" + this.problemId
      this.$router.push(uri)
    },
    showModal() {
      const h = this.$createElement
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('b-img', {
          props: {
            src: this.solutionImageUrl,
            thumbnail: true,
            center: true,
          }
        })
      ])
      this.$bvModal.msgBoxOk([messageVNode], {
        buttonSize: 'sm',
        centered: true, size: 'sm'
      })
    }
  }
}
</script>

<style scoped>
.outer-container {
  max-width: 400px;
  display: grid;
  grid-template-rows: 3% 70% 5% 5% 10%;
  font-family: BMJUA;
  height: 800px;
  width: 380px;
  border: solid black;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
  margin-right: auto;
}
.inner-container {
  margin-top: auto;
  margin-bottom: auto;
}
.problem-detail {
  font-size: larger;
  font-weight: bold;
}
.button-container {
  margin: 5px;
}
.problem-image {
  max-width: 100%;
  max-height: 100%;
  text-align: center;
}
.item-problem-image {
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
}
.item-button {
  position: relative;
  top: 10px;
  margin-left: 10px;
  font-size: small;
}
</style>