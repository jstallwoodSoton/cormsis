function updateGalleryDisplay() {
    console.log("here");
    let portrait = document.getElementById("portrait");
    portrait.src = localStorage.getItem("portrait");

    let name = localStorage.getItem("name");
    let post = localStorage.getItem("post");

    let profileText = document.getElementById("profile-text");
    let nameP = document.createElement("h3");
    nameP.innerHTML = name;
    let postP = document.createElement("p");
    postP.innerHTML = post;

    let tagDiv = document.createElement("div");
    tagDiv.className = "profile-tags";
    let tags = localStorage.getItem("tags");
    let tagArr = tags.split(",");
    tagArr.forEach(t => {
        let tSpan = document.createElement("span");
        tSpan.innerHTML = t;
        tagDiv.appendChild(tSpan);
    });

    profileText.appendChild(nameP);
    profileText.appendChild(postP);
    profileText.appendChild(tagDiv);
}

document.updateGalleryDisplay = updateGalleryDisplay;