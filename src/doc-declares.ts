import pixi from 'pixi.js'

export declare function Node(
	props?: { [key: keyof pixi.Container]: any }
)

Node({x: 100})
