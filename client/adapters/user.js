import apiService from "../services/apiService";
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
        password: user.password
      }
      const myUser = window.localStorage.setItem("myUser", user);
      return apiService.post(`http://localhost:8000/auth/login`, data);
    }, {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Store Token in local storage
        const user = window.localStorage.getItem("myUser");
        const myToken = window.localStorage.setItem("jwt", user);
        //window.localStorage.getItem("jwt");

      },
      onError: (e) => console.log(e.message),
    }
  );
}


export function useMutateRegisterUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/register`, data);
    }, {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page
        this.props.history.push("/")
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