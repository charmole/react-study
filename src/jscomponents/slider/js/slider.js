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
        _self._step();
      });
    },
    //增加圆点数..$("#").show().siblings().hide(); 
    _addCircle: function(){
      // var _self = this;
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
      },2000);
    },

    // 直接跳转到指定页
    nav: function( pageIndex ){
      var _self = this ;
      _self.slideIndex = pageIndex ? pageIndex : _self.slideIndex;
      for (var i = _self.pageNum - 1; i >= 0; i--) {
            if(_self.slideIndex == i){
               _.addClass(_self.slides[i], 'active');
            }else{
               _.delClass(_self.slides[i], 'active');
            }
          }
        //如果最后个，重置为第一个
        if(_self.slideIndex == _self.pageNum-1){
          _self.slideIndex = 0;
        }else{
           _self.slideIndex++;
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








