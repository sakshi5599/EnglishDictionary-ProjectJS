const inputElement = document.getElementById("input");
const infoTextelement = document.getElementById("info-text");
const meaningcontainerelement = document.getElementById("meaning-container");
const titleelement = document.getElementById("title");
const meaningelement = document.getElementById("meaning");
const audioelement = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextelement.style.display = "block";
    meaningcontainerelement.style.display = "none";

    infoTextelement.innerText = `Searching the Meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningcontainerelement.style.display = "block";
      infoTextelement.style.display = "none";

      titleelement.innerText = word;
      meaningelement.innerText = "N/A";
      audioelement.style.display = "none";
    } else {
      infoTextelement.style.display = "none";
      meaningcontainerelement.style.display = "block";
      audioelement.style.display="inline-flex"
      titleelement.innerText = result[0].word;
      meaningelement.innerText =
        result[0].meanings[0].definitions[0].definition;
        audioelement.src = result[0].phonetics[0].audio;

    }

  } catch (error) {
    console.log("error");
    infoTextelement.innerText=`an error happend. try again later..`
  }
}

inputElement.addEventListener("keyup", (e) => {
  // console.log(e.target.value);

  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
