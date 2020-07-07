/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'
// def ===  Object.defineProperty
// arrayMethods是一个对象  这个对象继承了数组上的方法
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 劫持arrayMethods的变异方法
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted;
    // 对能改变数组长度的三个方法 获取插入的值， 
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
  // 把新添加的值变成相应状态
    // notify change
    // 并且再调用 ob.dep.notify() 手动触发依赖通知
    ob.dep.notify()
    return result
  })
})
