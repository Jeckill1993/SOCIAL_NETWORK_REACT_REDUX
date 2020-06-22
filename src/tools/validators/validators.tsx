type FieldValidationType = (value: string) => string | undefined
export const required: FieldValidationType = (value) => {
    if (value) {
        return undefined; 
    } else {
        return 'Field is required';
    }
}

export const maxLengthCreator = (maxLength: number): FieldValidationType => (value) => {
    if (value && value.length > maxLength) {
        return 'Max length is 30 symbols';
    } else {
        return undefined;
    }
}


