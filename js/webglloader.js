function isMobileDevice() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function loadWebGL() {
    // Check if the user is on a mobile device
    if (isMobileDevice()) {
        // Show mobile placeholder and hide desktop placeholder
        document.getElementById('desktop-placeholder').style.display = 'none';
        document.getElementById('mobile-placeholder').style.display = 'flex';
    } else {
        // Hide the placeholder and load the WebGL content
        var placeholder = document.getElementById('desktop-placeholder');
        placeholder.style.display = 'none';

        var canvas = document.getElementById('unity-canvas');
        canvas.style.display = 'block';

        createUnityInstance(canvas, {
            dataUrl: "Build/OASIS_WebGL.data",
            frameworkUrl: "Build/OASIS_WebGL.framework.js",
            codeUrl: "Build/OASIS_WebGL.wasm",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "Unity_SNS",
            productVersion: "0.1",
        });
    }
}

// Only call loadWebGL if we're on a mobile device; otherwise, wait for a click
if (isMobileDevice()) {
    window.onload = loadWebGL;
}

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);

    var canvas = document.querySelector("#unity-canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "fixed";

    document.body.style.textAlign = "left";
}

createUnityInstance(document.querySelector("#unity-canvas"), {
    dataUrl: "Build/OASIS_WebGL.data",
    frameworkUrl: "Build/OASIS_WebGL.framework.js",
    codeUrl: "Build/OASIS_WebGL.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Unity_SNS",
    productVersion: "0.1",
});