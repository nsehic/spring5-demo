import fetch from 'unfetch';

function checkStatus(response) {
    if(response.ok) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllStudents = () => {
    return fetch('api/v1/students')
    .then(checkStatus)
    .then(data => data.json());
}

export const createNewStudent = (name, email, gender) => {
    return fetch('/api/v1/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: name,
            email: email,
            gender: gender
         })
      })
      .then(checkStatus)
        .then(data => data.json());
}

export const deleteStudentById = (id) => {
    return fetch(`/api/v1/students/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(checkStatus)
    .then(data => data.json());
}