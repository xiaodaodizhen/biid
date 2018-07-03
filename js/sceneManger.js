// 场景管理
class SceneManager {
    constructor() {
        this.bindEvent();
    };
    // 场景
    enter(number) {
        switch (number) {
            case 0:// 欢迎页面
                game.bg = new Background();
                game.land = new Land();
                this.titleW = game.allImg["title"].width;
                this.titleX = (game.canvas.width - this.titleW) / 2;
                this.titleY = -50;

                this.btnX = (game.canvas.width - game.allImg["button_play"].width) / 2;
                this.btnY = game.canvas.height;
                this.btnW = game.allImg["button_play"].width;

                this.birdX = (game.canvas.width - game.allImg["bird0_0"].width) / 2;
                this.birdY = 220;
                this.birdChangeY = 1.5;
                break;
            case 1://场景编号为1
                game.bg = new Background();
                game.land = new Land();
                game.scence = 1;
                this.alphaBird = 0.5;// 教程小鸟的透明度
                this.BirdAlphaChange = 0.02;
                break;
            case 2:
                game.bg = new Background();
                game.land = new Land();
                game.bird = new Bird();
                game.pipeArr = [];
                game.scence = 2;
                break;
            case 3:
                game.scence = 3;
                this.isBoom = false;// 是否爆炸
                this.indexBaozha = 1;//爆炸图片选择哪张
                break;
            case 4:
                game.scence = 4;
                let arr = JSON.parse(localStorage.getItem("FB"));
                this.model = "medals_0";//设置奖牌等级对应的默认图片
                for (let i = 0; i < arr.length; i++) {
                    if (game.score > arr[0]) {
                        arr[0] = game.score;
                        this.model = "medals_1";
                        document.getElementById("wing").play();
                    } else if (game.score > arr[1]) {
                        arr[2] = game.score;
                        this.model = "medals_2";
                    } else if (game.score > arr[2]) {
                        arr[3] = game.score;
                        this.model = "medals_3";
                    }
                }
                // 默认分数储存数组为空的默认值
                if (arr.length == 0) {
                    arr[0] = game.score;
                }
                this.best = arr[0] ? arr[0] : 0;// 最高分
                localStorage.setItem("FB", JSON.stringify(arr));


                this.overX = (game.canvas.width - game.allImg["game_over"].width) / 2;
                this.overY = -80;
                this.panelX = (game.canvas.width - game.allImg["score_panel"].width) / 2;
                this.panelY = game.canvas.height;
                break;
        }
    };
    // 更新渲染
    updateAndRender() {
        switch (game.scence) {
            case 0:
                game.bg.render();
                game.land.render();
                this.titleY <= 150 ? this.titleY += 5 : null;
                this.btnY >= 380 ? this.btnY -= 10 : null;
                if (this.birdY > 320 || this.birdY < 210) {
                    this.birdChangeY *= -1;
                }
                this.birdY += this.birdChangeY;
                game.draw.drawImage(game.allImg["title"], this.titleX, this.titleY);
                game.draw.drawImage(game.allImg["button_play"], this.btnX, this.btnY);
                game.draw.drawImage(game.allImg["bird0_0"], this.birdX, this.birdY);
                break;
            case 1:
                game.bg.render();
                game.land.render();
                // 画面中的小鸟参数
                this.BirdWTwo = game.allImg["bird0_0"].width;
                this.BirdXTwo = (game.canvas.width - this.BirdWTwo) / 2;//让小鸟在x轴的中间位置
                this.BirdYTwo = game.canvas.height * (1 - 0.718);// 固定比例，如身高比例
                // 画面中小鸟教程参数
                this.Tutorial = game.allImg["tutorial"].width;
                this.TutorialX = (game.canvas.width - this.Tutorial) / 2;
                this.TutorialY = 300;

                game.draw.drawImage(game.allImg["bird0_0"], this.BirdXTwo, this.BirdYTwo);

                if (this.alphaBird > 1 || this.alphaBird < 0) {
                    this.BirdAlphaChange *= -1;
                }
                this.alphaBird += this.BirdAlphaChange;


                game.draw.save();// 用此方法和 game.draw.restore();方法包裹中间代码，使效果作用域中间代码
                game.draw.globalAlpha = this.alphaBird;
                game.draw.drawImage(game.allImg["tutorial"], this.TutorialX, this.TutorialY);
                game.draw.restore();
                break;
            case 2:
                game.bg.update();
                game.bg.render();
                game.land.update();
                game.land.render();
                if (game.frame % 150 == 0) {
                    new Pipe();// 每次new 一个管子，就会在Pipe.js中的代码中，执行 game.pipeArr.push(this);this代表new的实例，将本实例放入管子数组
                }
                // 将数组中的管子渲染出来
                game.pipeArr.forEach(item => {
                    item.update();
                    item.render();
                });
                game.bird.update();
                game.bird.render();
                this.scoreRender();
                break;
            case 3:
                game.bg.render();
                game.land.render();
                game.pipeArr.forEach(item => {
                    item.render();
                });

                if (game.bird.y >= game.canvas.height - game.allImg["land"].height) {
                    this.isBoom = true;

                }
                if (this.isBoom) {// 爆炸
                    this.indexBaozha++;
                    if (this.indexBaozha > 9) {// 总共9张爆炸图，组成爆炸效果，如果图的索引大于9 说明爆炸完成，进入下一场景

                        this.enter(4);
                        return;
                    }
                    game.draw.drawImage(game.allImg["baozha" + this.indexBaozha], game.bird.x - (game.allImg["baozha1"].width / 2), game.bird.y - 50, 150, 100);
                } else {
                    game.bird.update();
                    game.bird.render();
                }
                break;
            case 4:
                game.bg.render();
                game.land.render();
                this.overY >= 170 ? this.overY = 170 : this.overY += 6;
                this.panelY <= 320 ? this.panelY = 320 : this.panelY -= 6;
                game.draw.drawImage(game.allImg["game_over"], this.overX, this.overY);
                game.draw.drawImage(game.allImg["score_panel"], this.panelX, this.panelY);
                game.draw.drawImage(game.allImg[this.model], this.panelX + 30, this.panelY + 44);

                // 设置最高分，本轮分的属性
                game.draw.fillStyle = "#666";// 颜色
                game.draw.font = "20px consolas";//字体
                game.draw.textAlign = "right";//对齐方式
                game.draw.fillText(game.score, (game.canvas.width / 2) + 80, this.panelY + 50);
                game.draw.fillText(this.best, (game.canvas.width / 2) + 80, this.panelY + 96);

                break;
        }
    };
    //绑定事件
    bindEvent() {
        game.canvas.onclick = (e) => {
            switch (game.scence) {
                case 0:
                    if (e.clientX >= this.btnX && e.clientX < this.btnX + this.btnW && e.clientY >= this.btnY && e.clientY <= this.btnY + 70) {
                        this.enter(1);
                    }
                    break;
                case 1:
                    this.enter(2);
                    break;
                case 2:
                    game.bird.fly();
                    break;
                case 3:

                    break;
                case 4:

                    break;
            }
        }
    };
    // 渲染分数
    scoreRender() {
        let str = game.score.toString();
        let line = (game.canvas.width - str.length * 30) / 2;// 基准线
        for (let i = 0; i < str.length; i++) {// 字符粗是类数组，可以循环，可以用str[i]这种下标获取到
            game.draw.drawImage(game.allImg["shuzi" + str[i]], line + 30 * i, 100);
        }
    }
}