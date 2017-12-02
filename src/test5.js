
var Test5Layer = cc.Layer.extend({
    ball:null,
    var2: 123,
    ctor:function () {
        this._super();

        this.ball = new Ball(res.ball, 8, 8);
        this.ball.x = cc.winSize.width / 2;
        this.ball.y = cc.winSize.height / 10;
        this.addChild(this.ball);

        this.ball.schedule(
            this.balltask, 1, cc.REPEAT_FOREVER, 1);


        return true;
    },

    balltask: function () {
        // this => who schedule
        var layer = this.getParent();

        


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

