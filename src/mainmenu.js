
var MainMenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        this.initMenu();

        return true;
    },

    initMenu: function () {
        cc.MenuItemFont.setFontSize(52);
        var menuItem1 = new cc.MenuItemFont("Item1", this.doItem1, this);
        cc.MenuItemFont.setFontSize(36);
        var menuItem2 = new cc.MenuItemFont("Item2", this.doItem2, this);
        cc.MenuItemFont.setFontSize(48);
        var menuItem3 = new cc.MenuItemFont("Item3", this.doItem3, this);
        var menuItem4 = new cc.MenuItemFont("Item4", this.doItem4, this);

        var menu = new cc.Menu(menuItem1,menuItem2,menuItem3,menuItem4);
        menu.alignItemsVertically();

        this.addChild(menu);
    },

    doItem1: function () {
        cc.director.pushScene(new Test1Scene());
    },
    doItem2: function () {
        cc.director.pushScene(new Test2Scene(123));
    },
    doItem3: function () {
        cc.director.pushScene(new Test3Scene());
    },
    doItem4: function () {
        cc.director.pushScene(new Test4Scene());
    },

});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});

