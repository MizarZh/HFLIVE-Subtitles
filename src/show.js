var zimu = document.querySelector('.zimu');
setInterval(function(){
    zimu.innerHTML = localStorage.getItem('linenow');
},10)
window.addEventListener('unload',function(){
    localStorage.removeItem('linenow');
})