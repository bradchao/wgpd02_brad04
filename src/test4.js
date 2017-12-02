
var Test4Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var title = new cc.LabelTTF("Test 4", "", 48);
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
        var next1Item = new cc.MenuItemFont("Next1", this.next1, this);
        var next2Item = new cc.MenuItemFont("Next2", this.next2, this);
        var next3Item = new cc.MenuItemFont("Next3", this.next3, this);
        var next4Item = new cc.MenuItemFont("Next4", this.next4, this);

        var menu = new cc.Menu(
            next1Item,next2Item,next3Item,next4Item,
            backItem);
        menu.alignItemsVertically();
        this.addChild(menu);

    },

    back: function () {
        cc.director.popScene();
    },
    next1: function () {

    },
    next2: function () {

    },
    next3: function () {

    },
    next4: function () {

    },

});

var Test4Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test4Layer();
        this.addChild(layer);
    }

});

