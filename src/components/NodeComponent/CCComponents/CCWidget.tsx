import { INodeDetail } from "@/interface/INodeDetails";
import { Stack } from "@mui/material";

const Component: React.FC<{ nodeDetail: INodeDetail }> = ({ nodeDetail }) => {
  return <Stack spacing={1}></Stack>;
};

export { Component as CCWidget };
