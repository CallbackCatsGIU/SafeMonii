import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import apiService from "../services/apiService";
import  { Redirect } from 'react-router-dom'


export function useMutateRegisterUser() {
    return useMutation(
      (user) => {
        const data = new FormData();
        data = {
          email: user.email,
          password: user.password,
          userName: user.userName,
          studentId: user.studentId,
          phone: user.phone,
          fullName: user.fullName
  
        }
        return apiService.post(`http://localhost:8000/users/register`, data);
      }, {
        // When mutate is called:
        onSuccess: (responseData) => {
          // Redirect to login page
          window.location="http://localhost:3000/";
        },
        onError: (e) => console.log(e.message),
      }
    );
  }