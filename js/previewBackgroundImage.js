function previewBackgroundImage() {
    const fileInput = document.getElementById("background");
    const previewContainer = document.getElementById("background-preview");

    if (!fileInput.files || !fileInput.files[0]) {
        previewContainer.innerHTML = "";
        return;
    }

    const file = fileInput.files[0];
    if (file && file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        
        previewContainer.innerHTML = "";
        previewContainer.appendChild(img);
    } else {
        alert("画像ファイルを選択してください。");
        previewContainer.innerHTML = ""; 
    }
}

function previewForgroundImage() {
    const fileInput = document.getElementById("forground");
    const previewContainer = document.getElementById("forground-preview");
    const removeButton = document.getElementById("removeForgroundButton");

    if (!fileInput.files || !fileInput.files[0]) {
        previewContainer.innerHTML = "";
        return;
    }

    const file = fileInput.files[0];
    if (file && file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        
        previewContainer.innerHTML = "";
        previewContainer.appendChild(img);
        removeButton.style.display = "block";
    } else {
        alert("画像ファイルを選択してください。");
        previewContainer.innerHTML = "";
        removeButton.style.display = "none";
    }
}

function removeForgroundImage() {
    const fileInput = document.getElementById("forground");
    const previewContainer = document.getElementById("forground-preview");
    const removeButton = document.getElementById("removeForgroundButton");

    fileInput.value = "";
    previewContainer.innerHTML = "";
    removeButton.style.display = "none";
}