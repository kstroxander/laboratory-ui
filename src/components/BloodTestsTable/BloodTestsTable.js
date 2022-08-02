import React from "react";
import format from 'date-fns/format'
import parseISO from "date-fns/parseISO";
import './BloodTestsTable.css';
import {DiseaseRiskLevelIndicator} from "../DiseaseRiskLevelIndicator";
import {FaEye} from "react-icons/fa";

function BloodTestsTable({bloodTests, onShowDetailsClicked}) {
    return (
        <>
            <h4 className="table-caption">Historico de examenes</h4>
            <table className="tests-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha registro</th>
                    <th>Paciente</th>
                    <th>Resultados</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {!!bloodTests?.length && bloodTests.map(test => (
                    <tr key={test.id}>
                        <td>{test.id}</td>
                        <td>{format(parseISO(test.createdAt), 'dd/MM/yyyy HH:mm')}</td>
                        <td>{test.patientName}</td>
                        <td>
                            {!!test?.results?.length && test.results.map(result => (
                                <div key={result.id} className="risk-level-display">
                                    <DiseaseRiskLevelIndicator riskLevel={result.riskLevel?.name} diseaseType={result.diseaseType?.name}/>
                                </div>
                            ))}
                        </td>
                        <td>
                            <div className="table-row-controls">
                                <div className="action"
                                     onClick={() => onShowDetailsClicked(test)}>
                                    <FaEye/>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default BloodTestsTable;