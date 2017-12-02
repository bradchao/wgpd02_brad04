
var Test5Layer = cc.Layer.extend({
    balls: [res.ball0, res.ball1, res.ball2, res.ball3, res.ball4],
    isPause: false,
    ctor:function () {
        this._super();

        this.initListener();

        return true;
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
                }
            }
        };
        cc.eventManager.addListener(myKeyListener, this);
    },

    pauseTask: function () {
       this.isPause = !this.isPause;
       cc.log(this.isPause);
    },

    addBall: function (x, y) {
        //cc.log('addBall:' + x + " x " + y);
        var ball = new Ball(
            this.balls[parseInt(Math.random()*5)],
            parseInt(Math.random()*24) - 12,
            parseInt(Math.random()*24) - 12
        );
        ball.x = x;
        ball.y = y;
        this.addChild(ball);

        ball.schedule(
            this.balltask, 0.01, cc.REPEAT_FOREVER, 1);
    },

    balltask: function () {
        // this => who schedule ==> Ball Object
        var layer = this.getParent();

        if (layer.isPause) return;

        if (this.x - this.width/2 < 0 ||
        this.x + this.width/2 > cc.winSize.width){
            this.dx *= -1;
        }
        if (this.y - this.height/2 < 0 ||
        this.y + this.height/2 > cc.winSize.height){
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

