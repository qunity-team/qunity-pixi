/**
 * Created by rockyl on 2020-03-13.
 *
 * 实体属性列表
 */

import PIXI from "pixi.js";
import {Circle, Rect, ShapeBase, Star, StarBezier} from "./shapes";

export const PIXI_TextStyle = {
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

export enum PIXI_BLEND_MODES {
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
	XOR = 29,
}

export const entityProps = {
	Node: {
		def: PIXI.Container,
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
		def: PIXI.Sprite,
		isContainer: true,
		props: {
			blendMode: ['enum', 'NORMAL', PIXI_BLEND_MODES],
			tint: ['color', 0xFFFFFF],
			texture: ['texture'],
		},
	},
	Text: {
		base: 'Sprite',
		def: PIXI.Text,
		isContainer: true,
		props: {
			text: ['string'],
			style: ['object', null, PIXI_TextStyle]
		},
	},
	Graphics: {
		base: 'Node',
		def: PIXI.Graphics,
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
		props: {

		},
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
