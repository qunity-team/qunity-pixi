/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const {terser} = require('rollup-plugin-terser');

const name = 'qunity_pixi';

const prod = process.env.BUILD === 'production';

const options = {
	input: 'src/index.ts',
	output: [
		{
			file: prod ? `dist/${name}.esm.min.js` : `dist/${name}.esm.js`,
			sourcemap: !prod,
			format: 'esm',
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
		},
		{
			file: prod ? `dist/${name}.umd.min.js` : `dist/${name}.umd.js`,
			sourcemap: !prod,
			format: 'umd',
			name,
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
		},
		{
			file: prod ? `dist/${name}.all.min.js` : `dist/${name}.all.js`,
			sourcemap: !prod,
			format: 'umd',
			name,
			globals: {
				'pixi.js': 'PIXI',
			},
		},
	],
	plugins: [
		resolve({
			//browser: true,
		}),
		typescript({
			typescript: require('typescript'),
		}),
		prod && terser(),
	],
	external: ['pixi.js', ],
};

export default options;
