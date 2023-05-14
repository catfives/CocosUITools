export type INodeTree = {
    label: string
    uuid: string
    children: INodeTree[]
};



export interface QueueNodeItem {
    node: cc.Node
    parent: INodeTree[]
}