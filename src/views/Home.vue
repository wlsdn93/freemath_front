<template>
  <div>
    <table class="table">
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
    <hr class="my-4">
    <div>
      <nav style="text-align: center">
        <ul class="pagination justify-content-center">

          <li>
            <a @click="first()" class="page-link" >
              <span> &laquo; </span>
            </a>
          </li>

          <li>
            <a @click="prev" class="page-link">
              <span> &lt; </span>
            </a>
          </li>

          <li v-for="page in pageList" :key="page" class="page-item" :class="isCurrPage(page) ? 'active': ''">
            <a @click="setPage(page)" class="page-link"> {{ page }} </a>
          </li>

          <li>
            <a @click="next" class="page-link">
              <span> &gt; </span>
            </a>
          </li>

          <li class="page-item">
            <a @click="last()" class="page-link">
              <span> &raquo; </span>
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
    }
  },
  watch: {
    page() {
      this.axios.get('/problems', {
        params: {
          page: this.page,
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
    }},
  created() {
    this.axios.get('/problems', {
      params: {
        page: this.page,
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
  }
}
</script>

<style scoped>

</style>