
import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { cms_id, user_id } = body;

    // Validate the incoming data
    if (!cms_id || !user_id) {
      return NextResponse.json(
        { error: 'Missing required fields: cms_id or user_id' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient();

    // Update the Crew table with the provided data
    const { error } = await supabase
      .from('Crew')
      .update({ authentication_id: user_id })
      .match({ cms_id });

    // Handle Supabase errors
    if (error) {
      console.error('Database error:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Respond with a success message
    return NextResponse.json(
      { message: 'Crew updated successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
