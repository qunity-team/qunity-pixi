/**
 * Created by rockyl on 2020-03-11.
 */

import {Application} from 'qunity'

export enum Protocols {
	TEXTURE = 'texture://',

}

export const protocols = {
	[Protocols.TEXTURE]: texture,
};

function texture(app: Application, key: string, value: any): any {
	let trulyValue;
	const uuid = value.replace(Protocols.TEXTURE, '');
	trulyValue = app.getAsset(uuid);
	/*if (trulyValue) {
		trulyValue = trulyValue.texture;
	}*/

	return trulyValue;
}
