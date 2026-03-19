
import { NextResponse } from "next/server";

export const apiSuccess = (data: any, message = "Success", status = 200) =>
    NextResponse.json({ message, ...data }, { status });

export const apiError = (message: string, status = 400) =>
    NextResponse.json({ message }, { status });