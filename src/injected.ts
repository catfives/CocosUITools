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
        let node: any = node_obj[nodeId]

        if (node) {
            if (node.node.isValid) {
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
                let comps = []
                for (let i = 0; i < node.node._components.length; i++) {
                    let c = node.node._components[i]
                    let result: any = {}
                    if (c.name.indexOf("Sprite") != -1) {
                        result = _get_component_sprite(c)
                    } else if (c.name.indexOf("Widget") != -1) {
                        result = _get_component_widget(c)
                    } else if (c.name.indexOf("Label") != -1) {
                        result = _get_component_label(c)
                    } else {
                        result = { name: c.name }
                    }
                    comps.push(result)
                }
                console.log("获取原始数据", { node: nodeBaseInfo, comps: comps })
                return { node: nodeBaseInfo, comps: comps }
            }
        }
        return { node: null, comps: [] }
    }


    function _get_component_sprite(com: cc.Sprite) {
        let originalSize = com.spriteFrame.getOriginalSize()
        let recf = (com.spriteFrame as any)._rect
        return {
            name: com.name,
            sizeMode: com.sizeMode,
            trim: com.trim,
            uuid: com.uuid,
            type: com.type,
            spriteFrame: {
                uuid: com.spriteFrame != null ? (com.spriteFrame as any)._uuid : "",
                originalSize: {
                    width: originalSize.width,
                    height: originalSize.height,
                },
                rect: {
                    x: recf.x,
                    y: recf.y,
                    width: recf.width,
                    height: recf.height
                },
                texture: {
                    nativeUrl: window.location.origin + "/" + com.spriteFrame.getTexture().nativeUrl
                }
            }
        }
    }

    function _get_component_widget(com: cc.Widget) {
        return {
            name: com.name,
            alignMode: com.alignMode,
            isAlignTop: com.isAlignTop,//是否打开顶对齐
            isAlignRight: com.isAlignRight,//是否打开右对齐
            isAlignBottom: com.isAlignBottom,//是否打开底对齐
            isAlignLeft: com.isAlignLeft,//是否打开左对齐
            isAbsHorizontalCenter: com.isAlignHorizontalCenter,
            horizontalCenter: com.horizontalCenter, //垂直居中
            isAlignVerticalCenter: com.isAlignVerticalCenter,
            verticalCenter: com.verticalCenter, //水平居中
        }
    }

    function _get_component_label(com: cc.Label) {
        return {
            name: com.name,
            fontSize: com.fontSize,
            lineHeight: com.lineHeight,
            string: com.string,
            horizontalAlign: com.horizontalAlign,
            verticalAlign: com.verticalAlign
        }
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