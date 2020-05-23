const Modules = (function Manager() {
  /** 闭包内部存储模块信息 */
  let modules = {};

  /** 定义一个模块 */
  function define(name, deps, impl) {
    for (let i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name.trim()] = impl.apply(impl, deps);
  }

  /** 获取模块 */
  function get(name) {
    return modules[name.trim()];
  }

  return {
    define,
    get,
  };
})();

/** 定义一个user模块 */
Modules.define(" USER ", [], function User() {
  function hello() {
    return " i'm is user module ";
  }
  return {
    hello,
  };
});

/** 定义一个操作模块 */
Modules.define(" OPT ", ["USER"], function Ops(user) {
  function optHello() {
    return `${user.hello()} i'm opt here`;
  }

  return {
    optHello,
  };
});

/** 开始调用 */
console.log(Modules.get("OPT").optHello());
