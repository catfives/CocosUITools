import { CCNode } from "@/components/NodeComponent/CCComponents/CCNode";
import { CCSprite } from "@/components/NodeComponent/CCComponents/CCSprite";
import {
  BoxFlexAlignCenter,
  CheckBoxEx,
  TypographyCapitalize,
} from "@/components/Styleds";
import { INodeDetail } from "@/interface/INodeDetails";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const SytledComponentItemRoot = styled(Box)({
  marginLeft: "5px",
});

const StyledNodeNameRoot = styled(BoxFlexAlignCenter)({
  paddingLeft: "10px",
  position: "relative",

  "&:after": {
    content: "''",
    position: "absolute",
    left: "0px",
    right: "0px",
    backgroundColor: "#0000002d",
    bottom: "0px",
    height: "1px",
  },
});

const StyledAttrContent = styled(Box)({
  padding: "10px 35px",
});

const ComponentContent: React.FC<{
  isBaseNode?: boolean;
  nodeDetail: INodeDetail;
}> = ({ isBaseNode = false, nodeDetail }) => {
  const getNodeName = () => {
    if (!nodeDetail.name) {
      return "Sprite";
    }
    const idx = nodeDetail.name.indexOf("<");
    const str = nodeDetail.name.slice(idx + 1).replace(">", "");
    return str;
  };

  const renderComponent = () => {
    return <CCSprite nodeDetail={{} as any}></CCSprite>;
  };

  return (
    <SytledComponentItemRoot>
      <StyledNodeNameRoot>
        <CheckBoxEx size="small" defaultChecked disableRipple={true} />
        <TypographyCapitalize>{getNodeName()}</TypographyCapitalize>
      </StyledNodeNameRoot>
      <StyledAttrContent>
        {isBaseNode ? <CCNode nodeDetail={nodeDetail} /> : renderComponent()}
      </StyledAttrContent>
    </SytledComponentItemRoot>
  );
};

export default ComponentContent;
