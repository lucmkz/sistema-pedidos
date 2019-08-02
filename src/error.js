import { PureComponent } from 'react'
import t from 'prop-types'

class ErrorBoundary extends PureComponent {
  state = { hasError: false }

  static protoTypes = {
    children: t.func.isRequired
  }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  render () {
    return this.props.children(this.state.hasError)
  }
}

export default ErrorBoundary
