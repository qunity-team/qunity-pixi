/**
 * Created by rockyl on 2020-03-08.
 */

import PIXI from 'pixi.js'

/**
 * 先序遍历
 * @param node
 * @param hit
 */
export function traverse(node, hit: (node: PIXI.DisplayObject) => boolean | void) {
	let interrupt = hit(node);

	if (!interrupt && node.children && node.children.length > 0) {
		for (let child of node.children) {
			let interrupt = traverse(child, hit);
			if (interrupt) {
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
export function bubbling(node, hit: (node: PIXI.DisplayObject) => boolean | void) {
	let interrupt = hit(node);
	while (!interrupt && node.parent) {
		node = node.parent;
		if (node) {
			interrupt = hit(node);
		}
	}
	return interrupt;
}
