import { Component } from 'react'

// React error boundary. Wrap any potentially-fragile section in this.
// If something throws during render, we show a quiet fallback
// instead of crashing the entire page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
