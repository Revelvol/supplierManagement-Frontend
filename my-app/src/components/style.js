import styled from "styled-components";

export const GlobalFilterStyles = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;


export const TableStyles = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  }
`;


export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        margin-bottom: 0.5rem;
      }

      input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        font-size: 1rem;
      }
    }

    button[type="submit"] {
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: #007bff;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #0062cc;
      }
    }
  }

  button[type="button"] {
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #6c757d;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #5a6268;
    }
  }

  a {
    margin-top: 1rem;
    font-size: 1rem;
    text-decoration: none;
    color: #007bff;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #0056b3;
    }
  }
`;

export const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        margin-bottom: 0.5rem;
      }

      input[type="text"],
      input[type="email"],
      input[type="password"] {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        font-size: 1rem;
        width: 100%;
      }

      input[type="checkbox"] {
        margin-top: 0.5rem;
        margin-right: 0.5rem;
      }
    }

    button[type="submit"] {
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: #007bff;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
  
        &:hover {
          background-color: #0062cc;
        }
      }
    }

    a {
      margin-top: 1rem;
      font-size: 1rem;
      text-decoration: none;
      color: #007bff;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #0056b3;
      }
    }
  }
`;

export const ProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55vh;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      input[type="text"],
      input[type="email"],
      input[type="checkbox"] {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        font-size: 1rem;
        margin-top: 0.1rem;

        &:focus {
          outline: none;
          border-color: #007bff;
        }

        &[readonly],
        &[disabled] {
          background-color: #f8f9fa;
        }
      }

      input[type="checkbox"] {
        margin-top: 0.5rem;
      }

      span {
        color: #dc3545;
        margin-top: 0.5rem;
      }
    }

    button[type="button"] {
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: #007bff;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #0062cc;
      }
    }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input[type="submit"] {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #0062cc;
    }
  }
}
`;

export const InputLabel = styled.label`
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const InputField = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 5px;
  background-color: #008cba;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005f7a;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
`;

export const BackButtonDiv = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #ffffff;
  color: #333333;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }
`;

export const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  button {
    margin: 0 0.5rem;
    padding: 0.3rem 0.5rem;
    background-color: #f1f1f1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  span {
    margin: 0 0.5rem;
  }
  input {
    padding: 0.2rem;
    border: none;
    border-bottom: 1px solid #333;
    margin-right: 0.5rem;
    text-align: center;
    &:focus {
      outline: none;
      border-bottom: 1px solid #666;
    }
  }
  select {
    margin-left: 1rem;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;
