import { INodeTree, QueueNodeItem } from "@/interface/INodeTree"
import { RpcMessageType } from "@/interface/IRpcMessageType"

(() => {
    const node_obj: Record<string, { parentId: string, node: cc.Node }> = ({} as any);

    //保存了优化过后的节点树
    var node_base_tree: Array<INodeTree> = new Array<INodeTree>();
    // const node_tree_dict: Record<string, INodeTree> = ({} as any);
    ((window as any).node_tree_objs = node_obj)

    const rpc_method: Record<string, (data?: any) => any> = {
        "refresh": call_refresh_node_data,
        "components": _get_components,
    }

    // const rpc_req_id: Record<string, string> = {}
    function call_refresh_node_data() {
        eachBaseNodeInfo(cc.director.getScene())
        return node_base_tree
    }

    function _get_components(nodeId: string) {
        if (node_obj[nodeId]) {
            const n = node_obj[nodeId]
            const nodeBaseInfo = {
                active: n.node.active,
                x: n.node.x, y: n.node.y,
                scaleX: n.node.scaleX, scaleY: n.node.scaleY,
                anchorX: n.node.anchorX, anchorY: n.node.anchorY,
                width: n.node.width, height: n.node.height,
                color: n.node.color,
                rotation: -n.node.angle,
                opacity: n.node.opacity,
                name: `${n.node.name}<node>`
            }
            // (n.node as any)._components 
            return { node: nodeBaseInfo, comps: [] }
        }
        return { node: null, comps: [] }
    }

    //初始化节点信息
    function eachBaseNodeInfo(node: cc.Node) {
        const result: INodeTree[] = []
        const queue: QueueNodeItem[] = [{ node: node, parent: result }];

        while (queue.length > 0) {
            const { node, parent } = queue.shift() as QueueNodeItem;
            const newNode: INodeTree = { label: node.name, uuid: node.uuid, children: [] };
            parent.push(newNode);

            const parentId = node.parent ? node.parent.uuid : "scene-root";
            const uuid = node.uuid;
            const obj = { parentId, node: node }
            if (!node.parent) { node_obj["scene-root"] = obj }
            node_obj[uuid] = obj

            if (node.children) {
                for (const child of node.children) {
                    queue.push({ node: child, parent: newNode.children });
                }
            }
        }
        node_base_tree = result[0].children;
    }


    function getComponentType() {

    }

    window.addEventListener("message", (evt: MessageEvent<RpcMessageType>) => {
        const { type, id, data } = evt.data
        if (type == "CocosUITools::content.request.inject") {
            console.log("收到了消息欸:")
            if (rpc_method[data.action]) {
                const ret = rpc_method[data.action](data.data)
                if (id && id != "") {
                    window.postMessage({ type: "CocosUITools::inject.respone.content", id, data: ret })
                }
            }
        }
    })
})()