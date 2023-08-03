import { observe } from "./observe/index.js"

export function initState(vm) {
  const opts = vm.$options
  if(opts.data) {
    initData(vm)
  }
}
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue
    }
  })
}
function initData(vm) {
  let data = vm.$options.data
  data = typeof data === 'function' ? data.call(vm) : data
  vm._data = data
  observe(data)
  // 将 vm.data 用vm来代理
  for(let key in data) {
    proxy(vm, '_data', key)
  }
}