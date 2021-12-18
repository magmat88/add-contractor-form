import React, { useState, useEffect } from 'react';
import './form.component.scss';

interface FormProps {
    formName: string;
}

enum ContractorType {
    NATURAL_PERSON = 'Osoba',
    COMPANY = 'Firma',
}

enum IdentificationType {
    PESEL = 'PESEL',
    NIP = 'NIP',
}

export function Form({ formName }: FormProps) {
    const [contractorName, setContractorName] = useState<string>('');
    const [contractorSurname, setContractorSurname] = useState<string>('');
    const [contractorType, setContractorType] = useState<ContractorType>(
        ContractorType.NATURAL_PERSON
    );
    const [contractorIdentification, setContractorIdentification] = useState<string>('');
    const [selectedPhoto, setSelectedPhoto] = useState<string>('');

    useEffect(() => {}, [contractorType, selectedPhoto]);

    const identificationType =
        contractorType === ContractorType.NATURAL_PERSON
            ? IdentificationType.PESEL
            : IdentificationType.NIP;

    //any type - to change
    function onChangeContractorName(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setContractorName(event.target.value);
    }
    function onSetContractorSurname(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setContractorSurname(event.target.value);
    }
    function onChangeContractorType(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setContractorType(event.target.value as ContractorType);
    }
    function onChangeIdentification(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setContractorIdentification(event.target.value as IdentificationType);
    }
    function onChangePhoto(event: React.ChangeEvent<HTMLInputElement>) {
        const fileType = event.target.files![0].type;
        if (fileType === 'image/jpg' || fileType === 'image/jpeg') {
            setSelectedPhoto(URL.createObjectURL(event.target.files![0]));
        } else {
            alert('Nieprawidłowy format pliku.');
        }
    }

    return (
        <div className="main-container">
            <div className="form-header">
                <h2>{formName}</h2>
                <p>
                    <em>Proszę uzupełnić dane w poniższym formularzu.</em>
                </p>
            </div>

            <form
                className="form-container"
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
                </section>

                <section className="form-section">
                    <label htmlFor="identification">
                        {identificationType}:
                        <input
                            type="text"
                            name={contractorIdentification}
                            placeholder={`Wprowadź ${identificationType}`}
                            pattern="[0-9]+"
                            minLength={
                                identificationType! ===
                                IdentificationType.NIP
                                    ? 10
                                    : 11
                            }
                            maxLength={
                                identificationType! ===
                                IdentificationType.NIP
                                    ? 10
                                    : 11
                            }
                            onChange={onChangeIdentification}
                        />
                    </label>
                </section>

                <section className="form-section">
                    <label htmlFor="photo">
                        {' '}
                        Zdjęcie:
                        <input
                            type="file"
                            name="photo"
                            accept="image/jpg, image/jpeg"
                            onChange={onChangePhoto}
                        />
                    </label>
                </section>
            </form>

            <div className="preview-container">
                <h2>Podgląd wprowadzonych danych:</h2>
                <div className="text-preview-container">
                    <p>Imię: {contractorName}</p>
                    <p>Nazwisko: {contractorSurname}</p>
                    <p>Typ kontrahenta: {contractorType}</p>
                    <p>{identificationType}: {contractorIdentification}</p>
                    <p>Zdjęcie:</p>
                </div>
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

            <div className="form-section">
                <button>Zatwierdź</button>
            </div>
        </div>
    );
}
