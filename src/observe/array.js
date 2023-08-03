
let oldArrayProto = Array.prototype

export let newArrayProto = Object.create(oldArrayProto)

// 重写数组中的7个变异方法
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice',
]

methods.forEach(method => {
  newArrayProto[method] = function(...args) {
    // AOP
    const result = oldArrayProto[method].call(this, ...args)
    // 需要对新增的数据再次进行劫持
    let inserted
    let ob = this.__ob__
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args
      case 'splice':
        inserted = args.slice(2)
      default:
        break
    }
    // 新增的内容
    console.log('inserted :>> ', inserted);
    if(inserted) {
      ob.observeArray(inserted)
    }
    console.log('method :>> ', method);
    return result
  }
})