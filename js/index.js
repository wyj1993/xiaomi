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



        /*点击弹出视频框**/
        $(".video .v-main li.item>div").click(function(){
          $("#shadow").addClass("in");
          $("#vd").removeClass("moveup").addClass("movedown");
          
        })
        /**点击播放视频 */
        $("#vd>div").click(function(){
          $div=$(this);
          var $v3=$("#vd video");
          if($v3.get(0).paused){
            $v3.get(0).play();
            // $('video').trigger('play');
            $v3.next().children("img").attr("src","img/index/pause.png");
          }else{
            $v3.get(0).pause();
            // $('video').trigger('pause');
            $v3.next().children("img").attr("src","img/index/play.png");
          }
          $div.children("img").hide();   
        })
        /*点击关闭视频*/
        $("#vd p a").click(function(){
            $("#shadow").removeClass("in");
            $("#vd video").get(0).pause();
            $("#vd").removeClass("movedown").addClass("moveup");
        })
        $("#vd").hover(
          function(){
          $(this).find("div a").show();
        },
          function(){
          $(this).find("div a").hide();
        }
        )

        /*家电模块，鼠标悬浮换div*/
        $("div.sellGoods:last>div.homeelec>div>div:first a").mouseenter(function(){
            var $a=$(this);
            $a.addClass("active").parent().siblings().children().removeClass("active");
            console.log( $a.addClass("active").siblings());
            $(`#${$a.attr("data-target")}`).css("z-index",999).siblings(".p-right").css("z-index",-1);
        })

        /****内容点击事件 */
        $(function(){
          var arr=[0,0,0,0];//保存每个div对应的moved值
          var $ulContent=$("#content>div>div.parent>ul");
          var $liWidth=296;//276
          var $btnRight=$("#content>div>div div.btn a.right-btn");
          var $btnLeft=$("#content>div>div div.btn a.left-btn");
          var $liDot=$("#content>div>div.parent div.indicator li");
          $ulContent.css("width",`${liWidth*4}px`);
          //点击下面小点
          $liDot.click(function(){
              //给数组中对应的div的下标赋值，这个值是小点下标 实质是初始化本div的moved，
              arr[$(this).parents("div.parent").index()-1]=$(this).index();
              toggleContent($(this),$(this).index());
          })
          //右箭头点击事件
          $btnRight.click(function(){
            if(!$(this).is(".disabled")){
              var moved= arr[$(this).parents("div.parent").index()-1];
              moved++;
              arr[$(this).parents("div.parent").index()-1] = moved;
              toggleContent($(this),moved);
            }
          })
          //左箭头点击事件
          $btnLeft.click(function(){
            if(!$(this).is(".disabled")){
              var moved= arr[$(this).parents("div.parent").index()-1];
              moved--;
              arr[$(this).parents("div.parent").index()-1] = moved;
              toggleContent($(this),moved);
              }
          })
          function toggleContent(e,moved){
            var $btnRight;
            var $btnLeft;
            var $ulContent;
            var $dot;
            var $liSize;
            if(e.is("li")){
              $btnRight = e.parents("div.indicator").next().children("a.right-btn");
              $btnLeft = e.parents("div.indicator").next().children("a.left-btn");
              $ulContent=e.parents("div.indicator").prev();
              $dot = e;
              $liSize=e.parent().children().length;//li个数不固定，所以动态获取
            }else if(e.is("a.left-btn")){
              $btnRight = e.next();
              $btnLeft = e
              $ulContent=e.parent().siblings("ul");
              $dot = e.parent().prev().find("li").eq(moved);
              $liSize=$ulContent.children().length;
            }else{
              $btnRight = e;
              $btnLeft = e.prev();
              $ulContent=e.parent().siblings("ul");
              $dot = e.parent().prev().find("li").eq(moved);  
              $liSize=$ulContent.children().length;     
            }
            if(moved+1==$liSize){//禁用
              $btnRight.addClass("disabled");
            }else{
              $btnRight.removeClass("disabled");
            }
            if(moved==0){//禁用
              $btnLeft.addClass("disabled");
            }else{
              $btnLeft.removeClass("disabled");
            }
            $ulContent.css("margin-left",`-${moved*$liWidth}px`);
            $dot.children("span").addClass("active").parent().siblings().children("span").removeClass("active");
          }
      })
      /*左边固定的广告栏*/
      var $floor= $("div.content-box");
      //点击左侧导航栏的话isAutoScroll为true，鼠标滚动isAutoScroll为false
      var isAutoScroll = false;
      $(window).scroll(function(){
        if(!isAutoScroll){
          var scrollTop=document.body.scrollTop
                      ||document.documentElement.scrollTop;
          var $f1=$(".sellGoods:first");
          var offsetTop=$f1.offset().top;//1366
          if(offsetTop<=scrollTop+innerHeight/2){
            $("#sign").show();
          }else{
            $("#sign").hide();
          }
        // for(var i=$floor.length-1;i>=0;i--){
        //   if($($floor[i]).offset().top<=scrollTop+innerHeight/2){
        //    $($("#sign>ul>li")[i]).addClass("active").siblings().removeClass("active");
        //    break;
        // }       
          var m = 0
          for(var i=0;i<$floor.length;i++){
            if($($floor[i]).offset().top<=scrollTop+innerHeight/2){
              m = i;
            }
          }
          $($("#sign>ul>li")[m]).addClass("active").siblings().removeClass("active");
      }
   })
   
   $("#sign>ul").on("click","li",function(){
      var $li=$(this);
      isAutoScroll = true;
      $li.addClass("active").siblings().removeClass("active");
      var $offsetTop=$($floor[$li.index()]).offset().top;  
     //$(window).scrollTop($offsetTop-50);   
      $("html").stop(true).animate({
        scrollTop:$offsetTop-50
      },500,function(){isAutoScroll = false;
      })

})
       








   




        



})













  

































