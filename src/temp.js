/*
 * @Author: fengli
 * @Description: 
 * @Date: 2025-04-28 21:52:33
 * @lastEditors: fengli
 * @lastEditTime: 
 */
import fs from 'node:fs'

/* fs.readFile('./main.tsx', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
}); */

setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
