window.onload = function(){

    var video = document.getElementById("video");//视频播放区域
    var lis = document.getElementsByTagName("li");//列表标签值li
    var vLen = lis.length; // 播放列表的长度
    var url = [];//存放视频的value值
    var ctrl = document.getElementById("playList-hidden");//收起播放列表
    var ctrl_show = document.getElementById('playList-show1');//打开播放列表
    var aside = document.getElementById("playList");//获取播放列表的值
    var curr = 1; // 当前播放的视频

    for(var i=0;i<lis.length;i++){//将播放列表的视频的value值赋给数组
        url[i] = lis[i].getAttribute("value");
    }
    //绑定单击事件
    for(var i=0;i<lis.length;i++){
        lis[i].onclick = function(){
            for(var j=0;j<lis.length;j++){
                if(lis[j] == this){
                    video.setAttribute("src",this.getAttribute("value"));
                    video.setAttribute('autoplay','autoplay');
                    this.innerHTML = 'palying '+this.innerHTML;//自动播放
                    this.className = "select";//返回class属性为select
                    curr = j+1;
                }else{
                    lis[j].innerHTML = lis[j].getAttribute("title");
                    lis[j].className = "";
                }
            }
//			console.log(this.getAttribute("value"));  //调试代码
        }
    }
    //收起播放列表
    ctrl.onclick = function(){

        aside.style.transition = "1s";
        aside.style.transform = "translateX(-10vw)";
        setTimeout(function(){
            aside.style.display = "none";
            ctrl_show.style.visibility= 'visible';
        },"1000");

    }
    //展开播放列表
    ctrl_show.onclick = function(){
        aside.style.display = "block";
        ctrl_show.style.visibility= 'hidden';
        setTimeout(function(){
            aside.style.transform = "translateX(0vw)";
        },"0");

    }

    video.setAttribute('src',url[0]);
    lis[0].innerHTML = 'palying '+lis[0].innerHTML;
    lis[0].className = "select";
    video.addEventListener('ended', play);
    //play();
    function play() {
        video.src = url[curr];
        video.load(); // 如果短的话，可以加载完成之后再播放，监听 canplaythrough 事件即可
        video.play();

        for(var j=0;j<lis.length;j++){
            if(j == curr){
                video.setAttribute("src",lis[j].getAttribute("value"));
                video.setAttribute('autoplay','autoplay');
                lis[j].innerHTML = 'palying '+lis[j].innerHTML;
                lis[j].className = "select";
            }else{
                lis[j].innerHTML = lis[j].getAttribute("title");
                lis[j].className = "";
            }
        }
        curr++;
        if (curr >= vLen) curr = 0; // 播放完了，重新播放
    }

}

