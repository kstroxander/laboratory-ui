import './LoaderAwareWrapper.css';
import spinnerImage from '../../images/spinner.gif';

function LoadingIndicator() {
    return (
        <div className="loading-indicator">
            <img src={spinnerImage} alt="Spinner"/>
            <span>Cargando...</span>
        </div>
    );
}

function LoaderAwareWrapper({loading, children, showWhileLoading}) {
    return (
        <>
            {!!loading && <LoadingIndicator/>}
            {(!!showWhileLoading || !(!!loading)) && children}
        </>
    );
}

export default LoaderAwareWrapper;
