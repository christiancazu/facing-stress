export const state = {
  form_errors: {}
}

export const mutations = {
  SET_ERRORS: (state, errors) => { state.form_errors = errors },

  CLEAN_ERRORS: (state) => { state.form_errors = {} }
}
