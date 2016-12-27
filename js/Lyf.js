/*
*  高仿jQuery库实现基本方法
*  author 吴天赐 
*  Email  tcly861204@hotmail.com
*  QQ     356671808
*  weixin cobill2008
*/
define(function(){
    var tool = function(str){
        return new Base(str);
    };
    function Base(str){
        if(!str){
            return;
        }
        if(typeof str==='function'){
            this[0] = window;
            this.length=1;
            this.bind('load',str);
        }else{
            if(str===window){

            }else{
                switch(str.charAt(0)){
                    case '#':
                        this.getId(str.substring(1));
                        this.selector = str;
                        break;
                    case '.':
                        this.getClass(str.substring(1));
                        this.selector = str;
                        break;
                    default :
                        this.getTagName(str);
                        this.selector = str;
                        break;
                }
            }

        }
    };
    Base.prototype = {
        construct:Base,
        context:document,
        version:'1.0.0',
        getId:function(id){
            return this[0] = document.getElementById(id),
                this.length = 1,
                this;
        },
        getClass:function(className,preNode){
            var node = preNode || document,
                reg=new RegExp('(\\s|^)'+className+'(\\s|$)'),
                classNodes = node.getElementsByTagName('*'),
                index = 0;
            this.length = index;
            for(var i=0;i<classNodes.length;i++){
                if(classNodes[i].className.match(reg)){
                    this[index] = classNodes[i];
                    index++;
                    this.length = index;
                }
            }
            return this;
        },

        getTagName:function(tag,preNode){
            var node = preNode || document,
                tags = node.getElementsByTagName(tag);
            index = 0;
            for(var i=0;i<tags.length;i++){
                this[index] = tags[i];
                index++;
                this.length = index;
            }
            return this;
        },
        get:function(index){
            return this[index || 0];
        },
        eq:function(index){
            if(index>=this.length){
                this.length=0;
            }else{
                var now = this[index];
                for(i=0;i<this.length;i++){
                    delete this[i];
                }
                this[0] = now;
                this.length=1;
            }
            return this;
        },
        bind:function(type,fn){
            for(var i=0;i<this.length;i++){
                if (this[i].addEventListener) {
                    this[i].addEventListener(type, fn, false);
                } else {
                    this[i].attachEvent('on' + type, function() {
                        fn.call(Node);
                    });
                }
            }
        },
        css:function(attr,value){
            if(arguments.length==1){
                if(typeof attr==='object'){
                    for(var i=0;i<this.length;i++){
                        for(var j in attr){
                            this[i].style[j] = attr[j];
                        }
                    }
                    return this;
                }else if(typeof attr==='string'){
                    return this.getStyle(attr);
                }
            }else if(arguments.length==2){
                for(var i=0;i<this.length;i++){
                    this[i].style[attr] = value;
                }
                return this;
            }
        },
        addClass:function(className){
            var reg=new RegExp('(\\s|^)'+className+'(\\s|$)'),Node;
            for(var i=0;i<this.length;i++){
                Node = this[i];
                if(!Node.className.match(reg)){
                    Node.className+=' '+className;
                }
            }
            return this;
        },
        removeClass:function(className){
            var reg=new RegExp('(\\s|^)'+className+'(\\s|$)'),Node;
            for(var i=0;i<this.length;i++){
                Node = this[i];
                if(Node.className.match(reg)){
                    Node.className=Node.className.replace(reg,' ');
                }
            }
            return this;
        },
        html:function(html){
            if(this.length>1){
                return;
            }
            if(arguments.length==0){
                return this[0].innerHTML;
            }else if(arguments.length==1){
                return this[0].innerHTML=html,
                    this;
            }
        },
        getStyle : function(attr){                //获取计算后的样式
            if(this[0].currentStyle){
                return this[0].currentStyle[attr];
            }else{
                return getComputedStyle(this[0], false)[attr];
            }
        }
    };
    return tool;
});