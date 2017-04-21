
const mySuperDuper = () => ({
  init () {

  },
  addSync () {
    return 6
  },
  add (value = 6, cb) {
    cb && cb(null, value)
  },
  addAsPromise (value = 6) {
    return Promise.resolve(value)
  }
})

export default mySuperDuper