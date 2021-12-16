import React, { useState, useEffect } from 'react';
import './form.component.scss';

interface FormProps {
    formName: string;
}

enum ContractorType {
    NATURAL_PERSON = 'Natural person',
    COMPANY = 'Company',
}

enum IdentificationNumberType {
    PESEL = 'PESEL',
    NIP = 'NIP',
}

export const Form = ({ formName }: FormProps) => {
    const [contractorName, setContractorName] = useState<string>('');
    const [contractorSurname, setContractorSurname] = useState<string>('');
    const [contractorType, setContractorType] = useState<ContractorType>(
        ContractorType['NATURAL_PERSON']
    );
    const [selectedPhoto, setSelectedPhoto] = useState<FileList | null>(null);
    const [photoData, setPhotoData] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        // empty body to change?
    }, [contractorType, selectedPhoto]);

    const identificationNumberType =
        contractorType === ContractorType.NATURAL_PERSON
            ? IdentificationNumberType.PESEL
            : IdentificationNumberType.NIP;
    const [identificationNumber, setIdentificationNumber] =
        useState<string>('');

    //any - to change
    const onChangePhoto = (event: any) => {
        const photo = event.target.files[0];
        if (photo) {
            setSelectedPhoto(photo);
            const reader = new FileReader();
            //useEffect???
            reader.addEventListener('load', () => {
                //to change
                // (photo.name.slice(-4) === ".jpg" || photo.name.slice(-5) === ".jpeg") && setPhotoData(reader.result);
                setPhotoData(reader.result)
            });
            reader.readAsDataURL(photo);
        }
    };

    //to change
    const submitForm = (): void => {};

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>{formName}</h2>
                <p>
                    <em>Please complete below form to add a new contractor.</em>
                </p>
            </div>

            <form
                id="add-contractor-form"
                action="https://localhost:60001/Contractor/Save"
                method="POST"
                //Końcówka ma zwrócić kod błędu 404 i użytkownikowi ma się wyświetlić komunikat: "Nie znaleziono metody zapisu".
            >

                <section className="form-section">
                    <label htmlFor="name">
                        Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            onChange={(event) => {
                                setContractorName(event.target.value);
                            }}
                        />
                    </label>
                    <br />
                    <p>
                        Added Contractor name: <em>{contractorName}</em>
                    </p>
                    <hr />
                </section>

                <section className="form-section">
                    <label htmlFor="surname">
                        Surname:
                        <input
                            type="text"
                            name="surname"
                            placeholder="Enter surname"
                            onChange={(event) => {
                                setContractorSurname(event.target.value);
                            }}
                        />
                    </label>
                    <br />
                    <p>
                        Added Contractor surname: <em>{contractorSurname}</em>
                    </p>
                    <hr />
                </section>

                <section className="form-section">
                    <label htmlFor="contractorType">
                        Type of Contractor:
                        <select
                            value={contractorType}
                            // placeholder="Select contractor type"
                            onChange={(event) => {
                                setContractorType(
                                    event.target.value as ContractorType
                                );
                            }}
                        >
                            <option value={ContractorType.NATURAL_PERSON}>
                                {ContractorType.NATURAL_PERSON}
                            </option>
                            <option value={ContractorType.COMPANY}>
                                {ContractorType.COMPANY}
                            </option>
                        </select>
                    </label>
                    <br />
                    <p>
                        Added Contractor type: <em>{contractorType}</em>
                    </p>
                    <hr />
                </section>

                <section className="form-section">
                    <label htmlFor="identificationNumber">
                        Identification number - {identificationNumberType}
                        <input
                            type="text"
                            name={identificationNumber}
                            placeholder={`Enter ${identificationNumberType}`}
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
                            onChange={(event) => {
                                setIdentificationNumber(
                                    event.target.value as
                                        | IdentificationNumberType.NIP
                                        | IdentificationNumberType.PESEL
                                );
                            }}
                        />
                    </label>
                    <br />
                    <p>
                        Added {identificationNumberType}:{' '}
                        <em>{identificationNumber}</em>
                    </p>
                    <hr />
                </section>

                <section className="form-section">
                    <label htmlFor="photo">
                        <input
                            type="file"
                            name="photo"
                            accept="image/jpg, image/jpeg"
                            onChange={onChangePhoto}
                        />
                    </label>
                    <p>Photo preview:</p>
                    
                    <div className="img-preview-container">
                        {/* check if photo is .jpg or .jpeg */}
                        {/* {(selectedPhoto.slice(-4) === '.jpg' || selectedPhoto.slice(-5) === '.jpeg') &&  */}
                        <img
                            src={photoData as string}
                            alt="contractor img"
                            className="img-preview"
                        />
                    </div>
                    <hr />
                </section>

                <section className="form-section">
                    <button onClick={submitForm}>Submit</button>
                    <hr />
                </section>
            </form>
        </div>
    );
};