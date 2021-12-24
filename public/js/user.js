export const editUser = async (id, name, email) => {
  try {
    // console.log({ id, name, email });
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${id}`,
      data: {
        name,
        email,
      },
    });
    if (res.data.status === 'success') {
      // showAlert('success', 'Logged in successfully!');

      alert('Edit user successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 0);
      // console.log(res.data);
    }
  } catch (error) {
    // showAlert('error', error.response.data.message);
    alert('Something went wrong! \nPlease try again');
    // console.log(error.response.data);
  }
};
export const delUser = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/users/${id}`,
    });
    if (res.data.status === 'success') {
      // showAlert('success', 'Logged in successfully!');

      alert('Delete user successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 0);
      // console.log(res.data);
    }
  } catch (error) {
    // showAlert('error', error.response.data.message);
    alert('Something went wrong! \nPlease try again');
    // console.log(error.response.data);
  }
};
