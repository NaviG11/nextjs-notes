import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        message: "getting note single note"
    })
}
export function DELETE() {
    return NextResponse.json({
        message: "deleting note single note"
    })
}
export function PUT() {
    return NextResponse.json({
        message: "updating note single note"
    })
}