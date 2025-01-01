import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { user } = await params; 
    if (!user) {
        return NextResponse.json({ error: "User parameter is missing" }, { status: 400 });
    }
     console.log("User:", user);
    const supabase = createClient();
    console.log("Supabase:", supabase);
    const { data, error } = await supabase
        .from("Crew")
        .select("*")
        .eq("cms_id", user);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
};
