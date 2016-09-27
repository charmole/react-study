// 先定制，500s淡入效果
;(function(_){

  function Slider( opt ){

    _.extend(this, opt);

    // 容器节点 以及 样式设置
    this.container = this.container || document.body;
    this.container.style.overflow = 'hidden';
    this.slides = [].slice.call(this.container.querySelectorAll('li'));

    // 组件节点
    this.circle = this.container.lastElementChild;
    this.circles = null;

    this.pageNum = this.slides.length;

    // 内部数据结构，如果是最后一页 重置一，否则++来实现。
    this.slideIndex = 1;

    this.timer = null;

    this.stayTime = this.stayTime || 1000 ;
    // this.pageNum 必须传入
    // 初始化动作
    this._init();

  }

  _.extend( Slider.prototype, _.emitter );

  _.extend( Slider.prototype, {
    _init : function(){
      var _self = this;
      _self._addCircle();
      _self._showFirstImg();
      _self._step();
      _self.circles = [].slice.call(_self.container.lastElementChild.querySelectorAll('span'));
      _self.circles.forEach(function(item, index){
        item.addEventListener('click', function(){
          _self.nav(index);
        })
      })
      _self.container.addEventListener('mouseover', function(){
        clearInterval(_self.timer);
      });
      _self.container.addEventListener('mouseleave', function(){
        //函数里面嵌套函数this会变，或者下面方法
        _self._step();
      });
      // this.container.addEventListener('mouseleave', this._step.bind(this));
    },
    //增加圆点数..$("#").show().siblings().hide();
    _addCircle: function(){
      for (i = 0; i < this.pageNum; i++) {
        var span = document.createElement('span');
        this.circle.appendChild(span);
      }
    },
    //显示第一个
    _showFirstImg : function(){
      _.addClass(this.slides[0], 'active');
    },

    _step : function(){
      var _self = this;
      _self.timer= setInterval(function(){
        _self.nav();
      },_self.stayTime);
    },

    // 直接跳转到指定页
    nav: function( pageIndex ){
      this.slideIndex = pageIndex ? pageIndex : this.slideIndex;
      for (var i = this.pageNum - 1; i >= 0; i--) {
        if(this.slideIndex == i){
          _.addClass(this.slides[i], 'active');
        }else{
          _.delClass(this.slides[i], 'active');
        }
      }
      //如果最后个，重置为第一个
      if(this.slideIndex == this.pageNum-1){
        this.slideIndex = 0;
      }else{
        this.slideIndex++;
      }
    },
    // 下一页
    next: function(){
    },
    // 上一页
    prev: function(){
    }


  })


  window.Slider = Slider;



})(util);








