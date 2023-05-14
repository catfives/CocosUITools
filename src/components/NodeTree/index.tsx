/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import NodeTree from "@/components/NodeTree/TreeView";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const NodeTreeView = () => {
  const StyleSidebarRoot = styled(Box)({
    width: "300px",
    margin: "10px",
    padding: "0 10px",
    paddingTop: "5px",
    border: "1px solid #0000004d",
    "& .MuiTreeItem-root div": { padding: "0" },
    overflowY: "auto",
  });

  return (
    <StyleSidebarRoot>
      <NodeTree />
    </StyleSidebarRoot>
  );
};

export default NodeTreeView;
