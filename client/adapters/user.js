import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import apiService from "../services/apiService";
import  { Redirect } from 'react-router-dom'

import {
  useQuery,
  useQueryClient,
  useMutation
} from "react-query";

export function useFetchUser(userId) {
  return useQuery(["userData", userId], () =>
    apiService.get(`user/${userId}`).then(({
      data
    }) => data)
  );
}

export function useMutateLoginUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data = {
        email: user.email,
        password: user.password,
        
      }
      const myUser = window.sessionStorage.setItem("myUser",JSON.stringify(user));
      return apiService.post(`http://localhost:8000/auth/login`, data);
    }, {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Store Token in local storage
        console.log("sdfvsdgs ",responseData)
        const myToken = window.sessionStorage.setItem("jwt",JSON.stringify(responseData.data.token));
        window.location.reload(false);
        
      },
      onError: (e) => {
        document.querySelector("#wrongCredentials").style.display = "block";
      },
    }
  );
}


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

export function useMutateUpdateUser(userId) {
  const queryClint = useQueryClient();
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/${userId}`, data);
    }, {
      // When mutate is called:
      onSuccess: (responseData) => {
        return queryClint.setQueryData(
          ["userData", userId],
          (data) => {
            return [{
                email: responseData.data.body.email,
                password: responseData.data.body.password,
              },
              ...data,
            ];
          }
        );
      },
      onError: (e) => console.log(e.message),
    }
  );
}