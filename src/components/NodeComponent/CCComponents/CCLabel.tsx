import {
  CCCompAttrItem,
  CCCompItemLine,
  CCCompName,
  CCSegmented,
  InputNumberWidthMax,
} from "@/components/Styleds";
import { Stack } from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import { ReactComponent as AlignLeft } from "@/assets/svg/alignLeft.svg";
import { ReactComponent as AlignHCenter } from "@/assets/svg/alignHCenter.svg";
import { ReactComponent as AlignRight } from "@/assets/svg/alignRight.svg";
import { ReactComponent as AlignTop } from "@/assets/svg/alignTop.svg";
import { ReactComponent as AlignVCenter } from "@/assets/svg/alignVCenter.svg";
import { ReactComponent as AlignBottom } from "@/assets/svg/alignBottom.svg";
import Icon from "@ant-design/icons";
import styled from "@emotion/styled";
const TextAreaEx = styled(TextArea)({ borderRadius: "2px" });

const Component: React.FC<{ nodeDetail: any }> = ({ nodeDetail }) => {
  const _a = nodeDetail;
  console.log(_a);
  return (
    <Stack spacing={1}>
      <CCCompItemLine direction="row">
        <CCCompName>string</CCCompName>
        <CCCompAttrItem style={{ alignItems: "flex-start" }} size="middle">
          <TextAreaEx rows={2} size="small" value={nodeDetail.string} />
        </CCCompAttrItem>
      </CCCompItemLine>

      <CCCompItemLine direction="row">
        <CCCompName>font size</CCCompName>
        <InputNumberWidthMax
          style={{ marginLeft: "30px" }}
          defaultValue={nodeDetail.fontSize}
          step={0.1}
        />
      </CCCompItemLine>
      <CCCompItemLine direction="row">
        <CCCompName>line height</CCCompName>
        <InputNumberWidthMax
          style={{ marginLeft: "30px" }}
          defaultValue={nodeDetail.lineHeight}
          step={0.1}
        />
      </CCCompItemLine>
      <CCCompItemLine direction="row">
        <CCCompName>horizontal align</CCCompName>
        {/* onChange={setValue} */}
        <CCSegmented
          defaultValue={nodeDetail.horizontalAlign}
          options={[
            {
              value: 0,
              icon: <Icon component={AlignLeft} />,
            },
            {
              value: 1,
              icon: <Icon component={AlignHCenter} />,
            },
            {
              value: 2,
              icon: <Icon component={AlignRight} />,
            },
          ]}
        />
      </CCCompItemLine>
      <CCCompItemLine direction="row">
        {/* key : verticalAlign */}
        <CCCompName>vertical align</CCCompName>
        <CCSegmented
          defaultValue={nodeDetail.verticalAlign}
          options={[
            {
              value: 0,
              icon: <Icon component={AlignTop} />,
            },
            {
              value: 1,
              icon: <Icon component={AlignVCenter} />,
            },
            {
              value: 2,
              icon: <Icon component={AlignBottom} />,
            },
          ]}
        />
        {/* <CCToggleGroup defaultValue={0}>
          <Radio.Button value={0}>
            <Icon component={AlignTop} />
          </Radio.Button>
          <Radio.Button value={1}>
            <Icon component={AlignVCenter} />
          </Radio.Button>
          <Radio.Button value={2}>
            <Icon component={AlignBottom} />
          </Radio.Button>
        </CCToggleGroup> */}
      </CCCompItemLine>
    </Stack>
  );
};

export { Component as CCLabel };
