/**
 * Created by Administrator on 2016/12/27.
 */
window.addEventListener('load',function(){
    setLayout();
},false);

function setLayout(){
    var div = document.querySelectorAll('.div')[0];
    var str="";
    for(var i=0;i<10;i++){
        str = '<div><span>'+(9-i)+'</span>'+str+'</div>';
    }
    div.innerHTML = str;
}