const audio = document.getElementById("song");
const lyricsBox = document.getElementById("lyrics");
let lyrics = [];

fetch("lyrics/lyrics.json")
  .then(response => {
    if (!response.ok) throw new Error("No se pudo cargar lyrics.json");
    return response.json();
  })
  .then(data => {
    lyrics = data;
    console.log("✅ Letras cargadas correctamente");
  })
  .catch(err => {
    lyricsBox.textContent = "Error cargando letras 😢";
    console.error(err);
  });

audio.addEventListener("timeupdate", () => {
  if (lyrics.length === 0) return;
  const currentTime = audio.currentTime;
  const line = lyrics.find(
    (l, i) =>
      currentTime >= l.time &&
      (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)
  );
  if (line) lyricsBox.textContent = line.text;
});
