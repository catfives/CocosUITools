import { INodeDetail } from "@/interface/INodeDetails"
import { INodeTree } from "@/interface/INodeTree"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"



interface IUserInfoReducer {
    node_tree: Array<INodeTree>
    treeExpanded: Array<string>
    selectNodeId: string
    selectNodeName: string
    selectNodeComponents: Array<any>
    selectNodeDetails: INodeDetail
}
/**
 [
        {
            "label": "Canvas", "uuid": "a5esZu+45LA5mBpvttspPD", "children": [
                { "label": "Main Camera", "uuid": "e1WoFrQ79G7r4ZuQE3HlNb", "children": [] },
                {
                    "label": "New Button", "uuid": "152JkDyJ9KKpnxiETIhQQw", "children": [
                        {
                            "label": "Background", "uuid": "acd2tTGW1IhqO2V3XtY12N", "children": [
                                { "label": "Label", "uuid": "47IYP6oytHRZa8j/BcTBA2", "children": [] }
                            ]
                        }
                    ]
                },
                {
                    "label": "New Button copy", "uuid": "60fTzUqPRO554ZCQHyYvtA", "children": [
                        {
                            "label": "Background_1", "uuid": "79sUps6ilL86EfCPrmzBbn", "children": [
                                { "label": "Label_1", "uuid": "cafQ/CAgZGrIdRdbA1oaTz", "children": [] }
                            ]
                        }
                    ]
                },
                { "label": "New Node", "uuid": "41MN8FCz9A0JkO/GOdGq49", "children": [] }
            ]
        },
        {
            "label": "PROFILER-NODE", "uuid": "Node.763", "children": [
                { "label": "LEFT-PANEL", "uuid": "Node.765", "children": [] },
                { "label": "RIGHT-PANEL", "uuid": "Node.766", "children": [] }
            ]
        }
    ]
 */
const initialState: IUserInfoReducer = {
    node_tree: [
        {
            "label": "Canvas", "uuid": "a5esZu+45LA5mBpvttspPD", "children": [
                { "label": "Main Camera", "uuid": "e1WoFrQ79G7r4ZuQE3HlNb", "children": [] },
                {
                    "label": "New Button", "uuid": "152JkDyJ9KKpnxiETIhQQw", "children": [
                        {
                            "label": "Background", "uuid": "acd2tTGW1IhqO2V3XtY12N", "children": [
                                { "label": "Label", "uuid": "47IYP6oytHRZa8j/BcTBA2", "children": [] }
                            ]
                        }
                    ]
                },
                {
                    "label": "New Button copy", "uuid": "60fTzUqPRO554ZCQHyYvtA", "children": [
                        {
                            "label": "Background_1", "uuid": "79sUps6ilL86EfCPrmzBbn", "children": [
                                { "label": "Label_1", "uuid": "cafQ/CAgZGrIdRdbA1oaTz", "children": [] }
                            ]
                        }
                    ]
                },
                { "label": "New Node", "uuid": "41MN8FCz9A0JkO/GOdGq49", "children": [] }
            ]
        },
        {
            "label": "PROFILER-NODE", "uuid": "Node.763", "children": [
                { "label": "LEFT-PANEL", "uuid": "Node.765", "children": [] },
                { "label": "RIGHT-PANEL", "uuid": "Node.766", "children": [] }
            ]
        }
    ],
    treeExpanded: [],
    selectNodeId: "",
    selectNodeName: "",
    selectNodeComponents: [],
    selectNodeDetails: {} as INodeDetail,
}



export const devtoolsInfoReducer = createSlice({
    name: 'devtoolsInfoReducer',
    initialState,
    reducers: {
        setNodeTreeData: (state, action: PayloadAction<INodeTree[]>) => {
            state.selectNodeId = ""
            state.selectNodeName = ""
            state.selectNodeComponents = []
            state.node_tree = action.payload
        },

        setTreeExpanded: (state, action: PayloadAction<string[]>) => {
            state.treeExpanded = action.payload
        },

        setSelectNodeId: (state, action: PayloadAction<{ name: string, id: string }>) => {
            state.selectNodeId = action.payload.id
            state.selectNodeName = action.payload.name

        },

        setSelectNodeComponents: (state, action: PayloadAction<{ node: INodeDetail, comps: Array<any> }>) => {
            state.selectNodeDetails = action.payload.node
            state.selectNodeComponents = action.payload.comps
        },

    },
})

export const { setNodeTreeData, setTreeExpanded, setSelectNodeId, setSelectNodeComponents } = devtoolsInfoReducer.actions
export default devtoolsInfoReducer.reducer