var util = (function(){

  return {
    extend: function(o1, o2){
      for(var i in o2) if (o1[i] == undefined ) {
        o1[i] = o2[i]
      }
    },
    addClass: function (node, className){
      var current = node.className || "";
      if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
        node.className = current? ( current + " " + className ) : className;
      }
    },
    delClass: function (node, className){
      var current = node.className || "";
      node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
    },
    emitter: {
      // 注册事件
      on: function(event, fn) {
        var handles = this._handles || (this._handles = {}),
          calls = handles[event] || (handles[event] = []);

        // 找到对应名字的栈
        calls.push(fn);

        return this;
      },
      // 解绑事件
      off: function(event, fn) {
        if(!event || !this._handles) this._handles = {};
        if(!this._handles) return;

        var handles = this._handles , calls;

        if (calls = handles[event]) {
          if (!fn) {
            handles[event] = [];
            return this;
          }
          // 找到栈内对应listener 并移除
          for (var i = 0, len = calls.length; i < len; i++) {
            if (fn === calls[i]) {
              calls.splice(i, 1);
              return this;
            }
          }
        }
        return this;
      },
      // 触发事件
      emit: function(event){
        var args = [].slice.call(arguments, 1),
          handles = this._handles, calls;

        if (!handles || !(calls = handles[event])) return this;
        // 触发所有对应名字的listeners
        for (var i = 0, len = calls.length; i < len; i++) {
          calls[i].apply(this, args)
        }
        return this;
      }
    },
    ajax : function(opt){
      //不管ie6浏览器
      var request = new XMLHttpRequest();
      //默认get
      function params(data){
        var arr = [];
        for(var i in data){
          arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
        }
        return arr.join("&");
      }


      if(obj.async === true){
        // 异步的时候需要触发onreadystatechange事件
        xhr.onreadystatechange = function(){
          // 执行完成
          if(xhr.readyState == 4){
            callBack();
          }
        }
      }



      if(opt.method == 'get'){
        //
      }
      request.open(opt.method,opt.url,opt.async);

      if(opt.method == 'post'){
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        request.send(opt.data);
      }else{
        request.send(null);
      }
    }
//http://www.tuicool.com/articles/v2YBFrF
  }
})()
