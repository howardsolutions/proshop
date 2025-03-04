'use server'

import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";


// Sign in the user with CREDENTIALS (normal email and password)
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        await signIn('credentials', user);

        return { success: true, message: "Signed in successfully" }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        return { success: false, message: "Invalid Email or Password" }
    }
}

// Sign user out
export async function signOutUser() {
    await signOut();
}

// Sign user out
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const plainPassword = user.password;

        user.password = hashSync(user.password, 10);

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        });

        // Sign User in after sign up
        await signIn('credentials', {
            email: user.email,
            password: plainPassword
        });

        return { success: true, message: "User registered successfully" }


    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return { success: false, message: formatError(error) };
    }
}