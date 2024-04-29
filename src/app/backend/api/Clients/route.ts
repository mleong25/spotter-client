import User from '@/app/backend/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clients = await User.find({ role: 'client' });

    return NextResponse.json({ clients }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const body = await req.json();
    const clientData = body.clientFormData;

    if (clientData.role !== 'client') {
      clientData.role = 'client';
    }

    const client = await User.create(clientData);

    return NextResponse.json(
      { message: 'Client Created', client: client },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}
