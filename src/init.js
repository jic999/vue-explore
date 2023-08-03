import { initState } from "./state"

// 给vue增加 init方法
export function initMixin(Vue) {
  // 初始化
  Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = options

    // 初始化状态
    initState(vm)
  }
}
