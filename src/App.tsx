import { RootState } from "@/store";
import "./App.css";
import { Box, styled } from "@mui/material";
import { connect } from "react-redux";
import HeaderTop from "@/components/Header";
import NodeTree from "@/components/NodeTree";
import NodeComponent from "@/components/NodeComponent/NodeComponents";

function AppComponent() {
  const StyleMain = styled(Box)({
    display: "flex",
    flex: 1,
    overflow: "hidden",
  });

  return (
    <Box height="100%" sx={{ display: "flex", flexDirection: "column" }}>
      <HeaderTop />
      <StyleMain>
        <NodeTree />
        <NodeComponent />
      </StyleMain>
    </Box>
  );
}

const mapStateToProps = (state: RootState) => state.global;
const App = connect(mapStateToProps)(AppComponent);
export default App;
