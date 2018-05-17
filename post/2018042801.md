---
title: CSS display所有属性
tags:
  - CSS
  - 面试
url: 150.html
id: 150
categories:
  - CSS
  - 前端面试
date: 2018-04-28 15:09:51
---

> 笔试题

所有属性
----

*   **none** 隐藏对象，不保留物理空间。
*   **block** 块级元素
*   **inline** 行内元素（内联元素）,设置宽高失效
*   **list-item** 作为列表显示
*   **inline-block** 行内块元素（内联块元素），可以设置宽高（CSS2）
*   **table** 块级元素表格。类同于标签`table`（CSS2）
*   **inline-table** 行内元素表格。类同于标签`table`（CSS2）
*   **table-caption** 表格标题。类同于标签`caption`（CSS2）
*   **table-cell** 表格单元格。类同于标签`td`（CSS2）
*   **table-row** 表格行。类同于标签`tr`（CSS2）
*   **table-row-group** 表格组。类同于标签`tbody`（CSS2）
*   **table-column** 表格列。类同于标签`col`（CSS2）
*   **table-column-group** 表格列组。类同于标签`colgroup`（CSS2）
*   **table-header-group** 表格标题组。类同于标签`thead`（CSS2）
*   **table-footer-group** 表格脚注组。类同于标签`tfoot`（CSS2）
*   **flex** 弹性盒子，最新版。（CSS3）
*   **inline-flex** 行内块级弹性盒子，最新版。（CSS3）

注意
--

*   行内块元素可以设置宽高，行内元素不能设置宽高
*   行内元素可以配置**margin、padding、border、outline**
*   table标签会让标签内直属文本排除在外（Chrome）,其它元素即使配置上`display:table`也没有这样的效果。

参考地址
----

[Can I use](https://caniuse.com/ "Can I use") [display-CSS3参考手册 -- css88.com](http://www.css88.com/book/css/properties/layout/display.htm "display-CSS3参考手册 -- css88.com]") [CSS display属性 -- w3school](http://www.w3school.com.cn/cssref/pr_class_display.asp "CSS display属性 -- w3school ")