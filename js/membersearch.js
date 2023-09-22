import cormsis from "../json/people.json" assert { type: "json" };

let parentDiv = document.getElementById("member-grid");
let members = cormsis["people"];

let allTags = [];

function getMemberFullName(member) {
    return member["title"] + " " + member["name"] + " " + member["surname"];
}

function getMemberPortraitURL(member) {
    return (member["image"] === "logo-blue.png") ? "./img/logos/logo-blue.png" : "./img/people/" + member["image"];
}

function getAllTags() {
    members.forEach(m => {
        m["tags"].forEach(t => {
            if(!allTags.includes(t)) { allTags.push(t); }
        });
    });
}

function createMemberDisplay(member) {

    let fullname = getMemberFullName(member);
    let portraitURL = getMemberPortraitURL(member);

    let profile = document.createElement("div");
    profile.className = "profile";
    
    profile.onclick = function() {
        let memName = fullname;
        let memRole = member["post"];
        let memImage = portraitURL;

        localStorage.setItem("name", memName);
        localStorage.setItem("post", memRole);
        localStorage.setItem("portrait", memImage);
        localStorage.setItem("tags", member["tags"]);
        
        window.open("gallery.html");
    }

    let profileImg = document.createElement("img");
    profileImg.src = portraitURL;
    profile.appendChild(profileImg);

    let profileName = document.createElement("p");
    profileName.innerHTML = fullname;
    profile.appendChild(profileName);

    let profileRole = document.createElement("p");
    profileRole.innerHTML = member["post"];
    profileRole.className = "role";
    profile.appendChild(profileRole);

    parentDiv.appendChild(profile);
}

function showAllMembers() {
    parentDiv.innerHTML = "";
    members.forEach(m => {
        createMemberDisplay(m);
    });
}

function showAllSelected(selected) {
    parentDiv.innerHTML = "";
    selected.forEach(m => {
        createMemberDisplay(m);
    });
}

function showMembersByTags(tags, threshold=0.75) {
    let selected = [];
    let t = Math.round(tags.length * threshold);
    members.forEach(m => {
        let score = 0;
        tags.forEach(t => {
            if(m["tags"].includes(t)) { score += 1; }
            else if(t === m["name"].toLowerCase()) { score += 1; }
            else if(t === m["surname"].toLowerCase()) { score += 1; }
            else if(t === (m["name"] + " " + m["surname"]).toLowerCase()) { score += 1; }
            else if(t === m["title"].toLowerCase()) { score += 1; }
            else if(t === m["post"].toLowerCase()) { score += 1; }
        });
        if(score >= t) { selected.push([m, score]); }
    });
    selected.sort((a, b) => {
        return b[1] - a[1];
    });

    let final = [];
    selected.forEach(m => final.push(m[0]));
    showAllSelected(final);
}

function getUserInput(inputEle) {
    let rawInput = inputEle.value;
    let inputArr = rawInput.split(",");
    
    for(let i = 0; i < inputArr.length; i++) {
        let inputValue = inputArr[i];
        inputValue = inputValue.toLowerCase();
        inputValue = inputValue.trim();
        inputArr[i] = inputValue;
    }

    if(inputArr.length > 0 && rawInput !== '') {
        showMembersByTags(inputArr);
    }
    else {
        showAllMembers();
    }
    
}

document.getUserInput = getUserInput;

getAllTags();
showAllMembers();
