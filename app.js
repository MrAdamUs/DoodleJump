document.addEventListener('DOMContentLoaded', () => {
   const grid = document.querySelector('.grid') 
   const doodler = document.createElement('div')
   let doodlerLeftSpace = 50
   let doodlerBootmSpace = 150
   let platformCount = 5
   let platforms = []
   let upTimerId
   let downTimerId

   function createDoodler() {
       grid.appendChild(doodler)
       doodler.classList.add('doodler')
       doodlerLeftSpace = platforms[0].left
       doodler.style.left = doodlerLeftSpace + 'px'
       doodler.style.bottom =  doodlerBootmSpace + 'px'
   }

   class Platform {
       constructor(newPlatBootom) {
           this.bottom = newPlatBootom
           this.left = Math.random() * 315
           this.visual = document.createElement('div')

           const visual = this.visual
           visual.classList.add('platform')
           visual.style.left = this.left + 'px'
           visual.style.bottom = this.bottom + 'px'
           grid.appendChild(visual)
       }
   }
   

   function createPlatforms() {
       for (let i=0; i < platformCount; i++) {
           let platGap = 600 / platformCount
           let newPlatBootom = 100 + i * platGap
           let newPlatform = new Platform (newPlatBootom)
           platforms.push(newPlatform)
           console.log(platforms)
       }
   }

   function movePlatforms() {
       if (doodlerBootmSpace > 200) {
           platforms.forEach(platform => {
               platform.bottom -= 4
               let visual = platform.visual
               visual.style.bottom = platform.bottom + 'px'
           })
       }
   }


   function jump() {
       clearInterval(downTimerId)
       upTimerId = setInterval(function () {
                doodlerBootmSpace += 20
                doodler.style.bottom = doodlerBootmSpace + 'px'
                if (doodlerBootmSpace > 350) {
                    fall()
                }
       },30)
   }

   function fall() {
       clearInterval(upTimerId)
       downTimerId = setInterval(function() {
           doodlerBootmSpace -= 5
           doodler.style.bottom = doodlerBootmSpace + 'px'
           if (doodlerBootmSpace <= 0) {
               gameOver()
           }
       }, 30)
   }

   function gameOver() {
       console.log('Game Over')
       isGameOver = true
       clearInterval(upTimerId)
       clearInterval(downTimerId)
   }

  let isGameOver = false

   function start() {
        if (!isGameOver) {
            createPlatforms()
            createDoodler()
           setInterval(movePlatforms, 30)  
           jump()
        }
   }
   //attach to button
   start()
})