import React, {useEffect, useState} from "react";
import './AdminBloodTests.css'
import {FaSearch} from "react-icons/fa";
import {Pager} from "../Pager";
import {BloodTestsTable} from "../BloodTestsTable";
import {CreateEditBloodTest} from "../CreateEditBloodTest";
import useApi from "../../hooks/useApi";
import bloodTestApi from '../../api/bloodTest';
import {LoaderAwareWrapper} from "../LoaderAwareWrapper";
import {useForm} from "react-hook-form";
import {BloodTestDetails} from "../BloodTestDetails";

function AdminBloodTests() {
    const [searchFilters, setSearchFilters] = useState({});
    const [selectedTest, setSelectedTest] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const allTestsApi = useApi(bloodTestApi.getAll);
    const defaultPageSize = 10;

     const {register, handleSubmit} = useForm();

    const openTestCreationDialog = () => setIsFormVisible(true);
    const onShowDetailsClicked = test => {
        setSelectedTest(test);
        setIsDetailsVisible(true);
    }

    const onTestSaved = () => {
        allTestsApi.request({page: currentPage, size: defaultPageSize, ...searchFilters});
    };

    useEffect(() => {
        allTestsApi.request({page: currentPage, size: defaultPageSize, ...searchFilters});
    }, [currentPage, searchFilters]);

    return(
        <>
            {!!isFormVisible && (
                <CreateEditBloodTest bloodTestId={selectedTest?.id}
                                     isVisible={isFormVisible}
                                     setIsVisible={setIsFormVisible}
                                     onTestSaved={onTestSaved} />
            )}
            {!!isDetailsVisible && (
                <BloodTestDetails bloodTestId={selectedTest?.id}
                                  setIsVisible={setIsDetailsVisible}/>
            )}
            <LoaderAwareWrapper loading={allTestsApi.loading}>
                <div className="admin-components-container">
                    <div className="top-bar">
                        <h3>Ingreso examenes de laboratorio</h3>
                        <button
                            onClick={openTestCreationDialog}
                            className="button primary">
                            Agregar Nuevo
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(setSearchFilters)}>
                        <div className="search-container">
                            <div className="search-field-group">
                                <input className="textfield"
                                       name="patientName"
                                       placeholder="Busqueda por paciente"
                                       {...register('patientName')} />
                                <FaSearch className="search-field-icon"/>
                            </div>
                        </div>
                    </form>
                    <div className="table-container">
                        <BloodTestsTable bloodTests={allTestsApi.data?.content} onShowDetailsClicked={onShowDetailsClicked}/>
                    </div>
                    <div className="pager-container">
                        <Pager page={currentPage}
                               size={defaultPageSize}
                               elementCount={allTestsApi.data?.totalElements}
                               onPageChanged={setCurrentPage}/>
                    </div>
                </div>
            </LoaderAwareWrapper>
        </>
    );
}

export default AdminBloodTests;
