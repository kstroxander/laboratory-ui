import './BloodTestDetails.css';
import {ModalDialog} from "../ModalDialog";
import {DiseaseRiskLevelIndicator} from "../DiseaseRiskLevelIndicator";
import React, {useEffect} from "react";
import useApi from "../../hooks/useApi";
import bloodTestApi from "../../api/bloodTest";
import {LoaderAwareWrapper} from "../LoaderAwareWrapper";

function BloodTestDetails({bloodTestId, setIsVisible}) {
    const oneTestsApi = useApi(bloodTestApi.getOne);
    const handleCloseBtnClick = () => setIsVisible(false);

    useEffect(() => {
        oneTestsApi.request(bloodTestId);
    }, []);

    const bloodTest = oneTestsApi.data;

    return (
        <ModalDialog isVisible={true} customClass="auto-width">
            <LoaderAwareWrapper loading={oneTestsApi.loading}>
                <div className="padding-20 test-details-dialog">

                    <div className="text-center">
                        <h5 className="text-center">Paciente</h5>
                        <div className="text-center">
                            <small>Nombre paciente</small>
                            <div className="test-patient-name-details text-center">{bloodTest?.patientName}</div>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-center">Mediciones ingresadas</h5>
                        {(bloodTest?.measurements || []).map(measurement => (
                            <div key={measurement.id} className="text-center margin-vertical-10">
                                <small>{measurement.measuredProperty.name}</small>
                                <div className="test-patient-name-details text-center">{measurement.measuredValue * 100} %</div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h5 className="text-center">Niveles de riesgo arrojados</h5>
                        {(bloodTest?.results || []).map(resultItem => (
                            <div key={resultItem.id} className="text-center margin-vertical-10">
                                <DiseaseRiskLevelIndicator diseaseType={resultItem.diseaseType.name}
                                                           riskLevel={resultItem.riskLevel?.name}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center padding-10">
                    <button
                        onClick={handleCloseBtnClick}
                        type="button"
                        className="button primary">
                        Cerrar
                    </button>
                </div>
            </LoaderAwareWrapper>
        </ModalDialog>
    );
}

export default BloodTestDetails;
