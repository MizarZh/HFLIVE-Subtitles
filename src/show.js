var zimu = document.querySelector('.zimu');
localStorage.setItem('iniframejudege',true);

setInterval(function(){
    if (localStorage.getItem('iniframejudege') && window.frames.length != parent.frames.length) {
        localStorage.setItem('iniframejudege',false);
        zimu.classList.add('iniframe');
    }
    if(localStorage.getItem('updatediniframe') === 'false' && zimu.classList.contains('iniframe')){
        zimu.innerHTML = localStorage.getItem('linenow');
        zimu.style.fontSize = parseFloat(localStorage.getItem('fontSize'))*0.2 + 'px';
        zimu.style.marginBottom = parseFloat(localStorage.getItem('marginBottom'))*0.2 + 'px';
        localStorage.setItem('updatediniframe',true);
    }
    if(localStorage.getItem('updated') === 'false' && !(zimu.classList.contains('iniframe'))){
        zimu.innerHTML = localStorage.getItem('linenow');
        // 想改用直接操作stylesheet的方法但是遇到了跨域问题，怎么解决？
        zimu.style.fontSize = localStorage.getItem('fontSize');
        zimu.style.marginBottom = localStorage.getItem('marginBottom');
        localStorage.setItem('updated',true);
    }
},100)

window.addEventListener('unload',function(){
    localStorage.removeItem('linenow');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('marginBottom');
    localStorage.removeItem('updated');
    localStorage.removeItem('updatediniframe');
})
