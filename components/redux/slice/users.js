import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "userData",
  initialState: {
    user: null,
    userInfo: null,
    users: [],
    isFetchingUsers: false,
    isFetchingMyInfo: false,
    isFetchingUser: false,
    isEnrollingUser: false,
    isAssigningBranch: false,
    isAssigningCategory: false,
    isAssigningRole: false,
    isCreatingUser: false,
    isCreatingBatchUser: false,
    isUpdatingUser: false,
    isSendingEmail: false,
    isActivatingUser: false,
    isDeactivatingUser: false,
    isSuccess: false,
    successMessage: null,
    enrollSuccessMessage: null,
    assignBranchSuccessMessage: null,
    assignRoleSuccessMessage: null,
    createUserSuccessMessage: null,
    createBatchUserSuccessMessage: null,
    updateUserSuccessMessage: null,
    assignCategorySuccessMessage: null,
    sendEmailSuccessMessage: null,
    activateUserSuccessMessage: null,
    deactivateUserSuccessMessage: null,
    isError: false,
    error: null,
    fetchUsersError: null,
    fetchMyInfoError: null,
    fetchUserError: null,
    enrollUserError: null,
    assignBranchError: null,
    assignRoleError: null,
    createUserError: null,
    createBatchUserError: null,
    updateUserError: null,
    assignCategoryError: null,
    sendEmailError: null,
    activateUserError: null,
    deactivateUserError: null,
  },
  reducers: {
    getUsersRequest: (state, action) => {
      state.isFetchingUsers = true;
      state = action.payload;
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.isFetchingUsers = false;
    },
    getUsersFailure: (state, action) => {
      state.users = [];

      state.fetchUsersError = action.payload;
      state.isFetchingUsers = false;
    },

    getMyInfoRequest: (state, action) => {
      state.isFetchingMyInfo = true;
      state = action.payload;
    },
    getMyInfoSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.isFetchingMyInfo = false;
    },
    getMyInfoFailure: (state, action) => {
      state.userInfo = null;

      state.fetchMyInfoError = action.payload;
      state.isFetchingMyInfo = false;
    },

    getUserRequest: (state, action) => {
      state.isFetchingUser = true;
      state = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetchingUser = false;
    },
    getUserFailure: (state, action) => {
      state.user = null;

      state.fetchUserError = action.payload;
      state.isFetchingUser = false;
    },

    enrollUserRequest: (state, action) => {
      state.isEnrollingUser = true;
      state = action.payload;
    },
    enrollUserSuccess: (state, action) => {
      state.enrollSuccessMessage = action.payload;
      state.isEnrollingUser = false;
    },
    enrollUserFailure: (state, action) => {
      state.enrollUserError = action.payload;
      state.isEnrollingUser = false;
    },

    assignBranchRequest: (state, action) => {
      state.isAssigningBranch = true;
      state = action.payload;
    },
    assignBranchSuccess: (state, action) => {
      state.assignBranchSuccessMessage = action.payload;
      state.isAssigningBranch = false;
    },
    assignBranchFailure: (state, action) => {
      state.assignBranchError = action.payload;
      state.isAssigningBranch = false;
    },

    assignRoleRequest: (state, action) => {
      state.isAssigningRole = true;
      state = action.payload;
    },
    assignRoleSuccess: (state, action) => {
      state.assignRoleSuccessMessage = action.payload;
      state.isAssigningRole = false;
    },
    assignRoleFailure: (state, action) => {
      state.assignRoleError = action.payload;
      state.isAssigningRole = false;
    },

    createUserRequest: (state, action) => {
      state.isCreatingUser = true;
      state = action.payload;
    },
    createUserSuccess: (state, action) => {
      state.createUserSuccessMessage = action.payload;
      state.isCreatingUser = false;
    },
    createUserFailure: (state, action) => {
      state.createUserError = action.payload;
      state.isCreatingUser = false;
    },

    createBatchUserRequest: (state, action) => {
      state.isCreatingBatchUser = true;
      state = action.payload;
    },
    createBatchUserSuccess: (state, action) => {
      state.createBatchUserSuccessMessage = action.payload;
      state.isCreatingBatchUser = false;
    },
    createBatchUserFailure: (state, action) => {
      state.createBatchUserError = action.payload;
      state.isCreatingBatchUser = false;
    },

    updateUserRequest: (state, action) => {
      state.isUpdatingUser = true;
      state = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.updateUserSuccessMessage = action.payload;
      state.isUpdatingUser = false;
    },
    updateUserFailure: (state, action) => {
      state.updateUserError = action.payload;
      state.isUpdatingUser = false;
    },

    assignCategoryRequest: (state, action) => {
      state.isAssigningCategory = true;
      state = action.payload;
    },
    assignCategorySuccess: (state, action) => {
      state.assignCategorySuccessMessage = action.payload;
      state.isAssigningCategory = false;
    },
    assignCategoryFailure: (state, action) => {
      state.assignCategoryError = action.payload;
      state.isAssigningCategory = false;
    },

    sendEmailRequest: (state, action) => {
      state.isSendingEmail = true;
      state = action.payload;
    },
    sendEmailSuccess: (state, action) => {
      state.sendEmailSuccessMessage = action.payload;
      state.isSendingEmail = false;
    },
    sendEmailFailure: (state, action) => {
      state.sendEmailError = action.payload;
      state.isSendingEmail = false;
    },

    activateUserRequest: (state, action) => {
      state.isActivatingUser = true;
      state = action.payload;
    },
    activateUserSuccess: (state, action) => {
      state.activateUserSuccessMessage = action.payload;
      state.isActivatingUser = false;
    },
    activateUserFailure: (state, action) => {
      state.activateUserError = action.payload;
      state.isActivatingUser = false;
    },

    deactivateUserRequest: (state, action) => {
      state.isDeactivatingUser = true;
      state = action.payload;
    },
    deactivateUserSuccess: (state, action) => {
      state.deactivateUserSuccessMessage = action.payload;
      state.isDeactivatingUser = false;
    },
    deactivateUserFailure: (state, action) => {
      state.deactivateUserError = action.payload;
      state.isDeactivatingUser = false;
    },

    resetUsers: (state, action) => {
      state.isFetchingUsers = false;
      state.isFetchingMyInfo = false;
      state.isFetchingUser = false;
      state.isEnrollingUser = false;
      state.isAssigningBranch = false;
      state.isAssigningRole = false;
      state.isCreatingUser = false;
      state.isCreatingBatchUser = false;
      state.isUpdatingUser = false;
      state.isAssigningCategory = false;
      state.isSendingEmail = false;
      state.isActivatingUser = false;
      state.isDeactivatingUser = false;
      state.isSuccess = false;
      state.successMessage = null;
      state.enrollSuccessMessage = null;
      state.assignBranchSuccessMessage = null;
      state.assignRoleSuccessMessage = null;
      state.createUserSuccessMessage = null;
      state.createBatchUserSuccessMessage = null;
      state.updateUserSuccessMessage = null;
      state.assignCategorySuccessMessage = null;
      state.sendEmailSuccessMessage = null;
      state.activateUserSuccessMessage = null;
      state.deactivateUserSuccessMessage = null;
      state.isError = false;
      state.error = null;
      state.fetchUsersError = null;
      state.fetchMyInfoError = null;
      state.fetchUserError = null;
      state.enrollUserError = null;
      state.assignBranchError = null;
      state.assignRoleError = null;
      state.createUserError = null;
      state.createBatchUserError = null;
      state.updateUserError = null;
      state.assignCategoryError = null;
      state.sendEmailError = null;
      state.activateUserError = null;
      state.deactivateUserError = null;
    },

    resetUserInfo: (state, action) => {
      state.userInfo = null;
    },
  },
  
});



export const {
  resetUsers,
  resetUserInfo,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  getMyInfoRequest,
  getMyInfoSuccess,
  getMyInfoFailure,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  enrollUserRequest,
  enrollUserSuccess,
  enrollUserFailure,
  assignBranchRequest,
  assignBranchSuccess,
  assignBranchFailure,
  assignRoleRequest,
  assignRoleSuccess,
  assignRoleFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  createBatchUserRequest,
  createBatchUserSuccess,
  createBatchUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  assignCategoryRequest,
  assignCategorySuccess,
  assignCategoryFailure,
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure,
  activateUserRequest,
  activateUserSuccess,
  activateUserFailure,
  deactivateUserRequest,
  deactivateUserSuccess,
  deactivateUserFailure,
  
} = usersSlice.actions;


export default usersSlice.reducer;
