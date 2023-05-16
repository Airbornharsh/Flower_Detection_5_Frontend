const form = document.querySelector("form");
const imgdisplay = document.querySelector("#imgdisplay");
const file = document.querySelector("form input[type=file]");
const button = document.querySelector("form button[type=submit]");
const loader = document.querySelector("#loader");
const result = document.querySelector("#result");

loader.style.display = "none";
result.innerHTML = "";

file.addEventListener("change", (e) => {
  const [file] = e.target.files;
  if (file) {
    result.innerHTML = "";
    imgdisplay.src = URL.createObjectURL(file);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  button.disabled = true;
  button.backgroundColor = "grey";
  loader.style.display = "block";

  const formData = new FormData(form);

  formData.append("files", form.querySelector("input[type=file]").files[0]);

  try {
    let res = await axios.post(
      "https://dl-api.azurewebsites.net/api/flower-detection-5",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    loader.style.display = "none";
    result.innerHTML = res.data["message"];
    button.disabled = false;
  } catch (e) {
    console.log(e);
    loader.style.display = "none";
    result.innerHTML = "";
    button.disabled = false;
  }
});
