import { RootState } from "@/store";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Checkbox, Stack, styled } from "@mui/material";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import ComponentContent from "@/components/NodeComponent/ComponentContent";
import { BoxFlexAlignCenter, IconButtonEx } from "@/components/Styleds";
import { Tooltip, Typography as TypographyAntd } from "antd";
import { Request } from "@/rpc";
// import { CCSprite } from "@/components/NodeComponent/CCComponents/CCSprite";

const StyledComponentBox = styled(Box)({
  flex: 1,
  boxSizing: "border-box",
  overflowY: "auto",
  height: "100%",
});

const StyledNodeNameBox = styled(BoxFlexAlignCenter)({
  zIndex: 999,
  position: "sticky",
  top: "0px",
  backdropFilter: "blur(8px)",
  boxShadow: "inset 0px -1px 1px var(#E0E3E7)",
  backgroundColor: "rgba(255,255,255,0.8)",
  borderBottom: "1px solid #0000004d",
});

const NodeRootContent = styled(Box)({
  border: "1px solid #0000004d",
  boxSizing: "border-box",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  margin: "10px 5px 10px 0px",
});

const Root: React.FC<RootState["global"]> = ({ ...props }) => {
  //selectNodeComponents
  const {
    selectNodeName,
    selectNodeId,
    selectNodeDetails,
    selectNodeComponents,
  } = props;

  return (
    <NodeRootContent>
      <StyledComponentBox>
        <Stack direction="column" spacing={1}>
          {selectNodeName == "" ? (
            <></>
          ) : (
            <>
              {/* <!--             Node 节点名                  --> */}
              <StyledNodeNameBox>
                <Tooltip title="显示隐藏节点">
                  <Checkbox
                    size="small"
                    defaultChecked={selectNodeDetails.active}
                    disableRipple={true}
                    onChange={(_evt: any, checked: boolean) => {
                      Request({
                        action: "setCompOrNodeAttr",
                        data: [selectNodeId, { active: checked }],
                      });
                      //setCompOrNodeAttr
                    }}
                    icon={<EyeInvisibleOutlined />}
                    checkedIcon={<EyeOutlined />}
                  />
                </Tooltip>
                <TypographyAntd>{selectNodeName}</TypographyAntd>
                <Box sx={{ marginLeft: "auto", marginRight: "20px" }}>
                  <Tooltip title="标记节点">
                    <IconButtonEx size="small">
                      <FullscreenOutlinedIcon />
                    </IconButtonEx>
                  </Tooltip>
                  <Tooltip title="输出到控制台">
                    <IconButtonEx size="small">
                      <NearMeOutlinedIcon />
                    </IconButtonEx>
                  </Tooltip>
                </Box>
              </StyledNodeNameBox>
              {/* <!--   基础节点信息,只支持2.x 版本 3.x版本改为UITransform   --> */}
              <ComponentContent
                isBaseNode={true}
                nodeDetail={selectNodeDetails}
              />
              {/* <ComponentContent
                nodeDetail={{
                  name: "name<Sprite>",
                  sizeMode: 1,
                  trim: false,
                  uuid: 123123123,
                  type: 1,
                  spriteFrame: {
                    uuid: "123123123-asdasd-1d2d1-21d12",
                    originalSize: {
                      width: 2,
                      height: 2,
                    },
                    rect: {
                      height: 2338,
                      width: 1080,
                      x: 0,
                      y: 0,
                    },
                    texture: {
                      nativeUrl:
                        "https://h5.huiyixun.com/assets/main/native/17/1738a3ed-9500-40f9-8386-848fec9b2052.c24e6.png",
                    },
                  },
                }}
              /> */}
              {/** 接下来是循环遍历comps */}
              {selectNodeComponents.map((v) => (
                <ComponentContent nodeDetail={v} />
              ))}
            </>
          )}
        </Stack>
      </StyledComponentBox>
    </NodeRootContent>
  );
};
const mapStateToProps = (state: RootState) => state.global;

const NodeComponent = connect(mapStateToProps)(Root);
export default NodeComponent;
