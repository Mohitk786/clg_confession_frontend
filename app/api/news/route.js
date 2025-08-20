// app/api/news/route.js or route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import News from '@/models/News';
import { auth } from '@/auth';


export async function GET(req) {
  try {
    await dbConnect();
    const session = await auth();

    if (!session) {
        return NextResponse.json({ success: false, message: 'NOT AUTHENTICATED' }, { status: 401 });
    }

    const {user} = session;

    const foundUser = await User.findById(user.userId);
    if (!foundUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const newsList = await News.find({ college: foundUser.college, isDeleted: false })
      .select('content commentsCount image')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: newsList }, { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
