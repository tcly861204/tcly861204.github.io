/**
 * Created by Administrator on 2016/12/3.
 */
define(['Lyf','function'],function($,fn){
    return {
        init:function(){
            fn.css('style/smallDate.css');
            var timeNode = $('.time');
            timeNode.html(fn.getTime().time);
            $('.date').html(fn.getTime().theDate);
            $('.week').html(fn.getTime().week);
            fn.interVal(timeNode);
        }
    }
});