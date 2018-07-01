class Background {
    constructor() {
        // 获取背景图的宽高
        this.w = game.allImg["bg_day"].width;
        this.h = game.allImg["bg_day"].height;
        this.x = 0;
        this.speed = 2;// 动画速度
    };
    update() {
        this.x -= this.speed;// 向左移动
        this.x <= -this.w ? this.x = 0 : null;
    };
    render() {
        // 设置背景色，填充顶部空余部分
        game.draw.fillStyle = "#4ec0ca";//设置填充颜色
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);// 设置形状，0，0起始坐标，后面俩参数是宽高

        // 背景图片填充
        game.draw.drawImage(game.allImg["bg_day"], this.x, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["bg_day"], this.x + this.w, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["bg_day"], this.x + this.w * 2, game.canvas.height - this.h);
    };
};