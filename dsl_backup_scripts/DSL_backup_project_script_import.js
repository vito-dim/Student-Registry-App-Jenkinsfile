job('ci-student-app-dsl') {
  steps {
      shell('npm install')
      shell('npm audit')
      shell('npm run test')
  }
}

listView('ci-student-app-dsl') {
    description('ci-student-app-dsl example')
      columns {
        status()
        weather()
        name()
        lastSuccess()
        lastFailure()
        lastDuration()
        buildButton()
      }
    jobs {
        name('ci-student-app-dsl') // Add the existing job to the list view 
    }
}