export const state = {
  formAttrs: {
    name: '',
    age: null,
    emotions: []
  },
  faceApiAttrs: {}
}

export const getters = {
  findInCategories: (state) => (slug) => {
    return state.categories.find(c => c.name === slug)
  }
  // checkCategories: (state) => state.categories.length > 0 ? state.categories : null
}

export const mutations = {
  SET_FORM_ATTRS: (state, { name, age, emotions }) => {
    state.formAttrs.name = name
    state.formAttrs.age = age
    state.formAttrs.emotions = emotions
  }

  // SET_CATEGORY: (state, payload) => { state.selectedCategory = payload },

  // UPDATE_LAST_PAGE: (state, payload) => { state.last_page = payload },

  // UPDATE_CURRENT_PAGE: (state) => { state.current_page++ },

  // ADD_TO_CATEGORIES: (state, payload) => { state.categories.unshift(payload) }
}

export const actions = {
}
