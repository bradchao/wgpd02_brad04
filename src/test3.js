
var Test3Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var title = new cc.LabelTTF("Test 3", "", 48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 9 / 10;
        this.addChild(title);

        this.initMenu();


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

var Test3Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test3Layer();
        this.addChild(layer);
    }

});

