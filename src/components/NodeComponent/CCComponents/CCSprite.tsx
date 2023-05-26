import {
  CCCompItemLine,
  CCCompName,
  InputEx,
  ButtonEx,
} from "@/components/Styleds";
import { FileImageOutlined, PictureOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { Modal, Select, Switch, Tooltip } from "antd";
import { useState } from "react";

const Image = styled('img')({
  backgroundColor: '#000',
  maxWidth: '100%'
})

const Component: React.FC<{ nodeDetail: any }> = ({ nodeDetail }) => {
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

  const showLookSrcPng = () => {
    if (nodeDetail.spriteFrame.texture.nativeUrl != "") {
      return <Tooltip title="查看原始图片">
        <ButtonEx
          type="primary"
          icon={<FileImageOutlined />}
          onClick={showModal}
        />
      </Tooltip>
    }
    return <></>
  }


  const SelectImageRect = styled(`div`)({
    position: 'absolute',
    top: nodeDetail.spriteFrame.rect.x,
    left: nodeDetail.spriteFrame.rect.x,
    width: nodeDetail.spriteFrame.rect.width,
    height: nodeDetail.spriteFrame.rect.height,
    border: '1px solid red'
  })

  return (
    <>
      <Modal
        title="查看原始图片"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ position: 'relative' }}>
          <a href={nodeDetail.spriteFrame.texture.nativeUrl} target="_blank">
            {/* <Canvas></Canvas> */}
            <Image src={nodeDetail.spriteFrame.texture.nativeUrl} alt="" />
          </a>
          <SelectImageRect></SelectImageRect>
        </div>


      </Modal>
      <Stack spacing={1}>
        <CCCompItemLine direction="row">
          <CCCompName>sprite frame</CCCompName>
          <InputEx defaultValue={nodeDetail.spriteFrame.uuid} disabled placeholder="Basic usage" />
          <Tooltip title="查看Sprite  Frame">
            <ButtonEx1
              type="primary"
              icon={<PictureOutlined />}
              onClick={showModal}
            />
          </Tooltip>

          {showLookSrcPng()}

        </CCCompItemLine>
        <CCCompItemLine direction="row">
          <CCCompName>type</CCCompName>
          <Select
            defaultValue={nodeDetail.type}
            style={{ width: "100%" }}
            options={[
              { value: 0, label: "SIMPE" },
              { value: 1, label: "SLICED" },
              { value: 2, label: "TLIED" },
              { value: 3, label: "FILLED" },
              { value: 4, label: "MESH" },
            ]}
          />
        </CCCompItemLine>
        <CCCompItemLine direction="row">
          <CCCompName>size mode</CCCompName>
          <Select
            defaultValue={nodeDetail.sizeMode}
            style={{ width: "100%" }}
            options={[
              { value: 0, label: "CUSTOM" },
              { value: 1, label: "TRIMMED" },
              { value: 2, label: "RAW" },
            ]}
          />
        </CCCompItemLine>
        <CCCompItemLine direction="row">
          <CCCompName>trim</CCCompName>
          <Switch style={{ marginRight: "auto" }} defaultChecked={nodeDetail.trim} />
        </CCCompItemLine>
      </Stack>
    </>
  );
};

export { Component as CCSprite };
