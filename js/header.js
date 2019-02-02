$(function(){
    /*****购物车*****/
    $(".first-nav .top_cart").hover(
        function(){
            $(this).find("div").css("zIndex",999)
            .slideDown(100);
        },
        function(){
            
            $(this).find("div").slideUp();
        }
    )
    /*** 二维码弹出层**** */
    $(".header .container .top_nav li.app").hover(function(){
        $(this).children("div").toggle();
    })
    /****搜索框***/
    $(".header>.container form>input:text").focus(function(){
            $(this).css("border","1px solid #ff6700");
            $(this).next().css({
                "border":"1px solid #ff6700",
                "border-left":0
            })
            .siblings("div.search-hot-words").hide();
            $(this).siblings(".keyword-list").show();
    })
    $(".header>.container form>input:text").blur(function(){
        $(this).css("border","1px solid #a8a8a8");
        $(this).next().css({
            "border":"1px solid #a8a8a8",
            "border-left":0
            })
        .siblings("div.search-hot-words").show();
        $(this).siblings(".keyword-list").hide();
    })
    /**** 子菜单弹出层*** */

   $(".header .nav-list>li").hover(
       function(){
        var $li=$(this);
        var index=$li.index();
        $li.parents(".container").next().find(`div.child${index}`).show();
       },
        function(){
            var $li=$(this);
            var index=$li.index();
            var $div=$li.parents(".container").next().find(`div.child${index}`);
            if($div.length==0){
                return ;
            }
            if(!$div.is(':hover')){
                $div.hide();
            }else{
                $div.mouseleave(function(){
                $div.hide();
                })
            }
            }
        );

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
    //   $("ul.sub-nav>li").hover(
    //       function(){
    //         var $li=$(this);
    //         $li.children("div.children").toggle();
    //       }
    //   )
    


















})













  

































