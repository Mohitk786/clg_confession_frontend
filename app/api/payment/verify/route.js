import { NextResponse } from "next/server";
import {getAuthUser} from "@/lib/auth";
import User from "@/models/User";

export const GET = async (req) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await dbConnect();

    const dbUser = await User.findById(user.userId);
    if (!dbUser) return NextResponse.json({ msg: "User not found" }, { status: 404 });

    return NextResponse.json({ ...dbUser });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
};
