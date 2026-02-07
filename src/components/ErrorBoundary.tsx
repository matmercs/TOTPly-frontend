import React from 'react'

type State = { error: Error | null }

export default class ErrorBoundary extends React.Component<{children: React.ReactNode}, State> {
  constructor(props: any){
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error){
    return { error }
  }
  componentDidCatch(error: Error, info: any){
    
  }
  render(){
    if(this.state.error){
      return (
        <div className="p-6 m-6 bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-200 rounded">
          <h2 className="text-lg font-semibold">UI error</h2>
          <pre className="whitespace-pre-wrap mt-2 text-sm">{String(this.state.error && this.state.error.stack ? this.state.error.stack : this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
