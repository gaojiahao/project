<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-31 10:00:45
-->
<template>
<div>
    <div style="display: flex;flex-direction:row;flex-wrap: nowrap;justify-content: flex-start; width: 100%;">
        <Card style="margin: 10px 10px;width:300px;background-color: #f5fffa; height: 750px;">
            <TestTree></TestTree>
        </Card>
        <div>
            <Card style="margin: 10px 10px;width:600px;background-color: #f5fffa;">
                <TestForm></TestForm>
            </Card>
            <Card style="margin: 10px 10px;width:600px;background-color: #f5fffa;">
                <Test></Test>
            </Card>
        </div>
    </div>
</div>
</template>

<script>
import {
    Tree,
    Card
} from "view-design";
import TestForm from "@components/basicinfo/testForm";
import TestTree from "@components/basicinfo/testTree";
import Test from "@components/basicinfo/test";

export default {
    name: "TypeManager",
    components: {
        Card,
        TestForm,
        TestTree,
        Test,
    },
}
</script>
