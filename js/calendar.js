/**
 * Created by Administrator on 2016/12/3.
 */
define(['Lyf','function'],function($,fn){
    return {
        init:function(){
            fn.css('style/calendar.css');
            var that = this;
            this.now = fn.getTime().dateTime;
            this.year = this.now.getFullYear();
            this.month = this.now.getMonth();
            this.day = this.now.getDate();
            this.monthIndex = 0;
            this.initCalendar(this.year,this.month,this.day);
            var timeNode = $('.theTime');
            timeNode.html(fn.getTime().time);
            fn.interVal(timeNode);
            $('.up').bind('click',function(){
                that.monthIndex--;
                if((that.month+that.monthIndex)<0){
                    that.year--;
                    that.month=11;
                    that.monthIndex = 0;
                }
                that.initCalendar(that.year,(that.month+that.monthIndex),that.day);
            });
            $('.down').bind('click',function(){
                that.monthIndex++;
                if((that.month+that.monthIndex)>=12){
                    that.year++;
                    that.month=0;
                    that.monthIndex = 0;
                }
                that.initCalendar(that.year,(that.month+that.monthIndex),that.day);
            });
            $('.close').bind('click',function(){
                $('#calendar').css('display','none');
            });
        },
        initCalendar:function(Year,month,day){
            var dataNode = $('#dateTimeList').get(),
                time = arguments.length ? fn.getTime(Year,month,day) : fn.getTime(),
                firstDay = time.firstDay || 7,
                preSumDays = time.preSumDays,
                sumDays = time.sumDays;
            $('.nowDate').html(Year+'年'+fn.toNum(month+1)+'月');
            var tagList = $('.md');
            if(tagList.length===0){
                $('.theDate').html(Year+'年'+fn.toNum(month+1)+'月'+fn.toNum(day)+'日');
                for(var i=0;i<49;i++){
                    if(i<7){
                        dataNode.appendChild(fn.createNode('li','hd',fn.toWeek(i)));
                    }else{
                        if(7<=i && i<firstDay+7){
                            dataNode.appendChild(fn.createNode('li','md gray',(preSumDays-firstDay+(i-6))));
                        }else if( (firstDay+7)<=i && i<(firstDay+sumDays+7) ){
                            dataNode.appendChild(fn.createNode('li','md',(i-firstDay-6)));
                        }else{
                            dataNode.appendChild(fn.createNode('li','md gray',(i-firstDay-6-sumDays)));
                        }
                    }
                }
            }else{
                for(var j=0;j<tagList.length;j++){
                    if(j<firstDay){
                        tagList[j].className = 'md gray';
                        tagList[j].innerHTML = preSumDays-firstDay+j+1;
                    }else if(firstDay<=j && j<firstDay+sumDays ){
                        tagList[j].className = 'md';
                        tagList[j].innerHTML = j-firstDay+1;
                    }else{
                        tagList[j].className = 'md gray';
                        tagList[j].innerHTML = j-firstDay-sumDays+1;
                    }
                }
            }
        }
    };
});