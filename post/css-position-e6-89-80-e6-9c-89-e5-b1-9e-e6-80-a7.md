---
title: css position 所有属性
tags:
  - CSS
  - 面试
url: 152.html
id: 152
categories:
  - CSS
  - 前端面试
date: 2018-04-29 11:00:32
---

> 笔试

所有属性
----

*   **static** 默认值，对象遵循常规流。四个定位属性不会被应用。
*   **relative** 相对定位，对象遵循常规流。四个定位属性生效时不会对其它元素产生影响。
*   **absolute** 绝对定位，对象脱离文档流。如果没有定位的祖先元素，则一直回溯到`body`元素。
*   **fixed** 与`absolute`一致，但相对当前窗口进行定位。对象脱离文档流。
*   **sticky** 如果设置`top:0;bottom:0`则元素会吸附在窗口中，但在正常范围内会上下滚动。 (CSS3)