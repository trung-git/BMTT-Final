export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      // showAlert('success', 'Logged in successfully!');

      alert('Login successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1500);
      // console.log(res.data);
    }
  } catch (error) {
    // showAlert('error', error.response.data.message);
    alert(error.response.data.message);
    // console.log(error.response.data);
  }
};
export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      // showAlert('success', 'Logged in successfully!');

      alert('Sign up successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 0);
      // console.log(res.data);
    }
  } catch (error) {
    // showAlert('error', error.response.data.message);
    // alert(error.response.data.message);
    alert('Something went wrong! \nPlease try again');

    // console.log(error.response.data);
  }
};
