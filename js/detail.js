$(function(){
    /**控制弹出层显示与隐藏*/
    $("div.header>div.container>div:eq(1)>ul>li:eq(0)").hover(
        function(){
        var $li=$(this);
        $li.children("div").toggle();
    })

    /**navbar的特效*/
    console.log($("div.navBar"));
    var $navbarTop=$("div.navBar").offset().top;
    var $preventTop=$("div.prevent").offset().top;
    $(window).scroll(function(){
        var scrollTop=document.body.scrollTop
                      ||document.documentElement.scrollTop;
        if(scrollTop>=$navbarTop){
            $("div.navBar").addClass("active");
        }else{
            $("div.navBar").removeClass("active");
        }
        if(scrollTop<=$preventTop&&scrollTop>$navbarTop){
             $("div.carousel").css("top",scrollTop-$navbarTop);
        }
    })
    



























})