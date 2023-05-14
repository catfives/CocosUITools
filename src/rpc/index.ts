/* eslint-disable @typescript-eslint/no-explicit-any */
import { IData, RpcMessageType } from "@/interface/IRpcMessageType"
const initChrome = false
var tabId = 0

if (initChrome) {
    tabId = chrome.devtools.inspectedWindow.tabId
    chrome.devtools.inspectedWindow.eval(
        "window.__cocos_node_dev_help_script_injected__ === true",
        (evt) => {
            if (!evt) {
                chrome.devtools.inspectedWindow.eval(
                    `(async () => {
                  window.__cocos_node_dev_help_script_injected__ = true;
                  while (!window.cc) {
                    await new Promise((resolve) => {
                      setTimeout(resolve, 100);
                    });
                  }
                  const temp = document.createElement("script");
                  temp.setAttribute("type", "text/javascript");
                  temp.src = "${chrome.runtime.getURL("injected.js")}";
                  temp.onload = function () {
                    window.postMessage({
                      type: "cocos::backend.notify.content",
                      id: \`\${Date.now()}-\${Math.random()}\`,
                      data: [
                        {
                          id: \`\${Date.now()}-\${Math.random()}\`,
                          type: "loadingComplete",
                          data: null,
                        },
                      ],
                    });
                  };
                  document.head.appendChild(temp);
                })();`
                );
            }
            //coconutool::page2content_request
            console.log(evt);
        }
    );
    /* 注册一些基本响应时间 */
    chrome.runtime.onMessage.addListener(
        async (message: any, sender, sendResponse) => {
            const { type, id, data } = message;
            if (sender.tab?.id != tabId) { return }
            if (type == "CocosUITools::content.requet.clinet") {
                console.log(id, data, tabId, sender);
                sendResponse("");
            } else if (type == "CocosUITools::content.respone.clinet") {
                let cb = rpc_func_map[id]
                if (cb != null && cb != undefined) {
                    cb(data)
                    delete rpc_func_map[id]
                }
            }
        }
    );
}

const rpc_func_map: Record<string, (evt?: any) => void> = {}

/** 发送执行命令到page web页面里面 */
function Request(data: IData, callback?: (evt?: any) => void) {
    let id = ""
    if (callback) {
        id = `${Date.now()}.${Math.random()}`
        rpc_func_map[id] = callback
    }
    const pack: RpcMessageType = { type: "CocosUITools::clinet.request.content", id: id, data: data }
    chrome.tabs.sendMessage(tabId, pack)
}





//
export { tabId, Request }
