var $toggle = document.querySelector('.toggle');
var $file = document.querySelector('#file');
var $time = document.querySelector('.time');
var $content = document.querySelector('.content');
var $status = document.querySelector('.status');
var fileReader = new FileReader();

var $fontSize = document.querySelector('.fontSize');
var $marginBottom = document.querySelector('.marginBottom');
var fontSize, marginButton;
var checked;
var put = false; //正在放出

function setProperties(){
    fontSize = parseFloat($fontSize.value) ? parseFloat($fontSize.value) + 'px' : '16px';
    marginBottom = parseFloat($marginBottom.value) ? parseFloat($marginBottom.value) + 'px' : '16px';
    localStorage.setItem('linenow',checked.innerText.slice(10).trim());
    localStorage.setItem('fontSize',fontSize);
    localStorage.setItem('marginBottom',marginBottom);
    localStorage.setItem('updated',false);
    localStorage.setItem('updatediniframe',false);
}

$toggle.addEventListener('click',function(e){
    if(checked !== null){
        if(put === false){
            setProperties();
            $status.innerText = '状态：放出';
            $toggle.innerText = '停止';
            put = true;
        }else{
            $status.innerText = '状态：未放出';
            localStorage.setItem('updated',false);
            localStorage.setItem('updatediniframe',false);
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
    switch($file.files[0].name.slice(-4)){
        case '.lrc':
            setTimeout(function(){parseLrc(fileReader.result)},200);
            break;
        case '.srt':
            setTimeout(function(){parseSrt(fileReader.result)},200);
            break;
        default:
            alert('文件类型错误');
            //throw new Error('文件类型错误')
    }
    
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

window.addEventListener('mousedown',function(e){
    if($content.contains(e.target)){
        if(checked === null){
            checked = e.target;
            checked.classList.add('active');
            if(put === true) setProperties();
        }else if(checked !== e.target){
            checked.classList.remove('active'); // 旧元素移除active状态
            checked = e.target;
            checked.classList.add('active');
            if(put === true) setProperties();
        }
    }
})

window.addEventListener('unload',function(){
    localStorage.removeItem('linenow');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('marginBottom');
    localStorage.removeItem('updated');
    localStorage.removeItem('updatediniframe');
})