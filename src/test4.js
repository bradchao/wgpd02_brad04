
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

        backItem.x = 0 - cc.winSize.width/2 + backItem.width;
        backItem.y = 0 - cc.winSize.height/2 + backItem.height;

        next1Item.x = 0; next1Item.y = 150;
        next2Item.x = 0; next2Item.y = 50;
        next3Item.x = 0; next3Item.y = -50;
        next4Item.x = 0; next4Item.y = -150;

        var menu = new cc.Menu(
            next1Item,next2Item,next3Item,next4Item,
            backItem);
        //menu.alignItemsVertically();
        this.addChild(menu);

    },

    back: function () {
        cc.director.popScene();
    },
    next1: function () {
        cc.director.pushScene(
            new cc.TransitionFadeTR(3, new Test41Scene())
        );
    },
    next2: function () {
        cc.director.pushScene(
            new cc.TransitionJumpZoom(3, new Test41Scene())
        );
    },
    next3: function () {
        cc.director.pushScene(
            new cc.TransitionCrossFade(3, new Test41Scene())
        );
    },
    next4: function () {
        cc.director.pushScene(
            new cc.TransitionProgressRadialCW(3, new Test41Scene())
        );
    },

    onEnter: function () {

    },

    onExit: function () {

    },

    onEnterTransitionDidFinish: function () {

    },

    onExitTransitionDidStart: function () {

    },



});

var Test4Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test4Layer();
        this.addChild(layer);
    }

});

