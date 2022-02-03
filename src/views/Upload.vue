<template>
  <div class="upload-form-background">
    <b-form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <b-form-group id="input-group-1" label="제목:" label-for="input-1" style="margin: 20px">
        <b-form-input
            v-model="title" id="input-1" type="text"
            placeholder="ex) 평가원 21년 9월 22번" required
            name="title"
            style="font-size: 25px"> </b-form-input>
      </b-form-group>

      <b-form-group label="정답 유형" v-slot="{ ariaDescribedby }" style="margin: 20px">
        <b-form-radio-group
            v-model="selectedAnswerType"
            :options="answerType"
            :aria-describedby="ariaDescribedby"
            name="answerType"
            plain
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group v-if="selectedAnswerType==='choice'" label="정답:" v-slot="{ ariaDescribedby }" style="margin: 20px">
        <b-form-radio-group
            v-model="selected"
            :options="choices"
            :aria-describedby="ariaDescribedby"
            name="answer"
            plain
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group v-if="selectedAnswerType==='shortAnswer'" id="input-group-2" label="정답:" label-for="input-2" style="margin: 20px">
        <b-form-input
            v-model="answer" id="input-2" type="text"
            placeholder="Enter answer"
            name="answer"
            style="font-size: 25px">
        </b-form-input>
      </b-form-group>

      <div style="display: flex">
        <b-form-group id="input-group-3" label="난이도:" label-for="input-3" style="margin: 20px">
          <b-form-select
              v-model="difficulty" id="input-3" :options="difficulties" required
              name="difficulty"
              style="width: 200px; height: 40px">
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-group-4" label="과목:" label-for="input-4" style="margin: 20px">
          <b-form-select
              v-model="subject" id="input-4" :options="subjects" required
              name="subject"
              style="width: 200px; height: 40px">
          </b-form-select>
        </b-form-group>
      </div>

      <div style=" margin: 20px; display: flex; border: black; border: solid; border-radius: 10px 10px 10px 10px">
        <b-form-group id="input-group-5" label="문제:" label-for="input-5" style="margin: 20px">
         <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${problemImage})`}"></div>
         <input ref="problemInput" id="input-5"
                type="file" accept="image/*"
                @input="pickProblemFiles" name="problemImage"
                @change="onChangeProblem">
        </b-form-group>

        <b-form-group id="input-group-6" label="해설:" label-for="input-6" style="margin: 20px">
          <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${solutionImage})`}"></div>
          <input ref="solutionInput" id="input-6"
                 type="file" accept="image/*"
                 @input="pickSolutionFiles" name="solutionImage"
                 @change="onChangeSolution">
        </b-form-group>
      </div>
      <b-button type="submit" variant="primary" style="margin: 20px; font-size: x-large">업로드</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  name : "Upload",
  data() {
    return {
      title: '',
      answer: '',
      difficulty: '',
      subject: '',
      problemImage: {},
      solutionImage:{},
      answerType: [
        { text: "객관식", value: "choice"},
        { text: "주관식", value: "shortAnswer"},
      ],
      selectedAnswerType: '',
      choices: [
          { text: "1", value: "1" },
          { text: "2", value: "2" },
          { text: "3", value: "3" },
          { text: "4", value: "4" },
          { text: "5", value: "5" }
      ],
      selected: '',
      difficulties: [
          { text: "Difficulty", value: null},
          { text: "2점", value: "2" },
          { text: "3점", value: "3" },
          { text: "4점", value: "4" },
          { text: "5점", value: "5" }
      ],
      subjects: [
          { text: "Subject", value: null},
          { text: "수학1", value: "CommonMath1"},
          { text: "수학2", value: "CommonMath2"},
          { text: "미분과 적분", value: "Calculus"},
          { text: "확률과 통계", value: "ProbabilityAndStatistic"},
          { text: "기하와 벡터", value: "GeometryAndVector" }
      ],
    }
  },
  methods: {
    onChangeProblem(event) {
      this.problemImage = event.target.files[0]
    },
    onChangeSolution(event) {
      this.solutionImage = event.target.files[0]
    },
    onSubmit() {
      let formData = new FormData;
      formData.append('title', this.title)
      formData.append('answerType', this.selectedAnswerType)
      if (this.selectedAnswerType==='choice') {
        formData.append('answer', this.selected)
      }
      if (this.selectedAnswerType==='shortAnswer') {
        formData.append('answer', this.answer)
      }
      formData.append('difficulty', this.difficulty)
      formData.append('subject', this.subject)
      formData.append('problemImage', this.problemImage)
      formData.append('solutionImage', this.solutionImage)

      for (let key of formData.entries()) {
        console.log(key)
      }
      let access_token = localStorage.getItem("access_token");
      if ( access_token === null || access_token === undefined) {
        this.accessToken = "guest";
      } else {
        this.accessToken = access_token;
      }
      this.axios.post("/admin/upload", formData, {
        params: {
          accessToken: this.accessToken
        }
      })
    },
    pickProblemFiles () {
      let input = this.$refs.problemInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.problemImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    pickSolutionFiles () {
      let input = this.$refs.solutionInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.solutionImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    }
  }
}
</script>
<style scoped>
.imagePreviewWrapper {
  width: 600px;
  height: 300px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
.upload-form-background {
  font-family: BMJUA;
  font-size: x-large;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center
}
</style>