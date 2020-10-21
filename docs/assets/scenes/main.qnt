const {Doc} = require('qunity');
const pixi = require('qunity-pixi');

exports.doc = Doc({type: 'scene', name: 'main'}).kv({
	factory: function () {
		return pixi.Node({name: 'Scenes'}).c([
			pixi.Node({name: 'MainScene', active: true}).c([
				pixi.Node({name: 'Box', x: 375, y: 300,}).c([
					pixi.Sprite({
						uuid: 'sprite-logo',
						name: 'logo', texture: 'asset://69410bc3-8df2-49a3-9959-f86e56d2aaf4',
						anchor: {x: 0.5, y: 0.5,}
					}),
					pixi.Text({
						name: 'text',
						uuid: 'text-hello',
						y: 200,
						text: 'hello',
						style: {fill: 'white', fontSize: 40},
						anchor: {x: 0.5}
					}),
				]).s([
					{script: '/scripts/Hello', label: 'entity://text-hello', sprite: 'entity://sprite-logo', text: 'Hello Qunity'},
				]),
				pixi.Node({name: 'Background', }).s([
					{script: '/scripts/Background', starTexture: 'texture://69410bc3-8df2-49a3-9959-f86e56d2aaf5'},
				]),
			]),
		])
	},
	assets: [
		{
			uuid: "69410bc3-8df2-49a3-9959-f86e56d2aaf4",
			url: "assets/images/logo.svg",
		},
		{
			uuid: "69410bc3-8df2-49a3-9959-f86e56d2aaf5",
			url: "assets/images/star.png",
		},
		{
			uuid: "ec0f3cfa-489e-4343-bc38-30df8d54576b",
			url: "assets/images/bear.png",
		},
	]
});
