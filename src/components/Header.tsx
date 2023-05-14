import { RootState } from "@/store";
import { connect } from "react-redux";
import { Box, Button, Stack, styled } from "@mui/material";
import { ReloadOutlined } from "@ant-design/icons";
import { Request } from "@/rpc";
import { setNodeTreeData } from "@/store/devtools";

const HeaderTopComponent = (props: any) => {
  const { setNodeTreeData } = props;

  const StyleTop = styled(Box)({
    boxSizing: "border-box",
    height: "40px",
    lineHeight: "40px",
    // backgroundColor: "#000",
    // borderBottom: "1px solid red",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    // margin: "0px 10px",
    paddingLeft: "10px",
    position: "relative",

    "&:after": {
      content: "''",
      position: "absolute",
      left: "10px",
      right: "10px",
      backgroundColor: "#eee",
      bottom: "0px",
      height: "1px",
    },
  });

  const refresh_node = () => {
    Request({ action: "refresh" }, (dat) => {
      console.log("返回的节点数据,", dat);
      setNodeTreeData(dat);
    });
  };

  return (
    <StyleTop>
      <Stack direction="row" spacing={2}>
        <Button
          color="warning"
          size="small"
          variant="outlined"
          startIcon={<ReloadOutlined />}
          onClick={refresh_node}
        >
          刷新节点树
        </Button>
      </Stack>
    </StyleTop>
  );
};

const mapStateToProps = (state: RootState) => state.global;
const mapDispatchToProps = { setNodeTreeData };
const HeaderTop = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderTopComponent);
export default HeaderTop;
