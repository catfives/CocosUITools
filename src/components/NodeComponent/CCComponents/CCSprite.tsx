import {
  ButtonEx,
  CCCompItemLine,
  CCCompName,
  InputEx,
  InputNumberWidthMax,
} from "@/components/Styleds";
import { PictureOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { Modal, Select, Switch, Tooltip, Typography } from "antd";
import { FC, useEffect, useRef, useState } from "react";
var imageScale: number = 0;
const Canvas = styled("canvas")({});
const A = styled("a")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const { Text } = Typography;

const Component: React.FC<{ nodeDetail: any }> = ({ nodeDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const ButtonEx1 = styled(ButtonEx)({
    marginRight: "2px",
    borderStartEndRadius: "0px",
    borderEndEndRadius: "0px",
  });

  return (
    <>
      {nodeDetail.spriteFrame && (
        <CanvasModal
          open={isModalOpen}
          imageUrl={nodeDetail.spriteFrame.texture.nativeUrl}
          onCancel={cancelModal}
          rect={nodeDetail.spriteFrame.rect}
        ></CanvasModal>
      )}
      <Stack spacing={1}>
        <CCCompItemLine direction="row">
          <CCCompName>sprite frame</CCCompName>
          <InputEx
            defaultValue={nodeDetail.spriteFrame && nodeDetail.spriteFrame.uuid}
            disabled
            placeholder="Basic usage"
          />

          {nodeDetail.spriteFrame && (
            <Tooltip title="查看Sprite  Frame">
              <ButtonEx1
                type="primary"
                icon={<PictureOutlined />}
                onClick={showModal}
              />
            </Tooltip>
          )}
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
          <Switch
            style={{ marginRight: "auto" }}
            defaultChecked={nodeDetail.trim}
          />
        </CCCompItemLine>
      </Stack>
    </>
  );
};

interface CanvasModalProps {
  open: boolean;
  imageUrl: string;
  onCancel: () => void;
  rect: { x: number; y: number; width: number; height: number };
}

const CanvasModal: FC<CanvasModalProps> = ({
  open,
  imageUrl,
  rect,
  onCancel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  var isDarkBg = false;

  const calcContainScale = (w: number, h: number, cw: number, ch: number) => {
    const scaleW = cw / w;
    const scaleH = ch / h;
    const scale = Math.min(scaleW, scaleH); // 取小值
    return scale;
  };

  const calcPos = (w: number, h: number, cw: number, ch: number) => {
    return {
      x: (cw - w) / 2,
      y: (ch - h) / 2,
    };
  };

  const displayImage = () => {
    const image = new Image();
    image.onload = () => {
      clearCanvas();
      drawCanvas(image);
    };
    image.src = imageUrl;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = isDarkBg ? "#000000" : "#ffffff";

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawCanvas = (image: HTMLImageElement) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    if (image.width > canvasWidth || image.height > canvasHeight) {
      imageScale = calcContainScale(
        image.width,
        image.height,
        canvasWidth,
        canvasHeight
      );
    } else {
      imageScale = 1;
    }

    const w = image.width * imageScale; // 图片缩放后的宽度
    const h = image.height * imageScale; // 图片缩放后的高度

    const { x, y } = calcPos(w, h, canvas.width, canvas.height); // 顺便让图片居中

    // 在Canvas上绘制图像
    ctx.drawImage(image, x, y, w, h);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 1.5;
    const strokeW = rect.width * imageScale;
    const strokeH = rect.height * imageScale;

    const rectX = rect.x;
    const rectY = rect.y;
    const x1 = rectX == 0 ? x : (rectX + x) * imageScale;
    const y1 = rectY == 0 ? y : (rectY + y) * imageScale;

    ctx.strokeRect(x1, y1, strokeW, strokeH);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => displayImage(), 1);
    }
  }, [open]);

  const changeBackgroundColor = (checked: boolean) => {
    isDarkBg = checked;
    setTimeout(() => displayImage(), 1);
  };

  return (
    <Modal
      width="570px"
      title="查看原始图片"
      open={open}
      onCancel={() => onCancel()}
      footer={
        <>
          <div style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
            <Text strong style={{ marginRight: "10px" }}>
              使用黑色背景
            </Text>
            <Switch
              defaultChecked={isDarkBg}
              onChange={(checked) => changeBackgroundColor(checked)}
            />
          </div>

          <Stack direction="row" sx={{ pb: "20px" }} spacing={2}>
            <InputNumberWidthMax
              addonBefore="x"
              disabled
              defaultValue={rect.x}
            />
            <InputNumberWidthMax
              addonBefore="y"
              disabled
              defaultValue={rect.y}
            />
            <InputNumberWidthMax
              addonBefore="w"
              disabled
              defaultValue={rect.width}
            />
            <InputNumberWidthMax
              addonBefore="h"
              disabled
              defaultValue={rect.height}
            />
          </Stack>
        </>
      }
    >
      <A href={imageUrl} target="_blank">
        <Canvas width="550" height="550" ref={canvasRef} />
      </A>
    </Modal>
  );
};

export { Component as CCSprite };
