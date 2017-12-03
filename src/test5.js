
var Test5Layer = cc.Layer.extend({
    balls: [res.ball0, res.ball1, res.ball2, res.ball3, res.ball4],
    isPause: false,
    bar: null,
    bricks: [[]],
    barP0:null,
    barP1:null,
    ctor:function () {
        this._super();

        this.bar = new cc.Sprite(res.bar);
        this.bar.x = cc.winSize.width/2;
        this.bar.y = 48;
        this.barP0 = new cc.Point(this.bar.x-this.bar.width/2, this.bar.y+this.bar.height/2);
        this.barP1 = new cc.Point(this.bar.x+this.bar.width/2, this.bar.y+this.bar.height/2);

        this.addChild(this.bar);

        this.initBrick();
        this.initListener();

        return true;
    },

    initBrick: function () {
        for (var j=0; j<4; j++){
            this.bricks[j] = [];
            for (var i=0; i<20; i++){
                this.bricks[j][i] = new cc.Sprite(res.brick);
                this.bricks[j][i].x = 24 + this.bricks[j][i].width * i;
                this.bricks[j][i].y = cc.winSize.height - (j+2)*48;
                this.addChild(this.bricks[j][i]);
            }
        }
    },

    initListener: function () {
        var myMouseListener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var layer = event.getCurrentTarget();
                layer.addBall(event.getLocationX(), event.getLocationY());
            }
        };
        cc.eventManager.addListener(myMouseListener, this);

        var myKeyListener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                var layer = event.getCurrentTarget();
                if (keyCode == cc.KEY.space){
                    cc.log('key');
                    layer.pauseTask();
                }else if (keyCode == cc.KEY.left){
                    cc.log('left');
                    layer.moveBar(false);
                }else if (keyCode == cc.KEY.right){
                    cc.log('right');
                    layer.moveBar(true);
                }
            }
        };
        cc.eventManager.addListener(myKeyListener, this);
    },

    moveBar: function (isRight) {
        if (isRight && this.bar.x < cc.winSize.width){
            this.bar.x += 16;
        }else if (!isRight && this.bar.x > 0){
            this.bar.x -= 16;
        }

        this.barP0 = new cc.Point(this.bar.x-this.bar.width/2, this.bar.y+this.bar.height/2);
        this.barP1 = new cc.Point(this.bar.x+this.bar.width/2, this.bar.y+this.bar.height/2);
    },

    pauseTask: function () {
       this.isPause = !this.isPause;
       cc.log(this.isPause);
    },

    addBall: function (x, y) {
        //cc.log('addBall:' + x + " x " + y);
        // var ball = new Ball(
        //     this.balls[parseInt(Math.random()*5)],
        //     parseInt(Math.random()*24) - 12,
        //     parseInt(Math.random()*24) - 12
        // );

        var ball = new Ball(
            this.balls[parseInt(Math.random()*5)],2,2
        );

        ball.x = x;
        ball.y = y;
        this.addChild(ball);

        ball.schedule(
            this.balltask, 0.001, cc.REPEAT_FOREVER, 1);
    },

    balltask: function () {
        // this => who schedule ==> Ball Object
        var layer = this.getParent();

        if (layer.isPause ) return;

        if (this.y - this.height/2 < 0){
            cc.log('loser');
            return;
        }

        brad:
        for (var j=layer.bricks.length-1; j>=0; j--) {
            for (var i = 0; i < layer.bricks[j].length; i++) {
                var leftX = layer.bricks[j][i].x - layer.bricks[j][i].width / 2;
                var rightX = layer.bricks[j][i].x + layer.bricks[j][i].width / 2;
                var upY = layer.bricks[j][i].y + layer.bricks[j][i].height / 2;
                var downY = layer.bricks[j][i].y - layer.bricks[j][i].height / 2;

                if (this.x <= rightX && this.x >= leftX &&
                    ((this.y > layer.bricks[j][i].y && this.y - this.height / 2 <= upY) ||
                        (this.y < layer.bricks[j][i].y && this.y + this.height / 2 >= downY))
                ) {
                    // 球碰到上下緣
                    layer.removeChild(layer.bricks[j][i]);  // 看不到
                    layer.bricks[j].splice(i, 1);       //
                    this.dy *= -1;
                    break brad;
                }

                if (this.y <= upY && this.y >= downY &&
                    ((this.x < layer.bricks[j][i].x && this.x + this.width / 2 >= leftX) ||
                        (this.x > layer.bricks[j][i].x && this.x - this.width / 2 <= rightX))
                ) {
                    // 左右邊碰撞
                    layer.removeChild(layer.bricks[j][i]);
                    layer.bricks[j].splice(i, 1);
                    this.dx *= -1;
                    break brad;
                }

                var p0 = new cc.Point(leftX, upY);
                var p1 = new cc.Point(leftX, downY);
                var p2 = new cc.Point(rightX, upY);
                var p3 = new cc.Point(rightX, downY);
                var thisp = new cc.Point(this.x, this.y);

                if (cc.pDistance(p0, thisp) < this.width / 2 ||
                    cc.pDistance(p1, thisp) < this.width / 2 ||
                    cc.pDistance(p2, thisp) < this.width / 2 ||
                    cc.pDistance(p3, thisp) < this.width / 2) {
                    // 角邊碰撞
                    layer.removeChild(layer.bricks[j][i]);
                    layer.bricks[j].splice(i, 1);
                    this.dx *= -1;
                    this.dy *= -1;
                    break brad;
                }




            }
        }

        // 以下判斷撞到bar
        if (this.dy<0 && this.x <= layer.bar.x + layer.bar.width/2  &&
            this.x >= layer.bar.x - layer.bar.width/2 &&
            this.y-layer.bar.height/2<=layer.bar.y+layer.bar.height/2){
            this.dy *= -1;
        }else if (this.dy<0 && (cc.pDistance(thisp, layer.barP0) < this.width/2 ||
                cc.pDistance(thisp, layer.barP1) < this.width/2)) {
            this.dx *=-1; this.dy *= -1;
        }

        if (this.x - this.width/2 < 0 ||
        this.x + this.width/2 > cc.winSize.width){
            this.dx *= -1;
        }
        if (this.y + this.height/2 > cc.winSize.height){
            this.dy *= -1;
        }

        this.x += this.dx;
        this.y += this.dy;



    }
});

var Ball = cc.Sprite.extend({
    dx: 0,  // 單位時間內的移動x距離
    dy: 0,  // 單位時間內的移動y距離
    ctor: function (img, dx, dy) {
        this._super(img);
        this.dx = dx; this.dy = dy;
    }
});

var Test5Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test5Layer();
        this.addChild(layer);
    }
});

