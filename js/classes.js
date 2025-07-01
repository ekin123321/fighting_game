class Sprite {
    constructor({ pos, imageSrc, scale = 1, framesmax = 1, animOffset = { x: 0, y: 0 } }) {
        this.pos = pos
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesmax = framesmax
        this.framescurrent = 0
        this.frameselapsed = 0
        this.frameshold = 10
        this.animOffset = animOffset
    }
    draw() {


        ctx.drawImage(
            this.image,
            this.framescurrent * (this.image.width / this.framesmax),
            0,
            this.image.width / this.framesmax,
            this.image.height,
            this.pos.x - this.animOffset.x,
            this.pos.y - this.animOffset.y,
            this.image.width / this.framesmax * this.scale,
            this.image.height * this.scale

        )
    }
    update() {
        this.draw()
        this.animateFrames()

    }
    animateFrames() {
        this.frameselapsed++

        if (this.frameselapsed % this.frameshold === 0) {
            if (this.framescurrent < this.framesmax - 1) {
                this.framescurrent++
            } else {
                this.framescurrent = 0
            }

        }
    }
}

class Fighter extends Sprite {
    constructor({ pos, vel, color = "blue", imageSrc, scale = 1, framesmax = 1, animOffset = { x: 0, y: 0 }, sprites,
        attackBox = {
            offset: {},
            width: undefined,
            height: undefined
        } }) {
        super({ pos, imageSrc, scale, framesmax, animOffset })
        this.vel = vel
        this.width = 50
        this.height = 150
        this.lastkey
        this.attackBox = {
            position: {
                x: this.pos.x,
                y: this.pos.y
            },
            width: attackBox.width,
            height: attackBox.height
            , offset: attackBox.offset,




        }
        this.protectr = protectr
        this.color = color
        this.color2 = color2
        this.isAttacking
        this.health = 100
        this.dead = false
        this.framescurrent = 0
        this.frameselapsed = 0
        this.frameshold = 10
        this.sprites = sprites
        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image()
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc
        }
    }
  power() {
    // Initialize attack sphere if not exists
    if (!this.attackSphere) {
        this.attackSphere = new AttackSphere(this);
    }
    
    // Update attack sphere
    this.attackSphere.update();
    
    // Draw shield for player
    if (protecting && this === player) {
        let color = ilkzaman ? 'white' : this.color2;
        this.attackSphere.draw(ctx, color, protectr, 'shield');
    }
    
    // Draw charge effect for enemy
    if (hasar && this === enemy) {
        this.attackSphere.draw(ctx, 'white', buyuyenr, 'charge');
    }
}

    update() {
        this.draw()
        this.power()
        if (!this.dead) {
            this.animateFrames()
        }
        this.attackBox.position.x = this.pos.x + this.attackBox.offset.x
        this.attackBox.position.y = this.pos.y + this.attackBox.offset.y
        // ctx.fillStyle = 'green'
        // ctx.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // )
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y

        if (this.pos.y + this.height + this.vel.y >= canvas.height - 96) {
            this.vel.y = 0
            this.pos.y = 330
        } else { this.vel.y += gravity }
    }
    attack() {
        this.switchSprite("attack1")
        this.isAttacking = true

    }

    switchSprite(sprite) {

        if (this.image === this.sprites.death.image) {
            if (this.framescurrent == this.sprites.death.framesmax - 1) {
                this.dead = true
            }
            return
        }

        if (this.image === this.sprites.attack1.image &&
            this.framescurrent < this.sprites.attack1.framesmax - 1) {
            return
        }
        if (this.image === this.sprites.takehit.image &&
            this.framescurrent < this.sprites.takehit.framesmax - 1) {
            return
        }

        switch (sprite) {
            case "idle":
                if (this.image != this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesmax = this.sprites.idle.framesmax
                    this.framescurrent = 0
                }
                break;
            case "run":
                if (this.image != this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesmax = this.sprites.run.framesmax
                    this.framescurrent = 0
                }
                break;
            case "jump":
                if (this.image != this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesmax = this.sprites.jump.framesmax
                    this.framescurrent = 0
                }
                break;
            case "fall":
                if (this.image != this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesmax = this.sprites.fall.framesmax
                    this.framescurrent = 0
                }
                break;
            case "attack1":
                if (this.image != this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesmax = this.sprites.attack1.framesmax
                    this.framescurrent = 0
                }
                break;
            case "takehit":
                if (this.image != this.sprites.takehit.image) {
                    this.image = this.sprites.takehit.image
                    this.framesmax = this.sprites.takehit.framesmax
                    this.framescurrent = 0

                }
                break;
            case "death":
                if (this.image != this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesmax = this.sprites.death.framesmax
                    this.framescurrent = 0
                }
                break;





            default:
                break;
        }
    }

}

class Bomb {
    constructor({ }) {
        this.posx = enemy.pos.x
        this.posy = enemy.pos.y
        this.x = 8
        this.y = -2
        if (enemy.lastkey == "ArrowRight") { this.x = this.x }
        if (enemy.lastkey == "ArrowLeft") { this.x = -this.x }
        this.width = 30
        this.height = 30
    }


    draw() {


        ctx.fillStyle = "red"

        ctx.fillRect(this.posx, this.posy, this.width, this.height)


    }
    update() {
        this.draw()

        this.posx += this.x
        this.posy += this.y
        this.y += 0.1


    }
}

class AttackSphere {
    constructor(owner) {
        this.owner = owner;
        this.x = owner.pos.x + owner.width / 2;
        this.y = owner.pos.y + owner.height / 2;
        this.radius = 150;
        this.pulseTime = 0;
        this.active = false;
        this.opacity = 1;
    }
    
    update() {
        // Follow owner position
        this.x = this.owner.pos.x + this.owner.width / 2;
        this.y = this.owner.pos.y + this.owner.height / 2;
        
        // Subtle pulse effect
        this.pulseTime += 0.05;
    }
    
    draw(ctx, color = 'white', radius = 150, mode = 'normal') {
        ctx.save();
        
        if (mode === 'shield') {
            // Shield mode - simple double circle
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.8;
            
            // Outer circle
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Inner circle with slight pulse
            const pulse = Math.sin(this.pulseTime) * 5;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius - 10 + pulse, 0, Math.PI * 2);
            ctx.stroke();
            
        } else if (mode === 'charge') {
            // Charge mode - growing circle with increasing opacity
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            
            // Main circle
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Pulsing inner circle
            const pulse = Math.sin(this.pulseTime * 2) * 10;
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius - 20 + pulse, 0, Math.PI * 2);
            ctx.fill();
            
        } else {
            // Normal mode - clean single circle
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Reset global alpha to prevent affecting other drawings
      ctx.globalAlpha = 1;
        ctx.restore();,
        
    }
}
