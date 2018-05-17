---
title: RegExp正则详解
tags:
  - JavaScript
  - RegExp
url: 244.html
id: 244
categories:
  - JavaScript
  - RegExp
date: 2018-04-28 18:39:58
---

修饰符
---

修饰符

描述

i

忽略大小写

g

执行全局匹配，查找所有匹配而非在找到第一个匹配后停止，搭配**exec**方法使用

m

执行多行匹配

括号
--

字符

含义

\[abc\]

查找方括号之间的任何字符。

\[^abc\]

查找任何不在方括号之间的字符

\[0-9\]

查找任何从 0 至 9 的数字。

\[a-z\]

查找任何从小写 a 到小写 z 的字符。

\[A-Z\]

查找任何从大写 A 到大写 Z 的字符。

\[A-z\]

查找任何从大写 A 到小写 z 的字符。

(red|blue|green)

查找任何指定的选项。

(x)

匹配'x'并记住匹配`/b(a)/g.exec('ba') // ['ba','a']`

(?:x)

匹配'x'但不记住匹配`/b(?:a)/g.exec('ba') // ['ba']`

x(?=y)

只有'x'后面跟着'y'才匹配'x'`/b(?=a)/.exec('ba') // ["b"]`

x(?!y)

'x'后面跟着'y'则不匹配 `/\d+(?!\.)/.exec('3.123') // ["123"]`

x|y

匹配'x'或'y'

元字符（特殊含义的字符）
------------

元字符

描述

.

查找单个字符，除了换行和行结束符。

\\w

匹配包括下划线在内的任何字母数字字符，相当于\[A-Za-z0-9_\]

\\W

匹配任何非单词字符。相当于\[^A-Za-z0-9_\]。

\\d

匹配数字字符。相当于\[0-9\]。

\\D

匹配非数字字符。相当于\[^0-9\]。

\\s

匹配单个空格字符，包括空格，制表符，换页符，换行符。相当于\[ \\f\\n\\r\\t\\v\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000\\ufeff\]

\\S

匹配除空格之外的单个字符。相当于\[^ \\f\\n\\r\\t\\v\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000\\ufeff\]

\\b

匹配单词边界。`/\bm/.test('moom') //true`

\\B

匹配非单词边界

\\0

匹配NULL字符

\\n

换行符

\\f

换页符

\\r

回车符

\\t

制表符

\\v

垂直制表符

\\xxx

查找以八进制数 xxx 规定的字符。

\\xdd

查找以十六进制数 dd 规定的字符。

\\uxxxx

查找以十六进制数 xxxx 规定的 Unicode 字符。

量词
--

量词

描述

n+

匹配任何包含至少一个 n 的字符串，相当于{1,}

n*

匹配任何包含零个或多个 n 的字符串。{0,}

n?

匹配任何包含零个或一个 n 的字符串。{0,1}

n{X}

匹配包含 X 个 n 的序列的字符串。

n{X,Y}

匹配包含 X 至 Y 个 n 的序列的字符串。

n{X,}

匹配包含至少 X 个 n 的序列的字符串。

n$

匹配任何结尾为 n 的字符串。

^n

匹配任何开头为 n 的字符串。

相关参考地址以及在线工具
------------

[在线正则表达式](http://www.bejson.com/othertools/regex/ "在线正则表达式") [RegExp--w3school](http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp "RegExp--w3school") [RegExp Api](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) jQuery('table').addClass('table')