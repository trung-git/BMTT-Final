export const addNote = async (title, content) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/notes',
      data: {
        title,
        content,
      },
    });
    if (res.data.status === 'success') {
      // showAlert('success', 'Logged in successfully!');

      alert('Add note successfully!');
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
export const editNote = async (id, title, content) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/notes/${id}`,
      data: {
        title,
        content,
      },
    });
    if (res.data.status === 'success') {
      // showAlert('success', 'Logged in successfully!');

      alert('Edit note successfully!');
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
export const delNote = async (id) => {
  try {
    // console.log(id);
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/notes/${id}`,
    });
    if (res.data.status === 'success') {
      // showAlert('success', 'Logged in successfully!');

      alert('Delete note successfully!');
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
