<template>
  <div>
    <nav class="navbar navbar-expand-xl navbar-light bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" @click="toHome()">
          <span>
           <b style="color: beige">기출 저장소</b>
          </span>
        </a>
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>

          <div class="text-end">
            <button class="b-skeleton-button" @click="toLoginPage()"> Login </button>
          </div>

        </div>
    </nav>
  </div>

</template>

<script>
export default {
  name: 'Header',
  methods: {
    toLoginPage() {
      location.href='/login'
    },
    toHome() {
      location.href='/'
    }
  }
}
</script>

