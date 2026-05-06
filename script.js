

function formatDuration(duration) {
  const match = duration.match(/PT(\d+M)?(\d+S)?/);

  const minutes = match[1] ? match[1].replace("M", "") : "0";
  const seconds = match[2] ? match[2].replace("S", "") : "0";

  return `${minutes}:${seconds.padStart(2, "0")}`;
}

function formatViews(views) {
  views = Number(views); // convert string to number

  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K";
  } else {
    return views;
  }
}

const container = document.querySelector("#videos");

async function getVideos() {
  container.innerHTML = "<h2>Loading...</h2>";

  try {
    const res = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos");
    const result = await res.json();

    const videos = result.data.data;

    container.innerHTML = "";

    videos.forEach(video => {
      const v = video.items; // 👈 shortcut

    const card = `
  <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" class="video-link">
    <div class="card">

      <div class="thumb">
        <img src="${v.snippet.thumbnails.medium.url}" />
        <span class="duration">${formatDuration(v.contentDetails.duration)}</span>
      </div>

      <div class="info">
        <div class="avatar"><img src="${v.snippet.thumbnails.medium.url}" /></div>

        <div class="text">
          <h3>${v.snippet.title}</h3>
          <p class="channel">${v.snippet.channelTitle}</p>
          <p class="meta">${formatViews(v.statistics.viewCount)} views</p>
        </div>
      </div>

    </div>
  </a>
`;

      container.innerHTML += card;
    });

  } catch (error) {
    container.innerHTML = "<h2>Error loading videos</h2>";
    console.log(error);
  }
}

getVideos();