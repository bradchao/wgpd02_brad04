
var Test2Layer = cc.Layer.extend({
    sprite:null,
    data:null,
    ctor:function (data) {
        this._super();

        this.data = data;

        var title = new cc.LabelTTF("Test 2:" + this.data, "", 48);
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

var Test2Scene = cc.Scene.extend({
    data:null,
    ctor: function (data) {
        this._super();
        //cc.log("Test2Scene:ctor:" + data);

        //var layer = new Test2Layer();
        //this.addChild(layer);

        this.data = data;
    },


    onEnter:function () {
        //this._super();
        cc.log("onEnter:data = " + this.data);
        var layer = new Test2Layer(this.data);
        this.addChild(layer);
    }

});

