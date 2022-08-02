import React from "react";
import './DiseaseRiskLevelIndicator.css';

function DiseaseRiskLevelIndicator({diseaseType, riskLevel, size}) {
    return (
        <div className="risk-level-indicator-container">
            <div>
                <small>
                    <strong>{diseaseType}</strong>
                </small>
            </div>
            <div className={`level-indicator ${size}`}>
                <div className={`level-indicator-value ${(riskLevel || '').toLowerCase()}`}></div>
                <div className="overlay">
                    {riskLevel || 'SIN RIESGO'}
                </div>
            </div>
        </div>
    );
}

export default DiseaseRiskLevelIndicator;
