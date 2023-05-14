import {
  CCCompItemLine,
  CCCompName,
  InputEx,
  ButtonEx,
} from "@/components/Styleds";
import { INodeDetail } from "@/interface/INodeDetails";
import { FileImageOutlined, PictureOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { Modal, Select, Switch, Tooltip } from "antd";
import { useState } from "react";

const Component: React.FC<{ nodeDetail: INodeDetail }> = ({ nodeDetail }) => {
  const [sprite, setSprite] = useState("123123-123123-123123-123123-123123");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const ButtonEx1 = styled(ButtonEx)({
    marginRight: "2px",
    borderStartEndRadius: "0px",
    borderEndEndRadius: "0px",
  });

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Stack spacing={1}>
        <CCCompItemLine direction="row">
          <CCCompName>sprite frame</CCCompName>
          <InputEx defaultValue={sprite} disabled placeholder="Basic usage" />
          <Tooltip title="查看Sprite  Frame">
            <ButtonEx1
              type="primary"
              icon={<PictureOutlined />}
              onClick={showModal}
            />
          </Tooltip>
          <Tooltip title="查看原始图片">
            <ButtonEx
              type="primary"
              icon={<FileImageOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </CCCompItemLine>
        <CCCompItemLine direction="row">
          <CCCompName>type</CCCompName>
          <Select
            defaultValue="SIMPE"
            style={{ width: "100%" }}
            options={[
              { value: "0", label: "SIMPE" },
              { value: "1", label: "SLICED" },
              { value: "2", label: "TLIED" },
              { value: "3", label: "FILLED" },
              { value: "4", label: "MESH" },
            ]}
          />
        </CCCompItemLine>
        <CCCompItemLine direction="row">
          <CCCompName>size mode</CCCompName>
          <Select
            defaultValue="CUSTOM"
            style={{ width: "100%" }}
            options={[
              { value: "0", label: "CUSTOM" },
              { value: "1", label: "TRIMMED" },
              { value: "2", label: "RAW" },
            ]}
          />
        </CCCompItemLine>
        <CCCompItemLine direction="row">
          <CCCompName>trim</CCCompName>
          <Switch style={{ marginRight: "auto" }} defaultChecked />
        </CCCompItemLine>
      </Stack>
    </>
  );
};

export { Component as CCSprite };
