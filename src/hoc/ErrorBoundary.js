import React from "react"
class ErrorBoundary extends React.Component {

    state = {
        hasError: null
    }

    static getDerivedStateFromError(error){
        return {hasError: true}
    }


    render() {
        if(this.state.hasError){
            return (
                <div className="alert alert-danger">
                    <p>Wystąpił jakiś problem...</p>
                </div>
            )
        }
        return this.props.children

    }
}

export default ErrorBoundary