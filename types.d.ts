import { Application } from 'qunity';
import { Component as Component_2 } from 'qunity';
import { IEntity } from 'qunity';
import PIXI_2 from 'pixi.js';
import PIXI from "pixi.js";

/**
 * 冒泡遍历
 * @param node
 * @param hit
 */
export declare function bubbling(node: any, hit: (node: PIXI_2.DisplayObject) => boolean | void): boolean | void;

/**
 * 圆形
 */
declare class Circle extends ShapeBase {
    protected redraw(): void;
}

export declare class Component extends Component_2 {
    get entity(): PixiEntity;
}

export declare function createApp(options?: PIXIAppOptions): Application;

export declare function createEntity(type: string): PixiEntity;

export declare const entityProps: {
    Node: {
        def: typeof PIXI_2.Container;
        isContainer: boolean;
        props: {
            position: (string | number[])[];
            scale: (string | number[])[];
            anchor: (string | number[])[];
            pivot: (string | number[])[];
            skew: (string | number[])[];
            width: (string | number)[];
            height: (string | number)[];
            alpha: (string | number)[];
            angle: (string | number)[];
            buttonMode: (string | boolean)[];
            interactive: (string | boolean)[];
            interactiveChildren: (string | boolean)[];
            zIndex: (string | number)[];
        };
    };
    Sprite: {
        base: string;
        def: typeof PIXI_2.Sprite;
        isContainer: boolean;
        props: {
            blendMode: (string | typeof PIXI_BLEND_MODES)[];
            tint: (string | number)[];
            texture: string[];
        };
    };
    Text: {
        base: string;
        def: typeof PIXI_2.Text;
        isContainer: boolean;
        props: {
            text: string[];
            style: (string | {
                align: string[];
                breakWords: string[];
                dropShadow: string[];
                dropShadowAlpha: string[];
                dropShadowAngle: string[];
                dropShadowBlur: string[];
                dropShadowColor: string[];
                dropShadowDistance: string[];
                fill: string[];
                fontFamily: string[];
                fontSize: string[];
                fontStyle: string[];
                fontVariant: string[];
                fontWeight: string[];
                leading: string[];
                letterSpacing: string[];
                lineHeight: string[];
                lineJoin: string[];
                miterLimit: string[];
                padding: string[];
                stroke: string[];
                strokeThickness: string[];
                trim: string[];
                textBaseline: string[];
                whiteSpace: string[];
                wordWrap: string[];
                wordWrapWidth: string[];
            })[];
        };
    };
    Graphics: {
        base: string;
        def: typeof PIXI_2.Graphics;
        isContainer: boolean;
        props: {
            tint: (string | number)[];
        };
    };
    ShapeBase: {
        base: string;
        def: typeof ShapeBase;
        isContainer: boolean;
        hidden: boolean;
        props: {
            fillColor: (string | number)[];
            strokeColor: (string | number)[];
            strokeWidth: (string | number)[];
        };
    };
    Rect: {
        base: string;
        def: typeof Rect;
        isContainer: boolean;
        props: {
            borderRadius: (string | number)[];
        };
    };
    Circle: {
        base: string;
        def: typeof Circle;
        isContainer: boolean;
        props: {};
    };
    Star: {
        base: string;
        def: typeof Star;
        isContainer: boolean;
        props: {
            points: (string | number)[];
            innerRadius: string[];
            starRotation: (string | number)[];
        };
    };
    StarBezier: {
        base: string;
        def: typeof StarBezier;
        isContainer: boolean;
        props: {
            points: (string | number)[];
            innerRadius: string[];
            starRotation: (string | number)[];
        };
    };
};

export declare interface PixiEntity extends PIXI.Container, PIXI.Sprite, PIXI.Text, PIXI.Graphics, IEntity {
    readonly stageSize: {
        width: number;
        height: number;
    };
}

export declare enum PIXI_BLEND_MODES {
    NORMAL = 0,
    ADD = 1,
    MULTIPLY = 2,
    SCREEN = 3,
    OVERLAY = 4,
    DARKEN = 5,
    LIGHTEN = 6,
    COLOR_DODGE = 7,
    COLOR_BURN = 8,
    HARD_LIGHT = 9,
    SOFT_LIGHT = 10,
    DIFFERENCE = 11,
    EXCLUSION = 12,
    HUE = 13,
    SATURATION = 14,
    COLOR = 15,
    LUMINOSITY = 16,
    NORMAL_NPM = 17,
    ADD_NPM = 18,
    SCREEN_NPM = 19,
    NONE = 20,
    SRC_OVER = 0,
    SRC_IN = 21,
    SRC_OUT = 22,
    SRC_ATOP = 23,
    DST_OVER = 24,
    DST_IN = 25,
    DST_OUT = 26,
    DST_ATOP = 27,
    ERASE = 26,
    SUBTRACT = 28,
    XOR = 29
}

export declare const PIXI_TextStyle: {
    align: string[];
    breakWords: string[];
    dropShadow: string[];
    dropShadowAlpha: string[];
    dropShadowAngle: string[];
    dropShadowBlur: string[];
    dropShadowColor: string[];
    dropShadowDistance: string[];
    fill: string[];
    fontFamily: string[];
    fontSize: string[];
    fontStyle: string[];
    fontVariant: string[];
    fontWeight: string[];
    leading: string[];
    letterSpacing: string[];
    lineHeight: string[];
    lineJoin: string[];
    miterLimit: string[];
    padding: string[];
    stroke: string[];
    strokeThickness: string[];
    trim: string[];
    textBaseline: string[];
    whiteSpace: string[];
    wordWrap: string[];
    wordWrapWidth: string[];
};

declare interface PIXIAppOptions {
    resolution?: Resolution;
    designWidth?: number;
    designHeight?: number;
    antialias?: boolean;
    autoResize?: boolean;
}

/**
 * 矩形
 */
declare class Rect extends ShapeBase {
    borderRadius: number;
    protected redraw(): void;
}

export declare enum Resolution {
    WIDTH_FIXED = 0,
    HEIGHT_FIXED = 1
}

/**
 * 图形基类
 */
declare abstract class ShapeBase extends PIXI_2.Graphics {
    protected __fieldDirty: boolean;
    private _t;
    fillColor: any;
    fillAlpha: number;
    strokeColor: any;
    strokeAlpha: number;
    strokeWidth: number;
    strokeAlignment: number;
    shapeWidth: number;
    shapeHeight: number;
    directionLineWidth: number;
    protected _anchor: PIXI_2.ObservablePoint;
    get anchor(): PIXI_2.ObservablePoint;
    set anchor(value: PIXI_2.ObservablePoint);
    get anchorOffset(): {
        x: number;
        y: number;
    };
    constructor();
    private _onAnchorUpdate;
    private $onModify;
    private nextTick;
    protected abstract redraw(): any;
    protected drawDirectionLine(): void;
}

/**
 * 星型
 */
declare class Star extends ShapeBase {
    points: number;
    innerRadius: number;
    starRotation: number;
    protected redraw(): void;
}

/**
 * 曲线星型
 */
declare class StarBezier extends ShapeBase {
    points: number;
    innerRadius: number;
    starRotation: number;
    protected redraw(): void;
}

/**
 * 先序遍历
 * @param node
 * @param hit
 */
export declare function traverse(node: any, hit: (node: PIXI_2.DisplayObject) => boolean | void): boolean | void;

export { }
