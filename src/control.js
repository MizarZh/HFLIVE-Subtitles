var $toggle = document.querySelector('.toggle');
var $file = document.querySelector('#file');
var $time = document.querySelector('.time');
var $content = document.querySelector('.content');
var $status = document.querySelector('.status');
var fileReader = new FileReader();

var checked;
var put = false; //正在放出

$toggle.addEventListener('click',function(e){
    if(checked !== null){
        if(put === false){
            localStorage.setItem('linenow',checked.innerText.slice(10).trim());
            $status.innerText = '状态：放出';
            $toggle.innerText = '停止';
            put = true;
        }else{
            $status.innerText = '状态：未放出';
            localStorage.removeItem('linenow');
            $toggle.innerText = '放出';
            put = false;
        }
    }
})

$file.addEventListener('change',function(e){
    localStorage.removeItem('linenow')
    $content.innerHTML = '';
    fileReader.readAsText(this.files[0]);
    console.log($file.files[0]);
    setTimeout(function(){parseLrc(fileReader.result)},200);
    checked = null;
})

function parseSrt(text){
    // 00:00:00.000 --> 00:00:00.000
    var parseTime = /\d{2}:\d{2}:\d{2}[,\.]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[,\.]\d{3}/g
    var arr = text.split('\n');
    for(let i = 0;i < arr.length; ++i){
        if(arr[i].match(parseTime)){
            load(arr[i] + '    ' + arr[i+1]);
        }
    }
}

function parseLrc(text){
    // [00:00.00]
    var parseTime = /\[\d{2}:\d{2}.\d{2}\]/g
    var arr = text.split('\n');
    for(let i = 0;i < arr.length; ++i){
        var time = arr[i].match(parseTime);
        if(time){
            load(time + '     ' + arr[i].slice(10),i);
        }
    }
}

function load(content, count){
    var l = document.createElement('pre');
    l.innerText = content;
    $content.appendChild(l);
}

window.addEventListener('mouseup',function(e){
    if($content.contains(e.target)){
        if(checked === null){
            checked = e.target;
            checked.classList.add('active');
            if(put === true) localStorage.setItem('linenow',checked.innerText.slice(10).trim());
        }else if(checked !== e.target){
            checked.classList.remove('active')
            checked = e.target;
            checked.classList.add('active');
            if(put === true) localStorage.setItem('linenow',checked.innerText.slice(10).trim());
        }
    }
})

window.addEventListener('unload',function(){
    localStorage.removeItem('linenow');
})