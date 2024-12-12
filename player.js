// let play;
// play = document.getElementById('play');


let song_name = ['onotoke', 'kickback', 'idol', 'sunspots', 'alternate', 'happyhaunts', 'coffeestains'];
let artist = ['CREEPY NUTS', '米津玄師', 'YOASOBI', 'JEREMY BLAKE', 'VIBE TRACKS', 'AARON KENNY', 'RIOT'];
let song_index = 0;

window.onload

// duration：音源的時間, in seconds(用get方式取得)
// let duration = $('#Myaudio').get(0).duration;
// 歌曲現在時間
// let currentTime = $('#Myaudio')[0].currentTime;
// 時間軸計時器
let songTimer; 
let TimeText;

// 時間軸計時器
function startSongTimer(){
    let Interval = 1000;
    songTimer = setInterval(sliderProgress, Interval);
    // TimeText = setInterval(songTimeText, Interval);
}

// 停止時間軸計時器
function stopSongTimer(){
    if(songTimer){
        clearInterval(songTimer);
        songTimer = null;
    }
}


// play()、pause()是DOM元素，不是 jQuery 的 function，要用 jQuery 取得DOM元素
let state = 0;
function musicplay(){
    let audio = document.getElementById('Myaudio');

    if (state == 0){
        audio.play();
        state = 1;
        startSongTimer();
        // console.log(state);
    }else{
        audio.pause();
        state = 0
        stopSongTimer();
        // console.log(state);
    }
}


document.addEventListener("DOMContentLoaded", function(){
    const audio = $('#Myaudio');
    if(audio){
        audio.currentTime = 0;
        $('#slider').attr('value', '0');
    }
})
// 下一首更新音樂，歌名，歌手，圖片
function loadsong(song){
        $('#song_title').text(song);
        $('#artist_name').text(artist[song_index]);
        
        // 設定src屬性
        $('#Myaudio').attr('src', `./song/${song}.m4a`);
        $('.album').attr('src', `./image/${song}.jpg`);
    
        // 更新時間軸，歌曲現在時間
        $('#slider').val(0);
        console.log($('#slider').value);
        // $('#Myaudio')[0].currentTime = 0;
        
        // $('#slider').attr('value', 0);
        
        
        songTimeText();
}

// function loadsong(song){
//     $('#song_title').text(song);
//     $('#artist_name').text(artist[song_index]);
    
//     // 設定src屬性
//     $('#Myaudio').attr('src', `./song/${song}.m4a`);
//     $('.album').attr('src', `./image/${song}.jpg`);

//     // 更新時間軸，歌曲現在時間
//     $('#Myaudio')[0].currentTime = 0;
    
    
    
//     $('#slider').attr('value', 0);
    
    
//     songTimeText();
// }

function nextsong(){
    if(song_index < song_name.length - 1){
        song_index++;
    }else{
        song_index = 0;
    }
    loadsong(song_name[song_index]);
}

function prevsong(){
    if(song_index > 0){
        song_index--;
    }else{
        song_index = song_name.length - 1;
    }
    loadsong(song_name[song_index]);
}

// 更新歌曲現在時間，parseint()轉整數
function songTimeText(){
    let currentTime = $('#Myaudio')[0].currentTime;
    let min =  parseInt(currentTime / 60);
    let seconds = parseInt(currentTime % 60);
    
    // 10秒內，text呈現'00:00'
    if(seconds < 10){
        $('#songTimeText').text('0' + min + ':' + '0' + seconds);
    }else{
        $('#songTimeText').text('0' + min + ':' + seconds);
    }
}


function sliderProgress(){
    // duration：音源的時間, in seconds(用get方式取得)
    let duration = $('#Myaudio').get(0).duration;
    // console.log(duration);
    let currentTime = $('#Myaudio')[0].currentTime;
    // console.log(currentTime);

    // let slider = $('#slider');
    let sliderPercent = (currentTime / duration) * 100;
    $('#slider').attr('value', sliderPercent);

    songTimeText();
}

// function clickSlider(e){
//     const slider = document.getElementById('slider')
//     const width = $('#slider').width();
//     var elm = $(this);
//     var xpos = e.pageX - elm.offset().left;
//     console.log(xpos);
// }

// let state = 0
// play.addEventListener('click', musicPlay)

// 問題 : id:play抓不到  DOM Button Object
// 解決: run code until DOMContentLoaded has completed:
window.addEventListener("DOMContentLoaded", (event) => {
    const play = document.getElementById('play');
    if (play) {
        play.addEventListener('click', musicplay);
    }
})

// 下一首按鈕執行 nextsong()
window.addEventListener("DOMContentLoaded", (event) => {
    const next = document.getElementById('next')
    if (next) {
        next.addEventListener('click', nextsong);
    }
})

// 上一首執行 prevsong()
window.addEventListener("DOMContentLoaded", (event) => {
    const prev = document.getElementById('prev')
    if (prev) {
        prev.addEventListener('click', prevsong);
    }
})

// 移動音樂時間軸
window.addEventListener("DOMContentLoaded", (event) => {
    const slider = document.getElementById('slider')
    if (slider) {
        $('#slider').click(function clickSlider(e){
            
            const width = $('#slider').width();
            var elm = $(this);                         //  $(this) : "自己"，'#slider'
            // 滑鼠點擊位置在頁面的X座標 減掉 slider原點(最左邊)的X座標 ; offset().left 離頁面左邊界之距離
            var xpos = e.pageX - elm.offset().left;                   
            
            let duration = $('#Myaudio').get(0).duration;
            var theTime = (xpos / width) * duration;
            $('#Myaudio')[0].currentTime = theTime;
            console.log($('#slider').attr('value'));
        });
    }
})



