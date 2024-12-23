let generatedImage = null; 

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event triggered");

    populateDropdown("stage1", stages);
    populateDropdown("stage2", stages);
    populateDropdown("rule", rules);
    
    document.getElementById("saveButton").disabled = true;
});

function generateImage() {
    console.log("generateImage function called");

    const stage1 = document.getElementById('stage1').value;
    const stage2 = document.getElementById('stage2').value;
    const rule = document.getElementById('rule').value;
    const background = document.getElementById('background').files[0];

    if (!background) {
        alert('背景画像をアップロードしてください。');
        return;
    }

    if (!background.type.startsWith("image/")) {
        alert('画像ファイルを選択してください。');
        return;
    }
    const ruleIconType = document.querySelector('input[name="ruleIconType"]:checked').value;
    let ruleIconPath;
    if (ruleIconType === "handDrawn" && rule !== "nawabari.png") {
        ruleIconPath = rule.replace(".png", "_hand_drawn.png");
    } else {
        ruleIconPath = rule;
    }

    console.log("Rule icon's Path:", ruleIconPath);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;
    console.log("BG image's Path:", URL.createObjectURL(background));

    const bgImg = new Image();
    bgImg.src = URL.createObjectURL(background);
    bgImg.onload = () => {
        const scale = Math.min(canvas.width / bgImg.width, canvas.height / bgImg.height);
        const x = (canvas.width - bgImg.width * scale) / 2;
        const y = (canvas.height - bgImg.height * scale) / 2;

        context.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);

        const stageWidth = 480;
        const stageHeight = 270;
        const stageMargin = 30;
        const stageRoundSize = 15;

        const stageX = canvas.width - stageWidth - 60;
        const stage1Y = (canvas.height - stageHeight * 2 - stageMargin) / 2;
        const stage2Y = stage1Y + stageHeight + stageMargin;

        const stage1Img = new Image();
        stage1Img.src = `./stages/${stage1}`;
        stage1Img.onload = () => {
            drawRoundedImage(context, stage1Img, stageX, stage1Y, stageWidth, stageHeight, stageRoundSize);

            const stage2Img = new Image();
            stage2Img.src = `./stages/${stage2}`;
            stage2Img.onload = () => {
                drawRoundedImage(context, stage2Img, stageX, stage2Y, stageWidth, stageHeight, stageRoundSize);

                const ruleIcon = new Image();
                ruleIcon.src = `./rules/${ruleIconPath}`;
                ruleIcon.onload = () => {
                    const iconSize = 120;
                    const iconMargin = 50;
                    const iconX = canvas.width - iconMargin - iconSize;
                    const iconY = 50;

                    context.beginPath();
                    context.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 1.5, 0, Math.PI * 2);
                    context.fillStyle = "black";
                    context.fill();
                    context.lineWidth = 10;
                    context.strokeStyle = "white";
                    context.stroke();

                    context.drawImage(ruleIcon, iconX, iconY, iconSize, iconSize);

                    const preview = document.getElementById('preview');
                    preview.innerHTML = '';
                    generatedImage = canvas.toDataURL();
                    const resultImg = new Image();
                    resultImg.src = generatedImage;
                    preview.appendChild(resultImg);

                    updateSaveButtonState();
                };
            };
        };
    };
}

function updateSaveButtonState() {
    const saveButton = document.getElementById("saveButton");
    saveButton.disabled = !generatedImage; 
}

function saveImage() {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function drawRoundedImage(ctx, img, x, y, width, height, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.lineWidth = 20;
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(img, x, y, width, height);
    ctx.restore();
}