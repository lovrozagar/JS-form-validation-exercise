/* eslint-disable no-use-before-define */
const Project = (() => {
  // PROJECT FACTORY
  const project = (name) => {
    const tasks = []
    return {
      name,
      tasks,
      addTask,
      setName,
      getName,
      setTasks,
      getTasks,
      contains,
      deleteTask,
    }
  }

  function setName(name) {
    this.name = name
  }

  function getName() {
    return this.name
  }

  function setTasks(tasks) {
    this.tasks = tasks
  }

  function getTasks(tasks) {
    this.tasks = tasks
  }

  function contains(taskName) {
    return this.tasks.some((task) => task.getName() === taskName)
  }

  function addTask(newTask) {
    if (this.tasks.find((task) => task.getName() === newTask.name)) return
    this.tasks.push(newTask)
  }

  function deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName)
  }

  function doStuff() {
    const a = project('Po')
    a.addTask('Lovro')
    console.log(a.getName())
  }

  return { project, doStuff }
})()

export default Project