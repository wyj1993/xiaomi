$(function(){
  /***banner */
    var  liWidth=1226,timer=null,moved=0,wait=3000,liCount=4;
    var  $ul= $("[data-toggle=banner]");//图片
    var $ulInds=$("[data-toggle=slide]");//小点
    //定义动画
    function move(){
        $ul.animate({left:-liWidth*moved},function(){
            if(moved===liCount){
                moved=0;
                $ul.css("left",0);
            }
         $ulInds.children(`:eq(${moved})`).addClass('active').siblings().removeClass('active')
        });
    };
   
    //启动动画
    timer=setInterval(function(){
        moved++;
        move();
    },wait);
    
    //鼠标进入区域启动定时器或者清除定时器
    $(".banner").hover(
        function(){
        clearInterval(timer);
    },
        function(){
            timer=setInterval(function(){
                moved++;
                move();
            },wait)
        }
    )
    //小圆点事件
    $ulInds.on("click","li",function(e){
        moved=$(e.target).index();
        $ul.stop(true);
        move();
    })
    /*左右小箭头**/
        $('[data-move=right]').click(e=>{
         e.preventDefault();
        if(!$ul.is(':animated')){
          moved++;
        //   $ul.stop(true);//放止定时器和动画叠加
          move()
        }
      })
      $('[data-move=left]').click(e=>{
        e.preventDefault();
        if(!$ul.is(':animated')){
          if(moved==0){
            $ul.css('left',-liWidth*liCount)
            moved = liCount;
          }
          moved--;
        //   $ul.stop(true)
          move();
        }
      })
      /**** 轮播图上面的弹出层*** */
      $("ul.sub-nav>li").hover(
          function(){
            var $li=$(this);
            $li.children("div.children").toggle();
          }
      )
    /*****定时器 */
    setInterval(function () {
        var date = new Date;
        var nowHour = parseInt(date.getHours())
        var targetTime = new Date();
        targetTime.setHours(nowHour+2);
        targetTime.setMinutes(0);
        targetTime.setSeconds(0);
        var s=targetTime.getTime()-date.getTime();
        var restHour=parseInt(s/(1000*60*60));
        $(".countdown>.box:eq(0)").html(`0${restHour}`)
        $(".time-title").html(`${nowHour}:00场`)  
        var nowMinutes = date.getMinutes()
        var minutes = 60-nowMinutes-1
        if(minutes<10){
          $(".countdown>.box:eq(1)").html(`0${minutes}`)
        }else{
          $(".countdown>.box:eq(1)").html(`${minutes}`)
        }
        var nowSeconds = date.getSeconds()
        var seconds = 60-nowSeconds-1
        if(seconds<10){
          $(".countdown>.box:eq(2)").html(`0${seconds}`)
        }else{
          $(".countdown>.box:eq(2)").html(`${seconds}`)
        }},1000);
        /*******闪购箭头点击事件 */
        $(function(){
          var moveLi=0;
          var lWidth=248;//每个li的宽度
          var lCount=$("#goodsUl").children().length;//li个数
          var ulWidth=lCount*lWidth;//ul宽度
          $("#goodsUl").css("width",`${ulWidth}px`);
          $("[data-slide=right]").click(function(){
            $(this).prev().children("em").css("color","#333");//1把同伴箭头换成可用颜色
            if(moveLi+4<lCount){//2判断是否还有下一页
              moveLi+=4;//如果有下一页，展示下一页
              $("#goodsUl").css("left",`-${lWidth*moveLi}px`);
              if(moveLi+4>=lCount){//3展示下一页后判断是否还有下一页，如果么有了就变灰
                $(this).children("em").css("color","#e0e0e0");
              }
           }
          })
          $("[data-slide=left]").click(function(){
            $(this).next().children("em").css("color","#333");
            if(moveLi>0){
                moveLi-=4;
                $("#goodsUl").css("left",`-${lWidth*moveLi}px`);
                if(moveLi<=0){
                $(this).children("em").css("color","#e0e0e0");
              }
           }
          })
        })

















})













  

































