import { newArrayProto } from "./array"

class Observer {
  constructor(data) {
    // 同时给数据添加了标识 若数据上有__ob__ 说明该数据被观测过
    // 将 __ob__变为不可枚举
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false,
    })
    if(Array.isArray(data)) {
      data.__proto__ = newArrayProto
      // 若数组中包含对象 可以监测到对象变化
      // this.observeArray(data)
    }
    else {
      this.walk(data)
    }
  }
  // 循环对象 对属性依次劫持
  walk(data) {
    // 重新定义属性
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
  observeArray(data) {
    data.forEach(item => observe(item))
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
  if (data.__ob__ instanceof Observer) {
    return data.__ob__
  }
  // 如果一个对象被劫持过了 则不需要再次劫持 添加一个实例用以判断
  return new Observer(data)
}