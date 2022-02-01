<template>
  <div style="font-size: large; font-family: BMHANNAAir; font-weight: bold">
    <div class="d-flex align-items-start">
      <div>
        <b-dropdown id="dropdown-1" :text="subjectText" class="m-md-2" >
          <b-dropdown-item v-for="(value, index) in subjects" :key="index" @click="setSubject(value)">
            {{ Object.keys(value).toString()}}
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <div>
        <b-dropdown id="dropdown-1" :text="statusText" class="m-md-2">
          <b-dropdown-item v-for="(value, index) in statuses" :key="index" @click="setStatus(value)">
            {{ Object.keys(value).toString()}}
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <div>
        <b-dropdown id="dropdown-1" :text="difficultyText" class="m-md-2">
          <b-dropdown-item v-for="(value, index) in difficulties" :key="index" @click="setDifficulty(value)">
            {{ Object.keys(value).toString()}}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <table class="table" style="font-size: large; font-family: BMHANNAAir">
    <thead>
    <tr>
      <th scope="col">상 태</th>
      <th scope="col">문제번호</th>
      <th scope="col">문제명</th>
      <th scope="col">난이도</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="problem in problems" :key="problem.problemId">
      <td> {{ problem.status }} </td>
      <td> {{ problem.problemId }} </td>
      <td><a :href="`/problems/${problem.problemId}`"> {{ problem.title }} </a></td>
      <td> {{ problem.difficulty }} </td>
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
export default {
  name: "Home",
  data() {
    return {
      page: 0,
      problems: [],
      pageNumber: 0,
      pageSize: 10,
      totalPage: 0,
      pageList: [],
      startPage: 1,
      tempEndPage: 10,
      endPage: 10,
      subjectText: '과목', subject: '',
      subjects: [
          {"과목": null},
          {"수학1" : "CommonMath1"},
          {"수학2" : "CommonMath2"},
          {"미분과 적분" : "Calculus"},
          {"확률과 통계" : "ProbabilityAndStatistic"},
          {"기하와 벡터" : "GeometryAndVector" },
      ],
      statusText: '상태', status: '',
      statuses: [
          {"상태":null},
          {"안푼 문제":null},
          {"틀린 문제":false},
          {"맞은 문제":true},
      ],
      difficultyText: '난이도', difficulty: '',
      difficulties: [
        {"난이도":null},
        {"2점":2},
        {"3점":3},
        {"4점":4},
      ]
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
    }
  },
  created() {
    this.pageRequest();
  },
  methods: {
    first() {
      this.page = 0;
    },
    prev() {
      this.page > 0 ? this.page -= 1 : alert("첫 번째 페이지 입니다.")
      console.log(this.page)
    },
    next() {
      this.page < this.totalPage ? this.page += 1 : alert("마지막 페이지 입니다.")
      console.log(this.page)
    },
    last() {
      this.page = this.totalPage - 1
    },
    setPage(page) {
      this.page = page - 1
      console.log(this.page)
    },
    isCurrPage(page) {
      return this.page === page - 1 ? true : false
    },
    setSubject(value) {
      this.subject = Object.values(value).toString()
      this.subjectText = Object.keys(value).toString()
      console.log(this.subject)
    },
    setStatus(value) {
      this.status = Object.values(value).toString()
      this.statusText = Object.keys(value).toString()
      console.log(this.status)
    },
    setDifficulty(value) {
      this.difficulty = Object.values(value).toString()
      this.difficultyText = Object.keys(value).toString()
      console.log(this.difficulty)
    },
    pageRequestWithoutToken() {
      this.axios.get('/guest/problems', {
        params: {
          page: this.page,
          difficulty: this.difficulty,
          status: this.status,
        }
      })
          .then((response) => {
            this.problems = response.data.content;
            this.pageNumber = response.data.page;
            this.pageSize = response.data.size;
            this.totalPage = response.data.totalPage;
            this.startPage = response.data.start;
            this.endPage = response.data.end;
            this.pageList = response.data.pageList;
          })
    },
    pageRequestWithToken() {
      this.axios.get('/user/problems', {
        params: {
          page: this.page,
          difficulty: this.difficulty,
          status: this.status,
          accessToken: localStorage.getItem("access_token")
        }
      })
          .then((response) => {
            this.problems = response.data.content;
            this.pageNumber = response.data.page;
            this.pageSize = response.data.size;
            this.totalPage = response.data.totalPage;
            this.startPage = response.data.start;
            this.endPage = response.data.end;
            this.pageList = response.data.pageList;
          })
    },
    pageRequest() {
      let access_token = localStorage.getItem("access_token");
      if ( access_token === null || access_token === undefined) {
        this.pageRequestWithoutToken()
      } else {
        this.pageRequestWithToken()
      }
    }
  }
}
</script>

<style scoped>

@font-face {
  font-family: 'BMHANNAAir';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>