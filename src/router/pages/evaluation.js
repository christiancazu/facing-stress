const Evaluation = () => import('@/pages/evaluation/index')
const Result = () => import('@/pages/evaluation/result')
const Form = () => import('@/pages/evaluation/form')

export default {
  path: '/evaluation',
  name: 'evaluation',
  component: Evaluation,
  redirect: { name: 'evaluation.form' },
  children: [
    { path: '', name: 'evaluation.form', component: Form },
    { path: 'result', name: 'evaluation.result', component: Result }
  ]
}
