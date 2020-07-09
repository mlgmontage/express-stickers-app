const AUTH_URL = `${API_URL}/auth`;

$(() => {
  $("#loginForm").submit((event) => {
    event.preventDefault();

    const name = $("#name").val();
    const password = $("#password").val();

    const user = { name, password };

    console.log(user);

    login(user)
      .then((result) => {
        console.log(result);
        const $successMessage = $("#successMessage");
        $successMessage.text(result.message);
        $successMessage.show();
        window.location = `/user.html?id=${result.id}`;
      })
      .catch((error) => {
        console.log(error);
        const $errorMessage = $("#errorMessage");
        $errorMessage.text(error.responseJSON.error);
        $errorMessage.show();
        setTimeout(() => {
          $errorMessage.hide(100);
        }, 1000);
      });
  });
});

function login(user) {
  return $.post(`${AUTH_URL}/login`, user);
}
