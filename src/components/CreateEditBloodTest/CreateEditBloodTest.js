import './CreateEditBloodTest.css';
import React, {useEffect} from "react";
import {ModalDialog} from "../ModalDialog";
import CreateEditBloodTestForm from "./CreateEditBloodTestForm";
import {FaTimes} from "react-icons/fa";
import useApi from "../../hooks/useApi";
import bloodTestApi from "../../api/bloodTest";
import bloodTestResultApi from "../../api/bloodTestResult";

function CreateEditBloodTest({isVisible, setIsVisible, onTestSaved}) {
    const resolveRisksApi = useApi(bloodTestResultApi.resolveRisks);
    const saveTestApi = useApi(bloodTestApi.create);

    const resolveRisks = (data) => {
        resolveRisksApi.request(data);
    };

    const saveTest = (data) => {
        saveTestApi.request(data);
        onTestSaved(saveTestApi.data);
    };

    const closeDialog = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        setIsVisible(!!!saveTestApi.data);
    }, [saveTestApi.data]);


    return (
        isVisible && (
            <ModalDialog isVisible={isVisible}>
                <div className="tests-modal-header">
                    <h4>Nuevo resultado de examen</h4>
                    <span onClick={closeDialog}>
                        <FaTimes/>
                    </span>
                </div>
                <div className="tests-modal-content">
                    <CreateEditBloodTestForm onSubmit={saveTest}
                                             onResolveRiskClick={resolveRisks}
                                             onCloseClick={closeDialog}
                                             testResults={resolveRisksApi.data}/>
                </div>
            </ModalDialog>
        )
    );
}

export default CreateEditBloodTest;
