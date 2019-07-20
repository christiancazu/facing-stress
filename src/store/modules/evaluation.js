export const state = {
  faceImg: null,
  formAttrs: {
    name: '',
    age: null,
    sumOfQuestions: null
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
  SET_FORM_ATTRS: (state, { name, age, sumOfQuestions, faceImg }) => {
    state.formAttrs.name = name
    state.formAttrs.age = age
    state.formAttrs.sumOfQuestions = sumOfQuestions
    state.faceImg = faceImg
  },

  SET_API_FACE_ATTRS: (state, payload) => {
    state.faceApiAttrs = payload
  }

  // SET_CATEGORY: (state, payload) => { state.selectedCategory = payload },

  // UPDATE_LAST_PAGE: (state, payload) => { state.last_page = payload },

  // UPDATE_CURRENT_PAGE: (state) => { state.current_page++ },

  // ADD_TO_CATEGORIES: (state, payload) => { state.categories.unshift(payload) }
}

export const actions = {
}
