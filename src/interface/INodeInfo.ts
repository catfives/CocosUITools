export interface INodeInfo {
    /** 节点名 */
    active: boolean
    name: string
    x: number
    y: number
    scaleX: number
    scaleY: number
    width: number
    height: number
    /** 是否有子节点 */
    isChildren: boolean
    uuid: string
}