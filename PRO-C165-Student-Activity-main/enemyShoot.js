AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy")
        for(var i = 0;i<els.length;i++){
            var enemyBullet = document.createElement("a-entity")
            enemyBullet.setAttribute("geometry",{
                primitive:"sphere",
                radius:0.1
            })
            enemyBullet.setAttribute("material","color","#282B29")
            var position = els[i].getAttribute("position")
            enemyBullet.setAttribute("position",{
                x:position.x+1.5,
                y:position.y+3.5,
                z:position.z
            })
            var scene = document.querySelector("#scene")
            scene.appendChild(enemyBullet)
        
            //Three.js Vector Variables
            var pos1 = new THREE.Vector3()
            var pos2 = new THREE.Vector3()
            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D

            //Get enemey and player position using Three.js methods
            player.getWorldPosition(pos1)
            enemy.getWorldPosition(pos2)

            //set the velocity and it's direction
            var direction = new THREE.Vector3()
            direction.subVectors(pos1,pos2).normalize()
            enemyBullet.setAttribute("velocity",direction.multiplyScalar(10))
            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:"0",
            })

            //Get text attribute
            var element = document.querySelector("#countLife")
            var playerLife = parseInt(element.getAttribute("text").value)

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    if(playerLife>0){
                        playerLife-=1
                        element.setAttribute("text",{
                            value:playerLife
                        })
                    }
                    if(playerlife<0){
                        var txt = document.querySelector("#over")
                        txt.setAttribute("visible",true)
                        var tankel = document.querySelectorAll(".enemy")
                        for (var i=0;i<tankel.length;i++){
                            scene.removeChild(tankel[i])
                        }
                    }


                }
            });

        }
    },

});