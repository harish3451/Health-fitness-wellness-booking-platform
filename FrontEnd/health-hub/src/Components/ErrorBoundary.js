import React, { Component } from "react";

class ErrorBoundary extends Component{
    constructor(props){
        super(props);
        this.state={hasError:false,error:null};
    }

    static getDerivedStateFromError(error){
        return {hasError:true,error:error}
    }

    componentDidCatch(error,info){
        console.error('Error in ErroBoundary: ',error,info);
    }

    render(){
        if(this.state.hasError){
            return(

                <div>
                    <h2>Something went Wrong</h2>
                    <p>{this.state.error.toString()}</p>
                </div>
            )
        }
        return this.props.children;

    }
}

export default ErrorBoundary