exports.UserRole = async (user) => {
  const isAdmin = await user.getAdmin()
  const isStudent = await user.getStudent()
  const isTeacher = await user.getTeacher()
  if (isAdmin) {
    return 'ADMIN'
  }
  if (isStudent) {
    return 'STUDENT'
  }
  if (isTeacher) {
    return 'TEACHER'
  }
  return null
}
