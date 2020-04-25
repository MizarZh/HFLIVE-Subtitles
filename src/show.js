var zimu = document.querySelector('.zimu');
localStorage.setItem('inframejudege',true)
setInterval(function(){
    if (localStorage.getItem('inframejudege') && window.frames.length != parent.frames.length) {
        localStorage.setItem('inframejudege',false);
        zimu.classList.add('iniframe');
    }
    zimu.innerHTML = localStorage.getItem('linenow');
},10)
window.addEventListener('unload',function(){
    localStorage.removeItem('linenow');
})