import {Container} from 'pixi.js'
import {IEntity} from 'qunity'

interface INode extends Container, IEntity{}
export declare function Node<K extends keyof INode>(props: Record<K, any>)
