
// utils/validation.ts
export const validationRules = {
    email: {
        required: "El correo electrónico es obligatorio",
        pattern: {
            value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,7}$/,
            message: "Formato de correo inválido",
        },
    },
    username: { required: "El nombre de usuario es obligatorio" },
    password: {
        required: "La contraseña es obligatoria",
        minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
    },
};
