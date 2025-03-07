import { PersonRegisterType } from "../../../types/person-register";

export const PERSON_DEFAULT: PersonRegisterType = {
    password: "",
    personRole: "ROLE_STUDENT",
    cpf: "",
    genderAcronym: "",
    name: "",
    birthDate: "",
    specificAddressFormDTO: {
        number: "",
        complement: "",
        cep: "",
        street: "",
        streetType: "",
        neighborhood: "",
        city: "",
        federateUnit: "",
    },
    mainEmail: "",
    phoneList: [{ number: "", dddNumber: 0, ddiNumber: 0 }],
}

export const PERSON_CONTENT_MODERATOR: PersonRegisterType = {
    password: "",
    personRole: "ROLE_CONTENT_MODERATOR",
    cpf: "",
    genderAcronym: "",
    name: "",
    birthDate: "",
    specificAddressFormDTO: {
        number: "",
        complement: "",
        cep: "",
        street: "",
        streetType: "",
        neighborhood: "",
        city: "",
        federateUnit: "",
    },
    mainEmail: "",
    phoneList: [{ number: "", dddNumber: 0, ddiNumber: 0 }],
}
