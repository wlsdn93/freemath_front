<template>
  <div style="font-family: BMJUA; font-size: x-large; margin: 20px; display: flex">
    <b-form @submit="onSubmit" method="post" enctype="multipart/form-data">
      <b-form-group id="input-group-1" label="Title:" label-for="input-1" style="margin: 20px">
        <b-form-input id="input-1" type="text" placeholder="Enter title" required style="font-size: 20px"> </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Answer:" label-for="input-2" style="margin: 20px">
        <b-form-input id="input-2" type="text" placeholder="Enter answer" required style="font-size: 20px"></b-form-input>
      </b-form-group>
      <div style="display: flex">
        <b-form-group id="input-group-3" label="Difficulty:" label-for="input-3" style="margin: 20px">
          <b-form-select id="input-3" :options="difficulties" required style="width: 200px; height: 40px"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-4" label="Subject:" label-for="input-4" style="margin: 20px">
          <b-form-select id="input-4" :options="subjects" required style="width: 200px; height: 40px"></b-form-select>
        </b-form-group>
      </div>
      <div style=" margin: 20px; display: flex; border: black; border: solid; border-radius: 10px 10px 10px 10px">
        <b-form-group id="input-group-5" label="Problem:" label-for="input-5" style="margin: 20px">
         <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${problemImage})`}" @click="selectProblemImage"></div>
         <input ref="problemInput" id="input-5" type="file" @input="pickProblemFile" name="solutionImageFile" required >
        </b-form-group>

        <b-form-group id="input-group-6" label="Solution:" label-for="input-6" style="margin: 20px">
          <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${solutionImage})`}" @click="selectSolutionImage"></div>
          <input ref="solutionInput" id="input-6" type="file" @input="pickSolutionFile" name="solutionImageFile" required >
        </b-form-group>
      </div>
      <b-button type="submit" variant="primary" style="margin: 20px; font-size: larger">SUBMIT</b-button>

    </b-form>
  </div>
</template>
<script>
export default {
  name : "Upload",
  data() {
    return {
      image: '',
      problemImage:'',
      solutionImage:'',
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
      form: {
        title: '',
        answer: '',
        difficulty: '',
        subject: '',
      }
    }
  },
  methods: {
    onSubmit() {
      this.axios.post("/")
    },
    selectProblemImage () {
      this.$refs.problemInput.click()
    },
    pickProblemFile () {
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
    selectSolutionImage () {
      this.$refs.solutionInput.click()
    },
    pickSolutionFile () {
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
</style>