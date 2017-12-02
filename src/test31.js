
var Test31Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var title = new cc.LabelTTF("Test 31", "", 48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 9 / 10;
        this.addChild(title);

        this.initMenu();


        return true;
    },

    initMenu: function () {
        var homeItem = new cc.MenuItemImage(res.Home_png,
            res.Home_png, res.Home_png,
            this.home, this);

        var backItem = new cc.MenuItemImage(res.Back_normal_png,
            res.Back_selected_png, res.Back_disselect_png,
            this.back, this);


        var menu = new cc.Menu(homeItem, backItem);
        menu.alignItemsVertically();
        this.addChild(menu);

    },

    back: function () {
        cc.director.popScene();
    },
    home: function () {
        cc.log("Home");
    },

});

var Test31Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test31Layer();
        this.addChild(layer);
    }

});

