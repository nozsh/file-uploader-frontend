const login_btn = document.getElementById("login_btn") as HTMLButtonElement;
const login_status_btn = document.getElementById("login_status_btn") as HTMLButtonElement;
const registration_btn = document.getElementById("registration_btn") as HTMLButtonElement;
const error_message = document.getElementById("error_message") as HTMLElement;
const username_input = document.getElementById("username_input") as HTMLInputElement;
const password_input = document.getElementById("password_input") as HTMLInputElement;

login_btn.addEventListener("click", () => {
  login_btn.disabled = true;
  registration_btn.disabled = true;
  login_btn.style.display = "none";
  login_status_btn.style.display = "block";

  fetch("/login")
    .then((response: Response) => {
      if (!response.ok) {
        error_message.style.display = "block";
      } else {
        //pass
      }
    })
    .catch((error: Error) => {
      error_message.style.display = "block";
    })
    .finally(() => {
      username_input.value = "";
      password_input.value = "";
      registration_btn.disabled = false;
      login_btn.disabled = false;
      login_btn.style.display = "block";
      login_status_btn.style.display = "none";
      checkUsernamePasswordInput();
    });
});

const checkUsernamePasswordInput = (): void => {
  login_btn.disabled = !username_input.value || !password_input.value;
};

checkUsernamePasswordInput();

username_input.addEventListener("input", checkUsernamePasswordInput);
password_input.addEventListener("input", checkUsernamePasswordInput);
