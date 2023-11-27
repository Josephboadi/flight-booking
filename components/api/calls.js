"use client"
import { axiosPrivate } from "./axios";
import axios from 'axios'


export const loginApi = async (data) => {
console.log("Api call.============================", data)
  return await axios.post("/api/auth/login", data.data, { headers: { "Content-Type": "application/json" },withCredentials: true })
};

export const refreshApi = async (data) => {

  return await axios.post("/api/auth/refresh", { headers: { "Content-Type": "application/json" },withCredentials: true })
};


// airlines handles
export const getAirlinesApi = async () => {

  return await axios
  .post("/api/flight/airline" , { headers: { "Content-Type": "application/json" },withCredentials: true })
};



// flights handles
export const getFlightsApi = async (data) => {

  return await axios
  .post("/api/flight/flights", data.data, { headers: { "Content-Type": "application/json" },withCredentials: true })
};

// user handles
export const getUsersApi = async (data) => {


  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["SESS_ID"]) {
        config.headers["SESS_ID"] = `${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate
  .post("/api/user/getAllData/", JSON.stringify(data.data))
};

export const getUserApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/user/getData/`, data.data);
};


export const createUserApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/user/create`, JSON.stringify(data.data));
};


export const updateUserApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/user/update`, JSON.stringify(data.data));
};

export const getMyInfoApi = async (data) => {

  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/user/getmyinfo/`, data.data);
};

export const assignRoleApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/user/assignrole`, JSON.stringify(data.data));
};

export const activateUserApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/user/activate`, JSON.stringify(data.data));
};

export const deactivateUserApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/user/deactivate`, JSON.stringify(data.data));
};


// Branch handlers
// export const getBranchesApi = async (data) => {

//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate
//   .post("/api/v1/branch/getAllData/", JSON.stringify(data.data))
// };
// export const createBranchApi = async (data) => {
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate.post(`/api/v1/branch/create`, JSON.stringify(data.data));
// };

// export const updateBranchApi = async (data) => {
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate.post(`/api/v1/branch/update`, JSON.stringify(data.data));
// };

// export const activateBranchApi = async (data) => {
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate.post(`/api/v1/branch/activate`, JSON.stringify(data.data));
// };

// export const deactivateBranchApi = async (data) => {
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate.post(`/api/v1/branch/deactivate`, JSON.stringify(data.data));
// };


// Bank handlers
// export const getBanksApi = async (data) => {

  
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );


//   return await axiosPrivate
//   .post("/api/v1/bank/getAllData/", JSON.stringify(data.data))
// };

// export const createBankApi = async (data) => {
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate.post(`/api/v1/bank/create`, JSON.stringify(data.data));
// };

// export const updateBankApi = async (data) => {
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate.post(`/api/v1/bank/update`, JSON.stringify(data.data));
// };

// export const activateBankApi = async (data) => {
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate.post(`/api/v1/bank/activate`, JSON.stringify(data.data));
// };

// export const deactivateBankApi = async (data) => {
//   axiosPrivate.interceptors.request.use(
//     async(config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
//       } 
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return await axiosPrivate.post(`/api/v1/bank/deactivate`, JSON.stringify(data.data));
// };


// Roles handlers
export const getRolesApi = async (data) => {

 
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );


  return await axiosPrivate
  .post("/api/v1/role/getAllData/", JSON.stringify(data.data))
};

export const createRoleApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/role/create`, JSON.stringify(data.data));
};

export const updateRoleApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/role/update`, JSON.stringify(data.data));
};

export const activateRoleApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/role/activate`, JSON.stringify(data.data));
};

export const deactivateRoleApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/role/deactivate`, JSON.stringify(data.data));
};


// Menus handlers
export const getMenusApi = async (data) => {

 
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );


  return await axiosPrivate
  .post("/api/v1/menu/getAllActiveMenus/", JSON.stringify(data.data))
};


// Role Menus handlers
export const getRoleMenusApi = async (data) => {


  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

 

  return await axiosPrivate
  .post("/api/v1/rolemenu/getAllMenus/", JSON.stringify(data.data))
};

export const createRoleMenuApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/rolemenu/create`, JSON.stringify(data.data));
};

export const activateRoleMenuApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/rolemenu/activate`, JSON.stringify(data.data));
};

export const deactivateRoleMenuApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/rolemenu/deactivate`, JSON.stringify(data.data));
};



// logs handlers
export const getLogApi = async (data) => {
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate.post(`/api/v1/log/getData/`, data.data);
};

export const getLogsApi = async (data) => {

  
  axiosPrivate.interceptors.request.use(
    async(config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${data.auth.accessToken}`;
        
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  return await axiosPrivate
  .post("/api/v1/log/getAllData/", JSON.stringify(data.data))
};