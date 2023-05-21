import { useState } from "react";
import "./index.less";

const component = () => {
  const [dir, setDir] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
    horizontal: false,
    vertical: false,
  });

  const _onClick = (
    clickDir: "top" | "left" | "right" | "bottom" | "horizontal" | "vertical"
  ) => {
    return (_evt: any) => {
      let o: any = {};
      o[clickDir] = !dir[clickDir];
      let newObj = { ...dir, ...o };
      setDir(newObj);
      console.log(clickDir);
    };
  };

  return (
    <div className="align-root">
      <div className="outside">
        <div
          className={`position top ${dir.top ? "top-select" : ""}`}
          onClick={_onClick("top")}
        ></div>

        <div
          className={`position left ${dir.left ? "left-select" : ""}`}
          onClick={_onClick("left")}
        ></div>

        <div
          className={`position bottom ${dir.bottom ? "bottom-select" : ""}`}
          onClick={_onClick("bottom")}
        ></div>
        <div
          className={`position right ${dir.right ? "right-select" : ""}`}
          onClick={_onClick("right")}
        ></div>

        <div
          className={`position horizontal ${
            dir.horizontal ? "horizontal-select" : ""
          }`}
          onClick={_onClick("horizontal")}
        ></div>
        <div
          className={`position vertical ${
            dir.vertical ? "vertical-select" : ""
          }`}
          onClick={_onClick("vertical")}
        ></div>
      </div>
    </div>
  );
};

export { component as Align };
