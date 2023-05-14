export interface RpcMessageType {
    type: string,
    id: string,
    data: IData
}


export interface IData {
    action: string,
    data?: any
}