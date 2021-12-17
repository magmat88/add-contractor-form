import React, { useState, useEffect } from 'react';
import './form.component.scss';

interface FormProps {
    formName: string;
}

enum ContractorType {
    NATURAL_PERSON = 'Osoba',
    COMPANY = 'Firma',
}

enum IdentificationNumberType {
    PESEL = 'PESEL',
    NIP = 'NIP',
}

export function Form({ formName }: FormProps) {
    const [contractorName, setContractorName] = useState<string>('');
    const [contractorSurname, setContractorSurname] = useState<string>('');
    const [contractorType, setContractorType] = useState<ContractorType>(
        ContractorType.NATURAL_PERSON
    );
    const [identification, setIdentification] = useState<string>('');
    const [selectedPhoto, setSelectedPhoto] = useState<string>('');

    useEffect(() => {}, [contractorType, selectedPhoto]);

    const identificationNumberType =
        contractorType === ContractorType.NATURAL_PERSON
            ? IdentificationNumberType.PESEL
            : IdentificationNumberType.NIP;

    //any type - to change
    function onChangeContractorName(event: any) {
        setContractorName(event.target.value);
    };
    function onSetContractorSurname(event: any) {
        setContractorSurname(event.target.value);
    }
    function onChangeContractorType(event: any) {
        setContractorType(event.target.value as ContractorType);
    };
    function onChangeIdentification(event: any) {
        setIdentification(event.target.value as IdentificationNumberType);
    };
    function onChangePhoto(event: any) {
        const fileType = event.target.files[0].type;
        if (fileType === 'image/jpg' || fileType === 'image/jpeg') {
            setSelectedPhoto(URL.createObjectURL(event.target.files[0]));
        } else {
            alert('Nieprawidłowy format pliku.');
        }
    };

    return (
        <div className="main-container">
            <div className="form-container">
                <div className="form-header">
                    <h2>{formName}</h2>
                    <p>
                        <em>Proszę uzupełnić dane w poniższym formularzu.</em>
                    </p>
                </div>

                <form
                    id="add-contractor-form"
                    action="./Contractor/Save"
                    method="POST"
                >
                    <section className="form-section">
                        <label htmlFor="name">
                            Imię:
                            <input
                                type="text"
                                name="name"
                                placeholder="Wprowadź imię"
                                onChange={onChangeContractorName}
                            />
                        </label>
                        <hr />
                    </section>

                    <section className="form-section">
                        <label htmlFor="surname">
                            Nazwisko:
                            <input
                                type="text"
                                name="surname"
                                placeholder="Wprowadź nazwisko"
                                onChange={onSetContractorSurname}
                            />
                        </label>
                        <hr />
                    </section>

                    <section className="form-section">
                        <label htmlFor="contractorType">
                            Typ kontrahenta:
                            <select
                                value={contractorType}
                                placeholder="Wybierz typ kontrahenta"
                                onChange={onChangeContractorType}
                            >
                                <option value={ContractorType.NATURAL_PERSON}>
                                    {ContractorType.NATURAL_PERSON}
                                </option>
                                <option value={ContractorType.COMPANY}>
                                    {ContractorType.COMPANY}
                                </option>
                            </select>
                        </label>
                        <hr />
                    </section>

                    <section className="form-section">
                        <label htmlFor="identificationNumber">
                            {identificationNumberType}:
                            <input
                                type="text"
                                name={identification}
                                placeholder={`Wprowadź ${identificationNumberType}`}
                                pattern="[0-9]+"
                                minLength={
                                    identificationNumberType! ===
                                    IdentificationNumberType.NIP
                                        ? 10
                                        : 11
                                }
                                maxLength={
                                    identificationNumberType! ===
                                    IdentificationNumberType.NIP
                                        ? 10
                                        : 11
                                }
                                onChange={onChangeIdentification}
                            />
                        </label>
                        <hr />
                    </section>

                    <section className="form-section">
                        <label htmlFor="photo">
                            {' '}
                            Zdjęcie:
                            <input
                                type="file"
                                name="photo"
                                accept="image/jpg, image/jpeg"
                                // accept=".jpg, .jpeg"
                                onChange={onChangePhoto}
                            />
                        </label>
                        <hr />
                    </section>

                    <section className="form-section">
                        <button>Zatwierdź</button>
                        <hr />
                    </section>
                </form>
            </div>

            <div className="preview-container">
                <h2>Podgląd zdjęcia:</h2>
                <div className="img-preview-container">
                    {selectedPhoto && (
                        <img
                            src={selectedPhoto as string}
                            alt="contractor img"
                            className="img-preview"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
