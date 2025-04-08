const musicList = [
    { title: "電子人-救贖機關1與2 1", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E6%95%91%E8%B4%96%E6%A9%9F%E9%97%9C%201%E8%88%872%20FULL%20%201.wav", category: "電子人" },
    { title: "電子人-救贖機關1與2 2", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E6%95%91%E8%B4%96%E6%A9%9F%E9%97%9C%201%E8%88%872%20FULL%202.wav", category: "電子人" },
    { title: "電子人-救贖機關1與2 3", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E6%95%91%E8%B4%96%E6%A9%9F%E9%97%9C%201%E8%88%872%20FULL%203.wav", category: "電子人" },
    { title: "電子人-救贖機關1與2 4", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E6%95%91%E8%B4%96%E6%A9%9F%E9%97%9C%201%E8%88%872%20FULL%204.wav", category: "電子人" },
    { title: "電子人-救贖機關1與2", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E6%95%91%E8%B4%96%E6%A9%9F%E9%97%9C%201%E8%88%872.wav", category: "電子人" },
    { title: "電子人-電子邪教_化身自由", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E9%9B%BB%E5%AD%90%E9%82%AA%E6%95%99_%E5%8C%96%E8%BA%AB%E8%87%AA%E7%94%B1.wav", category: "電子人" },
    { title: "電子人-電子邪教", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E9%9B%BB%E5%AD%90%E9%82%AA%E6%95%99.wav", category: "電子人" },
    { title: "電子人-電子邪教2", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E9%9B%BB%E5%AD%90%E9%82%AA%E6%95%992.wav", category: "電子人" },
    { title: "電子人-電子邪教3", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E9%9B%BB%E5%AD%90%E9%82%AA%E6%95%993.wav", category: "電子人" },
    { title: "電子人-電子網域", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E9%9B%BB%E5%AD%90%E7%B6%B2%E5%9F%9F.wav", category: "電子人" },
    { title: "電子人-電子戰", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E9%9B%BB%E5%AD%90%E6%88%B0.wav", category: "電子人" },
    { title: "電子人-舊型的極限", src: "https://filedn.eu/lvSkeQUjKFT4wzjTm5E9GNH/MUSIC/%E9%9B%BB%E5%AD%90%E4%BA%BA-%E8%88%8A%E5%9E%8B%E7%9A%84%E6%A5%B5%E9%99%90.wav", category: "電子人" },
];

const audioPlayer = document.getElementById("audio-player");
const playlist = document.getElementById("playlist");
const categoryFilter = document.getElementById("category-filter");
const fileInput = document.getElementById("file-input");
const songTitle = document.getElementById("song-title");
let currentIndex = 0;

function loadPlaylist(category = "all") {
    playlist.innerHTML = "";
    const filteredList = category === "all" 
        ? musicList 
        : musicList.filter(song => song.category === category);

    filteredList.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} (${song.category})`;
        li.setAttribute("data-index", index);
        li.setAttribute("draggable", "true");
        li.addEventListener("click", () => playSong(index, filteredList));
        playlist.appendChild(li);
    });
    enableDragAndDrop(filteredList);
}

function playSong(index, list = musicList) {
    currentIndex = index;
    audioPlayer.src = list[index].src;
    audioPlayer.play();
    // 更新當前曲名
    songTitle.textContent = `${list[index].title} (${list[index].category})`;
}

audioPlayer.onended = () => {
    currentIndex++;
    const currentList = categoryFilter.value === "all" 
        ? musicList 
        : musicList.filter(song => song.category === categoryFilter.value);
    if (currentIndex < currentList.length) {
        playSong(currentIndex, currentList);
    } else {
        currentIndex = 0;
        audioPlayer.pause();
        songTitle.textContent = "無"; // 播放結束時重置
    }
};

categoryFilter.addEventListener("change", (e) => {
    loadPlaylist(e.target.value);
});

fileInput.addEventListener("change", (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        const newSong = {
            title: file.name.replace(/\.[^/.]+$/, ""),
            src: url,
            category: "local"
        };
        musicList.push(newSong);
    }
    loadPlaylist(categoryFilter.value);
});

function enableDragAndDrop(list) {
    const items = playlist.querySelectorAll("li");
    let draggedItem = null;

    items.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            draggedItem = item;
            item.classList.add("dragging");
            e.dataTransfer.setData("text/plain", item.getAttribute("data-index"));
        });

        item.addEventListener("dragend", () => {
            draggedItem.classList.remove("dragging");
            draggedItem = null;
            items.forEach(i => i.classList.remove("drop-target", "drop-target-bottom"));
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
            if (item === draggedItem) return;

            const rect = item.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            const isAbove = e.clientY < midY;

            items.forEach(i => i.classList.remove("drop-target", "drop-target-bottom"));
            if (isAbove) {
                item.classList.add("drop-target");
            } else {
                item.classList.add("drop-target-bottom");
            }
        });

        item.addEventListener("dragleave", () => {
            item.classList.remove("drop-target", "drop-target-bottom");
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
            const targetIndex = parseInt(item.getAttribute("data-index"));
            const isBottom = item.classList.contains("drop-target-bottom");

            const newList = [...list];
            const [draggedSong] = newList.splice(draggedIndex, 1);
            const insertIndex = isBottom ? targetIndex + 1 : targetIndex;
            newList.splice(insertIndex, 0, draggedSong);

            list.splice(0, list.length, ...newList);
            loadPlaylist(categoryFilter.value);
        });
    });
}

loadPlaylist();