var getBgListJson = function(latitude, longitude) {
    return new Promise((resolve, reject) => {
        var bgList = {
            "bgCnt": 16,
            "bgUrl": [
                "./static/imgs/background/0d419a3e37da7fa93cb1cad594a8b39ede5edf8ae48588f523d950b3d21809c6.jpg",
                "./static/imgs/background/12b66ba1e81c1cd5318b6690997844854d2542ceffb0e3e6ae7432c8464b1ac5.jpg",
                "./static/imgs/background/1614a028313f14b75efdddbc62b699ffedeedc3ddcfa2cb44198cff8e94ecf3f.jpg",
                "./static/imgs/background/16cddbd4bd5d6db1ce8000728232afca6af40af95a7ecd48f5d174bbf61e14da.jpg",
                "./static/imgs/background/2a2978afb1b3411e87a4c345164712d6ddb5a95488bd92b3dce7f986d24cc1a0.jpg",
                "./static/imgs/background/3c4be16dafc6187081bcd4266318bdea3a2d7004bb048aec3d38639989f205ee.jpg",
                "./static/imgs/background/438174eeb9e524b6b9f5437d538d39fdd31b5531d60d01c60e819153f3efafc3.jpg",
                "./static/imgs/background/5fe7f0d713d12609d87633f16576a57e72cd99e03387e8f8e4a4f834f2c3d04f.jpg",
                "./static/imgs/background/83fc1b96dc46eb13bdf2dc77183eee37377c20f178248fa798662859cf22c237.jpg",
                "./static/imgs/background/8c2615602384c22fe5a5288652180e3d695ceda132bd5bf5019ed21c983f91a3.jpg",
                "./static/imgs/background/8ddcfb8a86157153f6f619daf9198bb8eac6cec4484486aec28eef588ef2f9eb.jpg",
                "./static/imgs/background/abb84da1175a2e4a7149e26bbc6e32e4a752a9647cfd57b27c7e1642735f2e19.jpg",
                "./static/imgs/background/b28bd0fd026c81265345162804d1ead80fff940bbca4c0307749e90815db086a.jpg",
                "./static/imgs/background/b89fc8764ab3e4e53dd822a5dd9fcbfbcbe2e5f5adb5a421f5a201ccb727b1d3.jpg",
                "./static/imgs/background/bf6d3e9231df81ae22820736ad6065f142d8ede7bcc6dbbd547ee1c694808022.jpg",
                "./static/imgs/background/e65f332b88b6496c80938071eb327c6c80be4d25979568655f5f595b1b11f2b9.jpg"
            ]
        };

        resolve(bgList);
    });
}

var randomChoice = function(bgList) {
    return new Promise((resolve, reject) => {
        var bgCnt = bgList.bgCnt;
        var randInt = Math.floor(Math.random() * bgCnt);
        var bgUrl = bgList.bgUrl[randInt];

        if (bgUrl) {
            resolve(bgUrl);
        }
        else {
            reject(bgUrl);
        }
    });
}

var setBackgroundDOM = function(bgUrl) {
    console.log(bgUrl);

    var bgNode = document.getElementById('background');

    bgNode.style.backgroundImage = "url('" + bgUrl + "')";
}

var setBackground = function() {
    getBgListJson().then(
        response => {
            return randomChoice(response);
        },

        error => {
            console.log(error);
        }
    ).then(
        response => {
            setBackgroundDOM(response);
        },

        error => {
            console.log(error);
        }
    );
}

setBackground();

document.addEventListener('DOMContentLoaded', function() {
    var bgNode = document.getElementById('background');

    var timer = setTimeout(function() {
        bgNode.style.display = 'table';
    }, 100);
});