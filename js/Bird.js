class Bird {
    constructor() {
        // 家的dd
        this.brd = 3
        this.w = game.allImg["bird0_0"].width;
        this.x = (game.canvas.width - this.w) / 2;//让小鸟在x轴的中间位置
        this.y = game.canvas.height * (1 - 0.618);// 固定比例，如身高比例
        this.wing = 0;// 小鸟翅膀状态，状态值对应着相应的图片
        this.status = "drop";// 小鸟状态，分别是 drop  up
        this.changeY = 0;//每一帧的变化量
        this.rotate = 0;// 旋转角度
    };
    update() {
        if (this.status == "drop") {
            this.changeY += 0.5;//默认速度每次渲染都会递增
            this.y += this.changeY; // 模仿自由加速度，自由落体的效果
            this.rotate += 0.08;
        } else if (this.status == "up") {
            this.changeY -= 0.5;//往上飞的时候，加速度会慢慢变小
            this.changeY <= 0 ? this.status = "drop" : null;
            this.y -= this.changeY;
            this.y <= 0 ? this.y = 0 : null;
            if (game.frame % 2 == 0) {
                this.wing >= 2 ? this.wing = 0 : this.wing++;  // 起飞的时候小鸟拍打翅膀，选择用图（其实是3张拍打翅膀的图轮换使用）
            };
        }


        // 34* 24 小鸟去除周围的空白的实质上的宽高，this.x是小鸟的x轴的坐标，所以获取小鸟左边this.x1和右边this.x2，上面this.y1和下面this.y2，四个临界边的左边
        this.x1 = this.x - 12;
        this.x2 = this.x + 12;
        this.y1 = this.y - 17;
        this.y2 = this.y + 17;


        if (this.y >= game.canvas.height - game.allImg["land"].height) {
            this.y = game.canvas.height - game.allImg["land"].height;
            document.getElementById("die").play();
            game.SM.enter(3);
        }
    };
    render() {

        // 用save 和restore 方法包裹中间代码，作用是仅对包裹内容起作用，其他的不会起作用，否则会作用的是全部canvas内容
        game.draw.save();
        game.draw.translate(this.x, this.y);// 坐标（原始在canvas的左上角0，0）平移到小鸟的坐标
        game.draw.rotate(this.rotate);
        game.draw.drawImage(game.allImg["bird0_" + this.wing], -24, -24);
        game.draw.restore();
    };

    fly() {
        document.getElementById("swooshing").play();
        this.changeY = 6;
        this.status = "up";
        this.rotate = -0.8;
    }
}
