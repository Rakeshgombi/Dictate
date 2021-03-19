// Declacirng Variables
const apiKey = "9e6dc7ea-a10e-4bcd-b36f-68b3140e7ac0"
const searchWord = document.getElementById("in-word");
const search = document.getElementById("submit")
const searchMatch = document.getElementById("search-match")
const wordFound = document.getElementById("word-Found")
var wordDiv = document.getElementById("Word")
var meaningDiv = document.getElementById("Meaning")
var posDiv = document.getElementById("Pos")

wordFound.style.display = "none"
searchMatch.style.display = "none"

// Adding EventListener

search.addEventListener("click", function click() {
  // If no word input
  if (searchWord.value == "") {
    alert("Kindly Type a Word");
  }

  // If some word is present
  else {
    fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${searchWord.value}?key=${apiKey}`)
      .then(response => response.json())
      .then(data => {

        // If no such word or related word exist
        if (!data.length) {
          searchMatch.style.display = "block"
          wordFound.style.display = "none"
          searchMatch.innerHTML = ""
          let heading = document.createElement("h4")
          heading.innerHTML = "No such word Exists! 😭"
          searchMatch.appendChild(heading)

        }

        // If similar words exist show Suggestion
        else if (typeof (data[0]) === "string") {
          searchMatch.style.display = "block"
          wordFound.style.display = "none"
          searchMatch.innerHTML = ""
          // console.log(data);
          let heading = document.createElement("h4")
          heading.innerHTML = "Hey! Did you mean?"
          searchMatch.appendChild(heading)

          data.forEach(element => {
            let suggestion = document.createElement("span")
            suggestion.classList.add("suggested")
            suggestion.addEventListener('click', clicked)
            suggestion.innerHTML = element + "";
            searchMatch.appendChild(suggestion)
          });

          function clicked() {
            searchWord.value = this.innerHTML
            click()
          }
        }
        // If word found
        else {
          searchMatch.style.display = "none"
          wordFound.style.display = "block"
         
          word = data[0]["meta"]["stems"][0];
          def = data[0]["shortdef"];
          pos = data[0]["fl"];
          pronounce = data[0]["hwi"]["prs"][0]["ipa"]
          audio = data[0]["hwi"]["prs"][0]["sound"]["audio"]
          aud_link = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audio.slice(0, 1)}/${audio}.mp3`
            var out = `<p class="out-text">${word}</p><p class="out-text">${pos}</p><p class="out-text margin">"${def}"</p><br><audio id="audio" controls="controls" src="">
          </audio>`
          wordFound.innerHTML = out

          $("#audio").attr("src", aud_link);

        }
      })
  }
})
