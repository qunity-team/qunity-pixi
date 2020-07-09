/**
 * Created by rockyl on 2020-03-08.
 */

import PIXI from 'pixi.js'
import {bubbling, traverse} from "./utils";
import {Application, IEntity, Component as QComponent, injectProp} from 'qunity'
import {EntityAdaptor} from "./EntityAdaptor";
import {loadAsset} from "./res";
import {protocols} from "./protocols";
import {entityProps} from "./entity-props";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
	type = "canvas";
}

PIXI.utils.sayHello(type);

let app: Application;

export enum Resolution {
	WIDTH_FIXED,
	HEIGHT_FIXED,
}

interface PIXIAppOptions {
	resolution?: Resolution,
	designWidth?: number,
	designHeight?: number,
	antialias?: boolean,
	autoResize?: boolean,
}

const defaultOptions: PIXIAppOptions = {
	resolution: Resolution.WIDTH_FIXED,
	designWidth: 750,
	designHeight: 1334,
	antialias: true,
	autoResize: true,
};

export function createApp(options?: PIXIAppOptions): Application {
	let _options: PIXIAppOptions = {};

	injectProp(_options, defaultOptions);
	injectProp(_options, options);

	app = new Application();
	app.registerEntityDefs(entityProps);

	let pixiApp = new PIXI.Application({
		antialias: _options.antialias,
	});
	let view = pixiApp.renderer.view;
	view.style.position = "absolute";
	view.style.display = "block";
	view.style.width = '100%';
	view.style.height = '100%';

	adjustSize(pixiApp, _options);

	document.body.appendChild(pixiApp.view);

	let mainLoop = app.setupAdaptor({
		stage: pixiApp.stage,
		EntityAdaptor,
		addDisplayFunc: function (node: IPixiEntity, parent: IPixiEntity) {
			parent['addChild'](node);
		},
		traverseFunc: traverse,
		bubblingFunc: bubbling,
		loadAssetFunc: loadAsset,
		protocols,
		context: {
			pixiApp,
		},
	});
	PIXI.Ticker.shared.add(function (delta) {
		mainLoop(delta * 1000 / 60);
	});

	return app;
}

export interface IPixiEntity extends PIXI.Container, IEntity {
	readonly stageSize: {width: number, height: number};
}

export function createEntity(type: string): IPixiEntity {
	return <IPixiEntity>app.createEntity(type);
}

export class Component extends QComponent {
	get entity(): IPixiEntity {
		return this.entityAdaptor ? <IPixiEntity>this.entityAdaptor.entity : null;
	}
}

function adjustSize(pixiApp, options: PIXIAppOptions) {
	if (options.autoResize) {
		window.onresize = resize;
	}

	resize();

	function resize() {
		const {designWidth, designHeight} = options;
		let width = designWidth;
		let height = designHeight;
		let scale;
		switch (options.resolution) {
			case Resolution.WIDTH_FIXED:
				scale = window.innerWidth / width;
				height = window.innerHeight / scale;
				break;
			case Resolution.HEIGHT_FIXED:
				scale = window.innerHeight / height;
				width = window.innerWidth / scale;
				break;
		}

		pixiApp.renderer.resize(width, height);
	}
}
