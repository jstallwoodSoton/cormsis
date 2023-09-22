let parentDiv;
let streamables;
let counter = 0;

function initStream(streamMS, parent, streamTag="p") {
    parentDiv = parent;
    streamables = parentDiv.getElementsByTagName(streamTag);
    setInterval(runStream, streamMS);
}

function runStream() {
    parentDiv.style.animation = "fadeIn 2s linear";
    for(let i = 0; i < streamables.length; i++) {
        streamables[i].style.display = (i !== counter) ? "none" : "block";
    }
    counter = (counter + 1) % streamables.length;
    setTimeout(()=> {
        parentDiv.style.animation = "none";
    }, 1000);
}


document.initStream = initStream;