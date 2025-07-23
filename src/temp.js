/*
 * @Author: fengli
 * @Description: 
 * @Date: 2025-04-28 21:52:33
 * @lastEditors: fengli
 * @lastEditTime: 
 */
let count = 0
setInterval(() => {
  console.log('count', count)
}, 1000)

const add1 = () => {
  count++
  console.log('add1')
}