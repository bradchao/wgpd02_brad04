
var Test5Layer = cc.Layer.extend({
    ball:null,
    var2: 147,
    ctor:function () {
        this._super();

        this.ball = new Ball(res.ball, 8, 8);
        this.ball.x = cc.winSize.width / 2;
        this.ball.y = cc.winSize.height / 10;
        this.addChild(this.ball);

        this.ball.schedule(
            this.balltask, 0.01, cc.REPEAT_FOREVER, 1);

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
    },

    addBall: function (x, y) {
        cc.log('addBall:' + x + " x " + y);
    },

    balltask: function () {
        // this => who schedule
        var layer = this.getParent();

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
    dx: 0,
    dy: 0,
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

