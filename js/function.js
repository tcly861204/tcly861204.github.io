/**
 * Created by Administrator on 2016/12/3.
 */
define(function(){
    return {
        toNum:function(num){
            if(num>9){
                return num;
            }else{
                return '0'+num;
            }
        },
        toWeek:function(i){
            var weekText = '';
            switch(i){
                case 0:
                    weekText = '日';
                    break;
                case 1:
                    weekText = '一';
                    break;
                case 2:
                    weekText = '二';
                    break;
                case 3:
                    weekText = '三';
                    break;
                case 4:
                    weekText = '四';
                    break;
                case 5:
                    weekText = '五';
                    break;
                case 6:
                    weekText = '六';
                    break;
            }
            return weekText;
        },
        before:function(node,tag){
            node.parentNode.insertBefore(tag,node);
        },
        interVal:function(node,time){
            var that = this;
            setInterval(function(){
                node.html(that.getTime().time);
            },1000);
        },
        after:function(node,tag){
            var preNode = node.parentNode;
            if(preNode.lastChild===node){
                preNode.appendChild(tag);
            }else{
                this.before(node.nextSibling,tag);
            }
        },
        css: function(path){
            if(!path || path.length === 0){
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0],
                links = head.getElementsByTagName('link'),flag = false;
            for(var i=0;i<links.length;i++){
                if(links[i].getAttribute('href')===path){
                    flag = true;
                }
            }
            if(!flag) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = path;
                this.after(links[links.length-1],link);
            }
        },
        keyEvent:function(keyNum,fn){
            document.onkeydown = function(ev){
                var e = ev || window.event;
                if(e.keyCode===keyNum){
                    fn();
                }
            };
        },
        js: function(path){
            if(!path || path.length === 0){
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = path;
            head.appendChild(script);
        },
        oneMonthDays:function(Year,Month){
            Month--;
            var d = new Date(Year,Month,1);
            d.setDate(d.getDate()+32-d.getDate());
            return (32-d.getDate());
        },
        createNode:function(tag,className,text){
            var tagNode = document.createElement(tag);
            tagNode.className = className;
            textNode = document.createTextNode(text);
            tagNode.appendChild(textNode);
            return tagNode;
        },
        getTime:function(year,month,day){
            var now;
            if(arguments.length===3){
                now = new Date(year,month,day);
            }else{
                now = new Date();
            }
            var Y = now.getFullYear(),
                m = now.getMonth()+1,
                d = now.getDate(),
                H = now.getHours(),
                i = now.getMinutes(),
                s = now.getSeconds(),
                w = now.getDay();
            return {
                dateTime:new Date(),
                theDate:Y+'年'+this.toNum(m)+'月'+this.toNum(d)+'日',
                time:H+':'+this.toNum(i)+':'+this.toNum(s),
                week:'星期'+this.toWeek(w),
                preSumDays:this.oneMonthDays(Y,(m-1)),
                sumDays:this.oneMonthDays(Y,m),
                firstDay:new Date(Y,(m-1),1).getDay()
            };
        }
    };
});