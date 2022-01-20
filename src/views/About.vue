<template>
  <div>
    <h1>About page</h1>
    <p>Welcome {{ title }}</p>
    <input type="text" v-model="input"/>
    <button type="button" @click="getData">Get</button>
    <button type="button" @click="setData">Set</button>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      title: "SlaveFly",
      location: "Seoul",
      input: "abc"
    }
  },
  watch: {
   input() { //catch the data change
     console.log(this.input)
   }
  },
  methods: {
    getData() {
      alert(this.input)
    },
    setData() {
      this.input = "Fuck the world"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 30px;
}
</style>