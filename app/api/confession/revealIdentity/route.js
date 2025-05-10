import Confession from "@/models/Confession";

export const POST = async (req) => {
    try {
        const user = getAuthUser(req);
    
        if (!user) {
        return NextResponse.json({
            success: false,
            message: "UNAUTHORIZED"
        }, { status: 404 });
        }
    
        await dbConnect();
        const body = await req.json();
        const { confessionId } = body;
    
        if (!confessionId) {
        return NextResponse.json(
            { success: false, message: "Confession ID is required" },
            { status: 400 }
        );
        }
    
        const confession = await Confession.findById(confessionId);
    
        if (!confession) {
        return NextResponse.json(
            { success: false, message: "Confession not found" },
            { status: 404 }
        );
        }

        if(confession.isAnonymous) {
            return NextResponse.json(
                { success: false, message: "This Confession can't be revealed" },
                { status: 400 }
            );
        }

        if(confession.targetUser !== user.userId) {
            return NextResponse.json(
                { success: false, message: "You can't Reveal this Confession!" },
                { status: 403 }
            );
        }
        const profile = await Profile.find({ userId: owner._id }).populate("userId", "name");

        const confessorData = {
            name: profile.userId?.name,
            course: profile.course,
            year: profile.year,
            ...(profile?.section && { section: profile.section }),
            ...(profile?.branch && { branch: profile.branch }),
        }

    
        return NextResponse.json(
        { success: true, message: "Confession revealed successfully", data: confessorData },
        { status: 200 }
        );
    
    } catch (error) {
        return NextResponse.json(
        { success: false, message: error?.message },
        { status: 500 }
        );
    }
}