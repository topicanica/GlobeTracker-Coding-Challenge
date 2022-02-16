import { IUserForm } from "../interfaces/IUser"

export const validate = (inputs: IUserForm, setFormErrors: (errors?: IUserForm) => void) => {
    const errors: IUserForm = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        userType: "",
    };


    if (!inputs.firstName || inputs.firstName === "") {
        errors.firstName = "First name is required";
    }
    if (!inputs.lastName || inputs.lastName === "") {
        errors.lastName = "Last name is required";
    }
    if (!inputs.email) {
        errors.email = "Email address is required";
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inputs.email)) {
        errors.email = "Email address is invalid";
    }
    if (!inputs.phoneNumber || inputs.phoneNumber === "") {
        errors.phoneNumber = "Phone number is required";
    } else if (!/^-?\d+$/.test(inputs.phoneNumber)) {
        errors.phoneNumber = "Phone number can only have digits";
    } else if (!/^-?\d{6}$/.test(inputs.phoneNumber)) {
        errors.phoneNumber = "Phone number can only have six digits";
    }
    setFormErrors(errors);
    return errors;
}