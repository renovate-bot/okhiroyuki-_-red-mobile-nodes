module.exports = function(RED) {
    'use strcit';

    const axios = require('axios');
    const BASE_URL = 'http://127.0.0.1';
    const PATH =  '/mobile';

    function RedMobileGyroscopeNode(n) {
        RED.nodes.createNode(this, n);
        let node = this;

        node.on('input', function(msg) {
            let config = {
                baseURL: BASE_URL + ":" + RED.settings.redMobilePort,
                url: PATH,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer: " + RED.settings.redMobileAccessKey
                },
                params: {
                    method: "gyroscope"
                }
            };

            axios.request(config).then((res) => {
                msg.payload = res.data;
                node.send(msg);
                node.status({
                    fill: "blue",
                    shape: "dot",
                    text: "success"
                });
            }).catch((error) => {
                node.error(RED._("gyroscope.errors.response"));
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: RED._("gyroscope.errors.response")
                });
            });
        });
    }

    RED.nodes.registerType("gyroscope", RedMobileGyroscopeNode);
};
