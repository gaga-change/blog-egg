---
title: 统计字符串中出现最多的字母
tags:
  - JavaScript
  - 面试
url: 154.html
id: 154
categories:
  - JavaScript
  - 前端面试
date: 2018-04-27 16:46:44
---

> let str = "aabbccdd", 统计字符串中出现最多的字母(笔试)

方法一
---

关键方法为 `String.prototype.charAt` 核心理念为：先遍历字符串中所有字母，统计字母以及对应显示的次数，最后是进行比较获取次数最大的字母。

    /**
     * 获取字符串中出现次数最多的字母
     * @param {String} str
     */
    function getChar(str) {
        if (typeof str !== 'string') return // 判断参数是否为字符串
        const obj = new Object() // 键为字母，值为次数
        for (let i = 0; i < str.length; i ++) { // 遍历字符串每一个字母
            let char = str.charAt(i) // 当前字母
            obj[char] = obj[char] || 0 // 保证初始值为0
            obj[char] ++ // 次数加1
        }
        let maxChar // 存储字母
        let maxNum = 0 // maxChar字母对应的次数
        for(let key in obj) { // 遍历obj
            if (obj[key] > maxNum) {
                maxChar = key // 比较后存储次数多的字母
                maxNum = obj[key] // 以及它对应的次数
            }
        }
        return maxChar // 返回结果
    }
    
    let str = 'aabbbccdd'
    console.log('出现次数最多的字母为：' + getChar(str))
    

方法二
---

关键方法为 `String.prototype.split` 逻辑和方法一相同，只不过是通过 `split` 直接把字符串先拆成数组。效率上要比方法一差。

    /**
     * 获取字符串中出现次数最多的字母
     * @param {String} str 
     */
    function getChar(str) {
        if (typeof str !== 'string') return // 判断参数是否为字符串
        const obj = new Object() // 键为字母，值为次数
        const arr = str.split('')
        for (let i = 0; i < arr.length; i++) { // 遍历字符串每一个字母
            let char = arr[i] // 当前字母
            obj[char] = obj[char] || 0 // 保证初始值为0
            obj[char]++ // 次数加1
        }
        let maxChar // 存储字母
        let maxNum = 0 // maxChar字母对应的次数
        for (let key in obj) { // 遍历obj
            if (obj[key] > maxNum) {
                maxChar = key // 比较后存储次数多的字母
                maxNum = obj[key] // 以及它对应的次数
            }
        }
        return maxChar // 返回结果
    }
    let str = 'aabbbccdd'
    console.log(getChar(str))