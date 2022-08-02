import React, {useEffect, useState} from "react";
import * as yup from 'yup';
import {useFieldArray, useForm} from "react-hook-form";
import './CreateEditBloodTest.css';
import {TextField} from "../TextField";
import useApi from "../../hooks/useApi";
import measurablePropertyApi from "../../api/measurableProperty";
import {LoaderAwareWrapper} from "../LoaderAwareWrapper";
import {yupResolver} from "@hookform/resolvers/yup";
import {DiseaseRiskLevelIndicator} from "../DiseaseRiskLevelIndicator";
import {FaInfoCircle} from "react-icons/fa";

const validationSchema = yup.object().shape({
    patientName: yup.string()
        .trim()
        .required('El nombre del paciente es obligatorio'),
    measurements: yup.array().of(
        yup.object().shape({
            measuredValue: yup.number()
                .typeError('Este valor es obligatorio')
                .required('Este valor es obligatorio')
                .min(0, 'El valor debe estar entre 0 y 100')
                .max(100, 'El valor debe estar entre 0 y 100')
        })
    )
});

const transformDataToSend = (formData) => {
    return {
        ...formData,
        measurements: formData.measurements.map(measurement => {
            const {measuredPropertyId, measuredValue} = measurement;
            return {measuredPropertyId, measuredValue: measuredValue / 100};
        })
    }
};

function CreateEditBloodTestForm({onSubmit, onResolveRiskClick, onCloseClick, testResults}) {
    const form = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {}
    });

    const {formState: {errors: formErrors}} = form;
    const {fields: measurementFields} = useFieldArray({
        control: form.control,
        name: "measurements",
    });
    const allMeasurablePropertiesApi = useApi(measurablePropertyApi.getAll);
    const initMeasurements = (measurableProperties) => {
        form.reset({
            measurements: (measurableProperties || []).map(property => ({
                label: property.name,
                measuredPropertyId: property.id,
                measuredValue: null
            }))
        });
    };

    const handleResolveRisksButtonClick = (data) => {
        onResolveRiskClick(transformDataToSend(data));
    }

    const handleFormSubmit = (data) => {
        onSubmit(transformDataToSend(data));
    }

    useEffect(() => {
        allMeasurablePropertiesApi.request()
    }, []);

    useEffect(() => {
        initMeasurements(allMeasurablePropertiesApi.data)
    }, [allMeasurablePropertiesApi.data]);

    return (
        <LoaderAwareWrapper loading={allMeasurablePropertiesApi.loading}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} noValidate>
                <div>
                    <div className="field-container">
                        <label className="field-label">Nombre del paciente</label>
                        <TextField name="patientName"
                                   type="text"
                                   placeholder="Ej. Juan Medina"
                                   register={form.register}/>
                        <div className="invalid-feedback">{formErrors?.patientName?.message}</div>
                    </div>
                    <div className="form-row">
                        {measurementFields.map((field, index) => (
                            <div key={field.id}
                                 className="slot field-container">
                                <label className="field-label">{field.label}</label>
                                <TextField name={`measurements.${index}.measuredValue`}
                                           type="number"
                                           min={0} max={100}
                                           step={1}
                                           placeholder={`Ej. ${(Math.random() * 100).toFixed(2)}`}
                                           register={form.register}/>
                                <div className="invalid-feedback">{formErrors?.measurements?.[index]?.measuredValue?.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="resolve-risks-btn-container">
                    <button
                        onClick={form.handleSubmit(handleResolveRisksButtonClick)}
                        type="button"
                        className="button secondary">
                        Determinar Riesgo
                    </button>
                </div>
                <div className="results-div">
                    <h4 className="results-title">Niveles de riesgo arrojados</h4>
                    {!!!testResults?.length && (
                        <div className="padding-10 bg-light-blue margin-vertical-10">
                            <FaInfoCircle className="info-icon"/>
                            <span>Ingresa los datos del formulario y presiona el bot&oacute;n &quot;Determinar Riesgo&quot; para continuar</span>
                        </div>
                    )}
                    {!!testResults?.length && testResults.map(result => (
                        <div key={result.diseaseType.id} className="padding-10 bg-light-blue margin-vertical-10">
                            <DiseaseRiskLevelIndicator diseaseType={result.diseaseType.name}
                                                       riskLevel={result.riskLevel?.name}
                                                       size="lg"/>
                            <div className="result-explaining">
                                <strong className="small-text">Interpretaci&oacute;n: </strong>
                                {!!result.riskLevel && <span className="small-text">{result.riskLevel?.description}</span>}
                                {!!!result.riskLevel && <span className="small-text">Ausencia total de riesgo de padecer determinada enfermedad</span>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="form-footer">
                    <button
                        onClick={onCloseClick}
                        type="button"
                        className="button outline light-gray">
                        Cerrar
                    </button>
                    <button
                        disabled={!!!testResults}
                        type="submit"
                        className="button primary">
                        Guardar
                    </button>
                </div>
            </form>
        </LoaderAwareWrapper>
    );
}

export default CreateEditBloodTestForm;
