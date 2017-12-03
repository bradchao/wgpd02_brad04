
var Test1Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        this.initMenu();

        var x1 = 0;
        var y1 = 0;

        var x2 = 3;
        var y2 = 4;

        cc.log(
            cc.pDistance(
                new cc.Point(x1,y1),
                new cc.Point(x2,y2)));


        return true;
    },

    initMenu: function () {
        var backItem = cc.MenuItemImage.create(res.Back_normal_png,
            res.Back_selected_png, res.Back_disselect_png,
            this.back, this);

        var menu = new cc.Menu(backItem);
        this.addChild(menu);

    },

    back: function () {
        cc.director.popScene();
    }

});

var Test1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test1Layer();
        this.addChild(layer);
    }
});

