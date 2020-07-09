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
			file: prod ? 'dist/bundle.umd.cjs.js' : 'dist/bundle.cjs.js',
			sourcemap: true,
			format: 'cjs',
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
		},
		{
			file: prod ? 'dist/bundle.umd.esm.js' : 'dist/bundle.esm.js',
			sourcemap: true,
			format: 'esm',
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
		},
		{
			file: prod ? 'dist/bundle.umd.min.js' : 'dist/bundle.umd.js',
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
