// app/api/news/route.js or route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { getAuthUser } from '@/lib/auth';
import User from '@/models/User';
import News from '@/models/News';
import College from '@/models/College';
import uploadCloudinary from '@/utils/uploadCloudinary';

export async function POST(req) {
  try {
    await dbConnect();
    const user = await getAuthUser(req);
    const formData = await req.formData();

    const title = formData.get('title');
    const tags = formData.get('tags'); // If needed
    const content = formData.get('content');
    const image = formData.get('image'); // File from <input type="file" name="image" />

    if (!user || !user.userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!title || title.trim() === '') {
      return NextResponse.json({ success: false, message: 'News title is required' }, { status: 400 });
    }

    const foundUser = await User.findById(user.userId);
    if (!foundUser || !foundUser.college) {
      return NextResponse.json({ success: false, message: 'User or college not found' }, { status: 400 });
    }

    let picture = '';
    if (image && typeof image === 'object') {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadCloudinary(buffer); // Assumes it supports Buffer
      picture = uploadResult?.url || '';
    }

    const news = new News({
      content: content?.trim() || '',
      title,
      createdBy: user.userId,
      college: foundUser.college,
      image: picture,
    });

    await news.save();

    await College.findByIdAndUpdate(foundUser.college, { $push: { news: news._id } });

    foundUser.sp = (foundUser.sp || 0) + 3;
    await foundUser.save();

    return NextResponse.json({ success: true, message: 'News created', data: news }, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const user = await getAuthUser(req);

    if (!user || !user.userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

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
