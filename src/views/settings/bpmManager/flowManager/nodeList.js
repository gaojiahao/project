export default {
    data() {
      return {
        list:[
          {
            id:261,
            "clauseId": "261",
            "chanrtJson": {
              "origin": [681, 465],
              "nodes": [{
                "id": "nodez6g47CN0ylhPvXBq",
                "width": 40,
                "height": 40,
                "coordinate": [-207, -406],
                "data": {
                  "prop": "start",
                  "name": "开始"
                },
                "left": -207,
                "top": -406,
                "type": "start",
                "text": "开始",
                "nodeId": "nodez6g47CN0ylhPvXBq",
                "parPolicies": {},
                "permissions": [],
                "buttons": [],
                "rules": [],
                "participants": []
              }, {
                "id": "nodeLnoCuKVfqRiPGhEd",
                "width": 120,
                "height": 50,
                "coordinate": [-247, -308],
                "data": {
                  "prop": "task",
                  "name": "任务"
                },
                "left": -247,
                "top": -308,
                "type": "task",
                "text": "任务",
                "nodeId": "nodeLnoCuKVfqRiPGhEd",
                "parPolicies": {
                  "noParPolicy": "001",
                  "dupParPolicy": "001",
                  "participatedParPolicy": "001"
                },
                "permissions": [{
                  "fId": 1,
                  "columnName": "姓名",
                  "displayName": "name",
                  "type": "文本",
                  "isEditable": true,
                  "isVisible": true,
                  "required": false
                }, {
                  "fId": 2,
                  "columnName": "性别",
                  "displayName": "sex",
                  "type": "文本",
                  "isEditable": true,
                  "isVisible": true,
                  "required": false
                }, {
                  "id": 3,
                  "columnName": "年龄",
                  "displayName": "age",
                  "type": "文本",
                  "isEditable": true,
                  "isVisible": true,
                  "required": false
                }],
                "buttons": [{
                  "name": "同意",
                  "value": "agree",
                  "action": true
                }, {
                  "name": "拒绝",
                  "value": "disagree",
                  "action": true
                }, {
                  "name": "撤回",
                  "value": "recall",
                  "action": false
                }, {
                  "name": "终止",
                  "value": "stop",
                  "action": false
                }, {
                  "name": "转办",
                  "value": "transfer",
                  "action": false
                }],
                "rules": [],
                "participants": [{
                  "participantId": 212,
                  "roleName": "总经理",
                  "type": 1
                }, {
                  "participantId": 212,
                  "roleName": "总经理",
                  "type": 1
                }]
              }, {
                "id": "nodeXPCvv5NAoevgb8Hf",
                "width": 140,
                "height": 60,
                "coordinate": [-257, -192],
                "data": {
                  "prop": "condition",
                  "name": "条件"
                },
                "left": -257,
                "top": -192,
                "type": "condition",
                "text": "条件",
                "nodeId": "nodeXPCvv5NAoevgb8Hf",
                "parPolicies": {},
                "permissions": [],
                "buttons": [],
                "rules": [{
                  "fId": 1,
                  "nexus": "001",
                  "displayName": "name",
                  "logicType": "001",
                  "value": "1",
                  "columnName": "姓名",
                  "nexusText": "并且",
                  "logicText": "等于"
                }, {
                  "fId": 2,
                  "nexus": "001",
                  "displayName": "sex",
                  "logicType": "001",
                  "value": "1",
                  "columnName": "性别",
                  "nexusText": "并且",
                  "logicText": "等于"
                }],
                "participants": []
              }, {
                "id": "nodeIdRypeAcTTYu6VYe",
                "width": 120,
                "height": 50,
                "coordinate": [-247, -82],
                "data": {
                  "prop": "task",
                  "name": "任务"
                },
                "left": -247,
                "top": -82,
                "type": "task",
                "text": "任务",
                "nodeId": "nodeIdRypeAcTTYu6VYe",
                "parPolicies": {
                  "noParPolicy": "002",
                  "dupParPolicy": "003",
                  "participatedParPolicy": "002"
                },
                "permissions": [{
                  "fId": 1,
                  "columnName": "姓名",
                  "displayName": "name",
                  "type": "文本",
                  "isEditable": false,
                  "isVisible": true,
                  "required": false
                }, {
                  "fId": 2,
                  "columnName": "性别",
                  "displayName": "sex",
                  "type": "文本",
                  "isEditable": false,
                  "isVisible": true,
                  "required": false
                }, {
                  "id": 3,
                  "columnName": "年龄",
                  "displayName": "age",
                  "type": "文本",
                  "isEditable": false,
                  "isVisible": true,
                  "required": false
                }],
                "buttons": [{
                  "name": "同意",
                  "value": "agree",
                  "action": true
                }, {
                  "name": "拒绝",
                  "value": "disagree",
                  "action": true
                }, {
                  "name": "撤回",
                  "value": "recall",
                  "action": false
                }, {
                  "name": "终止",
                  "value": "stop",
                  "action": false
                }, {
                  "name": "转办",
                  "value": "transfer",
                  "action": true
                }],
                "rules": [],
                "participants": [{
                  "participantId": 206,
                  "roleName": "总经理",
                  "type": 1
                }]
              }, {
                "id": "nodeoXkq5nJneSGCx8wP",
                "width": 40,
                "height": 40,
                "coordinate": [-207, 25],
                "data": {
                  "prop": "end",
                  "name": "结束"
                },
                "left": -207,
                "top": 25,
                "type": "end",
                "text": "结束",
                "nodeId": "nodeoXkq5nJneSGCx8wP",
                "parPolicies": {},
                "permissions": [],
                "buttons": [],
                "rules": [],
                "participants": []
              }],
              "edges": [{
                "edgeid": "linkKZzUtAPikSGCy8Rf",
                "sourse": "nodeXPCvv5NAoevgb8Hf",
                "target": "nodeIdRypeAcTTYu6VYe",
                "startAt": [70, 60],
                "endAt": [60, 0],
                "data": {
                  "name": "线",
                  "prop": "line"
                }
              }, {
                "edgeid": "linkQrFDChIQz0XRbmF4",
                "sourse": "nodeIdRypeAcTTYu6VYe",
                "target": "nodeoXkq5nJneSGCx8wP",
                "startAt": [60, 50],
                "endAt": [20, 0],
                "data": {
                  "name": "线",
                  "prop": "line"
                }
              }, {
                "edgeid": "linkrqwKwTBfaDZZ34Cg",
                "sourse": "nodeLnoCuKVfqRiPGhEd",
                "target": "nodeXPCvv5NAoevgb8Hf",
                "startAt": [60, 50],
                "endAt": [70, 0],
                "data": {
                  "name": "线",
                  "prop": "line"
                }
              }, {
                "edgeid": "linkUcBXcGqH2wujZODU",
                "sourse": "nodez6g47CN0ylhPvXBq",
                "target": "nodeLnoCuKVfqRiPGhEd",
                "startAt": [20, 40],
                "endAt": [60, 0],
                "data": {
                  "name": "线",
                  "prop": "line"
                }
              }]
            }
          }
        ]
      }
    }
}