import { Align } from "@/components/Align";
import {
  CCCompAttrItem,
  CCCompItemLine,
  CCCompName,
  InputNumberWidthMax,
} from "@/components/Styleds";
import { INodeDetail } from "@/interface/INodeDetails";
import { Stack } from "@mui/material";
import { Select } from "antd";

const Component: React.FC<{ nodeDetail: INodeDetail }> = ({ nodeDetail }) => {
  return (
    <Stack spacing={1}>
      <CCCompItemLine direction="row">
        <CCCompName>top</CCCompName>
        <Align></Align>
      </CCCompItemLine>
      <CCCompItemLine direction="row">
        <CCCompName>top</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax defaultValue={nodeDetail.x} step={0.1} />
        </CCCompAttrItem>
      </CCCompItemLine>
      <CCCompItemLine direction="row">
        <CCCompName>right</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax defaultValue={nodeDetail.x} step={0.1} />
        </CCCompAttrItem>
      </CCCompItemLine>
      <CCCompItemLine direction="row">
        <CCCompName>bottom</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax defaultValue={nodeDetail.x} step={0.1} />
        </CCCompAttrItem>
      </CCCompItemLine>
      <CCCompItemLine direction="row">
        <CCCompName>left</CCCompName>
        <CCCompAttrItem size="middle">
          <InputNumberWidthMax defaultValue={nodeDetail.x} step={0.1} />
        </CCCompAttrItem>
      </CCCompItemLine>
      <CCCompItemLine direction="row">
        <CCCompName>size mode</CCCompName>
        <Select
          defaultValue="1"
          style={{ width: "100%" }}
          options={[
            { value: "0", label: "ONCE" },
            { value: "1", label: "ON_WINDOW_RESIZE" },
            { value: "2", label: "ALWAYS" },
          ]}
        />
      </CCCompItemLine>
    </Stack>
  );
};

export { Component as CCWidget };
