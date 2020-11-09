export default {
    data() {
      return {
        List:[
            {
                name:'开发审核',
                value:'kfsh',
                nodeList: [
                    {
                        "id": "node5ZOOSrDWL3XBdus7",
                        "width": 100,
                        "height": 80,
                        "coordinate": [
                        -34,
                        -437
                        ],
                        "meta": {
                        "prop": "start",
                        "name": "开始节点",
                        "desc": "开始"
                        }
                    },
                    {
                        "id": "nodexO4hqXbrc33JRaaN",
                        "width": 160,
                        "height": 80,
                        "coordinate": [
                        -52,
                        -35
                        ],
                        "meta": {
                        "prop": "approval",
                        "name": "审批节点",
                        "desc": "总裁审批"
                        }
                    },
                    {
                        "id": "nodesFJ2095Yy7sfIfIY",
                        "width": 80,
                        "height": 50,
                        "coordinate": [
                        -12,
                        144
                        ],
                        "meta": {
                        "prop": "end",
                        "name": "结束节点"
                        }
                    },
                    {
                        "id": "nodeE9WlgsDuWaCOe3mH",
                        "width": 160,
                        "height": 80,
                        "coordinate": [
                        103,
                        -327
                        ],
                        "meta": {
                        "prop": "condition",
                        "name": "条件节点",
                        "desc": "是否需要审批"
                        }
                    },
                    {
                        "id": "nodeGuUN3gTWlQXkVmhT",
                        "width": 160,
                        "height": 80,
                        "coordinate": [
                        -52,
                        -179
                        ],
                        "meta": {
                        "prop": "approval",
                        "name": "审批节点",
                        "desc": "总经理审批"
                        }
                    },
                    {
                        "id": "nodeeXEeMJrE9FXGevyS",
                        "width": 160,
                        "height": 80,
                        "coordinate": [
                        -239,
                        -327
                        ],
                        "meta": {
                        "prop": "condition",
                        "name": "条件节点",
                        "desc": "是否需要审批"
                        }
                    }
                ],
                linkList: [
                    {
                      "id": "link1hbJaCNR9MrZIs3f",
                      "startId": "nodexO4hqXbrc33JRaaN",
                      "endId": "nodesFJ2095Yy7sfIfIY",
                      "startAt": [
                        80,
                        80
                      ],
                      "endAt": [
                        40,
                        0
                      ],
                      "meta": null
                    },
                    {
                      "id": "linkviVioHMiNQFiyq8A",
                      "startId": "nodeE9WlgsDuWaCOe3mH",
                      "endId": "nodeGuUN3gTWlQXkVmhT",
                      "startAt": [
                        80,
                        80
                      ],
                      "endAt": [
                        80,
                        0
                      ],
                      "meta": null
                    },
                    {
                      "id": "linkzlJGGV2kIPB3U2fj",
                      "startId": "nodeGuUN3gTWlQXkVmhT",
                      "endId": "nodexO4hqXbrc33JRaaN",
                      "startAt": [
                        80,
                        80
                      ],
                      "endAt": [
                        80,
                        0
                      ],
                      "meta": null
                    },
                    {
                      "id": "linkVblJtL0pOs7Fx2wV",
                      "startId": "node5ZOOSrDWL3XBdus7",
                      "endId": "nodeE9WlgsDuWaCOe3mH",
                      "startAt": [
                        50,
                        80
                      ],
                      "endAt": [
                        80,
                        0
                      ],
                      "meta": {
                        "desc": "同意"
                      }
                    },
                    {
                      "id": "link1QbaGM1SB2GGbvkS",
                      "startId": "nodeeXEeMJrE9FXGevyS",
                      "endId": "nodexO4hqXbrc33JRaaN",
                      "startAt": [
                        80,
                        80
                      ],
                      "endAt": [
                        0,
                        40
                      ],
                      "meta": null
                    },
                    {
                      "id": "linktCt6KsQwciCRpWCe",
                      "startId": "node5ZOOSrDWL3XBdus7",
                      "endId": "nodeeXEeMJrE9FXGevyS",
                      "startAt": [
                        50,
                        80
                      ],
                      "endAt": [
                        80,
                        0
                      ],
                      "meta": {
                        "desc": "不同意"
                      }
                    }
                ]
            },
            {
                name:'侵权审核',
                value:'qqsh',
                nodeList: [
                    {
                        'id': 'nodeS3WgFnzCI15X58Qw',
                        'width': 100,
                        'height': 80,
                        'coordinate': [-644, -148],
                        'meta': {
                            'prop': 'start',
                            'name': '开始节点'
                        }
                    },
                    {
                        'id': 'nodefHsy9uJObPtdHZv1',
                        'width': 160,
                        'height': 80,
                        'coordinate': [-200, -148],
                        'meta': {
                            'prop': 'approval',
                            'name': '审批节点',
                            'desc': '111111'
                        }
                    },
                    {
                        'id': 'nodeni9QOqT3mI7hsMau',
                        'width': 160,
                        'height': 80,
                        'coordinate': [-442, -275],
                        'meta': {
                            'prop': 'condition',
                            'name': '条件节点'
                        }
                    },
                    {
                        'id': 'nodeZBK0ZPpgMe1exezE',
                        'width': 160,
                        'height': 80,
                        'coordinate': [-200, -275],
                        'meta': {
                            'prop': 'approval',
                            'name': '审批节点'
                        }
                    },
                    {
                        'id': 'nodeqkK9zjcDz53xKRlK',
                        'width': 160,
                        'height': 80,
                        'coordinate': [34, -209],
                        'meta': {
                            'prop': 'cc',
                            'name': '抄送节点'
                        }
                    },
                    {
                        'id': 'nodeDhVU6w2KbEnJCjZs',
                        'width': 80,
                        'height': 50,
                        'coordinate': [286, -133],
                        'meta': {
                            'prop': 'end',
                            'name': '结束节点'
                        }
                    },
                    {
                        'id': 'nodesyxisLH1hJDdPsxx',
                        'width': 160,
                        'height': 80,
                        'coordinate': [34, -75],
                        'meta': {
                            'prop': 'cc',
                            'name': '抄送节点'
                        }
                    },
                    {
                        'id': 'node0aiA9VuhjkiAdZCs',
                        'width': 160,
                        'height': 80,
                        'coordinate': [-200, -2],
                        'meta': {
                            'prop': 'approval',
                            'name': '审批节点'
                        }
                    },
                    {
                        'id': 'nodeG3WeFnzCI15X58Qw',
                        'width': 160,
                        'height': 80,
                        'coordinate': [-442, -2],
                        'meta': {
                            'prop': 'condition',
                            'name': '条件节点'
                        }
                    },
                    {
                        'id': 'node7WXbwOR6kSFD53Hf',
                        'width': 160,
                        'height': 80,
                        'coordinate': [-442, -148],
                        'meta': {
                            'prop': 'condition',
                            'name': '条件节点'
                        }
                    }
                ],
                linkList: [
                    {
                        'id': 'linkcs9ZhumWeTHrtUy8',
                        'startId': 'nodeS3WgFnzCI15X58Qw',
                        'endId': 'nodeni9QOqT3mI7hsMau',
                        'startAt': [100, 40],
                        'endAt': [0, 40],
                        'meta': null
                    },
                    {
                        'id': 'linkBDld5rDBw4C6kiva',
                        'startId': 'nodefHsy9uJObPtdHZv1',
                        'endId': 'nodeqkK9zjcDz53xKRlK',
                        'startAt': [160, 40],
                        'endAt': [0, 40],
                        'meta': null
                    },
                    {
                        'id': 'linkA0ZZxRlDI9AOonuq',
                        'startId': 'node7WXbwOR6kSFD53Hf',
                        'endId': 'nodefHsy9uJObPtdHZv1',
                        'startAt': [160, 40],
                        'endAt': [0, 40],
                        'meta': null
                    },
                    {
                        'id': 'linkhCKTpRAf89gcujGS',
                        'startId': 'nodeni9QOqT3mI7hsMau',
                        'endId': 'nodeZBK0ZPpgMe1exezE',
                        'startAt': [160, 40],
                        'endAt': [0, 40],
                        'meta': null
                    },
                    {
                        'id': 'link2o7VZ7DRaSFKtB0g',
                        'startId': 'nodeqkK9zjcDz53xKRlK',
                        'endId': 'nodeDhVU6w2KbEnJCjZs',
                        'startAt': [160, 40],
                        'endAt': [0, 25],
                        'meta': null
                    },
                    {
                        'id': 'linkII013ovDctUDuPLu',
                        'startId': 'nodeS3WgFnzCI15X58Qw',
                        'endId': 'nodeG3WeFnzCI15X58Qw',
                        'startAt': [100, 40],
                        'endAt': [0, 40],
                        'meta': null
                    },
                    {
                        'id': 'link6MOmsq1EqzlWcG1n',
                        'startId': 'nodeZBK0ZPpgMe1exezE',
                        'endId': 'nodeqkK9zjcDz53xKRlK',
                        'startAt': [160, 40],
                        'endAt': [0, 40],
                        'meta': null
                    },
                    {
                        'id': 'link52SczSXHmuyKDzRU',
                        'startId': 'nodesyxisLH1hJDdPsxx',
                        'endId': 'nodeDhVU6w2KbEnJCjZs',
                        'startAt': [160, 40],
                        'endAt': [0, 25],
                        'meta': null
                    },
                    {
                        'id': 'link2hBQDTuIG4ZFYyE0',
                        'startId': 'node0aiA9VuhjkiAdZCs',
                        'endId': 'nodesyxisLH1hJDdPsxx',
                        'startAt': [160, 40],
                        'endAt': [0, 40],
                        'meta': null
                    },
                    {
                        'id': 'linkrwdW87FmOma5rPVo',
                        'startId': 'nodeG3WeFnzCI15X58Qw',
                        'endId': 'node0aiA9VuhjkiAdZCs',
                        'startAt': [160, 40],
                        'endAt': [0, 40],
                        'meta': null
                    },
                    {
                        'id': 'linknL75dQV0AWZA85sq',
                        'startId': 'nodeS3WgFnzCI15X58Qw',
                        'endId': 'node7WXbwOR6kSFD53Hf',
                        'startAt': [100, 40],
                        'endAt': [0, 40],
                        'meta': null
                    }
                ]
            },
        ]
      }
    }
}