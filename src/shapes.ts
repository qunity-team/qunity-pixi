/**
 * Created by rockyl on 2020-03-16.
 */

import {dirtyFieldTrigger} from "qunity";
import PIXI from 'pixi.js'

/**
 * 图形基类
 */
export abstract class ShapeBase extends PIXI.Graphics {
	protected __fieldDirty = true;

	private _t;

	@dirtyFieldTrigger
	fillColor: any = '0xffffff';
	@dirtyFieldTrigger
	fillAlpha: number = 1;
	@dirtyFieldTrigger
	strokeColor: any = 0;
	@dirtyFieldTrigger
	strokeAlpha: number = 1;
	@dirtyFieldTrigger
	strokeWidth: number = 0;
	@dirtyFieldTrigger
	strokeAlignment: number = 0.5;
	@dirtyFieldTrigger
	shapeWidth: number = 0;
	@dirtyFieldTrigger
	shapeHeight: number = 0;
	@dirtyFieldTrigger
	directionLineWidth: number = 0;

	protected _anchor: PIXI.ObservablePoint = new PIXI.ObservablePoint(this._onAnchorUpdate, this);

	get anchor(): PIXI.ObservablePoint {
		return this._anchor;
	}

	set anchor(value) // eslint-disable-line require-jsdoc
	{
		this._anchor.copyFrom(value);
	}

	get anchorOffset() {
		const {shapeWidth, shapeHeight, _anchor: {x: ax, y: ay}} = this;

		return {
			x: -shapeWidth * ax,
			y: -shapeHeight * ay,
		}
	}

	constructor() {
		super();

		this._anchor = new PIXI.ObservablePoint(this._onAnchorUpdate, this);
	}

	private _onAnchorUpdate(): void {
		this.$onModify();
	}

	private $onModify(value?, key?) {
		this.__fieldDirty = true;

		/*if (this._t) {
			clearTimeout(this._t);
			this._t = null;
		}
		this._t = setTimeout(this.nextTick);*/
		this.nextTick && this.nextTick();
	}

	private nextTick = () => {
		if (this.__fieldDirty) {
			this.__fieldDirty = false;

			const {
				fillColor, fillAlpha,
				strokeColor, strokeWidth, strokeAlpha, strokeAlignment,
			} = this;

			this.clear();
			this.beginFill(fillColor, fillAlpha);
			if (strokeWidth > 0) {
				this.lineStyle(strokeWidth, strokeColor, strokeAlpha, strokeAlignment);
			}
			this.redraw();
			this.endFill();
			if (this.directionLineWidth > 0) {
				this.drawDirectionLine();
			}
		}
	};

	protected abstract redraw()

	protected drawDirectionLine() {
		const {pivot: {x, y}, directionLineWidth} = this;
		this.lineStyle(directionLineWidth, 0xFFFFFF - this.fillColor);
		this.moveTo(x, y);
		this.lineTo(x + this.shapeWidth / 2, y);
	}
}

/**
 * 矩形
 */
export class Rect extends ShapeBase {
	@dirtyFieldTrigger
	borderRadius: number = 0;

	protected redraw() {
		const {shapeWidth, shapeHeight, borderRadius, anchorOffset: {x, y}} = this;

		if (borderRadius > 0) {
			this.drawRoundedRect(x, y, shapeWidth, shapeHeight, borderRadius);
		} else {
			this.drawRect(x, y, shapeWidth, shapeHeight);
		}
	}
}

/**
 * 圆形
 */
export class Circle extends ShapeBase {
	protected redraw() {

		const {shapeWidth, shapeHeight, anchorOffset: {x, y}} = this;
		const radius = Math.min(shapeWidth, shapeHeight) / 2;

		this.drawCircle(radius - x, radius - y, radius);
	}
}

/**
 * 星型
 */
export class Star extends ShapeBase {
	@dirtyFieldTrigger
	points: number = 5;
	@dirtyFieldTrigger
	innerRadius: number;
	@dirtyFieldTrigger
	starRotation: number = 0;

	protected redraw() {

		const {shapeWidth, shapeHeight, anchorOffset: {x, y}} = this;
		const radius = Math.min(shapeWidth, shapeHeight) / 2;
		const {points, innerRadius, starRotation} = this;

		let args = [radius - x, radius - y, points, radius];
		if (innerRadius !== undefined) {
			args.push(innerRadius)
		} else if (starRotation !== undefined) {
			args.push(undefined, starRotation)
		}

		this.drawStar.apply(this, args);
	}
}

/**
 * 曲线星型
 */
export class StarBezier extends ShapeBase {
	@dirtyFieldTrigger
	points: number = 5;
	@dirtyFieldTrigger
	innerRadius: number;
	@dirtyFieldTrigger
	starRotation: number = 0;

	protected redraw() {

		const {shapeWidth, shapeHeight, anchorOffset: {x, y}} = this;
		const radius = Math.min(shapeWidth, shapeHeight) / 2;
		let {points, innerRadius, starRotation} = this;

		if(innerRadius === undefined){
			innerRadius = radius / 2;
		}

		let perRadius = Math.PI * 2 / points;
		let toX = Math.cos(starRotation) * radius + radius;
		let toY = Math.sin(starRotation) * radius + radius;
		for (let i = 0; i < points; i++) {
			if (i === 0) {
				this.moveTo(toX, toY);
			}
			let cpR = starRotation + perRadius * (i + 0.5);
			let cpX = Math.cos(cpR) * innerRadius + radius;
			let cpY = Math.sin(cpR) * innerRadius + radius;
			let toR = starRotation + perRadius * (i + 1);
			toX = Math.cos(toR) * radius + radius;
			toY = Math.sin(toR) * radius + radius;
			this.quadraticCurveTo(cpX, cpY, toX, toY);
		}
		this.closePath();
	}
}
