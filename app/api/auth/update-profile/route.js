import User from "@/models/User";
import Profile from "@/models/Profile";
import {dbConnect} from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";

export const POST = async (req) => {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "NOT AUTHENTICATED",
        },
        { status: 404 }
      );
    }

    const {user} = session;

    await dbConnect();
    const body = await req.json();
    const { year, course, section, branch } = body;

    const existProfile = await Profile.findOne({ userId: user.userId });

    if(existProfile) {
        const restrictedFields = ["course", "year", "branch", "section"];
        for (const field of restrictedFields) {
          const alreadyExists = !!existProfile[field];
          const tryingToUpdate = body[field] !== undefined;
    
          if (alreadyExists && tryingToUpdate) {
            return NextResponse.json(
              {
                success: false,
                message: `You can't update ${field} once it's already set.`,
              },
              { status: 400 }
            );
          }
        }

      await Profile.findByIdAndUpdate(
          existProfile._id,
          {
            $set: {
              year:  existProfile.year || year,
              course:  existProfile.course || course, 
              section:  existProfile.section || section,
              branch:  existProfile.branch || branch,
             
            },
          },
          { new: true }
        );
     
        return NextResponse.json(
          {
            success: true,
            message: "Profile updated successfully",
          },
          { status: 200 }
        );

    }


    if (!year || !course) {
      return NextResponse.json(
        {
          success: false,
          message: "Year and Course are required",
        },
        { status: 400 }
      );
    }

    const foundUser = await User.findById(user.userId);
    if (!foundUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    foundUser.profileCompleted = true;
    const username = `${foundUser.name}(${course})_${year}` +
                 (branch ? `_${branch}` : '') +
                 (section ? `_${section}` : '');
    
    foundUser.username=username;

    await foundUser.save();

    const profile = await Profile.create({
      userId: foundUser._id,
      year,
      course,
      ...(section && { section }),
      ...(branch && { branch }),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: profile,
      },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Error while updating profile",
      },
      { status: 500 }
    );
  }
};
