import * as yup from "yup";
export const registerSchema =yup.object({
    userName:yup.string().required("userName is required").min(5,"must be 5 characters").max(10,"must be 10 characters"),
    email:yup.string().required("email is required").email(),
    password:yup.string().required("password is required").min(5,"must be 5 characters").max(10,"must be 10 characters")
})

export const loginSchema =yup.object({
    email:yup.string().required("email is required").email(),
    password:yup.string().required("password is required").min(5,"must be 5 characters").max(10,"must be 10 characters")
})

export const EmailSchema =yup.object({
    email:yup.string().required("email is required").email(),
})
export const CreatOrderSchema =yup.object({
    couponName:yup.string(),
    address:yup.string().required("address is required"),
    phone:yup.string().required("phone is required").min(10,"must be 10 characters").max(13,"must be 13 characters")
})

export const ratingSchema =yup.object({
    comment:yup.string().required("feedback is required"),
    rating:yup.string().required("rating is required"),
})
