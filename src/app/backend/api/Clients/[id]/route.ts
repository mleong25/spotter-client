import Client from '@/app/backend/models/Client';
import { NextResponse } from 'next/server';

export async function GET(req: any, { params }: any) {
  try {
    const { id } = params;

    const client = await Client.findOne({ _id: id });

    return NextResponse.json({ client }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: any) {
  try {
    const { id } = params;
    await Client.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Client Deleted' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}
