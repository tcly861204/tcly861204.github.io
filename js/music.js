/**
 * Created by Administrator on 2016/12/3.
 */
define(['Lyf','function','musicJson'],function($,fn,DATA){
    return {
        init:function(){
            fn.css('style/music.css?'+Math.random());
            window.AudioContext=window.AudioContext||
                                window.webkitAudioContext||
                                window.mozAudioContext;
            window.requestAnimationFrame = window.requestAnimationFrame ||
                                           window.webkitRequestAnimationFrame ||
                                           window.mozRequestAnimationFrame ||
                                           window.msRequestAnimationFrame;
            this.preNode = document.getElementById('play-music');
            this.musicData = DATA.json;
            this.AudioCurrentTime = 0;
            var preMusic = document.getElementById('pre-audio-play'),
                playMusic = document.getElementById('audio-play'),
                nextMusic = document.getElementById('next-audio-play'),
                that = this;
                this.flag = false;
                that.media();
                playMusic.addEventListener('click',function(){
                    if(that.flag){
                        this.className = "music-stop";
                        that.music.pause();
                    }else{
                        this.className = "music-play";
                        that.play();
                    }
                    that.flag = !that.flag;
                },false);

        },
        media:function(){
            this.music = new Audio();
            this.lineNode = $('#audio-music-line')[0];
            this.music.src = this.musicData[0].music;
        },
        play:function(){
            var that = this;
            that.music.play();
            /*this.music.addEventListener('progress',function(){
                //客户端正在请求数据（或者说正在缓冲）
                console.log(3);
            });
            this.music.addEventListener('canplay',function(){
                //缓冲至目前可播放状态。

            },false);

            this.music.addEventListener('ended',function(){
                //如果媒体文件播放完毕返回true

            });
            this.music.addEventListener('canplaythrough',function(){
                //歌曲已经载入完全完成

            });*/
            if(that.AudioCurrentTime>0){
                that.music.currentTime = that.AudioCurrentTime;
            }
            this.timeUpDate(this.music,this.lineNode);
            this.analyser();
        },
        timeUpDate:function(sound,lineNode){
            var that = this;
            sound.addEventListener('timeupdate',function(){
                that.AudioCurrentTime = sound.currentTime;
                lineNode.style.width= ((Math.floor(sound.currentTime*100)/Math.floor(sound.duration*100))*500)+'px';
            },false);
        },
        analyser:function(){
            var actx = new AudioContext(); //创建一个音乐对象
            // 创建一个音频节点
            var analyser = actx.createAnalyser();
            //创建音乐媒体源节点
            var audioSrc = actx.createMediaElementSource(this.music);
            //将媒体源节点与分析机制链接
            audioSrc.connect(analyser);

            //将分析机制与目标点链接（扬声器）
            analyser.connect(actx.destination);

            var can = $('#music-canvas')[0];
            can.width = 580;
            can.height = 350;
            var cxt = can.getContext('2d'),num=100;
            color = cxt.createLinearGradient(can.width*0.5,0,can.width*0.5,150);
            color.addColorStop(0,"#00f");
            color.addColorStop(0.5,"#f00");
            color.addColorStop(1,"#0f0");
            colorf = cxt.createLinearGradient(can.width*.5,150,can.width*.5,250);
            colorf.addColorStop(0,"#0f0");
            colorf.addColorStop(0.5,"#f00");
            colorf.addColorStop(1,"#00f");
            requestAnimationFrame(draw);
            function draw(){
                //创建一个与音乐频次等长的数组 【自动转换为0-255之间的数子】
                var voicehigh = new Uint8Array(analyser.frequencyBinCount);
                //将分析出来的音频数据添加到数组里面
                analyser.getByteFrequencyData(voicehigh);
                var step = Math.round(voicehigh.length/num);
                cxt.clearRect(0,0,can.width,can.height);
                cxt.globalAlpha = 1;//透明度
                cxt.beginPath();
                for(var i=0;i<num;i++){
                    var value = (voicehigh[step*i])/2;
                    cxt.fillStyle = color;
                    cxt.fillRect(i*10+can.width*0.5,150,7,-value+1);
                    cxt.fillRect(can.width*0.5-(i-1)*10,150,7,-value+1);
                    cxt.fillStyle = colorf;
                    cxt.fillRect(i*10+can.width*0.5,150,7,value+1);
                    cxt.fillRect(can.width*0.5-(i-1)*10,150,7,value+1);
                }
                cxt.closePath();
                requestAnimationFrame(draw);
            }

        },
        musicList:function(){

        }

    };
});