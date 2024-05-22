import Campaign from '@/app/backend/models/Campaign';
import { NextResponse } from 'next/server';
import Mongoose from 'mongoose';

export async function GET(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id') || '';

    const campaigns = await Campaign.find({
      users: new Mongoose.Types.ObjectId(userId),
    });

    return NextResponse.json({ campaigns }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const body = await req.json();
    const campaignData = body.formattedCampaignData;

    const campaign = await Campaign.create(campaignData);

    return NextResponse.json(
      { message: 'Campaign Created', campaign: campaign },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json({ message: 'Error', e }, { status: 500 });
  }
}
