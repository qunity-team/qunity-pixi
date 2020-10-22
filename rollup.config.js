/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const {uglify} = require('rollup-plugin-uglify');

const name = 'qunity-pixi';

const prod = process.env.BUILD === 'production';

const options = {
	input: 'src/index.ts',
	output: [
		{
			file: prod ? 'dist/index.umd.cjs.js' : 'dist/index.cjs.js',
			sourcemap: true,
			format: 'cjs',
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
		},
		{
			file: prod ? 'dist/index.umd.esm.js' : 'dist/index.esm.js',
			sourcemap: true,
			format: 'esm',
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
		},
		{
			file: prod ? 'dist/index.umd.min.js' : 'dist/index.umd.js',
			sourcemap: !prod,
			format: 'umd',
			name,
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
		},
	],
	plugins: [
		resolve({
			browser: true,
		}),
		typescript({
			typescript: require('typescript'),
		}),
		//uglify({}),
	],
	external: ['pixi.js', 'qunity', ]
};

if (prod) {
	options.plugins.push(uglify({}));
}

export default options;
