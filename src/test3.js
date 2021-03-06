
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
        var backItem = new cc.MenuItemImage(res.Back_normal_png,
            res.Back_selected_png, res.Back_disselect_png,
            this.back, this);
        var nextItem = new cc.MenuItemFont("Next", this.next, this);

        var menu = new cc.Menu(nextItem, backItem);
        menu.alignItemsVertically();
        this.addChild(menu);

    },

    back: function () {
        cc.director.popScene();
    },
    next: function () {
        cc.director.pushScene(new Test31Scene());
    },

});

var Test3Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test3Layer();
        this.addChild(layer);
    }

});

