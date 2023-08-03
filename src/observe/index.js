class Observer {
  constructor(data) {
    this.walk(data)
  }
  // 循环对象 对属性依次劫持
  walk(data) {
    // 重新定义属性
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
}

export function defineReactive(target, key, value) {
  // 对所有对象进行属性劫持
  observe(value)
  Object.defineProperty(target, key, {
    get() {
      console.log('取值');
      return value
    },
    set(newValue) {
      console.log('赋值');
      if(newValue === value)
        return
      value = newValue
    },
  })
}

export function observe(data) {
  // 对对象进行劫持
  if (typeof data !== 'object' || data === null) {
    return
  }
  // 如果一个对象被劫持过了 则不需要再次劫持 添加一个实例用以判断
  return new Observer(data)
}