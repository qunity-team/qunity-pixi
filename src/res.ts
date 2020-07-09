/**
 * Created by rockyl on 2020-03-08.
 */

import PIXI from 'pixi.js'
import {decodeJson5} from "qunity";

class ResTransform {
	static pre(resource: PIXI.LoaderResource, next: (...params: any[]) => any) {

		next();
	}

	static use(resource: PIXI.LoaderResource, next: (...args: any[]) => void) {
		switch (resource.extension) {
			case 'scene':
			case 'prefab':
				//resource.data = decodeJson5(resource.data);
				//let parser = new DOMParser();
				//resource.data = parser.parseFromString(resource.data, 'text/xml');
				break;
		}

		next();
	}
}

PIXI.Loader.registerPlugin(ResTransform);

const loaderCache = [];

export function loadAsset(config: any, onComplete: (res, opt) => void): void {
	let loader;
	if (loaderCache.length > 0) {
		loader = loaderCache.pop();
	} else {
		loader = new PIXI.Loader;
	}

	loader.add(config);

	loader.load(onLoaded);

	function onLoaded(loader, resources) {
		let resource = resources[Object.keys(resources)[0]];
		let data = resource.textures || resource.texture || resource.data;
		setTimeout(function () {
			onComplete && onComplete(data, config);
		});
		loader.reset();
		loaderCache.push(loader);
	}
}
