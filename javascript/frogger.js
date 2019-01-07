(function() {
    
    function Frog() {
        
        //init var
        var rLock = false;
        var x = 308;
        var y = 416;
        var position = "up";
        var animationNbr = 0;
        var animationStuck = false;
        var up = false;
        var down = false;
        var left = false;
        var right = false;
        var nextMove = "";
        var onDieEvent = false;
        var dieCountAnimation = 0;
        
        //nextMove function to apply a next move when a keyEvent is call while
        //a move
        var applyNextMove = function() {
            switch(nextMove) {
                case "up": position = "up"; up = true; break;
                case "down": position = "down"; down = true; break;
                case "left": position = "left"; left = true; break;
                case "right":  position = "right"; right = true; break;
                default : console.log("nextMove Error");
            }
            nextMove = "";
        }
        
        this.isOnLilywater = function() {
            if ((x === 36 || x === 172 || x === 308 || x === 444 || x === 580) 
                && y ===8) {
                    position = "down";
                    return true;
            }
            else return false;
        }
        
        this.isOnRoad = function() {
            return (y === 178
                    || y === 144
                    || y === 110
                    || y === 76
                    || y === 42);
        }
        
        this.isOnWater = function() {
            return (y === 382
                    || y === 348
                    || y === 314
                    || y === 280
                    || y === 246);
        }
        
        this.isOutOfMap = function() {
            return (x < 0
                    || x > 614
                    || y >= 425
                    || ((y < 34) && (x%136 != 36)));
        }
        
        this.isOnDieEvent = function() {
            return onDieEvent;
        }
        
        this.activateDieEvent = function() {
            onDieEvent = true;
            dieCountAnimation = 0;
        }
        
        //return data for collides test
        this.getCollidesData = function() {
            return [x,y,34,34];
        }
        
        //Calcul for next Frame
        this.next = function() {
            
            if (!onDieEvent) {
                //do movement when the frog is on river area
                switch(y) {
					case 416: if (rLock) rLock = false; break;
                    case 382: x += (-3); rLock = true; break;
                    case 348: x += 2; rLock = false; break;
                    case 314: x += (-4);break;
                    case 280: x += 3;break;
                    case 246: x += (-2); rLock = true; break;
                    case 212: if (rLock) rLock = false;
                }
				if (rLock && (y === 396 || y === 232)) {
					x += (x%34 < 17)? (-((x%34)-2)):(-(((x%34)-2)-34));
				}
                if (up) {
                    y -= (animationNbr === 0) ? 7 : 5;
                    animationStuck = (!animationStuck) ? true : false;
                    if (!animationStuck) animationNbr = (animationNbr+1)%3;
                    if (animationNbr === 0 && !animationStuck) {
                        up = false;
                        if (nextMove != "") applyNextMove();
                    }
                }
                else if (down) {
                    y += (animationNbr === 0) ? 7 : 5;
                    animationStuck = (!animationStuck) ? true : false;
                    if (!animationStuck) animationNbr = (animationNbr+1)%3;
                    if (animationNbr === 0 && !animationStuck) {
                        down = false;
                        if (nextMove != "") applyNextMove();
                    }
                }
                else if (left) {
                    x -= (animationNbr === 0) ? 7 : 5;
                    animationStuck = (!animationStuck) ? true : false;
                    if (!animationStuck) animationNbr = (animationNbr+1)%3;
                    if (animationNbr === 0 && !animationStuck) {
                        left = false;
                        if (nextMove != "") applyNextMove();
                    }
                }
                else if (right) {
                    x += (animationNbr === 0) ? 7 : 5;
                    animationStuck = (!animationStuck) ? true : false;
                    if (!animationStuck) animationNbr = (animationNbr+1)%3;
                    if (animationNbr === 0 && !animationStuck) {
                        right = false;
                        if (nextMove != "") applyNextMove();
                    }
                }
            }
        }
        
        //draw the Frog
        this.draw = function(gfx, ctx) {
            var sx = null;
            var sy = null;
            if (!onDieEvent) {
                switch(animationNbr) {
                    case 0: 
                        sx = (position === "up" || position === "right") ? 
                            68 : 170;
                        break;
                    case 1:
                        sx = (position === "up" || position === "right") ? 
                            34 : 136;
                        break;
                    case 2:
                        sx = (position === "up" || position === "right") ? 
                            0 : 102;
                        break;
                    default : sx = 0; console.log("error aNbr");
                }
                sy = (position === "up" || position === "down") ? 42 : 76;
                ctx.drawImage(gfx, sx, sy, 34, 34, x, y, 34, 34);
            } else {
                if (dieCountAnimation >= 0 && dieCountAnimation < 6) {
                    ctx.drawImage(gfx, 0, 178, 34, 34, x, y, 34, 34);
                }
                else if (dieCountAnimation >= 6 && dieCountAnimation < 12) {
                    ctx.drawImage(gfx, 34, 178, 34, 34, x, y, 34, 34);
                }
                else if (dieCountAnimation >= 12 && dieCountAnimation < 18) {
                    ctx.drawImage(gfx, 68, 178, 34, 34, x, y, 34, 34);
                }
                else if (dieCountAnimation >= 18 && dieCountAnimation < 24) {
                    ctx.drawImage(gfx, 102, 178, 34, 34, x, y, 34, 34);
                }
                else if (dieCountAnimation >= 24 && dieCountAnimation < 32) {
                    ctx.drawImage(gfx, 136, 178, 34, 34, x, y, 34, 34);
                }
                else if (dieCountAnimation >= 32 && dieCountAnimation < 38) {
                    ctx.drawImage(gfx, 170, 178, 34, 34, x, y, 34, 34);
                }
                else if (dieCountAnimation >= 38 && dieCountAnimation%4 === 0) {
                    ctx.drawImage(gfx, 0, 212, 34, 34, x, y, 34, 34);
                }
                else if (dieCountAnimation >= 38 && dieCountAnimation%4 != 0) {
                    ctx.drawImage(gfx, 34, 212, 34, 34, x, y, 34, 34);
                }
                dieCountAnimation ++;
                if (dieCountAnimation === 81) {
                    this.reset();
                }
            }
            
        }
        
        //KeyEvent
        this.moveUp = function() {
            if (!down && !left && !right) {
                up = true;
                position = "up";
            } else nextMove = "up";
        }
        this.moveDown = function() {
            if (!up && !left && !right && y != 416) {
                down = true;
                position = "down";
            } else if (y != 416) nextMove = "down";
        }
        this.moveLeft = function() {
            if (!up && !down && !right) {
                left = true;
                position = "left";
            } else nextMove = "left";
        }
        this.moveRight = function() {
            if (!up && !down && !left) {
                right = true;
                position = "right";
            } else nextMove = "right";
        }
        
        //reset the frog when die
        this.reset = function() {
            rLock = false;
            x = 308;
            y = 416;
            position = "up";
            animationNbr = 0;
            animationStuck = false;
            up = false;
            down = false;
            left = false;
            right = false;
            nextMove = "";
            onDieEvent = false;
            dieCountAnimation = 0;
        }
        
        this.hidden = function() {
            x = -34;
            y = -34;
        }
    }
    
    function Car(id) {
        
        //Init var
        var line = id[0];
        var nbr = id[1];
        var speed = id[2];
        var x = null;
        var y = null;
        var animationNbr = 0;
        var sx = 34;
        
        if (line === 2 || line === 4) speed = -speed;
        
        //init y
        switch(line) {
            case 1: y = 178; break;
            case 2: y = 144; break;
            case 3: y = 110; break;
            case 4: y = 76; break;
            case 5: y = 42; break;
            default: 
                y = -34; 
                console.log("error car: Y position");
        }
        
        //init x
        switch(nbr) {
            case 1: x = 200; break;
            case 2: x = (line === 5)? 468:434; break;
            case 3: x = 668; break;
            default:
                x = -68;
                console.log("error car: X position");
        }
        
        //return data collides
        this.getCollidesData = function() {
            return [(x+15),y,(line === 5)? 38:4,34];
        }
        
        //calcul the next position
        this.next = function() {
            if (line === 2 || line === 4) {
                x = (x < -50)? 700 : (x+speed);
            }
            else {
                x = (x > 700)? -50 : (x+speed);
            }
        }
        
        //draw the car
        this.draw = function(gfx, ctx) {
            animationNbr = (animationNbr === 4)? 0:(animationNbr+1);
            switch (line) {
                case 1:
                    ctx.drawImage(gfx, 136, 110, 34, 34, x, y, 34, 34); break;
                case 2:
                    if ((animationNbr%5) === 0) sx = (sx === 34)? 68:34;
                    ctx.drawImage(gfx, sx, 110, 34, 34, x, y, 34, 34); 
                    break;
                case 3:
                    ctx.drawImage(gfx, 0, 110, 34, 34, x, y, 34, 34); break;
                case 4:
                    ctx.drawImage(gfx, 102, 110, 34, 34, x, y, 34, 34); break;
                case 5:
                    ctx.drawImage(gfx, 0, 144, 68, 34, x, y, 68, 34); break;
                default: 
                    console.log("error car: line draw");
            }
        }
    }

    function WoodLog(id) {
        
        //init var
        var x = null;
        var y = null;
        var width = null;
        var line = id[0];
        var nbr = id [1];
        var speed = id[2];
        
        if (line === 1 || line === 3 || line === 5) speed = -speed;
        
        //init y
        switch(line) {
            case 1: y = 382; width = 3; break;
            case 2: y = 348; width = 2; break;
            case 3: y = 314; width = 4; break;
            case 4: y = 280; width = 2; break;
            case 5: y = 246; width = 3; break;
            default: 
                y = -34; 
                console.log("error WoodLog: Y position");
        }
        
        //init x
        switch(nbr) {
            case 1: x = 0; break;
            case 2: x = (100+(width*34)); break;
            case 3: x = (200+(width*68)); break;
            default:
                x = -68;
                console.log("error WoodLog: X position");
        }
        
        //return data collides
        this.getCollidesData = function() {
            return [(x+15),y,((width*34)-30),34];
        }
        
        //calcul the next position
        this.next = function() {
            if (line === 1 || line === 3 || line === 5) {
                x = (x < (-50-(width*34)))? 700 : (x+speed);
            }
            else {
                x = (x > (700+(width*34)))? -100 : (x+speed);
            }
        }
        
        //draw the woodLog
        this.draw = function(gfx, ctx) {
            switch (line) {
                case 1:
                    ctx.drawImage(gfx, 68, 144, 34, 34, x, y, 34, 34);
                    ctx.drawImage(gfx, 102, 144, 34, 34, (x+34), y, 34, 34);
                    ctx.drawImage(gfx, 136, 144, 34, 34, x+68, y, 34, 34);
                    break;
                case 2:
                    ctx.drawImage(gfx, 68, 144, 34, 34, x, y, 34, 34);
                    ctx.drawImage(gfx, 136, 144, 34, 34, (x+34), y, 34, 34);
                    break;
                case 3:
                    ctx.drawImage(gfx, 68, 144, 34, 34, x, y, 34, 34);
                    ctx.drawImage(gfx, 102, 144, 34, 34, (x+34), y, 34, 34);
                    ctx.drawImage(gfx, 102, 144, 34, 34, (x+68), y, 34, 34);
                    ctx.drawImage(gfx, 136, 144, 34, 34, (x+102), y, 34, 34);
                    break;
                case 4:
                    ctx.drawImage(gfx, 68, 144, 34, 34, x, y, 34, 34);
                    ctx.drawImage(gfx, 136, 144, 34, 34, (x+34), y, 34, 34);
                    break;
                case 5:
                    ctx.drawImage(gfx, 68, 144, 34, 34, x, y, 34, 34);
                    ctx.drawImage(gfx, 102, 144, 34, 34, (x+34), y, 34, 34);
                    ctx.drawImage(gfx, 136, 144, 34, 34, (x+68), y, 34, 34);
                    break;
                default: 
                    console.log("error WoodLog: line draw");
            }
        }
    }
    
    window.addEventListener('load', function() {
        
        //event for the modal bow (win or loose)
        document.getElementById("restartGame").onclick = function() {
            window.location.href = "#close";
            restartGame();
        }
        
        //Get canvas element
        var elem = document.getElementById('froggerCanvas');
        if (!elem || !elem.getContext) {
            console.log('error getCanvas')
            return;
        }
        //Get canvas context
        var ctx = elem.getContext('2d');
        if (!ctx) {
            console.log('error getContext2D')
            return;
        }
        
        //init var
        var timer = 559;
        var speedTimer = 0;
        var life = 3;
        var frameLocker = false;
        var loop = null;
        var currentFrog = 0;
        var frogArray = [
            new Frog()
        ];
        var speedArray = [
            Math.floor((Math.random()*4)+2),
            Math.floor((Math.random()*4)+2),
            Math.floor((Math.random()*4)+2),
            Math.floor((Math.random()*4)+2),
            Math.floor((Math.random()*4)+2)
        ];
        var carTab = [
            new Car([1,1,speedArray[0]]),
            new Car([1,2,speedArray[0]]),
            new Car([1,3,speedArray[0]]),
            new Car([2,1,speedArray[1]]),
            new Car([2,2,speedArray[1]]),
            new Car([2,3,speedArray[1]]),
            new Car([3,1,speedArray[2]]),
            new Car([3,2,speedArray[2]]),
            new Car([3,3,speedArray[2]]),
            new Car([4,1,speedArray[3]]),
            new Car([4,2,speedArray[3]]),
            new Car([4,3,speedArray[3]]),
            new Car([5,1,speedArray[4]]),
            new Car([5,2,speedArray[4]])
        ];
        var woodLogArray = [
            new WoodLog([1,1,3]),
            new WoodLog([1,2,3]),
            new WoodLog([1,3,3]),
            new WoodLog([2,1,2]),
            new WoodLog([2,2,2]),
            new WoodLog([2,3,2]),
            new WoodLog([3,1,4]),
            new WoodLog([3,2,4]),
            new WoodLog([4,1,3]),
            new WoodLog([4,2,3]),
            new WoodLog([4,3,3]),
            new WoodLog([5,1,2]),
            new WoodLog([5,2,2]),
            new WoodLog([5,3,2])
        ];
        
        //init the gfx and the game loop
        var gfx = new Image();
        gfx.onload = function() {
            loop = window.setInterval(loopGame, 25);
            window.document.onkeydown = keyDownEvent;
        };
        gfx.src = "images/gfx.png";
        
        function loopGame() {
            if (!frogArray[currentFrog].isOnDieEvent()) {
                var x = null;
                var isOnWoodLog = false;
                speedTimer = (speedTimer === 1)? 0:speedTimer+1;
                if (speedTimer === 0 && timer > -1) timer--;
                if (timer === -1) {
                    die();
                }
                else if (frogArray[currentFrog].isOutOfMap()) {
                        die();
                }
                //collides test when the frog is on the road
                else if (frogArray[currentFrog].isOnRoad()) {
                    for (x = carTab.length; x > 0; x--) {
                        if (collides(carTab[x-1].getCollidesData(),
                            frogArray[currentFrog].getCollidesData())) {
                                die();
                                break;
                            }
                    }
                }
                //collides test when the frog is on the river
                else if (frogArray[currentFrog].isOnWater()) {
                    for (x = woodLogArray.length; x > 0; x--) {
                        if (collides(woodLogArray[x-1].getCollidesData(),
                            frogArray[currentFrog].getCollidesData())) {
                                isOnWoodLog = true;
                                break;
                        }
                    }
                    if (!isOnWoodLog) {
                        die();
                    }
                }
                else if (frogArray[currentFrog].isOnLilywater()) {
                    for (x = frogArray.length; x > 0; x--) {
                        if ((collides(frogArray[x-1].getCollidesData(),
                            frogArray[currentFrog].getCollidesData()))
                            && ((x-1) != currentFrog)) {
                                die();
                                break;
                        }
                    }
                }
                if (life === 0 && !frogArray[currentFrog].isOnDieEvent()) {
                    timer = 0;
                    frogArray[currentFrog].hidden();
                    renderFrame();
                    loose();
                }
                else if (frogArray[currentFrog].isOnLilywater() 
                    && currentFrog === 4) {
                        if (!frameLocker) renderFrame();
                        win();
                }
                else if (frogArray[currentFrog].isOnLilywater() 
                    && currentFrog < 4
                    && !frogArray[currentFrog].isOnDieEvent()) {
                        timer = 559;
                        frogArray.push(new Frog());
                        currentFrog ++;
                }
                else {
                    nextFrame();
                    if (!frameLocker) renderFrame();
                }
            }
            else {
                nextFrame();
                if (!frameLocker) renderFrame();
            }
        }
        
        //calcul all elemnts of the canvas for the next Frame
        function nextFrame() {
            for (var x = carTab.length; x > 0; x--) {
                carTab[x-1].next();
            }
            for ( x = woodLogArray.length; x > 0; x--) {
                woodLogArray[x-1].next();
            }
            frogArray[currentFrog].next();
        }
        
        //draw all the canvas
        function renderFrame() {
            frameLocker = true;
            
            ctx.fillStyle = "#000047";
            ctx.fillRect(0, 246, 650, 170);
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 42, 650, 170);
            ctx.fillRect(0, 450, 650, 34);
            
            //draw Background / clean old Frame
            var x = null;
            for (x = 0; x < 650; x += 136) {
                ctx.drawImage(gfx, 0, 0, 106, 42, x, 0, 106, 42);
            }
            for (x = 106; x < 650; x += 136) {
                ctx.drawImage(gfx, 106, 0, 30, 42, x, 0, 30, 42);
            }
            for (x = 36; x < 650; x += 136) {
                ctx.drawImage(gfx, 170, 110, 34, 29, x, 12, 34, 29);
            }
            for (x = 0; x < 650; x += 34) {
                ctx.drawImage(gfx, 136, 0, 34, 34, x, 212, 34, 34);
                ctx.drawImage(gfx, 170, 0, 34, 34, x, 416, 34, 34);
            }
            
            for (x = 0; x < life; x++) {
                ctx.drawImage(gfx, 179, 160, 16, 16, 9+(16*x), 459, 16, 16);
            }
            
            ctx.drawImage(gfx, 179, 144, 16, 16, 66, 459, 16, 16);
            
            ctx.fillStyle = "#00cc00";
            ctx.fillRect(82, 459, timer, 16);
            
            for (x = carTab.length; x > 0; x--) {
                carTab[x-1].draw(gfx, ctx);
            }
            for (x = woodLogArray.length; x > 0; x--) {
                woodLogArray[x-1].draw(gfx, ctx);
            }
            var fl = frogArray.length;
            for (x = 0; x < fl; x++) {
                frogArray[x].draw(gfx, ctx);
            }

            frameLocker = false;
        }
        
        //keyEvent
        function keyDownEvent(e) {
            switch(e.keyCode) {
                case 37: frogArray[currentFrog].moveLeft(); break;
                case 38: frogArray[currentFrog].moveUp(); break;
                case 39: frogArray[currentFrog].moveRight(); break;
                case 40: frogArray[currentFrog].moveDown(); break;
                default: 
                    console.log("key code nbr " + e.keyCode 
                        + " is not assigned");
            }
        }
        
        //rectangle collides function
        function collides(a, b) {
            return a[0] < b[0] + b[2] &&
                   a[0] + a[2] > b[0] &&
                   a[1] < b[1] + b[3] &&
                   a[1] + a[3] > b[1];
        }
        
        function die() {
            frogArray[currentFrog].activateDieEvent();
            life --;
            if (life >= 0) timer = 559;
        }
        
        function win() {
            document.getElementById("titleModal").innerHTML = "You win !"
            window.location.href = "#openModal";
            window.clearInterval(loop);
        }
        
        function loose() {
            document.getElementById("titleModal").innerHTML = "You loose !"
            window.location.href = "#openModal";
            window.clearInterval(loop);
        }
        
        function restartGame() {
            timer = 559;
            life = 3;
            frameLocker = false;
            currentFrog = 0;
            frogArray = [
                new Frog()
            ];
            loop = window.setInterval(loopGame, 25);
        }

    }, false);
    
})();