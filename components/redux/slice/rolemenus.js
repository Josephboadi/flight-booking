import { createSlice } from "@reduxjs/toolkit";

export const roleMenusSlice = createSlice({
  name: "roleMenuData",
  initialState: {
    roleMenu: null,
    roleMenus: [],
    menus: [],
    isFetchingRoleMenus: false,
    isFetchingMenus: false,
    isFetchingRoleMenu: false,

    isCreatingRoleMenu: false,
    isActivatingRoleMenu: false,
    isDeactivatingRoleMenu: false,

    createRoleMenuSuccessMessage: null,
    activateRoleMenuSuccessMessage: null,
    deactivateRoleMenuSuccessMessage: null,

    fetchRoleMenusError: null,
    fetchMenusError: null,
    fetchRoleMenurror: null,

    createRoleMenurror: null,
    activateRoleMenurror: null,
    deactivateRoleMenurror: null,
  },
  reducers: {
    getRoleMenusRequest: (state, action) => {
      state.isFetchingRoleMenus = true;
      state = action.payload;
    },
    getRoleMenusSuccess: (state, action) => {
      state.roleMenus = action.payload;
      state.isFetchingRoleMenus = false;
    },
    getRoleMenusFailure: (state, action) => {
      state.roleMenus = [];

      state.fetchRoleMenusError = action.payload;
      state.isFetchingRoleMenus = false;
    },


    getMenusRequest: (state, action) => {
      state.isFetchingMenus = true;
      state = action.payload;
    },
    getMenusSuccess: (state, action) => {
      state.menus = action.payload;
      state.isFetchingMenus = false;
    },
    getMenusFailure: (state, action) => {
      state.menus = [];

      state.fetchMenusError = action.payload;
      state.isFetchingMenus = false;
    },


    createRoleMenuRequest: (state, action) => {
      state.isCreatingRoleMenu = true;
      state = action.payload;
    },
    createRoleMenuSuccess: (state, action) => {
      state.createRoleMenuSuccessMessage = action.payload;
      state.isCreatingRoleMenu = false;
    },
    createRoleMenuFailure: (state, action) => {
      state.createRoleMenurror = action.payload;
      state.isCreatingRoleMenu = false;
    },

    activateRoleMenuRequest: (state, action) => {
      state.isActivatingRoleMenu = true;
      state = action.payload;
    },
    activateRoleMenuSuccess: (state, action) => {
      state.activateRoleMenuSuccessMessage = action.payload;
      state.isActivatingRoleMenu = false;
    },
    activateRoleMenuFailure: (state, action) => {
      state.activateRoleMenurror = action.payload;
      state.isActivatingRoleMenu = false;
    },

    deactivateRoleMenuRequest: (state, action) => {
      state.isDeactivatingRoleMenu = true;
      state = action.payload;
    },
    deactivateRoleMenuSuccess: (state, action) => {
      state.deactivateRoleMenuSuccessMessage = action.payload;
      state.isDeactivatingRoleMenu = false;
    },
    deactivateRoleMenuFailure: (state, action) => {
      state.deactivateRoleMenurror = action.payload;
      state.isDeactivatingRoleMenu = false;
    },

    resetRoleMenus: (state, action) => {
      state.isFetchingRoleMenus = false;
      state.isFetchingRoleMenu = false;

      state.isFetchingMenus = false;

      state.fetchRoleMenusError = null;
      state.fetchRoleMenurror = null;

      state.fetchMenusError = null;

      state.isCreatingRoleMenu = false;
      state.isActivatingRoleMenu = false;
      state.isDeactivatingRoleMenu = false;

      state.createRoleMenuSuccessMessage = null;
      state.activateRoleMenuSuccessMessage = null;
      state.deactivateRoleMenuSuccessMessage = null;

      state.createRoleMenurror = null;
      state.activateRoleMenurror = null;
      state.deactivateRoleMenurror = null;
    },
  },
});

export const {
  getRoleMenusRequest,
  getRoleMenusSuccess,
  getRoleMenusFailure,
  getMenusRequest,
  getMenusSuccess,
  getMenusFailure,
  createRoleMenuRequest,
  createRoleMenuSuccess,
  createRoleMenuFailure,
  activateRoleMenuRequest,
  activateRoleMenuSuccess,
  activateRoleMenuFailure,
  deactivateRoleMenuRequest,
  deactivateRoleMenuSuccess,
  deactivateRoleMenuFailure,
  resetRoleMenus,
} = roleMenusSlice.actions;

export default roleMenusSlice.reducer;
