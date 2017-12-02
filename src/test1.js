
var Test1Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();




        return true;
    }
});

var Test1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test1Layer();
        this.addChild(layer);
    }
});

