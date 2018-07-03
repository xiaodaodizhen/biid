class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        // 创建一个绘制环境 2d环境
        this.draw = this.canvas.getContext("2d");
        // 如果文档宽度（pc端是视口）大于420，就设置为420，否则设置值为获取的文档宽度，（大于420的算是pc,小于420的是移动）
        let W = document.documentElement.clientWidth > 420 ? 420 : document.documentElement.clientWidth;
        let H = document.documentElement.clientHeight > 750 ? 750 : document.documentElement.clientHeight;
        //设置画布的宽高
        this.canvas.width = W;
        this.canvas.height = H;
        // 定义定时器（null 不占用内存）
        this.timer = null;
        this.imgLoad();

        this.frame = 0;// 控制管子的出现
        // this.bindEvent();// 给canvas 绑定事件
        this.score = 0;// 分数

        this.scence = 0;// 场景默认为0

        if (!localStorage.getItem("FB")) {
            localStorage.setItem("FB", "[]");
        }
    };
    // 清屏
    clear() {
        // 清除整个画布
        this.draw.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    // 开始
    // start() {
    //     this.bg = new Background();
    //     this.land = new Land();
    //     this.bird = new Bird();
    //     this.pipeArr = [];// 用来存放管子，具体存放在Pipe.js中
    //     this.timer = setInterval(() => {
    //         this.frame++;
    //         // 每20毫秒 就执行一帧，执行前要清除以前的画面=》 更新=》渲染
    //         this.clear();
    //         this.bg.update();
    //         this.bg.render();
    //         this.land.update();
    //         this.land.render();
    //         if (this.frame % 150 == 0) {
    //             new Pipe();// 每次new 一个管子，就会在Pipe.js中的代码中，执行 game.pipeArr.push(this);this代表new的实例，将本实例放入管子数组
    //         }
    //         // 将数组中的管子渲染出来
    //         this.pipeArr.forEach(item => {
    //             item.update();
    //             item.render();
    //         });
    //         this.bird.update();
    //         this.bird.render();

    //     }, 20);
    // };
    start() {
        this.SM = new SceneManager();
        this.SM.enter(this.scence);
        this.timer = setInterval(() => {
            this.frame++;
            this.clear();
            this.SM.updateAndRender();
        }, 20);
    };
    // 加载图片-----将图片字符串地址都转换为new Image()实例模式
    imgLoad() {
        this.allImg = {
            "bg_day": "images/bg_day.png",
            "land": "images/land.png",
            "pipe_down": "images/pipe_down.png",
            "pipe_up": "images/pipe_up.png",
            "bird0_0": "images/bird0_0.png",
            "bird0_1": "images/bird0_1.png",
            "bird0_2": "images/bird0_2.png",
            "title": "images/title.png",
            "button_play": "images/button_play.png",
            "tutorial": "images/tutorial.png",
            "shuzi0": "images/font_048.png",
            "shuzi1": "images/font_049.png",
            "shuzi2": "images/font_050.png",
            "shuzi3": "images/font_051.png",
            "shuzi4": "images/font_052.png",
            "shuzi5": "images/font_053.png",
            "shuzi6": "images/font_054.png",
            "shuzi7": "images/font_055.png",
            "shuzi8": "images/font_056.png",
            "shuzi9": "images/font_057.png",
            "baozha1": "images/1.png",
            "baozha2": "images/2.png",
            "baozha3": "images/3.png",
            "baozha4": "images/4.png",
            "baozha5": "images/5.png",
            "baozha6": "images/6.png",
            "baozha7": "images/7.png",
            "baozha8": "images/8.png",
            "baozha9": "images/9.png",
            "game_over": "images/text_game_over.png",
            "score_panel": "images/score_panel.png",
            "medals_0": "images/medals_0.png",
            "medals_1": "images/medals_1.png",
            "medals_2": "images/medals_2.png",
            "medals_3": "images/medals_3.png",
        };
        let count = 0, total = Object.keys(this.allImg).length;
        for (let key in this.allImg) {
            let img = new Image();
            img.src = this.allImg[key];
            img.onload = () => {
                // 将创建的img 赋值给相对于的key
                this.allImg[key] = img;
                count++;
                // 当count >=total 的时候，就代表这所有的图片加载完成
                if (count >= total) {
                    this.start(); // 当所有的图片加载完成，才开始
                }
            }
        }
    }
    // 绑定事件：点击屏幕小鸟起飞
    // bindEvent() {
    //     this.canvas.onclick = () => {
    //         this.bird.fly();
    //     }
    // }

}