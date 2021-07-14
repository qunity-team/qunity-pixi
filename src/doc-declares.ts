import pixi from 'pixi.js'
import {DocEntity, DocNode} from 'qunity'

export declare function Node<T extends pixi.Container & DocEntity>(props?: Partial<T>): DocNode

export declare function Sprite<T extends pixi.Sprite & DocEntity>(props?: Partial<T>): DocNode

export declare function Text<T extends pixi.Text & DocEntity>(props?: Partial<T>): DocNode

export declare function Graphics<T extends pixi.Graphics & DocEntity>(props?: Partial<T>): DocNode

