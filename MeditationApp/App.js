const app = () =>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('.vid-container video')


    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')
    
    //Get The Length of The Outline
    const outlineLength = outline.getTotalLength()
    console.log(outlineLength)

    //Duration
    let fakeDuration = 600

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    //Pick Different Sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song)
        })
    })
    //Play Sound
    play.addEventListener('click', ()=>{
        checkPlaying(song)
    })

    //Select Sound
    timeSelect.forEach(option =>{
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })

    //Stop and play a Sound function
    const checkPlaying = song => {
        if (song.paused){
            song.play()
            video.play()
            play.src = './assets/images/pause.svg'
        } else {
            song.pause()
            video.pause()
            play.src = './assets/images/play.svg'
        }
    }

    //Animate The Circle
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor(elapsed % 60)
        let minutes = Math.floor(elapsed / 60)

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress

        timeDisplay.textContent = `${minutes}:${seconds}`

        if(currentTime >= fakeDuration){
            song.pause()
            song.currentTime = 0
            play.src = './assets/images/play.svg'
            video.pause()
        }
    }
}

app()