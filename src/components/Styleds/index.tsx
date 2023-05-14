import styled from "@emotion/styled";
import { Box, IconButton, Stack, Checkbox } from "@mui/material";
import {
  Button,
  Input,
  InputNumber,
  Radio,
  Segmented,
  Space,
  Typography as TypographyAntd,
} from "antd";
import Search from "antd/es/input/Search";
/** Box flex 剧中 */
const BoxFlexAlignCenter = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const TypographyCapitalize = styled(TypographyAntd)({
  textTransform: "capitalize",
});

const InputNumberWidthMax = styled(InputNumber)({
  width: "100%",
  borderRadius: "2px",
  "& .ant-input-number-group-addon": {
    borderRadius: "2px",
  },
  "& .ant-input-number": {
    borderRadius: "2px",
  },
});

const CCCompName = styled(TypographyCapitalize)({
  minWidth: "100px",
});

const CCCompItemLine = styled(Stack)({
  alignItems: "center",
  justifyContent: "space-between",
});

const CCCompAttrItem = styled(Space)({
  flex: 1,
  width: "70%",
  display: "flex",
  marginLeft: "30px",
  justifyContent: "flex-end",
  "& .ant-space-item": { flex: 1 },
});

const CCToggleGroup = styled(Radio.Group)({
  ".ant-radio-button-wrapper:last-child": {
    borderStartEndRadius: "2px",
    borderEndEndRadius: "2px",
  },
  ".ant-radio-button-wrapper": {
    borderStartStartRadius: "2px",
    borderEndStartRadius: "2px",
  },
});
const CCSegmented = styled(Segmented)({
  borderRadius: "2px",
  ".ant-segmented-item": {
    borderRadius: "0px",
  },
});

const IconButtonEx = styled(IconButton)({
  ".MuiSvgIcon-root": {
    width: "0.9em",
    height: "0.9em",
    fontSize: "1.2rem",
  },
});

const SearchInputEx = styled(Search)({
  ".ant-input-search-button": { height: "31px" },
  ".ant-input-group .ant-input-affix-wrapper:not(:last-child)": {
    borderStartStartRadius: "2px ",
    borderEndStartRadius: "2px ",
  },
  ">.ant-input-group >.ant-input-group-addon:last-child .ant-input-search-button":
    {
      borderStartEndRadius: "2px",
      borderEndEndRadius: "2px",
    },
});

const InputEx = styled(Input)({
  borderRadius: "0px",
  borderStartStartRadius: "2px",
  borderEndStartRadius: "2px",
  // borderStartEndRadius: "2px",
  // borderEndEndRadius: "2px",
});

const ButtonEx = styled(Button)({
  borderRadius: "0px",
  borderStartEndRadius: "2px",
  borderEndEndRadius: "2px",
});
//border-radius: 2px;

const CheckBoxEx = styled(Checkbox)({
  padding: "5px",
  "& .MuiSvgIcon-root": {
    width: "0.8em",
    height: "0.8em",
  },
});
export {
  BoxFlexAlignCenter,
  TypographyCapitalize,
  InputNumberWidthMax,
  CCCompName,
  CCCompItemLine,
  CCCompAttrItem,
  CCToggleGroup,
  CCSegmented,
  IconButtonEx,
  SearchInputEx,
  InputEx,
  ButtonEx,
  CheckBoxEx,
};
