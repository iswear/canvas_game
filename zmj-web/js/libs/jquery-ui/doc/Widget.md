#基于jQuery UI的插件开发规范
##配置
1.    disabled
2.    hide
3.    show
##接口(带下划线的为私有接口)
1.    _create
>组件的构造函数,无参数;
2.    _destroy
>公有方法destroy()清除所有公共的数据、事件等,然后调用_destroy()为进行自定义清除;
3.    destroy
>删除所有的部件功能,将元素还原到初始化之前的状态;
4.    _refresh
>节点变动,数据更新等造成部件刷新;
5.    refresh
>节点变动,数据更新等造成部件刷新;
6.    _setOption
>配置项变动
7.    _setOptions
>配置项变动