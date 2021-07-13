(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pixi.js'), require('qunity')) :
    typeof define === 'function' && define.amd ? define(['exports', 'pixi.js', 'qunity'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['qunity-pixi'] = {}, global.PIXI, global.qunity));
}(this, (function (exports, PIXI, qunity) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var PIXI__default = /*#__PURE__*/_interopDefaultLegacy(PIXI);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /**
     * Created by rockyl on 2020-03-08.
     */
    /**
     * 先序遍历
     * @param node
     * @param hit
     */
    function traverse(node, hit) {
        var interrupt = hit(node);
        if (!interrupt && node.children && node.children.length > 0) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var interrupt_1 = traverse(child, hit);
                if (interrupt_1) {
                    break;
                }
            }
        }
        return interrupt;
    }
    /**
     * 冒泡遍历
     * @param node
     * @param hit
     */
    function bubbling(node, hit) {
        var interrupt = hit(node);
        while (!interrupt && node.parent) {
            node = node.parent;
            if (node) {
                interrupt = hit(node);
            }
        }
        return interrupt;
    }

    /**
     * Created by rockyl on 2020-03-08.
     */
    var interactionEvents = {
        pointertap: 'click',
        pointerdown: 'mouseDown',
        pointermove: 'mouseMove',
        pointerup: 'mouseUp',
        pointerupoutside: 'mouseUpOutside',
    };
    var EntityAdaptor = /** @class */ (function (_super) {
        __extends(EntityAdaptor, _super);
        function EntityAdaptor(entity, app) {
            var _this = _super.call(this, entity, app) || this;
            entity.interactive = true;
            entity.visible = false;
            for (var event in interactionEvents) {
                entity.on(event, _this._onInteractionEvent, _this);
            }
            return _this;
        }
        EntityAdaptor.prototype.getActive = function () {
            return _super.prototype.getActive.call(this) && this._entity.visible;
        };
        EntityAdaptor.prototype.setActive = function (v) {
            _super.prototype.setActive.call(this, v);
            this._entity.visible = v;
        };
        EntityAdaptor.prototype.applyProxy = function () {
            _super.prototype.applyProxy.call(this);
            var entity = this._entity;
            Object.defineProperty(entity, 'stageSize', {
                get: function () {
                    var _a = this.entityAdaptor.app.context.pixiApp.renderer, width = _a.width, height = _a.height;
                    return { width: width, height: height };
                }
            });
        };
        EntityAdaptor.prototype._onInteractionEvent = function (e) {
            if (e.target || e.type === 'pointerupoutside') {
                var interactEvent = interactionEvents[e.type];
                this.invokeInteractionEvent(interactEvent, e);
            }
        };
        return EntityAdaptor;
    }(qunity.EntityAdaptorBase));

    /**
     * Created by rockyl on 2020-03-08.
     */
    var ResTransform = /** @class */ (function () {
        function ResTransform() {
        }
        ResTransform.pre = function (resource, next) {
            next();
        };
        ResTransform.use = function (resource, next) {
            switch (resource.extension) {
                        }
            next();
        };
        return ResTransform;
    }());
    PIXI__default['default'].Loader.registerPlugin(ResTransform);
    var loaderCache = [];
    function loadAsset(config, onComplete) {
        var loader;
        if (loaderCache.length > 0) {
            loader = loaderCache.pop();
        }
        else {
            loader = new PIXI__default['default'].Loader;
        }
        loader.add(config);
        loader.load(onLoaded);
        function onLoaded(loader, resources) {
            var resource = resources[Object.keys(resources)[0]];
            var data = resource.textures || resource.texture || resource.data;
            setTimeout(function () {
                onComplete && onComplete(data, config);
            });
            loader.reset();
            loaderCache.push(loader);
        }
    }

    /**
     * Created by rockyl on 2020-03-11.
     */
    var _a;
    var Protocols;
    (function (Protocols) {
        Protocols["TEXTURE"] = "texture://";
    })(Protocols || (Protocols = {}));
    var protocols = (_a = {},
        _a[Protocols.TEXTURE] = texture,
        _a);
    function texture(app, key, value) {
        var trulyValue;
        var uuid = value.replace(Protocols.TEXTURE, '');
        trulyValue = app.getAsset(uuid);
        /*if (trulyValue) {
            trulyValue = trulyValue.texture
        }*/
        return trulyValue;
    }

    /**
     * Created by rockyl on 2020-03-16.
     */
    /**
     * 图形基类
     */
    var ShapeBase = /** @class */ (function (_super) {
        __extends(ShapeBase, _super);
        function ShapeBase() {
            var _this = _super.call(this) || this;
            _this.__fieldDirty = true;
            _this.fillAlpha = 1;
            _this.strokeColor = 0;
            _this.strokeAlpha = 1;
            _this.strokeWidth = 0;
            _this.strokeAlignment = 0.5;
            _this.shapeWidth = 0;
            _this.shapeHeight = 0;
            _this.directionLineWidth = 0;
            _this.nextTick = function () {
                if (_this.__fieldDirty) {
                    _this.__fieldDirty = false;
                    var _a = _this, fillColor = _a.fillColor, fillAlpha = _a.fillAlpha, strokeColor = _a.strokeColor, strokeWidth = _a.strokeWidth, strokeAlpha = _a.strokeAlpha, strokeAlignment = _a.strokeAlignment;
                    _this.clear();
                    if (fillColor !== undefined) {
                        _this.beginFill(fillColor, fillAlpha);
                    }
                    if (strokeWidth > 0) {
                        _this.lineStyle(strokeWidth, strokeColor, strokeAlpha, strokeAlignment);
                    }
                    _this.redraw();
                    if (fillColor !== undefined) {
                        _this.endFill();
                    }
                    if (_this.directionLineWidth > 0) {
                        _this.drawDirectionLine();
                    }
                }
            };
            _this._anchor = new PIXI__default['default'].ObservablePoint(_this._onAnchorUpdate, _this);
            return _this;
        }
        Object.defineProperty(ShapeBase.prototype, "anchor", {
            get: function () {
                return this._anchor;
            },
            set: function (value) {
                this._anchor.copyFrom(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShapeBase.prototype, "anchorOffset", {
            get: function () {
                var _a = this, shapeWidth = _a.shapeWidth, shapeHeight = _a.shapeHeight, _b = _a._anchor, ax = _b.x, ay = _b.y;
                return {
                    x: -shapeWidth * ax,
                    y: -shapeHeight * ay,
                };
            },
            enumerable: false,
            configurable: true
        });
        ShapeBase.prototype._onAnchorUpdate = function () {
            this.$onModify();
        };
        ShapeBase.prototype.$onModify = function (value, key) {
            this.__fieldDirty = true;
            this.nextTick && this.nextTick();
        };
        ShapeBase.prototype.drawDirectionLine = function () {
            var _a = this, _b = _a.pivot, x = _b.x, y = _b.y, directionLineWidth = _a.directionLineWidth;
            this.lineStyle(directionLineWidth, 0xFFFFFF - this.fillColor);
            this.moveTo(x, y);
            this.lineTo(x + this.shapeWidth / 2, y);
        };
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "fillColor", void 0);
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "fillAlpha", void 0);
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "strokeColor", void 0);
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "strokeAlpha", void 0);
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "strokeWidth", void 0);
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "strokeAlignment", void 0);
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "shapeWidth", void 0);
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "shapeHeight", void 0);
        __decorate([
            qunity.watchable
        ], ShapeBase.prototype, "directionLineWidth", void 0);
        return ShapeBase;
    }(PIXI__default['default'].Graphics));
    /**
     * 矩形
     */
    var Rect = /** @class */ (function (_super) {
        __extends(Rect, _super);
        function Rect() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.borderRadius = 0;
            return _this;
        }
        Rect.prototype.redraw = function () {
            var _a = this, shapeWidth = _a.shapeWidth, shapeHeight = _a.shapeHeight, borderRadius = _a.borderRadius, _b = _a.anchorOffset, x = _b.x, y = _b.y;
            if (borderRadius > 0) {
                this.drawRoundedRect(x, y, shapeWidth, shapeHeight, borderRadius);
            }
            else {
                this.drawRect(x, y, shapeWidth, shapeHeight);
            }
        };
        __decorate([
            qunity.watchable
        ], Rect.prototype, "borderRadius", void 0);
        return Rect;
    }(ShapeBase));
    /**
     * 圆形
     */
    var Circle = /** @class */ (function (_super) {
        __extends(Circle, _super);
        function Circle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Circle.prototype.redraw = function () {
            var _a = this, shapeWidth = _a.shapeWidth, shapeHeight = _a.shapeHeight, _b = _a.anchorOffset, x = _b.x, y = _b.y;
            var radius = Math.min(shapeWidth, shapeHeight) / 2;
            this.drawCircle(radius + x, radius + y, radius);
        };
        return Circle;
    }(ShapeBase));
    /**
     * 星型
     */
    var Star = /** @class */ (function (_super) {
        __extends(Star, _super);
        function Star() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.points = 5;
            _this.starRotation = 0;
            return _this;
        }
        Star.prototype.redraw = function () {
            var _a = this, shapeWidth = _a.shapeWidth, shapeHeight = _a.shapeHeight, _b = _a.anchorOffset, x = _b.x, y = _b.y;
            var radius = Math.min(shapeWidth, shapeHeight) / 2;
            var _c = this, points = _c.points, innerRadius = _c.innerRadius, starRotation = _c.starRotation;
            var args = [radius + x, radius + y, points, radius];
            if (innerRadius !== undefined) {
                args.push(innerRadius);
            }
            else if (starRotation !== undefined) {
                args.push(undefined, starRotation);
            }
            this.drawStar.apply(this, args);
        };
        __decorate([
            qunity.watchable
        ], Star.prototype, "points", void 0);
        __decorate([
            qunity.watchable
        ], Star.prototype, "innerRadius", void 0);
        __decorate([
            qunity.watchable
        ], Star.prototype, "starRotation", void 0);
        return Star;
    }(ShapeBase));
    /**
     * 曲线星型
     */
    var StarBezier = /** @class */ (function (_super) {
        __extends(StarBezier, _super);
        function StarBezier() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.points = 5;
            _this.starRotation = 0;
            return _this;
        }
        StarBezier.prototype.redraw = function () {
            var _a = this, shapeWidth = _a.shapeWidth, shapeHeight = _a.shapeHeight, _b = _a.anchorOffset; _b.x; _b.y;
            var radius = Math.min(shapeWidth, shapeHeight) / 2;
            var _c = this, points = _c.points, innerRadius = _c.innerRadius, starRotation = _c.starRotation;
            if (innerRadius === undefined) {
                innerRadius = radius / 2;
            }
            var perRadius = Math.PI * 2 / points;
            var toX = Math.cos(starRotation) * radius + radius;
            var toY = Math.sin(starRotation) * radius + radius;
            for (var i = 0; i < points; i++) {
                if (i === 0) {
                    this.moveTo(toX, toY);
                }
                var cpR = starRotation + perRadius * (i + 0.5);
                var cpX = Math.cos(cpR) * innerRadius + radius;
                var cpY = Math.sin(cpR) * innerRadius + radius;
                var toR = starRotation + perRadius * (i + 1);
                toX = Math.cos(toR) * radius + radius;
                toY = Math.sin(toR) * radius + radius;
                this.quadraticCurveTo(cpX, cpY, toX, toY);
            }
            this.closePath();
        };
        __decorate([
            qunity.watchable
        ], StarBezier.prototype, "points", void 0);
        __decorate([
            qunity.watchable
        ], StarBezier.prototype, "innerRadius", void 0);
        __decorate([
            qunity.watchable
        ], StarBezier.prototype, "starRotation", void 0);
        return StarBezier;
    }(ShapeBase));

    /**
     * Created by rockyl on 2020-03-13.
     *
     * 实体属性列表
     */
    var PIXI_TextStyle = {
        align: ['string', ''],
        breakWords: ['boolean', ''],
        dropShadow: ['boolean', ''],
        dropShadowAlpha: ['number', ''],
        dropShadowAngle: ['number', ''],
        dropShadowBlur: ['number', ''],
        dropShadowColor: ['color', ''],
        dropShadowDistance: ['number', ''],
        fill: ['color', ''],
        fontFamily: ['string', ''],
        fontSize: ['number', ''],
        fontStyle: ['string', ''],
        fontVariant: ['string', ''],
        fontWeight: ['string', ''],
        leading: ['number', ''],
        letterSpacing: ['number', ''],
        lineHeight: ['number', ''],
        lineJoin: ['string', ''],
        miterLimit: ['number', ''],
        padding: ['number', ''],
        stroke: ['number', ''],
        strokeThickness: ['number', ''],
        trim: ['boolean', ''],
        textBaseline: ['string', ''],
        whiteSpace: ['string', ''],
        wordWrap: ['boolean', ''],
        wordWrapWidth: ['number', ''],
    };
    exports.PIXI_BLEND_MODES = void 0;
    (function (PIXI_BLEND_MODES) {
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["NORMAL"] = 0] = "NORMAL";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["ADD"] = 1] = "ADD";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["MULTIPLY"] = 2] = "MULTIPLY";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SCREEN"] = 3] = "SCREEN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["OVERLAY"] = 4] = "OVERLAY";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DARKEN"] = 5] = "DARKEN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["LIGHTEN"] = 6] = "LIGHTEN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["COLOR_DODGE"] = 7] = "COLOR_DODGE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["COLOR_BURN"] = 8] = "COLOR_BURN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["HARD_LIGHT"] = 9] = "HARD_LIGHT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SOFT_LIGHT"] = 10] = "SOFT_LIGHT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DIFFERENCE"] = 11] = "DIFFERENCE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["EXCLUSION"] = 12] = "EXCLUSION";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["HUE"] = 13] = "HUE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SATURATION"] = 14] = "SATURATION";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["COLOR"] = 15] = "COLOR";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["LUMINOSITY"] = 16] = "LUMINOSITY";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["NORMAL_NPM"] = 17] = "NORMAL_NPM";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["ADD_NPM"] = 18] = "ADD_NPM";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SCREEN_NPM"] = 19] = "SCREEN_NPM";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["NONE"] = 20] = "NONE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SRC_OVER"] = 0] = "SRC_OVER";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SRC_IN"] = 21] = "SRC_IN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SRC_OUT"] = 22] = "SRC_OUT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SRC_ATOP"] = 23] = "SRC_ATOP";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DST_OVER"] = 24] = "DST_OVER";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DST_IN"] = 25] = "DST_IN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DST_OUT"] = 26] = "DST_OUT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DST_ATOP"] = 27] = "DST_ATOP";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["ERASE"] = 26] = "ERASE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SUBTRACT"] = 28] = "SUBTRACT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["XOR"] = 29] = "XOR";
    })(exports.PIXI_BLEND_MODES || (exports.PIXI_BLEND_MODES = {}));
    var entityProps = {
        Node: {
            def: PIXI__default['default'].Container,
            isContainer: true,
            props: {
                position: ['vector2', [0, 0]],
                scale: ['vector2', [1, 1]],
                anchor: ['vector2', [0, 0]],
                pivot: ['vector2', [0, 0]],
                skew: ['vector2', [0, 0]],
                width: ['number', 0],
                height: ['number', 0],
                alpha: ['number', 0],
                angle: ['number', 0],
                buttonMode: ['boolean', true],
                interactive: ['boolean', true],
                interactiveChildren: ['boolean', true],
                zIndex: ['number', 0],
            },
        },
        Sprite: {
            base: 'Node',
            def: PIXI__default['default'].Sprite,
            isContainer: true,
            props: {
                blendMode: ['enum', 'NORMAL', exports.PIXI_BLEND_MODES],
                tint: ['color', 0xFFFFFF],
                texture: ['texture'],
            },
        },
        Text: {
            base: 'Sprite',
            def: PIXI__default['default'].Text,
            isContainer: true,
            props: {
                text: ['string'],
                style: ['object', null, PIXI_TextStyle]
            },
        },
        Graphics: {
            base: 'Node',
            def: PIXI__default['default'].Graphics,
            isContainer: true,
            props: {
                tint: ['color', 0xFFFFFF],
            },
        },
        ShapeBase: {
            base: 'Graphics',
            def: ShapeBase,
            isContainer: true,
            hidden: true,
            props: {
                fillColor: ['color', 0xFFFFFF],
                strokeColor: ['color', 0x000],
                strokeWidth: ['number', 0],
            },
        },
        Rect: {
            base: 'ShapeBase',
            def: Rect,
            isContainer: true,
            props: {
                borderRadius: ['number', 0],
            },
        },
        Circle: {
            base: 'ShapeBase',
            def: Circle,
            isContainer: true,
            props: {},
        },
        Star: {
            base: 'ShapeBase',
            def: Star,
            isContainer: true,
            props: {
                points: ['number', 5],
                innerRadius: ['number'],
                starRotation: ['number', 0],
            },
        },
        StarBezier: {
            base: 'ShapeBase',
            def: StarBezier,
            isContainer: true,
            props: {
                points: ['number', 5],
                innerRadius: ['number'],
                starRotation: ['number', 0],
            },
        },
    };

    /**
     * Created by rockyl on 2020-03-08.
     */
    var type = "WebGL";
    if (!PIXI__default['default'].utils.isWebGLSupported()) {
        type = "canvas";
    }
    PIXI__default['default'].utils.sayHello(type);
    var app;
    exports.Resolution = void 0;
    (function (Resolution) {
        Resolution[Resolution["WIDTH_FIXED"] = 0] = "WIDTH_FIXED";
        Resolution[Resolution["HEIGHT_FIXED"] = 1] = "HEIGHT_FIXED";
    })(exports.Resolution || (exports.Resolution = {}));
    var defaultOptions = {
        resolution: exports.Resolution.WIDTH_FIXED,
        designWidth: 750,
        designHeight: 1334,
        antialias: true,
        autoResize: true,
    };
    function createApp(options) {
        var _options = {};
        qunity.injectProp(_options, defaultOptions);
        qunity.injectProp(_options, options);
        app = new qunity.Application();
        app.registerEntityDefs(entityProps);
        var pixiApp = new PIXI__default['default'].Application({
            antialias: _options.antialias,
        });
        var view = pixiApp.renderer.view;
        view.style.position = "absolute";
        view.style.display = "block";
        view.style.width = '100%';
        view.style.height = '100%';
        adjustSize(pixiApp, _options);
        document.body.appendChild(pixiApp.view);
        var mainLoop = app.setupAdaptor({
            stage: pixiApp.stage,
            EntityAdaptor: EntityAdaptor,
            addDisplayFunc: function (node, parent) {
                parent['addChild'](node);
            },
            traverseFunc: traverse,
            bubblingFunc: bubbling,
            loadAssetFunc: loadAsset,
            stageSizeFunc: function () {
                var _a = pixiApp.screen, width = _a.width, height = _a.height;
                return { width: width, height: height };
            },
            protocols: protocols,
            context: {
                pixiApp: pixiApp,
            }
        });
        PIXI__default['default'].Ticker.shared.add(function (delta) {
            mainLoop(delta * 1000 / 60);
        });
        return app;
    }
    function createEntity(type) {
        return app.createEntity(type);
    }
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Component.prototype, "entity", {
            get: function () {
                return this.entityAdaptor ? this.entityAdaptor.entity : null;
            },
            enumerable: false,
            configurable: true
        });
        return Component;
    }(qunity.Component));
    function adjustSize(pixiApp, options) {
        if (options.autoResize) {
            window.onresize = resize;
        }
        resize();
        function resize() {
            var designWidth = options.designWidth, designHeight = options.designHeight;
            var width = designWidth;
            var height = designHeight;
            var scale;
            switch (options.resolution) {
                case exports.Resolution.WIDTH_FIXED:
                    scale = window.innerWidth / width;
                    height = window.innerHeight / scale;
                    break;
                case exports.Resolution.HEIGHT_FIXED:
                    scale = window.innerHeight / height;
                    width = window.innerWidth / scale;
                    break;
            }
            pixiApp.renderer.resize(width, height);
        }
    }

    exports.Component = Component;
    exports.PIXI_TextStyle = PIXI_TextStyle;
    exports.bubbling = bubbling;
    exports.createApp = createApp;
    exports.createEntity = createEntity;
    exports.entityProps = entityProps;
    exports.traverse = traverse;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
