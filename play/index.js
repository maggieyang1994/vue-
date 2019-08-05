// eslint-disable-next-line
const instance = new Vue({
  el: '#app',

  data: {
      count: 0,
      array: [
          {
              message: 'a'
          },
          {
              message: 'b'
          },
          {
              message: 'c'
          }
      ]
  },

  methods: {
      handlerAddOne () {
          this.count += 1
      }
  }
})

console.log(instance)
console.log(window.allOb)
console.log(window.allDep)