import { Request } from "@/rpc";
import { RootState } from "@/store";
import { setSelectNodeComponents, setSelectNodeId } from "@/store/devtools";
import { TreeItem, TreeItemProps } from "@mui/lab";
import { Box } from "@mui/material";
import { Tooltip, Typography } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { BoxFlexAlignCenter, IconButtonEx } from "@/components/Styleds";

interface HoverIconTreeItemProps extends TreeItemProps {
  label: string;
}

const HoverIconTreeItem: React.FC<any & HoverIconTreeItemProps> = ({
  label,
  nodeId,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { selectNodeId, setSelectNodeId, setSelectNodeComponents } = props;

  const handleLabelClick = (event: any, nodeId: string, name: string) => {
    event.stopPropagation();
    if (selectNodeId == nodeId) {
      return;
    }
    setSelectNodeId({ id: nodeId, name });
    //请求component列表
    Request({ action: "components", data: nodeId }, (components) => {
      // components
      console.log(components);
      setSelectNodeComponents(components);
    });
  };

  const onClickStoreItem = (_event: any) => {
    _event.stopPropagation();
    Request({ action: "out-console", data: nodeId });
  };
  return (
    <TreeItem
      {...props}
      nodeId={nodeId}
      label={
        <BoxFlexAlignCenter
          onClick={(evt: any) => handleLabelClick(evt, nodeId, label)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Typography style={{ lineHeight: "1.5" }}>{label}</Typography>
          <Box
            className="hover-icon"
            sx={{
              marginLeft: "auto",
              display: isHovered ? "inline-flex" : "none",
            }}
          >
            <Tooltip title="输出到控制台">
              <IconButtonEx
                sx={{ padding: "0" }}
                size="small"
                onClick={onClickStoreItem}
                color="primary"
                disableRipple={true}
              >
                <NearMeOutlinedIcon />
              </IconButtonEx>
            </Tooltip>
            <Tooltip title="标记节点">
              <IconButtonEx
                sx={{ padding: "0" }}
                size="small"
                color="primary"
                onClick={onClickStoreItem}
                disableRipple={true}
              >
                <FullscreenOutlinedIcon />
              </IconButtonEx>
            </Tooltip>
          </Box>
        </BoxFlexAlignCenter>
      }
    />
  );
};

const mapStateToProps = (state: RootState) => state.global;
const mapHoverIconTreeItem = { setSelectNodeId, setSelectNodeComponents };
const NodeTreeItem = connect(
  mapStateToProps,
  mapHoverIconTreeItem
)(HoverIconTreeItem);

export default NodeTreeItem;
