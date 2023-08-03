import { compileToFunction } from "./compiler/index"
import { initState } from "./state"

// 给vue增加 init方法
export function initMixin(Vue) {
  // 初始化
  Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = options

    // 初始化状态
    initState(vm)

    if(options.el) {
      vm.$mount(options.el)
    }
  }
  Vue.prototype.$mount = function(el) {
    const vm = this
    el = document.querySelector(el)
    let ops = vm.$options
    if(!ops.render) {
      // 若无模板 但有el
      let template
      if(!ops.template && el) {
        template = el.outerHTML
      }
      else {
        if(el) {
          template = ops.template
        }
      }
      if(template) {
        // 对模板进行编译
        const render = compileToFunction(template)
        ops.render = render
      }
    }
    ops.render
  }
}
