import { RpcMessageType } from "@/interface/IRpcMessageType"

window.addEventListener("message", (evt: MessageEvent<RpcMessageType>) => {
    if (typeof evt.data == "object") {
        const requestData = evt.data
        if (requestData.type == "CocosUITools::inject.request.content") {
            chrome.runtime.sendMessage(
                { type: "CocosUITools::content.requet.clinet", data: requestData.data },
                (evt) => { window.postMessage({ type: "CocosUITools::content.respone.inject", data: evt }) }
            )
        } else if (requestData.type == "CocosUITools::inject.respone.content") {
            chrome.runtime.sendMessage({ type: "CocosUITools::content.respone.clinet", data: requestData.data, id: requestData.id })
        }
    }
})

chrome.runtime.onMessage.addListener(async evt => {

    if (typeof evt == "object") {
        const { type, id, data } = evt
        //react 发来rpc消息, 通过content 转发到 backend
        if (type == "CocosUITools::clinet.request.content") {
            window.postMessage({ type: "CocosUITools::content.request.inject", id, data })
        }
    }
})