class Pipe {
    constructor() {
        this.w = game.allImg["pipe_down"].width;
        this.h = game.allImg["pipe_down"].height;
        this.h1 = Math.round(Math.random() * 200 + 100);// 上面管子的高度，随机
        this.space = 140;
        this.h2 = game.canvas.height - game.allImg["land"].height - this.h1 - this.space;//下面管子的高度
        this.x = game.canvas.width;//管子在一屏之后在出来
        this.speed = 3;
        // 每new 一个管子，就会放入game的pipeArr中
        game.pipeArr.push(this);
    };
    update() {
        this.x -= this.speed;
        // 销毁没用的管子---走出画布的管子
        for (let i = 0; i < game.pipeArr.length; i++) {
            if ((game.pipeArr[i].x+this.w*2) <= -this.x) { 
                game.pipeArr.splice(i, 1);
                i--;
            }
        };

    };
    render() {
        game.draw.drawImage(game.allImg["pipe_down"], 0, this.h - this.h1, this.w, this.h1
            , this.x, 0, this.w, this.h1);

        game.draw.drawImage(game.allImg["pipe_up"], 0, 0, this.w, this.h2
            , this.x, this.h1 + this.space, this.w, this.h2);
    }
}