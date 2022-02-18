<template>
  <div class="background">
    <div class="d-flex flex-row">
      <div class="d-flex align-items-start">
        <b-dropdown id="subjectText" :text="subjectText" class="m-md-2" >
          <b-dropdown-item v-for="(value, index) in subjects" :key="index" @click="setSubject(value)">
            {{ Object.keys(value).toString()}}
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown v-if="authenticated===true" id="statusText" :text="statusText" class=m-md-2>
          <b-dropdown-item v-for="(value, index) in statuses" :key="index" @click="setStatus(value)">
            {{ Object.keys(value).toString()}}
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown id="difficultyText" :text="difficultyText" class="m-md-2">
          <b-dropdown-item v-for="(value, index) in difficulties" :key="index" @click="setDifficulty(value)">
            {{ Object.keys(value).toString()}}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div style="display: flex; margin-left: auto">
        <div style="margin-left: auto">
          <b-button v-if="role==='ADMIN'" class="add-button" @click="toAddForm"> 문제 추가 </b-button>
        </div>
        <div style="margin-left: auto">
         <b-button class="random-button" @click="pickRandom"> 랜덤 문제 </b-button>
        </div>
      </div>
    </div>
    <table class="table" style="font-size: large; font-family: BMHANNAAir">
    <thead>
    <tr>
      <th class="col-md-1" style="text-align: center" scope="col">상 태 </th>
      <th class="col-md-1" style="text-align: center" scope="col">문제번호</th>
      <th class="col-md-8" style="text-align: center" scope="col">문제명</th>
      <th class="col-md-2" style="text-align: center" scope="col">난이도</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="problem in problems" :key="problem.problemId">
      <td style="text-align: center" >
        <img v-if="problem.status" src="../assets/done.svg">
        <img v-if="problem.status===false" src="../assets/wrong.svg">
      </td>
      <td style="text-align: center; cursor: pointer" @click="toProblemDetail(problem.problemId)"> {{ problem.problemId }} </td>
      <td style="text-align: center; cursor: pointer" @click="toProblemDetail(problem.problemId)"> {{ problem.title }}</td>
      <td style="text-align: center" > {{ problem.difficulty }} </td>
    </tr>
    </tbody>
  </table>
    <div>
      <nav style="text-align: center">
        <ul class="pagination justify-content-center">
          <li>
            <a @click="first()" class="page-link" >
              <span> 처음 </span>
            </a>
          </li>
          <li>
            <a @click="prev()" class="page-link">
              <span> 이전 </span>
            </a>
          </li>
          <li v-for="page in pageList" :key="page" class="page-item" :class="isCurrPage(page) ? 'active': ''">
            <a @click="setPage(page)" class="page-link"> {{ page }} </a>
          </li>
          <li>
            <a @click="next()" class="page-link">
              <span> 다음 </span>
            </a>
          </li>
          <li class="page-item">
            <a @click="last()" class="page-link">
              <span> 마지막 </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import {errorRedirectHandler} from '@/utils';
import jwt_decode from "jwt-decode";

export default {
  name: "Home",
  data() {
    return {
      page: 0,
      problems: [],
      pageNumber: 0,
      pageSize: 10,
      totalPage: 0,
      totalContent: 0,
      pageList: [],
      startPage: 1,
      tempEndPage: 10,
      endPage: 10,
      subjectText: this.$store.state.subjectText,
      subject: this.$store.state.subject,
      accessToken:'',
      role: 'STUDENT',
      authenticated: '',
      subjects: [
          {"과목" : null},
          {"고등수학": "BasicMath"},
          {"수학1" : "CommonMath1"},
          {"수학2" : "CommonMath2"},
          {"미분과 적분" : "Calculus"},
          {"확률과 통계" : "ProbabilityAndStatistic"},
          {"기하와 벡터" : "GeometryAndVector" },
      ],
      statusText: this.$store.state.statusText,
      status: this.$store.state.status,
      statuses: [
          {"상태" : null},
          {"틀린 문제" : false},
          {"맞은 문제" : true},
      ],
      difficultyText: this.$store.state.difficultyText,
      difficulty: this.$store.state.difficulty,
      difficulties: [
        {"난이도" : null},
        {"2점" : 2},
        {"3점" : 3},
        {"4점" : 4},
      ],
      problemIdList: '',
    }
  },
  watch: {
    page() {
      this.pageRequest()
    },
    difficulty() {
      this.page = 0
      this.pageRequest()
    },
    status() {
      this.page = 0
      this.pageRequest()
    },
    subject() {
      this.page = 0
      this.pageRequest()
    }
  },
  mounted() {
    this.pageRequest();
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
  methods: {
    first() {
      this.page = 0;
    },
    prev() {
      this.page > 0 ? this.page -= 1 : alert("첫 번째 페이지 입니다.")
    },
    next() {
      this.page < this.totalPage -1  ? this.page += 1 : alert("마지막 페이지 입니다.")
    },
    last() {
      this.page = this.totalPage - 1
    },
    setPage(page) {
      this.page = page - 1
    },
    isCurrPage(page) {
      return this.page === page - 1
    },
    setSubject(value) {
      this.$store.commit("setSubject", Object.values(value).toString())
      this.$store.commit("setSubjectText", Object.keys(value).toString())
      this.subject = Object.values(value).toString()
      this.subjectText = Object.keys(value).toString()
    },
    setStatus(value) {
      this.$store.commit("setStatus", Object.values(value).toString())
      this.$store.commit("setStatusText", Object.keys(value).toString())
      this.status = Object.values(value).toString()
      this.statusText = Object.keys(value).toString()
    },
    setDifficulty(value) {
      this.$store.commit("setDifficulty", Object.values(value).toString())
      this.$store.commit("setDifficultyText", Object.keys(value).toString())
      this.difficulty = Object.values(value).toString()
      this.difficultyText = Object.keys(value).toString()
    },
    pageRequest() {
      this.getProblemIdList()
      this.axios.get('/user/problems', {
        params: {
          page: this.page,
          difficulty: this.$store.state.difficulty,
          status: this.$store.state.status,
          subject: this.$store.state.subject,
          accessToken: this.accessToken
        }
      })
        .then((response) => {
          if(response.status !== 200) {
            throw response.status
          }
        return response
        })
        .then((response) => {
          this.problems = response.data.content;
          this.pageNumber = response.data.page;
          this.pageSize = response.data.size;
          this.totalPage = response.data.totalPage;
          this.startPage = response.data.start;
          this.endPage = response.data.end;
          this.pageList = response.data.pageList;
          this.totalContent = response.data.totalContent;
        })
        .catch((error) => {
           errorRedirectHandler(error.response.status)
        })
    },
    toAddForm() {
      location.href='/admin/problem-add'
    },
    toProblemDetail(problemId) {
      this.$router.push(`/problems/${problemId}`)
    },
    pickRandom() {
      let problemId = this.problemIdList[(Math.floor(Math.random() * this.problemIdList.length))];
      console.log(problemId)
      if (problemId !== undefined) {
        this.$router.push(`/problems/${problemId}`)
      } else {
        alert("랜덤문제가 없습니다.")
      }
    },
    getProblemIdList() {
      this.axios.get("/user/problems/list", {
        params: {
          difficulty: this.$store.state.difficulty,
          status: this.$store.state.status,
          subject: this.$store.state.subject,
          accessToken: this.accessToken
        }
      })
          .then((response) => {
            this.problemIdList = response.data
          })
    }
  },
}
</script>

<style scoped>
.background {
  font-size: large;
  font-family: BMHANNAAir;
  font-weight: bold;
}
.add-button {
  margin: 8px;
  background-color: red;
  color: ghostwhite;
  font-weight: bold;
}
.random-button {
  margin: 8px;
  background-color: dodgerblue;
  color: ghostwhite;
  font-weight: bold;
}
.m-md-2 {
  margin: 8px;
  color: ghostwhite;
  font-weight: bold;
}
</style>