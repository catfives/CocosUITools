import {
  InputNumberWidthMax,
  CCCompName,
  CCCompItemLine,
  CCCompAttrItem,
} from "@/components/Styleds";
import { INodeDetail } from "@/interface/INodeDetails";
import { Stack } from "@mui/material";

const NodeComponent: React.FC<{ nodeDetail: INodeDetail }> = ({
  nodeDetail,
}) => {
  return (
    <Stack spacing={1}>
      {/* <!--       Node Position     --> */}
      <CCCompItemLine direction="row">
        <CCCompName>position</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax
            addonBefore="x"
            defaultValue={nodeDetail.x}
            step={0.1}
          />
          <InputNumberWidthMax addonBefore="y" defaultValue={nodeDetail.y} />
        </CCCompAttrItem>
      </CCCompItemLine>
      {/* <!--       Node Scale     --> */}
      <CCCompItemLine direction="row">
        <CCCompName>scale</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax
            addonBefore="x"
            defaultValue={nodeDetail.scaleX}
            step={0.1}
          />
          <InputNumberWidthMax
            addonBefore="y"
            defaultValue={nodeDetail.scaleY}
          />
        </CCCompAttrItem>
      </CCCompItemLine>
      {/* <!--       Node Anchor 锚点     --> */}
      <CCCompItemLine direction="row">
        <CCCompName>anchor</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax
            addonBefore="x"
            defaultValue={nodeDetail.anchorX}
            step={0.1}
          />
          <InputNumberWidthMax
            addonBefore="y"
            defaultValue={nodeDetail.anchorY}
          />
        </CCCompAttrItem>
      </CCCompItemLine>
      {/* <!--       Node Scale     --> */}
      <CCCompItemLine direction="row">
        <CCCompName>size</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax
            addonBefore="w"
            defaultValue={nodeDetail.width}
            step={0.1}
          />
          <InputNumberWidthMax
            addonBefore="h"
            defaultValue={nodeDetail.height}
          />
        </CCCompAttrItem>
      </CCCompItemLine>
      {/* <!--       Node Color     --> */}
      <CCCompItemLine direction="row">
        <CCCompName>color</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax addonBefore="rgb" defaultValue={100} />
          <InputNumberWidthMax addonBefore="hex" defaultValue={100} />
        </CCCompAttrItem>
      </CCCompItemLine>
      {/* <!--       Node Rotation     --> */}
      <CCCompItemLine direction="row">
        <CCCompName>rotation</CCCompName>
        <InputNumberWidthMax
          style={{ marginLeft: "30px" }}
          addonBefore="rotation"
          defaultValue={nodeDetail.rotation}
          step={0.1}
        />
      </CCCompItemLine>
      {/* <!--       Node Opacity     --> */}
      <CCCompItemLine direction="row">
        <CCCompName>opacity</CCCompName>
        <InputNumberWidthMax
          style={{ marginLeft: "30px" }}
          addonBefore="opacity"
          defaultValue={nodeDetail.opacity}
          step={0.1}
        />
      </CCCompItemLine>
    </Stack>
  );
};
export { NodeComponent as CCNode };
