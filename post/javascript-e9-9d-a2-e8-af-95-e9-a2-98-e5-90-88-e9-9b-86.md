---
title: JavaScript面试题合集
tags:
  - JavaScript
  - 面试
url: 240.html
id: 240
categories:
  - JavaScript
  - 前端面试
  - 合集
date: 2018-05-02 22:03:16
---

JS面试题
-----

### JavaScript的数据类型

*   值类型(基本数据类型)：**Boolean** **String** **Number** **Null** **Undefined**
*   引用类型（复杂数据类型）: **Array** **RegExp** **Object** **Date** **Error** **Function**
*   全局数据类型： **Math**

值类型存储在**栈**中,`=`复制的是值 引用类型存储在**堆**中,`=`复制的是地址

### JavaScript变量提升

变量的声明将会提升到当前作用域的顶部。

### JavaScript的作用域和作用域链，变量运行（搜索）机制

作用域：是指变量的作用范围。 作用域链：内部作用域由函数的形参（参数）、局部变量、函数构成。内部作用域和外部作用域一层一层的嵌套形成作用域链。 变量搜索机制：首先在当前作用域内有没有该变量，如果没有则在该作用域的父作用域下查找，直到找到window所在的作用域。

### 改变函数内部this指针的指向函数

*   **call或apply**。调用函数的同时改变函数内部的this指向。两者的第一个参数都是一个对象（this指向的新对象）；apply的第二个参数为传递函数的实参，以数组的形式传递`fun.call(obj, [item1, item2])`；call则是以','号隔开的形式传递 `fun.call(obj, item1, item2)`
*   **bind** 和call和apply不同，它是返回一个新的函数，新函数内部的this指向为调用bind方法传递的第一个参数。如：`var newFun = fun.bind(obj)` _newFun_中的内部this指向的是_obj_

### JavaScript的继承

如函数A和函数B。实现函数B继承函数A。

#### 原型继承

函数B的原型`prototype`等于函数A的实例 ：`B.prototype=new A()` 缺点：所有的子类是共享一个父类。

#### 构造函数继承

函数B的内部通过**call**或**apply**调用函数A:

    function B() {
        A.call(this)
    }
    

缺点：父类中原型`prototype`中的方法无法复用

#### 原型继承加构造函数继承

函数B的原型`prototype`等于函数A的实例（也可以通过`Object.create`来实现，好处是可以避免A的实例中的属性附加到函数B的原型中） 函数B的内部通过**call**或**apply**调用函数A；

    B.prototype = Object.create(A.prototype)
    function B() {
        A.call(this)
    }
    

缺点：内存的占用比以上两种要大。

### new 操作符到底做了什么

首先：创建了一个新对象 `new Object` 其次: 新对象的原型等于函数的原型 最后：执行函数的同时，改变函数内部的this指向，指向到新的创建的对象。

### 闭包

一个函数能访问外部函数变量值，叫做闭包。常见的做法就是把闭包当做外部函数的返回值。 作用： 1\. 可以访问外部函数变量 2. 让变量始终保存在内存中不释放。 3. 隔离作用域的作用。 缺点：闭包嵌套过多会导致内存占用过大。

相关参考
----

[Web前端岗位面试题|汪汪](https://www.zhihu.com/question/41466747?sort=created "Web前端岗位面试题|汪汪") [常见前端面试题|毕安](https://www.jianshu.com/p/0e9a0d460f64 "常见前端面试题|毕安")