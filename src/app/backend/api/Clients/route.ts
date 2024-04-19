import Client from '@/app/backend/models/Client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clients = await Client.find();

    return NextResponse.json({ clients }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const body = await req.json();
    const clientData = body.clientFormData;

    const client = await Client.create(clientData);

    return NextResponse.json(
      { message: 'Client Created', client: client },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}
