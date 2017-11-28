import { connect } from 'react-redux';

import ProfileSearch from './components/profileSearch/profileSearch';

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case 'SHOW_ALL':
//       return todos
//     case 'SHOW_COMPLETED':
//       return todos.filter(t => t.completed)
//     case 'SHOW_ACTIVE':
//       return todos.filter(t => !t.completed)
//   }
// }

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles.filter(
      (item, index) => index <= 100
    ),
    isFetching: state.isFetching,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onTodoClick: id => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

const ProSearchCont = connect(
  mapStateToProps,
  // mapDispatchToProps
)(ProfileSearch)

export default ProSearchCont;