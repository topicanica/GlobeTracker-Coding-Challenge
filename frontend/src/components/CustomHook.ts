import { useState, FormEvent, ChangeEvent } from 'react';
const useUserForm = <T>(callback: (state: T) => void, initialState: T) => {
    const [inputs, setInputs] = useState<T>(initialState);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        callback(inputs);
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        event.persist();
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    };
    return {
        handleSubmit,
        handleInputChange,
        inputs,
    };
};

export default useUserForm;