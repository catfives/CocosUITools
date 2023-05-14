import NodeTreeItem from "@/components/NodeTree/TreeItem";
import { INodeTree } from "@/interface/INodeTree";
import { RootState } from "@/store";
import { setTreeExpanded } from "@/store/devtools";
import { TreeView } from "@mui/lab";
import { connect } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const component = (prop: RootState["global"] | any) => {
  const { node_tree, selectNodeId, treeExpanded, setTreeExpanded } = prop;

  const renderTree = (nodes: INodeTree) => (
    <NodeTreeItem key={nodes.uuid} nodeId={nodes.uuid} label={nodes.label}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </NodeTreeItem>
  );

  return (
    <TreeView
      expanded={treeExpanded}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeToggle={(_evt: any, nodeIds: string[]) => {
        setTreeExpanded(nodeIds);
      }}
      selected={selectNodeId}
    >
      {node_tree.map((node: INodeTree) => renderTree(node))}
    </TreeView>
  );
};

const mapStateToProps = (state: RootState) => state.global;
const mapDispatchToProps = { setTreeExpanded };
const NodeTree = connect(mapStateToProps, mapDispatchToProps)(component);
export default NodeTree;
